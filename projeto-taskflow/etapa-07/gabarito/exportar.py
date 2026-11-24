"""Exporta as tarefas do TaskFlow para CSV (gabarito da aula 7.3).

Uso:
    python exportar.py              # grava tarefas.csv ao lado do tarefas.json
    python exportar.py saida.csv    # grava no arquivo indicado
"""
import csv
import io
import sys
from pathlib import Path

import tarefas


def para_csv(lista):
    """Converte a lista de tarefas em texto CSV (numero, titulo, feita)."""
    saida = io.StringIO()
    escritor = csv.writer(saida, lineterminator="\n")
    escritor.writerow(["numero", "titulo", "feita"])
    for numero, t in enumerate(lista, start=1):
        escritor.writerow([numero, t["titulo"], "sim" if t.get("feita") else "não"])
    return saida.getvalue()


def exportar(destino):
    """Grava as tarefas atuais em CSV no caminho indicado e avisa quantas foram."""
    lista = tarefas.carregar()
    Path(destino).write_text(para_csv(lista), encoding="utf-8")
    print(f"{len(lista)} tarefa(s) exportada(s) para {destino}")


if __name__ == "__main__":
    exportar(sys.argv[1] if len(sys.argv) > 1 else tarefas.ARQUIVO.with_suffix(".csv"))
