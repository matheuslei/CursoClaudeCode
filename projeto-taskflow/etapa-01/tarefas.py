"""TaskFlow: lista de tarefas de linha de comando (projeto de treino do curso).

Uso:
    python tarefas.py adicionar "Título da tarefa"
    python tarefas.py listar
"""
import argparse
import json
from pathlib import Path

ARQUIVO = Path(__file__).with_name("tarefas.json")


def carregar():
    """Lê as tarefas do arquivo JSON. Retorna lista vazia se ainda não existir."""
    if not ARQUIVO.exists():
        return []
    return json.loads(ARQUIVO.read_text(encoding="utf-8"))


def salvar(tarefas):
    """Grava a lista de tarefas no arquivo JSON."""
    ARQUIVO.write_text(json.dumps(tarefas, ensure_ascii=False, indent=2), encoding="utf-8")


def adicionar(titulo):
    tarefas = carregar()
    tarefas.append({"titulo": titulo, "feita": False})
    salvar(tarefas)
    print(f"Tarefa {len(tarefas)} adicionada: {titulo}")


def listar():
    tarefas = carregar()
    if not tarefas:
        print("Nenhuma tarefa. Use: python tarefas.py adicionar \"...\"")
        return
    for i, t in enumerate(tarefas, start=1):
        print(f"{i}. {t['titulo']}")


def main():
    parser = argparse.ArgumentParser(description="TaskFlow: suas tarefas no terminal")
    sub = parser.add_subparsers(dest="comando", required=True)

    p_add = sub.add_parser("adicionar", help="adiciona uma tarefa")
    p_add.add_argument("titulo")

    sub.add_parser("listar", help="lista as tarefas")

    args = parser.parse_args()
    if args.comando == "adicionar":
        adicionar(args.titulo)
    elif args.comando == "listar":
        listar()


if __name__ == "__main__":
    main()
