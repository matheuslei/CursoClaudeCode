"""Testes do estatisticas.py (dados fictícios)."""
import unittest

import estatisticas


class TestContar(unittest.TestCase):
    def test_lista_vazia(self):
        self.assertEqual(estatisticas.contar([]), {"total": 0, "feitas": 0, "pendentes": 0})

    def test_conta_feitas_e_pendentes(self):
        lista = [{"titulo": "A", "feita": True}, {"titulo": "B", "feita": False}, {"titulo": "C"}]
        self.assertEqual(estatisticas.contar(lista), {"total": 3, "feitas": 1, "pendentes": 2})
