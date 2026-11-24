# TaskFlow · etapa 07 (Módulo 7: subagentes e paralelismo)

O TaskFlow com testes (base da etapa 03), preparado para os exercícios de **subagentes** e
**worktrees**. Só biblioteca padrão do Python: nada para instalar com `pip`.

## 1. Crie a sua pasta de treino (fora do curso)

Os exercícios do Módulo 7 usam Git. Para a pasta do curso continuar sem Git, você trabalha numa
**cópia**. No PowerShell, a partir da pasta `etapa-07`:

```powershell
Copy-Item -Recurse . "$HOME\treino-taskflow"
cd "$HOME\treino-taskflow"
Remove-Item -Recurse -Force .\gabarito
python -m unittest
```

(A pasta `gabarito` fica de fora para você criar as coisas sozinho. Consulte-a no curso quando
quiser conferir.)

## 2. Transforme a cópia num repositório Git só local

```powershell
git --version
git init
git add .
git commit -m "TaskFlow: ponto de partida do Módulo 7"
```

- Nada é enviado para a internet: não existe repositório remoto aqui.
- Se o Git pedir nome e e-mail, configure só neste repositório com valores fictícios:
  `git config user.name "Aluno"` e `git config user.email "aluno@exemplo.com"`.
- **Sem Git?** Em máquina corporativa, peça a instalação à TI. Enquanto isso, faça a aula de
  worktrees pela simulação. O exercício de subagentes (aula 1) funciona sem Git.

## 3. Abra o Claude Code na pasta de treino

```powershell
claude
```

Os exercícios de cada aula dizem o que fazer a partir daqui.

## O que tem aqui

| Arquivo | Para quê |
|---|---|
| `tarefas.py` | a CLI de tarefas |
| `tests/` | testes com `unittest` (`python -m unittest`) |
| `CLAUDE.md` | regras do projeto para o Claude |
| `.gitignore` | ignora cache do Python, `tarefas.json` e `.claude/worktrees/` |
| `gabarito/` | respostas dos exercícios do módulo |
