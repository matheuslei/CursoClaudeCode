"""Hook Stop do TaskFlow: só deixa o Claude encerrar o turno se os testes passarem.

Configuração (em .claude/settings.json do projeto):
    {"hooks": {"Stop": [{"hooks": [{"type": "command",
        "command": "python \"${CLAUDE_PROJECT_DIR}/.claude/hooks/testes_antes_de_parar.py\""}]}]}}

Como funciona (documentação oficial de hooks, evento Stop):
- saída 0: o Claude pode parar;
- saída 2: o Claude NÃO para; o texto em stderr volta para ele como motivo para continuar.
- stop_hook_active = true quer dizer que o Claude já está continuando por causa deste hook.
  Nesse caso liberamos a parada, para não prender o Claude num laço sem fim.
"""
import json
import os
import subprocess
import sys

sys.stderr.reconfigure(encoding="utf-8")  # acentos legíveis no Windows

dados = json.load(sys.stdin) if not sys.stdin.isatty() else {}
if dados.get("stop_hook_active"):
    sys.exit(0)

pasta = os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd())
r = subprocess.run([sys.executable, "-m", "unittest", "-q"], cwd=pasta, capture_output=True, text=True)
if r.returncode != 0:
    fim = (r.stderr or r.stdout).strip().splitlines()[-15:]
    print("Os testes estão falhando. Corrija antes de encerrar:\n" + "\n".join(fim), file=sys.stderr)
    sys.exit(2)
sys.exit(0)
