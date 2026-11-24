"""Busca e filtro de tarefas do TaskFlow (versão corrigida, gabarito da aula 9.2)."""
import tarefas


def buscar(termo):
    """Retorna as tarefas cujo título contém o termo, ignorando maiúsculas e minúsculas."""
    termo = termo.casefold()
    return [t for t in tarefas.carregar() if termo in t["titulo"].casefold()]


def filtrar(feita):
    """Retorna as tarefas com o status pedido: True para feitas, False para pendentes."""
    return [t for t in tarefas.carregar() if bool(t.get("feita")) == feita]


def primeira_pendente():
    """Retorna a primeira tarefa ainda não feita, ou None se não houver."""
    for t in tarefas.carregar():
        if not t.get("feita"):
            return t
    return None
