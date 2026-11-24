"""Testes do exportar.py (dados fictícios)."""
import contextlib
import io
import tempfile
import unittest
from pathlib import Path

import exportar
import tarefas


class TestParaCsv(unittest.TestCase):
    def test_lista_vazia_tem_so_cabecalho(self):
        self.assertEqual(exportar.para_csv([]), "numero,titulo,feita\n")

    def test_numera_a_partir_de_1_e_traduz_status(self):
        lista = [{"titulo": "Comprar café", "feita": True}, {"titulo": "Ler, depois", "feita": False}]
        linhas = exportar.para_csv(lista).splitlines()
        self.assertEqual(linhas[1], "1,Comprar café,sim")
        self.assertEqual(linhas[2], '2,"Ler, depois",não')


class TestExportar(unittest.TestCase):
    def test_grava_arquivo(self):
        with tempfile.TemporaryDirectory() as tmp:
            original = tarefas.ARQUIVO
            tarefas.ARQUIVO = Path(tmp) / "tarefas.json"
            try:
                tarefas.salvar([{"titulo": "Tarefa fictícia", "feita": False}])
                destino = Path(tmp) / "saida.csv"
                with contextlib.redirect_stdout(io.StringIO()):
                    exportar.exportar(destino)
                self.assertIn("Tarefa fictícia", destino.read_text(encoding="utf-8"))
            finally:
                tarefas.ARQUIVO = original
