<#
.SYNOPSIS
  Revisa o TaskFlow com o Claude Code em modo não interativo (claude -p).

.DESCRIPTION
  1. Roda os testes localmente (python -m unittest). Isso não gasta uso do Claude.
  2. Junta o resultado dos testes e o código a revisar (git diff HEAD ou um arquivo inteiro).
  3. Envia tudo pelo pipe para claude -p, com saída em JSON e limite de turnos.
  4. Salva o relatório em revisao-AAAA-MM-DD-HHmm.md e mostra o custo estimado.

  AVISO DE CUSTO: cada execução consome o uso do seu plano (ou créditos da API).
  Não coloque este script em laço sem limite.
  AVISO DE DADOS: use só em código de treino com dados fictícios. Código ou dados da
  empresa, só com aval da área de segurança da informação.

.EXAMPLE
  .\revisar.ps1
  .\revisar.ps1 -Arquivo tarefas.py
  .\revisar.ps1 -Arquivo buscar.py -MaxTurnos 2
#>
param(
    [string]$Arquivo = "",
    [int]$MaxTurnos = 3
)

# Acentos corretos na ida (pipe) e na volta (saída do claude).
$utf8 = New-Object System.Text.UTF8Encoding $false
[Console]::OutputEncoding = $utf8
$OutputEncoding = $utf8

if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
    Write-Host "Não achei o comando claude. Instale o Claude Code (Módulo 1) e abra um novo terminal."
    exit 1
}

# 1. Testes locais
$testes = (python -m unittest 2>&1 | Out-String)
$statusTestes = if ($LASTEXITCODE -eq 0) { "PASSARAM" } else { "FALHARAM" }
Write-Host "Testes locais: $statusTestes"

# 2. O que revisar
if ($Arquivo) {
    if (-not (Test-Path $Arquivo)) {
        Write-Host "Arquivo não encontrado: $Arquivo"
        exit 1
    }
    $codigo = Get-Content $Arquivo -Raw -Encoding UTF8
    $origem = "arquivo $Arquivo"
} else {
    $codigo = (git diff HEAD 2>$null | Out-String)
    $origem = "git diff HEAD"
    if (-not $codigo.Trim()) {
        Write-Host "Nada mudou desde o último commit. Use -Arquivo tarefas.py para revisar um arquivo inteiro."
        exit 0
    }
}

$contexto = @"
Resultado de python -m unittest: $statusTestes
$testes

Código a revisar ($origem):
$codigo
"@

$pedido = "Você é o revisor do TaskFlow. Revise o código recebido pela entrada padrão seguindo o CLAUDE.md. " +
          "Não edite arquivos. Responda em português, em Markdown, com: Testes, Achados " +
          "(Grave / Ajustar / Sugestão) e Veredito (pode juntar / ajustar antes)."

# 3. Chamada não interativa: JSON + limite de turnos + só ferramentas de leitura
Write-Host "Enviando para o Claude (máximo de $MaxTurnos turnos). Isto consome uso do seu plano..."
$bruto = $contexto | claude -p $pedido --output-format json --max-turns $MaxTurnos --allowedTools "Read,Grep,Glob"
$codigoSaida = $LASTEXITCODE
$texto = ($bruto | Out-String)
if ($codigoSaida -ne 0) {
    Write-Host "O claude -p terminou com erro (código $codigoSaida):"
    Write-Host $texto
    exit $codigoSaida
}

# 4. Lê o JSON e salva o relatório
$r = $texto | ConvertFrom-Json
$relatorio = "revisao-$(Get-Date -Format 'yyyy-MM-dd-HHmm').md"
Set-Content -Path $relatorio -Value $r.result -Encoding UTF8
Write-Host ""
Write-Host $r.result
Write-Host ""
Write-Host "Relatório salvo em $relatorio"
Write-Host ("Custo estimado: US$ {0:N4} (estimativa local; no plano por assinatura, o uso conta no limite do plano)" -f [double]$r.total_cost_usd)
Write-Host "Sessão: $($r.session_id)"
