# TaskFlow · etapa 10 (Módulo 10: Agent SDK)

O TaskFlow com testes (o mesmo da etapa 07), agora como base para você construir o **seu próprio
agente em Python** com o Claude Agent SDK. O `tarefas.py` continua só com biblioteca padrão; o
pacote `claude-agent-sdk` é usado apenas pelos scripts do agente.

> **Custo e autorização.** Rodar um agente do SDK chama a API da Anthropic com uma **chave de
> API**, cobrada por uso. Cada execução gasta. Os scripts do gabarito têm limites
> (`max_turns`, `max_budget_usd`), mas o valor mostrado é uma **estimativa**, não a fatura.
>
> Uso em projeto da empresa só com aval da segurança da informação e da área responsável.
> Chave da empresa não deve ser usada em estudo pessoal sem autorização.

## 1. Pré-requisitos
- Python **3.10+** (a doc do SDK pede 3.10 ou mais novo). Confira com `python --version`.
- Uma chave de API do Claude Console (https://platform.claude.com/), da **sua conta pessoal de
  estudo**. A doc avisa: o login do claude.ai **não** serve para produtos feitos com o SDK; use
  chave de API (ou Amazon Bedrock, Google Cloud, Microsoft Foundry, se a sua organização usa).
- Na máquina de trabalho, **confirme com a TI** antes de instalar pacotes com `pip`.

## 2. Copie a etapa para uma pasta de treino (fora do curso)
```powershell
Copy-Item -Recurse . "$HOME\treino-agente"
cd "$HOME\treino-agente"
Remove-Item -Recurse -Force .\gabarito
python -m unittest
```
(A pasta `gabarito` fica de fora para você escrever os scripts sozinho. Consulte-a no curso.)

## 3. Ambiente virtual e instalação
```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```
Chamamos o `python.exe` do ambiente virtual direto, sem ativar o ambiente, para evitar o bloqueio
de scripts do PowerShell. (A doc oficial mostra também o caminho com `.venv\Scripts\Activate.ps1`.)

O pacote já traz o Claude Code embutido na maioria das instalações. Se o `pip` instalar a versão
"source" (por exemplo, Windows em ARM64), instale o Claude Code normalmente: o SDK o encontra no
`PATH`.

## 4. A chave de API (só na sessão do terminal)
```powershell
$env:ANTHROPIC_API_KEY = "sua-chave-aqui"
```
- Troque `sua-chave-aqui` pela sua chave **só no terminal**. Ela vale até você fechar a janela.
- **Nunca** escreva a chave dentro de um `.py`, num README, num print ou num chat.
- O SDK **não** lê arquivos `.env` sozinho.
- Para apagar da sessão: `Remove-Item Env:ANTHROPIC_API_KEY`.

## 5. Rodar os scripts (um por aula)
Copie o script do gabarito para esta pasta (ao lado de `tarefas.py`) ou escreva o seu:

| Aula | Script | O que mostra |
|---|---|---|
| 10.1 | `agente_loop.py` | `query()`, mensagens, opções, limites e custo |
| 10.2 | `agente_ferramentas.py` | ferramentas próprias com `@tool` e `create_sdk_mcp_server` |
| 10.3 | `agente_permissoes.py` | `allowed_tools`, `can_use_tool` e hooks (precisa do 10.2) |
| 10.4 | `agente_taskflow.py` | conversa com `ClaudeSDKClient`, subagente e orçamento (precisa do 10.2 e 10.3) |

```powershell
.\.venv\Scripts\python.exe agente_loop.py
```

Os scripts do gabarito foram conferidos com `python -m py_compile` e seguem a API da documentação
oficial (consultada em 19/11/2026), mas **não foram executados** na produção do curso, para não
gastar chave. Se algo mudar no SDK, confira https://code.claude.com/docs/en/agent-sdk/python.

## 6. Testes do TaskFlow
```powershell
python -m unittest
```

Use **apenas dados fictícios** nas tarefas e nos pedidos ao agente.
