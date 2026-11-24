# TaskFlow · etapa 09 (Módulo 9: Automação)

O TaskFlow com testes (o mesmo da etapa 07), preparado para os exercícios de **automação**:
`claude -p` em scripts, `/code-review`, GitHub Actions e `/loop`. Só biblioteca padrão do Python.

> **Custo.** Todo exercício que chama o Claude (`claude -p`, `/code-review`, `/loop`, GitHub
> Actions) consome o uso do seu plano ou créditos da API. Faça cada passo uma vez, com limite de
> turnos, e nunca deixe um laço rodando sem prazo.
>
> **Dados.** Use só este projeto de treino, com dados fictícios. Código ou dados da empresa só
> entram em automação com aval da área de segurança da informação.

## 1. Crie a sua pasta de treino (fora do curso)

No PowerShell, a partir da pasta `etapa-09`:

```powershell
Copy-Item -Recurse . "$HOME\treino-taskflow-9"
cd "$HOME\treino-taskflow-9"
Remove-Item -Recurse -Force .\gabarito
python -m unittest
```

Deve aparecer `Ran 6 tests` e `OK`. A pasta `gabarito` fica de fora: consulte-a no curso.

## 2. Git só local (para as aulas 2 e 4)

```powershell
git init -b main
git config user.name "Aluno"
git config user.email "aluno@exemplo.com"
git add .
git commit -m "TaskFlow: ponto de partida do Módulo 9"
```

Nada vai para a internet. Sem Git? Peça a instalação à TI e, enquanto isso, faça as aulas pela
simulação; a aula 1 (`claude -p`) funciona sem Git.

## 3. Roteiro por aula

### Aula 9.1 · `claude -p`
1. `claude -p "Quais funções de tarefas.py não têm docstring? Responda só com os nomes." --max-turns 3`
2. Mesmo pedido com `--output-format json`, lido no PowerShell:
   ```powershell
   $r = claude -p "Liste as funções de tarefas.py" --output-format json --max-turns 3 | ConvertFrom-Json
   $r.result
   $r.total_cost_usd
   ```
3. Escreva o seu `revisar.ps1` (modelo: `gabarito/revisar.ps1`) e rode `.\revisar.ps1 -Arquivo tarefas.py`.

### Aula 9.2 · Revisão de código
1. `git switch -c busca`
2. Copie `gabarito/buscar_com_bug.py` (do curso) para a pasta de treino com o nome `buscar.py`.
   Ele tem problemas **de propósito**. `git add buscar.py` e `git commit -m "busca"`.
3. No `claude`, rode `/code-review low` e compare com `gabarito/revisao-esperada.md`.
4. Opcional: `/security-review` precisa de um remoto `origin`. Para treinar sem internet, crie um
   "remoto" que é só outra pasta no seu PC (antes do passo 1, ainda na `main`):
   ```powershell
   git init --bare ..\origem-taskflow.git
   git remote add origin ..\origem-taskflow.git
   git push -u origin main
   git remote set-head origin main
   ```
5. Corrija pedindo `/code-review --fix` ou à mão. Gabarito: `gabarito/buscar.py` e
   `gabarito/tests/test_buscar.py` (11 testes passando ao todo).

### Aula 9.3 · GitHub Actions (sem sair do PC)
1. Crie `.github/workflows/claude-review.yml` na pasta de treino.
2. Confira: `python <curso>\projeto-taskflow\etapa-09\gabarito\conferir_workflow.py .github\workflows\claude-review.yml`
3. Simule o que a action faria rodando o mesmo pedido com `claude -p` (ou `.\revisar.ps1`).
4. Rodar no GitHub é **opcional**: só num repositório pessoal de teste, com a chave cadastrada em
   *Settings > Secrets and variables > Actions*. Nunca escreva a chave no arquivo.

### Aula 9.4 · `/loop` e agendamentos
1. No `claude`: `/loop 5m rode python -m unittest e responda só OK ou FALHOU`.
2. Depois de uma ou duas execuções, peça: `cancele o loop dos testes`.
3. Opcional: copie `gabarito/.claude/loop.md` para `.claude/loop.md` e rode `/loop` sem nada.

## O que tem aqui

| Arquivo | Para quê |
|---|---|
| `tarefas.py`, `tests/` | a CLI de tarefas e os testes (`python -m unittest`) |
| `CLAUDE.md` | regras do projeto, inclusive o formato da revisão |
| `.gitignore` | ignora cache do Python, `tarefas.json` e os relatórios `revisao-*.md` |
| `gabarito/revisar.ps1` | script PowerShell que revisa com `claude -p` (JSON, limite de turnos, custo) |
| `gabarito/.github/workflows/claude-review.yml` | workflow de exemplo da action oficial |
| `gabarito/conferir_workflow.py` | confere o YAML no PC, sem internet e sem gastar uso |
| `gabarito/buscar_com_bug.py` | arquivo com problemas de propósito (aula 9.2) |
| `gabarito/buscar.py`, `gabarito/tests/test_buscar.py` | versão corrigida e testes |
| `gabarito/revisao-esperada.md` | o que uma boa revisão deve achar |
| `gabarito/.claude/loop.md` | prompt padrão de exemplo para `/loop` |
