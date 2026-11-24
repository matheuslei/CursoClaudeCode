"""Mostra quantas tarefas estão feitas e pendentes (gabarito da aula 7.3).

Uso:
    python estatisticas.py
"""
import tarefas


def contar(lista):
    """Conta as tarefas por status e devolve um dicionário com total, feitas e pendentes."""
    feitas = sum(1 for t in lista if t.get("feita"))
    return {"total": len(lista), "feitas": feitas, "pendentes": len(lista) - feitas}


def mostrar():
    """Imprime o resumo das tarefas atuais."""
    c = contar(tarefas.carregar())
    print(f"Total: {c['total']} | Feitas: {c['feitas']} | Pendentes: {c['pendentes']}")


if __name__ == "__main__":
    mostrar()
