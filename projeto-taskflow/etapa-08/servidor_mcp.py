"""Servidor MCP do TaskFlow: expõe as tarefas para o Claude Code via stdio.

Requer o SDK oficial do MCP para Python (v2, Python 3.11+):
    pip install "mcp[cli]"

Conectar ao Claude Code (PowerShell, na pasta do projeto, com o ambiente virtual .venv):
    claude mcp add taskflow -- "$PWD\\.venv\\Scripts\\python.exe" "$PWD\\servidor_mcp.py"

ATENÇÃO: num servidor stdio, a saída padrão (stdout) é o canal do protocolo.
Não use print() aqui dentro, porque isso corrompe a comunicação. Retorne strings nas ferramentas.

Nota de versão: no SDK v1.x a classe se chamava FastMCP
(from mcp.server.fastmcp import FastMCP). Na v2 ela virou MCPServer.
"""
from mcp.server import MCPServer

from tarefas import carregar, salvar

mcp = MCPServer("taskflow")


@mcp.tool()
def listar_tarefas() -> str:
    """Lista todas as tarefas do TaskFlow com número e status ([x] feita, [ ] pendente)."""
    tarefas = carregar()
    if not tarefas:
        return "Nenhuma tarefa cadastrada."
    linhas = []
    for i, t in enumerate(tarefas, start=1):
        marca = "x" if t.get("feita") else " "
        linhas.append(f"{i}. [{marca}] {t['titulo']}")
    return "\n".join(linhas)


@mcp.tool()
def adicionar_tarefa(titulo: str) -> str:
    """Adiciona uma nova tarefa pendente ao TaskFlow. Use títulos curtos e fictícios."""
    titulo = titulo.strip()
    if not titulo:
        return "Erro: o título não pode ser vazio."
    tarefas = carregar()
    tarefas.append({"titulo": titulo, "feita": False})
    salvar(tarefas)
    return f"Tarefa {len(tarefas)} adicionada: {titulo}"


if __name__ == "__main__":
    mcp.run(transport="stdio")
