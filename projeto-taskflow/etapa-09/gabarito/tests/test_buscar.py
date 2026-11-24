"""Testes de buscar.py (gabarito da aula 9.2). Dados fictícios."""
import tempfile
import unittest
from pathlib import Path

import buscar
import tarefas


class TestBuscar(unittest.TestCase):
    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        self._original = tarefas.ARQUIVO
        tarefas.ARQUIVO = Path(self._tmp.name) / "tarefas.json"
        tarefas.salvar([
            {"titulo": "Comprar café", "feita": True},
            {"titulo": "Estudar o Módulo 9", "feita": False},
            {"titulo": "Revisar o CAFÉ da manhã", "feita": False},
        ])

    def tearDown(self):
        tarefas.ARQUIVO = self._original
        self._tmp.cleanup()

    def test_buscar_ignora_maiusculas(self):
        titulos = [t["titulo"] for t in buscar.buscar("café")]
        self.assertEqual(titulos, ["Comprar café", "Revisar o CAFÉ da manhã"])

    def test_filtrar_pendentes(self):
        self.assertEqual(len(buscar.filtrar(False)), 2)

    def test_filtrar_feitas(self):
        self.assertEqual(len(buscar.filtrar(True)), 1)

    def test_primeira_pendente(self):
        self.assertEqual(buscar.primeira_pendente()["titulo"], "Estudar o Módulo 9")

    def test_primeira_pendente_sem_pendentes(self):
        tarefas.salvar([{"titulo": "Única", "feita": True}])
        self.assertIsNone(buscar.primeira_pendente())


if __name__ == "__main__":
    unittest.main()
