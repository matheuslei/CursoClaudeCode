"""Hook PostToolUse do plugin taskflow: verifica a sintaxe dos .py do projeto após cada edição.

No plugin, o script mora na pasta do plugin, não no projeto. Por isso a pasta do projeto vem
da variável CLAUDE_PROJECT_DIR (que todo hook recebe), e não da posição deste arquivo.
Sai com código 2 quando há erro, para o Claude receber a mensagem (stderr) e corrigir.
"""
import os
import py_compile
import sys
from pathlib import Path

sys.stderr.reconfigure(encoding="utf-8")  # acentos legíveis no Windows

raiz = Path(os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd()))
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
