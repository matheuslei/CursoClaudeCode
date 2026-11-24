# TaskFlow · etapa 06 (Módulo 6: MCP)

O TaskFlow do Módulo 1 (`tarefas.py`) mais um **servidor MCP** (`servidor_mcp.py`) que deixa o Claude listar e adicionar tarefas por ferramentas próprias.

## Pré-requisitos
- Python **3.11+** (o SDK MCP v2 exige). Confira com `python --version`.
- Na máquina de trabalho, **confirme com a TI** antes de instalar pacotes com `pip`.

## Instalação (PowerShell, na pasta do projeto)
```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```
(Chamamos o `python.exe` do ambiente virtual direto, sem ativar o ambiente. Assim evitamos o bloqueio de scripts do PowerShell, comum em máquinas corporativas.)

## Conectar ao Claude Code
Na pasta do projeto, registre o servidor apontando para o Python do ambiente virtual com caminhos completos:
```powershell
claude mcp add taskflow -- "$PWD\.venv\Scripts\python.exe" "$PWD\servidor_mcp.py"
claude mcp list
```
O PowerShell troca `$PWD` pela pasta atual antes de rodar o comando. Tudo depois do `--` é o comando que o Claude Code executa para iniciar o servidor.

Depois, dentro do `claude`:
```
/mcp
liste minhas tarefas usando o servidor taskflow
```

## Testar sem o Claude (opcional)
O inspetor oficial do SDK abre uma interface para chamar as ferramentas:
```powershell
.\.venv\Scripts\mcp.exe dev servidor_mcp.py
```
(o inspetor pode exigir Node.js)

## Remover
```powershell
claude mcp remove taskflow
```

Use **apenas dados fictícios**.
