"""Aula 10.4 · Projeto final: o agente TaskFlow, uma conversa no terminal.

Junta o que o módulo ensinou: cliente com conversa contínua (ClaudeSDKClient), ferramentas
próprias, permissões, hooks, um subagente revisor e limites de custo.

Copie para a raiz da etapa 10, junto com agente_ferramentas.py e agente_permissoes.py, e rode:
    .\\.venv\\Scripts\\python.exe agente_taskflow.py
Digite "sair" para encerrar.
ATENÇÃO: cada mensagem chama a API e gera CUSTO. O orçamento abaixo vale para a conversa inteira.
"""
import asyncio
from pathlib import Path

from claude_agent_sdk import (
    AgentDefinition,
    AssistantMessage,
    ClaudeAgentOptions,
    ClaudeSDKClient,
    ResultMessage,
    TextBlock,
    ToolUseBlock,
)
from claude_agent_sdk.types import HookMatcher

from agente_permissoes import SERVIDOR, auditar, bloquear_remocao, manter_fluxo, pode_usar

PASTA = Path(__file__).parent

REVISOR = AgentDefinition(
    description="Revisa o código Python do TaskFlow. Use quando o usuário pedir revisão do código.",
    prompt=(
        "Você revisa o TaskFlow (Python, só biblioteca padrão). Leia os arquivos .py e aponte, "
        "em até 5 itens: funções sem docstring, mensagens fora do português e riscos. Não edite nada."
    ),
    tools=["Read", "Grep", "Glob"],  # somente leitura
    model="haiku",  # alias: um modelo menor e mais barato para a revisão
)


async def subagente_terminou(input_data, tool_use_id, context):
    print(f"[subagente] terminou: {input_data['agent_id']}")
    return {}


OPCOES = ClaudeAgentOptions(
    system_prompt=(
        "Você é o agente do TaskFlow. Gerencie tarefas com as ferramentas mcp__taskflow__ e, "
        "para revisar código, use o subagente revisor-taskflow. Responda em português do Brasil."
    ),
    cwd=str(PASTA),
    mcp_servers={"taskflow": SERVIDOR},
    tools=["Read", "Glob", "Grep", "Agent"],  # embutidas disponíveis (sem Bash, Write, Edit)
    agents={"revisor-taskflow": REVISOR},
    permission_mode="default",
    allowed_tools=[
        "Read", "Glob", "Grep", "Agent",
        "mcp__taskflow__listar_tarefas", "mcp__taskflow__adicionar_tarefa",
    ],
    can_use_tool=pode_usar,  # concluir: pergunta no terminal
    hooks={
        "PreToolUse": [
            HookMatcher(matcher="mcp__taskflow__remover_tarefa", hooks=[bloquear_remocao]),
            HookMatcher(matcher=None, hooks=[manter_fluxo]),
        ],
        "PostToolUse": [HookMatcher(matcher="^mcp__taskflow__", hooks=[auditar])],
        "SubagentStop": [HookMatcher(hooks=[subagente_terminou])],
    },
    max_turns=15,  # por mensagem
    max_budget_usd=1.00,  # para a conversa toda (estimado)
)


async def main():
    print("Agente TaskFlow. Exemplos: 'liste minhas tarefas', 'revise o código'. Digite sair.")
    async with ClaudeSDKClient(options=OPCOES) as cliente:
        while True:
            texto = (await asyncio.to_thread(input, "\nvocê> ")).strip()
            if texto.lower() in ("sair", "exit"):
                break
            if not texto:
                continue
            await cliente.query(texto)
            async for mensagem in cliente.receive_response():
                if isinstance(mensagem, AssistantMessage):
                    for bloco in mensagem.content:
                        if isinstance(bloco, TextBlock):
                            print(f"agente> {bloco.text}")
                        elif isinstance(bloco, ToolUseBlock):
                            print(f"[ferramenta] {bloco.name}")
                elif isinstance(mensagem, ResultMessage):
                    if mensagem.subtype != "success":
                        print(f"[parou: {mensagem.subtype}]")
                    if mensagem.total_cost_usd is not None:
                        print(f"[custo acumulado estimado: US$ {mensagem.total_cost_usd:.4f}]")


if __name__ == "__main__":
    asyncio.run(main())
