"""Gera uma fonte de texto por módulo para criar podcasts no NotebookLM.

Uso (na pasta curso-claude-code):
    python -X utf8 ferramentas/gera_fontes_podcast.py

Lê o CATALOGO de assets/curso.js, o texto das aulas (sem vídeo, simulação e
quiz, que são JavaScript) e as falas dos vídeos em audio/roteiros/.
Grava podcast/fontes/modulo-NN-nome.md. Só biblioteca padrão.
"""
import re
from html.parser import HTMLParser
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
SAIDA = RAIZ / "podcast" / "fontes"

# Blocos que não viram texto útil para áudio (são players em JavaScript).
PULAR = ("Vídeo da aula", "Demonstração", "Pratique", "Quiz")


def catalogo():
    js = (RAIZ / "assets" / "curso.js").read_text(encoding="utf-8")
    mods = []
    for m in re.finditer(r'\{ id: "(m\d+)", n: (\d+), pasta: "([^"]+)", titulo: "([^"]+)", nivel: "([^"]+)", desc: "([^"]+)".*?aulas: \[(.*?)\] \}', js, re.S):
        aulas = re.findall(r'id: "(m\d+a\d+)", arq: "([^"]+)", titulo: "([^"]+)"', m.group(7))
        mods.append({"id": m.group(1), "n": int(m.group(2)), "pasta": m.group(3), "titulo": m.group(4),
                     "nivel": m.group(5), "desc": m.group(6), "aulas": aulas})
    return mods


def falas():
    """{'m3a2': ['fala 1', ...]} a partir das tabelas dos roteiros."""
    out = {}
    for arq in sorted((RAIZ / "audio" / "roteiros").glob("*.md")):
        for lin in arq.read_text(encoding="utf-8").splitlines():
            m = re.match(r"\|\s*`(m\d+a\d+)-\d+\.mp3`\s*\|\s*(.+?)\s*\|\s*$", lin)
            if m:
                out.setdefault(m.group(1), []).append(m.group(2))
    return out


def falas_da_pagina(caminho):
    """Falas do Curso.video da própria aula, quando o roteiro não tem a aula."""
    js = caminho.read_text(encoding="utf-8")
    return [re.sub(r"\\(.)", r"\1", f) for f in re.findall(r'fala:\s*"((?:[^"\\]|\\.)*)"', js)]


class Texto(HTMLParser):
    """Converte o <main> da aula em Markdown simples, bloco a bloco."""
    BLOCO = {"p", "li", "h1", "h2", "h3", "h4", "tr", "pre", "summary", "div"}

    def __init__(self):
        super().__init__()
        self.linhas, self.buf, self.em_main, self.pula = [], [], False, 0
        self.pular_secao = False
        self.tag_titulo = None

    def flush(self, prefixo=""):
        t = re.sub(r"\s+", " ", "".join(self.buf)).strip()
        t = re.sub(r" ([.,;:!?)])(?=\s|$)", r"\1", t)  # "texto ." -> "texto." sem mexer em "cd .."
        self.buf = []
        if t and not self.pular_secao:
            self.linhas.append(prefixo + t)

    def handle_starttag(self, tag, attrs):
        if tag == "main":
            self.em_main = True
        if tag in ("script", "style", "svg", "button"):
            self.pula += 1
        if not self.em_main or self.pula:
            return
        if tag in self.BLOCO:
            self.flush()
        if tag in ("h1", "h2", "h3", "h4"):
            self.tag_titulo = tag
        if tag == "li":
            self.buf.append("- ")
        if tag in ("td", "th"):
            self.buf.append(" | ")
        if tag == "br":
            self.buf.append(" ")

    def handle_endtag(self, tag):
        if tag in ("strong", "span", "b") and self.em_main and not self.pula:
            self.buf.append(" ")
        if tag in ("script", "style", "svg", "button"):
            self.pula = max(0, self.pula - 1)
            return
        if not self.em_main or self.pula:
            return
        if tag in ("h1", "h2", "h3", "h4") and self.tag_titulo == tag:
            t = re.sub(r"\s+", " ", "".join(self.buf)).strip()
            t = re.sub(r"^\d+\s*", "", t)  # tira o número do bloco
            self.buf = []
            if tag == "h2":
                self.pular_secao = any(p in t for p in PULAR)
            if t and not self.pular_secao and tag != "h1":
                self.linhas.append(("#### " if tag == "h2" else "##### ") + t)
            self.tag_titulo = None
        elif tag in self.BLOCO:
            self.flush()
        if tag == "main":
            self.flush()
            self.em_main = False

    def handle_data(self, data):
        if self.em_main and not self.pula:
            self.buf.append(data)


def texto_aula(caminho):
    p = Texto()
    p.feed(caminho.read_text(encoding="utf-8"))
    linhas, ant = [], None
    for l in p.linhas:
        if l != ant and not l.startswith("Conferido") and not re.match(r"Módulo \d+ · Aula", l) and "Marcar como concluída" not in l:
            linhas.append(l)
        ant = l
    return "\n\n".join(linhas)


def main():
    SAIDA.mkdir(parents=True, exist_ok=True)
    fl = falas()
    for m in catalogo():
        partes = [f"# Módulo {m['n']}: {m['titulo']}",
                  f"Curso \"Claude Code: do zero ao avançado\" (estudo pessoal, em português do Brasil). "
                  f"Nível: {m['nivel']}. Tema: {m['desc']}.",
                  "Projeto de treino usado em todo o curso: TaskFlow, um gerenciador de tarefas de linha de comando "
                  "em Python, só com a biblioteca padrão. Dados de exemplo são fictícios.",
                  "Aulas: " + "; ".join(f"{m['n']}.{i} {t}" for i, (_, _, t) in enumerate(m["aulas"], 1)) + "."]
        for i, (aid, arq, titulo) in enumerate(m["aulas"], 1):
            partes.append(f"## Aula {m['n']}.{i}: {titulo}")
            caminho = RAIZ / "modulos" / m["pasta"] / arq
            video = fl.get(aid) or falas_da_pagina(caminho)
            if video:
                partes.append("### Resumo do vídeo da aula\n\n" + " ".join(video))
            partes.append("### Conteúdo da aula\n\n" + texto_aula(caminho))
        nome = f"modulo-{m['n']:02d}-{m['pasta'].split('-', 1)[1]}.md"
        (SAIDA / nome).write_text("\n\n".join(partes) + "\n", encoding="utf-8")
        print(f"{nome}: {sum(len(x) for x in partes) // 1000} mil caracteres")


if __name__ == "__main__":
    main()
