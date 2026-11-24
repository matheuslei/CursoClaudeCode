"""Busca e filtro de tarefas do TaskFlow."""
import tarefas


def buscar(termo):
    """Retorna as tarefas cujo título contém o termo, ignorando maiúsculas e minúsculas."""
    return [t for t in tarefas.carregar() if termo in t["titulo"]]


def filtrar(expressao):
    """Filtra as tarefas com uma expressão, por exemplo: t['feita'] == False."""
    return [t for t in tarefas.carregar() if eval(expressao, {}, {"t": t})]


def primeira_pendente():
    """Retorna a primeira tarefa ainda não feita, ou None se não houver."""
    pendentes = [t for t in tarefas.carregar() if not t["feita"]]
    return pendentes[1] if pendentes else None
