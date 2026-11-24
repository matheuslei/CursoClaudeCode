"""Aula 10.3 · Permissões e hooks no SDK: quem decide se cada ferramenta roda.

Copie este arquivo e o agente_ferramentas.py para a raiz da etapa 10 e rode:
    .\\.venv\\Scripts\\python.exe agente_permissoes.py

O que cada camada faz neste agente:
  - allowed_tools: listar e adicionar rodam sem perguntar;
  - can_use_tool: concluir pergunta a você no terminal (s/n);
  - hook PreToolUse: remover é sempre bloqueado pela "política" do TaskFlow;
  - hook PostToolUse: toda ferramenta do TaskFlow que rodou é anotada em auditoria.log.
ATENÇÃO: cada execução chama a API e gera CUSTO. Use apenas dados fictícios.
"""
import asyncio
import json
from datetime import datetime
from pathlib import Path
from typing import Any

from claude_agent_sdk import ClaudeAgentOptions, ResultMessage, create_sdk_mcp_server, query, tool
from claude_agent_sdk.types import (
    HookMatcher,
    PermissionResultAllow,
    PermissionResultDeny,
    ToolPermissionContext,
)

from agente_ferramentas import _texto, adicionar_tarefa, concluir_tarefa, listar_tarefas
from tarefas import carregar, salvar

LOG = Path(__file__).with_name("auditoria.log")


@tool("remover_tarefa", "Remove a tarefa de número informado (começa em 1).", {"numero": int})
async def remover_tarefa(args: dict[str, Any]) -> dict[str, Any]:
    tarefas = carregar()
    numero = int(args.get("numero", 0))
    if numero < 1 or numero > len(tarefas):
        return _texto(f"Erro: a tarefa {numero} não existe.", erro=True)
    removida = tarefas.pop(numero - 1)
    salvar(tarefas)
    return _texto(f"Tarefa {numero} removida: {removida['titulo']}")


SERVIDOR = create_sdk_mcp_server(
    name="taskflow",
    version="1.0.0",
    tools=[listar_tarefas, adicionar_tarefa, concluir_tarefa, remover_tarefa],
)


# ---------- 1. Callback de permissão: decide o que nenhuma regra decidiu ----------
async def pode_usar(
    tool_name: str, input_data: dict, context: ToolPermissionContext
) -> PermissionResultAllow | PermissionResultDeny:
    print(f"\n[permissão] {tool_name} {input_data}")
    resposta = input("Permitir? (s/n): ").strip().lower()
    if resposta == "s":
        return PermissionResultAllow(updated_input=input_data)
    return PermissionResultDeny(message="O usuário recusou esta ação.")


# ---------- 2. Hook PreToolUse: política que vale sempre ----------
async def bloquear_remocao(input_data, tool_use_id, context):
    return {
        "hookSpecificOutput": {
            "hookEventName": input_data["hook_event_name"],
            "permissionDecision": "deny",
            "permissionDecisionReason": "Política do TaskFlow: remover tarefas só pela CLI, à mão.",
        }
    }


# ---------- 3. Hook PostToolUse: auditoria do que rodou ----------
async def auditar(input_data, tool_use_id, context):
    registro = {
        "quando": datetime.now().isoformat(timespec="seconds"),
        "ferramenta": input_data["tool_name"],
        "entrada": input_data["tool_input"],
    }
    with LOG.open("a", encoding="utf-8") as arq:
        arq.write(json.dumps(registro, ensure_ascii=False) + "\n")
    return {}


# Contorno exigido pela doc do SDK em Python: um hook PreToolUse "vazio" mantém o fluxo aberto
# para o can_use_tool funcionar quando o prompt é um fluxo (async generator).
async def manter_fluxo(input_data, tool_use_id, context):
    return {"continue_": True}


async def pedido():
    yield {
        "type": "user",
        "message": {
            "role": "user",
            "content": (
                "Liste as tarefas, adicione a tarefa fictícia 'Testar o agente', "
                "conclua a tarefa 1 e depois remova a tarefa 2."
            ),
        },
    }


OPCOES = ClaudeAgentOptions(
    system_prompt="Você gerencia o TaskFlow. Responda em português do Brasil. Se algo for negado, explique.",
    mcp_servers={"taskflow": SERVIDOR},
    tools=[],
    permission_mode="default",
    allowed_tools=["mcp__taskflow__listar_tarefas", "mcp__taskflow__adicionar_tarefa"],
    can_use_tool=pode_usar,
    hooks={
        "PreToolUse": [
            HookMatcher(matcher="mcp__taskflow__remover_tarefa", hooks=[bloquear_remocao]),
            HookMatcher(matcher=None, hooks=[manter_fluxo]),
        ],
        "PostToolUse": [HookMatcher(matcher="^mcp__taskflow__", hooks=[auditar])],
    },
    max_turns=12,
    max_budget_usd=0.50,
)


async def main():
    try:
        async for mensagem in query(prompt=pedido(), options=OPCOES):
            if isinstance(mensagem, ResultMessage):
                if mensagem.subtype == "success":
                    print(f"\n{mensagem.result}")
                else:
                    print(f"\nParou: {mensagem.subtype}")
                if mensagem.total_cost_usd is not None:
                    print(f"Custo estimado: US$ {mensagem.total_cost_usd:.4f}")
    except Exception as erro:
        print(f"A sessão terminou com erro: {erro}")
    print(f"Auditoria em: {LOG.name}")


if __name__ == "__main__":
    asyncio.run(main())
