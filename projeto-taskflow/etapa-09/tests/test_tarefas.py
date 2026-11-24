"""Testes do TaskFlow (unittest, biblioteca padrão).

Rode na pasta do projeto:  python -m unittest
Cada teste usa um arquivo JSON temporário, então seu tarefas.json real não é tocado.
"""
import contextlib
import io
import tempfile
import unittest
from pathlib import Path

import tarefas


class BaseTarefas(unittest.TestCase):
    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        self._original = tarefas.ARQUIVO
        tarefas.ARQUIVO = Path(self._tmp.name) / "tarefas.json"

    def tearDown(self):
        tarefas.ARQUIVO = self._original
        self._tmp.cleanup()

    def rodar(self, funcao, *args):
        """Executa uma função do TaskFlow e devolve o que ela imprimiu."""
        saida = io.StringIO()
        with contextlib.redirect_stdout(saida):
            funcao(*args)
        return saida.getvalue()


class TestAdicionar(BaseTarefas):
    def test_adiciona_tarefa_nao_feita(self):
        self.rodar(tarefas.adicionar, "Comprar café")
        self.assertEqual(tarefas.carregar(), [{"titulo": "Comprar café", "feita": False}])

    def test_lista_vazia_quando_arquivo_nao_existe(self):
        self.assertEqual(tarefas.carregar(), [])


class TestConcluir(BaseTarefas):
    def test_marca_tarefa_como_feita(self):
        self.rodar(tarefas.adicionar, "Estudar")
        self.rodar(tarefas.concluir, 1)
        self.assertTrue(tarefas.carregar()[0]["feita"])

    def test_numero_invalido_nao_altera_nada(self):
        self.rodar(tarefas.adicionar, "Estudar")
        saida = self.rodar(tarefas.concluir, 5)
        self.assertIn("não existe", saida)
        self.assertFalse(tarefas.carregar()[0]["feita"])


class TestRemover(BaseTarefas):
    def test_remove_e_renumera(self):
        for t in ("A", "B", "C"):
            self.rodar(tarefas.adicionar, t)
        self.rodar(tarefas.remover, 2)
        self.assertEqual([t["titulo"] for t in tarefas.carregar()], ["A", "C"])

    def test_listar_mostra_marcacao(self):
        self.rodar(tarefas.adicionar, "A")
        self.rodar(tarefas.concluir, 1)
        self.assertIn("1. [x] A", self.rodar(tarefas.listar))


if __name__ == "__main__":
    unittest.main()
