"""Aula 10.1 · O loop do agente: um agente somente leitura que resume o TaskFlow.

Rode na raiz da etapa 10, com o ambiente virtual e a chave de API configurados (veja o README):
    .\\.venv\\Scripts\\python.exe agente_loop.py

ATENÇÃO: cada execução chama a API e gera CUSTO. Os limites max_turns e max_budget_usd
abaixo seguram o gasto; o valor de total_cost_usd é uma estimativa, não a fatura.
"""
import asyncio
from pathlib import Path

from claude_agent_sdk import (
    AssistantMessage,
    ClaudeAgentOptions,
    ResultMessage,
    TextBlock,
    ToolUseBlock,
    query,
)

PASTA = Path(__file__).parent

OPCOES = ClaudeAgentOptions(
    system_prompt=(
        "Você é o assistente do TaskFlow, uma CLI de tarefas em Python. "
        "Responda em português do Brasil, em no máximo 5 linhas. Não edite arquivos."
    ),
    allowed_tools=["Read", "Glob", "Grep"],  # pré-aprovadas: só leitura
    disallowed_tools=["Bash", "Write", "Edit"],  # nem aparecem para o Claude
    cwd=str(PASTA),  # o agente trabalha nesta pasta
    max_turns=8,  # trava contra loop longo
    max_budget_usd=0.50,  # trava de gasto (estimado)
)


async def main():
    try:
        async for mensagem in query(
            prompt="Leia o tarefas.py e explique o que o TaskFlow faz e quais comandos ele tem.",
            options=OPCOES,
        ):
            if isinstance(mensagem, AssistantMessage):
                for bloco in mensagem.content:
                    if isinstance(bloco, TextBlock):
                        print(f"Claude: {bloco.text}")
                    elif isinstance(bloco, ToolUseBlock):
                        print(f"[ferramenta] {bloco.name}")
            elif isinstance(mensagem, ResultMessage):
                if mensagem.subtype == "success":
                    print(f"\nResultado: {mensagem.result}")
                else:
                    print(f"\nParou: {mensagem.subtype}")
                print(f"Turnos: {mensagem.num_turns}")
                if mensagem.total_cost_usd is not None:
                    print(f"Custo estimado: US$ {mensagem.total_cost_usd:.4f}")
    except Exception as erro:
        # query() avisa com uma exceção depois de entregar um resultado de erro
        # (ex.: limite de turnos). Falhas de conexão também caem aqui.
        print(f"A sessão terminou com erro: {erro}")


if __name__ == "__main__":
    asyncio.run(main())
