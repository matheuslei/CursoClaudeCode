"""TaskFlow: lista de tarefas de linha de comando (projeto de treino do curso).

Uso:
    python tarefas.py adicionar "Título da tarefa"
    python tarefas.py listar
    python tarefas.py concluir <numero>
    python tarefas.py remover <numero>
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


def _indice_valido(tarefas, numero):
    """Retorna True se o número (1-based) existe na lista; senão avisa e retorna False."""
    if numero < 1 or numero > len(tarefas):
        print(f"Tarefa {numero} não existe.")
        return False
    return True


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
        marca = "x" if t.get("feita") else " "
        print(f"{i}. [{marca}] {t['titulo']}")


def concluir(numero):
    tarefas = carregar()
    if not _indice_valido(tarefas, numero):
        return
    tarefas[numero - 1]["feita"] = True
    salvar(tarefas)
    print(f"Tarefa {numero} concluída.")


def remover(numero):
    tarefas = carregar()
    if not _indice_valido(tarefas, numero):
        return
    removida = tarefas.pop(numero - 1)
    salvar(tarefas)
    print(f"Tarefa {numero} removida: {removida['titulo']}")


def main():
    parser = argparse.ArgumentParser(description="TaskFlow: suas tarefas no terminal")
    sub = parser.add_subparsers(dest="comando", required=True)

    p_add = sub.add_parser("adicionar", help="adiciona uma tarefa")
    p_add.add_argument("titulo")

    sub.add_parser("listar", help="lista as tarefas")

    p_ok = sub.add_parser("concluir", help="marca uma tarefa como feita")
    p_ok.add_argument("numero", type=int)

    p_rm = sub.add_parser("remover", help="remove uma tarefa")
    p_rm.add_argument("numero", type=int)

    args = parser.parse_args()
    if args.comando == "adicionar":
        adicionar(args.titulo)
    elif args.comando == "listar":
        listar()
    elif args.comando == "concluir":
        concluir(args.numero)
    elif args.comando == "remover":
        remover(args.numero)


if __name__ == "__main__":
    main()
