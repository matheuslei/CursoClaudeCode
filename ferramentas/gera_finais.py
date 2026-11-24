# -*- coding: utf-8 -*-
"""Gera modulos/NN/quiz-final.html (10 perguntas tiradas das aulas do módulo) e certificado.html."""
import json, sys, os
raiz, arq = sys.argv[1], sys.argv[2]
dados = json.load(open(arq, encoding="utf-8"))
ordem = sorted(dados, key=lambda k: dados[k]["n"])
N = 10

def escolhe(perguntas):
    por_aula = {}
    for q in perguntas:
        por_aula.setdefault(q["aula"], []).append(q)
    filas = list(por_aula.values())
    # começa pela pergunta do meio de cada aula, depois alterna: rodízio entre aulas
    for f in filas:
        f.sort(key=lambda q: abs(q["idx"] - 2))
    sel, k = [], 0
    while len(sel) < N and any(filas):
        f = filas[k % len(filas)]
        if f:
            sel.append(f.pop(0))
        k += 1
    return sel

def primeira(pasta):
    return sorted(f for f in os.listdir(os.path.join(raiz, "modulos", pasta)) if f[:2].isdigit())[0]

for i, mid in enumerate(ordem):
    m = dados[mid]
    sel = escolhe(m["perguntas"])
    qs = [{"p": q["p"], "op": q["op"], "c": q["c"], "ex": (q.get("ex", "") + ' <span class="t-dim">(aula: ' + q["aula"] + ")</span>")} for q in sel]
    prox = dados[ordem[i + 1]] if i + 1 < len(ordem) else None
    prox_html = (f'<a class="prox" href="../{prox["pasta"]}/{primeira(prox["pasta"])}"><small>Próximo módulo →</small>Módulo {prox["n"]}: {prox["titulo"]}</a>'
                 if prox else '<a class="prox" href="../../certificado.html"><small>Fim do curso →</small>Ver o certificado</a>')
    html = f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Quiz final · Módulo {m["n"]}</title>
<link rel="icon" type="image/svg+xml" href="../../assets/favicon.svg">
<link rel="stylesheet" href="../../assets/curso.css">
</head>
<body data-raiz="../../" data-aula="{mid}qf">
<main>
  <header class="cab-aula">
    <span class="selo">Módulo {m["n"]} · Quiz final</span><span class="selo cinza">{len(qs)} perguntas</span><span class="selo cinza">~10 min</span>
    <h1>Quiz final: {m["titulo"]}</h1>
    <p class="objetivo">Revise o módulo inteiro com {len(qs)} perguntas tiradas das aulas. A meta é acertar 7 ou mais de primeira; o seu melhor resultado fica salvo e aparece no índice e no certificado.</p>
  </header>
  <section class="bloco">
    <div id="quiz"></div>
    <p class="term-status">Errou alguma? A explicação diz de qual aula ela veio. Releia a aula e tente de novo: vale o melhor resultado.</p>
  </section>
  <nav class="nav-aulas" aria-label="Navegação">
    <a class="ant" href="slides.html"><small>← Revisão</small>Slides do Módulo {m["n"]}</a>
    {prox_html}
  </nav>
</main>
<script src="../../assets/curso.js"></script>
<script>
Curso.iniciarPagina("Módulo {m["n"]} · {m["titulo"]} › Quiz final");
Curso.quiz("quiz", {json.dumps(qs, ensure_ascii=False)});
</script>
</body>
</html>
'''
    open(os.path.join(raiz, "modulos", m["pasta"], "quiz-final.html"), "w", encoding="utf-8").write(html)
    print(mid, len(qs))
