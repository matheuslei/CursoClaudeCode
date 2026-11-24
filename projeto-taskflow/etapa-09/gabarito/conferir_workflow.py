"""Confere um workflow do Claude Code GitHub Action sem sair do PC (Módulo 9, aula 3).

Uso (na pasta de treino):
    python conferir_workflow.py .github/workflows/claude-review.yml

Só biblioteca padrão. Se o pacote PyYAML estiver instalado, ele também confere a sintaxe YAML;
sem ele, as conferências são feitas no texto. Não envia nada para a internet e não gasta uso.
"""
import re
import sys
from pathlib import Path

ERRO, AVISO, OK = "ERRO ", "AVISO", "OK   "


def conferir(texto):
    """Devolve uma lista de (nivel, mensagem) com o resultado de cada conferência."""
    res = []

    def checa(cond, nivel_falha, msg_ok, msg_falha):
        res.append((OK, msg_ok) if cond else (nivel_falha, msg_falha))

    checa("\t" not in texto, ERRO, "Sem tabulação (YAML só aceita espaços).",
          "Há tabulação no arquivo: YAML só aceita espaços para indentar.")
    checa(re.search(r"^on:", texto, re.M), ERRO, "Tem gatilho (on:).",
          "Falta o gatilho 'on:' (quando o workflow roda).")
    checa("anthropics/claude-code-action@v1" in texto, ERRO, "Usa anthropics/claude-code-action@v1.",
          "Não achei 'uses: anthropics/claude-code-action@v1'.")
    checa("@beta" not in texto and "direct_prompt" not in texto, ERRO,
          "Nada da versão beta (@beta, direct_prompt).",
          "Restos da versão beta: troque @beta por @v1 e direct_prompt por prompt.")
    usa_segredo = re.search(
        r"(anthropic_api_key|claude_code_oauth_token):\s*\$\{\{\s*secrets\.\w+\s*\}\}", texto)
    checa(usa_segredo, ERRO, "A credencial vem de ${{ secrets.... }}.",
          "A credencial precisa vir de um segredo: anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}.")
    chave_literal = re.search(r"sk-ant-[\w-]{6,}", texto) or re.search(
        r"(anthropic_api_key|claude_code_oauth_token):\s*[\"']?(?!\$\{\{)[\w-]{16,}", texto)
    checa(not chave_literal, ERRO, "Nenhuma chave escrita no arquivo.",
          "Parece haver uma chave escrita no arquivo! Apague, revogue a chave e use GitHub Secrets.")
    checa(re.search(r"^\s*permissions:", texto, re.M), AVISO, "Declara permissions.",
          "Declare 'permissions:' com o mínimo necessário.")
    checa("id-token: write" in texto, AVISO, "Tem id-token: write (autenticação do app).",
          "Sem 'id-token: write': a autenticação padrão da action pode falhar.")
    checa("--max-turns" in texto, AVISO, "Limita turnos com --max-turns (custo).",
          "Sem --max-turns em claude_args: nada limita quantos turnos cada execução gasta.")
    checa("timeout-minutes" in texto, AVISO, "Tem timeout-minutes (custo).",
          "Sem timeout-minutes: um job travado consome minutos até o limite do GitHub.")
    checa("concurrency:" in texto, AVISO, "Tem concurrency (evita execuções em paralelo).",
          "Sem concurrency: vários pushes seguidos podem disparar várias revisões pagas.")
    return res


def conferir_sintaxe(texto):
    """Usa o PyYAML, se existir, para confirmar que o arquivo é YAML válido."""
    try:
        import yaml
    except ImportError:
        return (AVISO, "PyYAML não instalado: sintaxe YAML não conferida (só o texto).")
    try:
        dados = yaml.safe_load(texto)
    except yaml.YAMLError as erro:
        return (ERRO, f"YAML inválido: {erro}")
    if not isinstance(dados, dict) or "jobs" not in dados:
        return (ERRO, "YAML lido, mas não achei a chave 'jobs'.")
    return (OK, "YAML válido (conferido com PyYAML).")


def main():
    """Lê o arquivo indicado, imprime o relatório e sai com código 1 se houver erro."""
    if len(sys.argv) != 2:
        print(__doc__)
        return 2
    caminho = Path(sys.argv[1])
    if not caminho.exists():
        print(f"Arquivo não encontrado: {caminho}")
        return 2
    texto = caminho.read_text(encoding="utf-8")
    resultado = [conferir_sintaxe(texto)] + conferir(texto)
    for nivel, msg in resultado:
        print(f"[{nivel}] {msg}")
    erros = sum(1 for nivel, _ in resultado if nivel == ERRO)
    avisos = sum(1 for nivel, _ in resultado if nivel == AVISO)
    print(f"\n{erros} erro(s), {avisos} aviso(s).")
    return 1 if erros else 0


if __name__ == "__main__":
    sys.exit(main())
