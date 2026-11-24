"""Aula 10.2 · Ferramentas próprias: o TaskFlow como servidor MCP dentro do processo.

Copie este arquivo para a raiz da etapa 10 (ao lado de tarefas.py) e rode:
    .\\.venv\\Scripts\\python.exe agente_ferramentas.py

Diferente do servidor_mcp.py do Módulo 6, aqui não existe processo separado: as ferramentas
rodam dentro do seu programa Python. Use apenas títulos fictícios.
ATENÇÃO: cada execução chama a API e gera CUSTO.
"""
import asyncio
from typing import Any

from claude_agent_sdk import (
    AssistantMessage,
    ClaudeAgentOptions,
    ResultMessage,
    ToolAnnotations,
    ToolUseBlock,
    create_sdk_mcp_server,
    query,
    tool,
)

from tarefas import carregar, salvar


def _texto(msg: str, erro: bool = False) -> dict[str, Any]:
    """Monta o resultado no formato que o SDK espera (lista content)."""
    resultado: dict[str, Any] = {"content": [{"type": "text", "text": msg}]}
    if erro:
        resultado["is_error"] = True
    return resultado


@tool(
    "listar_tarefas",
    "Lista as tarefas do TaskFlow com número e status ([x] feita, [ ] pendente).",
    {"type": "object", "properties": {}},  # sem parâmetros: JSON Schema completo
    annotations=ToolAnnotations(readOnlyHint=True),  # só lê: pode rodar em paralelo
)
async def listar_tarefas(args: dict[str, Any]) -> dict[str, Any]:
    tarefas = carregar()
    if not tarefas:
        return _texto("Nenhuma tarefa cadastrada.")
    linhas = []
    for i, t in enumerate(tarefas, start=1):
        marca = "x" if t.get("feita") else " "
        linhas.append(f"{i}. [{marca}] {t['titulo']}")
    return _texto("\n".join(linhas))


@tool("adicionar_tarefa", "Adiciona uma tarefa pendente. Use títulos curtos e fictícios.", {"titulo": str})
async def adicionar_tarefa(args: dict[str, Any]) -> dict[str, Any]:
    titulo = str(args.get("titulo", "")).strip()
    if not titulo:
        return _texto("Erro: o título não pode ser vazio.", erro=True)
    tarefas = carregar()
    tarefas.append({"titulo": titulo, "feita": False})
    salvar(tarefas)
    return _texto(f"Tarefa {len(tarefas)} adicionada: {titulo}")


@tool("concluir_tarefa", "Marca como feita a tarefa de número informado (começa em 1).", {"numero": int})
async def concluir_tarefa(args: dict[str, Any]) -> dict[str, Any]:
    tarefas = carregar()
    numero = int(args.get("numero", 0))
    if numero < 1 or numero > len(tarefas):
        return _texto(f"Erro: a tarefa {numero} não existe. Liste as tarefas primeiro.", erro=True)
    tarefas[numero - 1]["feita"] = True
    salvar(tarefas)
    return _texto(f"Tarefa {numero} concluída.")


SERVIDOR = create_sdk_mcp_server(
    name="taskflow",
    version="1.0.0",
    tools=[listar_tarefas, adicionar_tarefa, concluir_tarefa],
)

OPCOES = ClaudeAgentOptions(
    system_prompt="Você gerencia a lista do TaskFlow. Responda em português do Brasil, em poucas linhas.",
    mcp_servers={"taskflow": SERVIDOR},  # a chave "taskflow" entra no nome: mcp__taskflow__...
    tools=[],  # remove as ferramentas embutidas: só as do TaskFlow ficam disponíveis
    allowed_tools=["mcp__taskflow__*"],  # pré-aprova todas as ferramentas deste servidor
    max_turns=10,
    max_budget_usd=0.50,
)


async def main():
    pedido = (
        "Adicione as tarefas fictícias 'Revisar relatório de teste' e "
        "'Organizar a mesa', conclua a primeira e me mostre a lista final."
    )
    try:
        async for mensagem in query(prompt=pedido, options=OPCOES):
            if isinstance(mensagem, AssistantMessage):
                for bloco in mensagem.content:
                    if isinstance(bloco, ToolUseBlock):
                        print(f"[ferramenta] {bloco.name}({bloco.input})")
            elif isinstance(mensagem, ResultMessage):
                if mensagem.subtype == "success":
                    print(f"\n{mensagem.result}")
                else:
                    print(f"\nParou: {mensagem.subtype}")
                if mensagem.total_cost_usd is not None:
                    print(f"Custo estimado: US$ {mensagem.total_cost_usd:.4f}")
    except Exception as erro:
        print(f"A sessão terminou com erro: {erro}")


if __name__ == "__main__":
    asyncio.run(main())
