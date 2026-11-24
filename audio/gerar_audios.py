"""Gera os MP3 de narração dos vídeos a partir do ROTEIRO-NARRACAO.md, com as vozes neurais
da Microsoft (pacote edge-tts; o texto das falas é enviado ao serviço de voz da Microsoft).

Uso (na pasta audio/):
    python -m pip install --user edge-tts
    python gerar_audios.py                          # gera só os arquivos que ainda não existem
    python gerar_audios.py --voz pt-BR-AntonioNeural --refazer
    python gerar_audios.py --so m2a1                # só uma aula
Vozes pt-BR: pt-BR-FranciscaNeural, pt-BR-AntonioNeural, pt-BR-ThalitaMultilingualNeural
"""
import argparse
import asyncio
import re
from pathlib import Path

import edge_tts

PASTA = Path(__file__).parent
LINHA = re.compile(r"^\|\s*`([\w-]+\.mp3)`\s*\|\s*(.+?)\s*\|\s*$")


def ler_roteiro():
    """Lê ROTEIRO-NARRACAO.md e também roteiros/*.md (um por módulo), no mesmo formato de tabela."""
    itens = []
    arquivos = [PASTA / "ROTEIRO-NARRACAO.md"] + sorted((PASTA / "roteiros").glob("*.md"))
    for arq in arquivos:
        if not arq.exists():
            continue
        for linha in arq.read_text(encoding="utf-8").splitlines():
            m = LINHA.match(linha)
            if m:
                itens.append((m.group(1), m.group(2)))
    return itens


async def gerar(arquivo, texto, voz, taxa):
    await edge_tts.Communicate(texto, voz, rate=taxa).save(str(PASTA / arquivo))


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--voz", default="pt-BR-FranciscaNeural")
    ap.add_argument("--taxa", default="+0%", help="velocidade da gravação, ex.: +10%%")
    ap.add_argument("--refazer", action="store_true", help="regrava arquivos que já existem")
    ap.add_argument("--so", default="", help="prefixo da aula, ex.: m0a3")
    a = ap.parse_args()
    for arquivo, texto in ler_roteiro():
        if a.so and not arquivo.startswith(a.so):
            continue
        if (PASTA / arquivo).exists() and not a.refazer:
            print("já existe", arquivo)
            continue
        await gerar(arquivo, texto, a.voz, a.taxa)
        print("ok", arquivo)


if __name__ == "__main__":
    asyncio.run(main())
