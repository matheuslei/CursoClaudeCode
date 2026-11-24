"""Hook PostToolUse do TaskFlow: verifica a sintaxe dos .py do projeto após cada edição.

Sai com código 2 quando há erro, para o Claude receber a mensagem (stderr) e corrigir.
"""
import py_compile
import sys
from pathlib import Path

sys.stderr.reconfigure(encoding="utf-8")  # acentos legíveis no Windows

raiz = Path(__file__).resolve().parents[2]  # .claude/hooks/ -> pasta do projeto
erros = []
for arquivo in raiz.glob("*.py"):
    try:
        py_compile.compile(str(arquivo), doraise=True)
    except py_compile.PyCompileError as e:
        erros.append(str(e))

if erros:
    print("Erro de sintaxe após a edição:\n" + "\n".join(erros), file=sys.stderr)
    sys.exit(2)
sys.exit(0)
