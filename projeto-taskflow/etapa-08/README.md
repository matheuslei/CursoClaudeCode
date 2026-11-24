# TaskFlow · etapa 08 (Módulo 8: plugins)

Aqui estão as **peças soltas** que você criou nos módulos anteriores, prontas para virar um plugin:

| Peça | Onde está | Veio do |
|---|---|---|
| Skills `revisar-taskflow` e `nova-funcionalidade` | `.claude/skills/` | Módulo 5 |
| Hook de sintaxe (`checar.py`) | `.claude/hooks/` + `.claude/settings.json` | Módulo 5 |
| Servidor MCP | `servidor_mcp.py` + `requirements.txt` | Módulo 6 |
| Subagente revisor | `.claude/agents/revisor-taskflow.md` | Módulo 7 |

Só biblioteca padrão no TaskFlow; o servidor MCP usa o pacote `mcp`. Nada de Git é necessário.

## 1. Crie a pasta de treino (fora do curso)

No PowerShell, a partir da pasta `etapa-08`:

```powershell
Copy-Item -Recurse . "$HOME\treino-plugin"
cd "$HOME\treino-plugin"
Remove-Item -Recurse -Force .\gabarito
python -m unittest
```

## 2. Ambiente virtual para o servidor MCP (opcional)

O TaskFlow roda em Python 3.10 ou mais novo. O servidor MCP usa o SDK oficial v2, que exige
**Python 3.11 ou mais novo**: confira com `python --version`. Com 3.10, pule este passo; o módulo
inteiro funciona sem o servidor.

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Abra o Claude Code **com o ambiente ativado**, para o plugin achar o `python` com o pacote `mcp`.
Em máquina corporativa, se o `pip` for bloqueado, peça à TI; o resto do módulo funciona sem o
servidor MCP.

## 3. Siga as aulas

- **Aula 8.2:** você cria o plugin em `marketplace-taskflow\plugins\taskflow\` (dentro da pasta de
  treino) e testa com `claude --plugin-dir`.
- **Aula 8.3:** você cria `evals\` dentro do plugin. Rodar a avaliação gasta uso do seu plano: é opcional.
- **Aula 8.4:** você cria `marketplace-taskflow\.claude-plugin\marketplace.json` e instala o plugin por nome.

## Gabarito

`gabarito/marketplace-taskflow/` tem o marketplace local completo, com o plugin em
`plugins/taskflow/` e um caso de avaliação em `plugins/taskflow/evals/`. Conferido com
`claude plugin validate` (Claude Code 2.1.327, 19/11/2026).
