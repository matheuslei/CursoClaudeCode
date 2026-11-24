/* Curso Claude Code — componentes interativos (JS puro, funciona offline via file://) */
(function () {
  "use strict";

  // ---------- Catálogo do curso ----------
  var CATALOGO = [
    { id: "m0", n: 0, pasta: "00-base", titulo: "Base", nivel: "Zero", desc: "Terminal, Git e o que é um agente de IA", pronto: true, slides: true, podcast: { arq: "ep01-base.m4a", min: 18 }, aulas: [
      { id: "m0a1", arq: "01-terminal.html", titulo: "Terminal em 20 minutos", min: 20 },
      { id: "m0a2", arq: "02-git.html", titulo: "Git essencial: sua rede de segurança", min: 25 },
      { id: "m0a3", arq: "03-agentes.html", titulo: "O que é um agente de IA (e o Claude Code)", min: 15 } ] },
    { id: "m1", n: 1, pasta: "01-primeiros-passos", titulo: "Primeiros passos", nivel: "Iniciante", desc: "Instalar, primeira sessão, comandos e atalhos", pronto: true, slides: true, podcast: { arq: "ep02-primeiros-passos.m4a", min: 11 }, aulas: [
      { id: "m1a1", arq: "01-instalacao.html", titulo: "Instalação no Windows", min: 15 },
      { id: "m1a2", arq: "02-primeira-sessao.html", titulo: "Primeira sessão com o TaskFlow", min: 25 },
      { id: "m1a3", arq: "03-comandos.html", titulo: "Comandos com barra (/)", min: 20 },
      { id: "m1a4", arq: "04-atalhos.html", titulo: "Atalhos, ! shell, @ menções e bons prompts", min: 20 } ] },
    { id: "m2", n: 2, pasta: "02-contexto", titulo: "Contexto é tudo", nivel: "Iniciante", desc: "Janela de contexto, CLAUDE.md, memória e custo", pronto: true, slides: true, podcast: { arq: "ep03-contexto.m4a", min: 17 }, aulas: [
      { id: "m2a1", arq: "01-janela-contexto.html", titulo: "A janela de contexto", min: 15 },
      { id: "m2a2", arq: "02-claude-md.html", titulo: "/init e o CLAUDE.md", min: 25 },
      { id: "m2a3", arq: "03-memoria.html", titulo: "Memória automática e /memory", min: 15 },
      { id: "m2a4", arq: "04-clear-compact-rewind.html", titulo: "/clear, /compact e /rewind", min: 20 },
      { id: "m2a5", arq: "05-custo.html", titulo: "Custo, modelos e /usage", min: 15 } ] },
    { id: "m3", n: 3, pasta: "03-fluxo", titulo: "Fluxo profissional", nivel: "Intermediário", desc: "Plan mode, Spec-Driven Development, TDD", pronto: true, slides: true, aulas: [
      { id: "m3a1", arq: "01-explorar-planejar.html", titulo: "Explorar → Planejar → Codar → Commitar", min: 20 },
      { id: "m3a2", arq: "02-plan-mode.html", titulo: "Plan mode", min: 20 },
      { id: "m3a3", arq: "03-sdd.html", titulo: "Spec-Driven Development", min: 30 },
      { id: "m3a4", arq: "04-tdd.html", titulo: "TDD com o Claude", min: 25 },
      { id: "m3a5", arq: "05-verificacao.html", titulo: "Verificação e revisão", min: 20 } ] },
    { id: "m4", n: 4, pasta: "04-permissoes", titulo: "Permissões e segurança", nivel: "Intermediário", desc: "Modos, auto mode, regras e sandbox", pronto: true, slides: true, aulas: [
      { id: "m4a1", arq: "01-modos.html", titulo: "Modos de permissão", min: 20 },
      { id: "m4a2", arq: "02-auto-mode.html", titulo: "Auto mode", min: 15 },
      { id: "m4a3", arq: "03-regras.html", titulo: "Regras allow, ask e deny", min: 25 },
      { id: "m4a4", arq: "04-sandbox.html", titulo: "Sandbox", min: 15 },
      { id: "m4a5", arq: "05-segredos.html", titulo: "Segredos e dados pessoais", min: 20 } ] },
    { id: "m5", n: 5, pasta: "05-personalizacao", titulo: "Personalização", nivel: "Intermediário", desc: "settings, skills, output styles, hooks", pronto: true, slides: true, aulas: [
      { id: "m5a1", arq: "01-settings.html", titulo: "settings.json e precedência", min: 20 },
      { id: "m5a2", arq: "02-skills.html", titulo: "Skills", min: 30 },
      { id: "m5a3", arq: "03-output-styles.html", titulo: "Output styles e status line", min: 15 },
      { id: "m5a4", arq: "04-hooks.html", titulo: "Hooks", min: 30 } ] },
    { id: "m6", n: 6, pasta: "06-mcp", titulo: "MCP e integrações", nivel: "Intermediário", desc: "Servidores MCP, VS Code e Desktop", pronto: true, slides: true, aulas: [
      { id: "m6a1", arq: "01-o-que-e-mcp.html", titulo: "O que é MCP", min: 15 },
      { id: "m6a2", arq: "02-instalar-mcp.html", titulo: "Instalar e autenticar um servidor", min: 20 },
      { id: "m6a3", arq: "03-criar-mcp.html", titulo: "Criar um MCP em Python", min: 35 },
      { id: "m6a4", arq: "04-vscode-desktop.html", titulo: "VS Code e app Desktop", min: 20 } ] },
    // Aula sem "arq" aparece como "em breve" mesmo com o módulo pronto (entrega por partes).
    { id: "m7", n: 7, pasta: "07-subagentes", titulo: "Subagentes e paralelismo", nivel: "Avançado", desc: "Subagentes, segundo plano, worktrees, agent view, /goal e equipes", pronto: true, slides: true, aulas: [
      { id: "m7a1", arq: "01-subagentes.html", titulo: "Subagentes customizados", min: 30 },
      { id: "m7a2", arq: "02-background-fork.html", titulo: "Segundo plano e fork", min: 20 },
      { id: "m7a3", arq: "03-worktrees.html", titulo: "Worktrees", min: 30 },
      { id: "m7a4", arq: "04-agent-view-goal.html", titulo: "Agent view e /goal", min: 25 },
      { id: "m7a5", arq: "05-orquestracao.html", titulo: "Orquestração em escala", min: 25 } ] },
    { id: "m8", n: 8, pasta: "08-plugins", titulo: "Plugins", nivel: "Avançado", desc: "Instalar, criar, avaliar e compartilhar plugins", pronto: true, slides: true, aulas: [
      { id: "m8a1", arq: "01-o-que-e-plugin.html", titulo: "O que é um plugin, instalar e gerenciar", min: 25 },
      { id: "m8a2", arq: "02-criar-plugin.html", titulo: "Criar o plugin do TaskFlow", min: 35 },
      { id: "m8a3", arq: "03-plugin-eval.html", titulo: "Medir com claude plugin eval", min: 25 },
      { id: "m8a4", arq: "04-marketplace.html", titulo: "Marketplace local", min: 20 } ] },
    { id: "m9", n: 9, pasta: "09-automacao", titulo: "Automação", nivel: "Avançado", desc: "claude -p em scripts, /code-review, GitHub Actions e agendamentos", pronto: true, slides: true, aulas: [
      { id: "m9a1", arq: "01-claude-p.html", titulo: "Modo não interativo (claude -p)", min: 30 },
      { id: "m9a2", arq: "02-code-review.html", titulo: "Revisão de código com o Claude", min: 25 },
      { id: "m9a3", arq: "03-github-actions.html", titulo: "Claude Code no GitHub Actions", min: 30 },
      { id: "m9a4", arq: "04-agendamentos.html", titulo: "Tarefas agendadas e loops", min: 25 } ] },
    { id: "m10", n: 10, pasta: "10-agent-sdk", titulo: "Agent SDK", nivel: "Expert", desc: "Construa seu próprio agente em Python: loop, ferramentas, permissões, hooks e custo", pronto: true, slides: true, aulas: [
      { id: "m10a1", arq: "01-loop-agente.html", titulo: "O loop do agente", min: 30 },
      { id: "m10a2", arq: "02-ferramentas-proprias.html", titulo: "Ferramentas próprias", min: 30 },
      { id: "m10a3", arq: "03-permissoes-hooks.html", titulo: "Permissões e hooks no SDK", min: 30 },
      { id: "m10a4", arq: "04-agente-taskflow.html", titulo: "Subagentes, custo e o agente TaskFlow", min: 25 } ] }
  ];

  // ---------- Estado (localStorage com fallback) ----------
  var CHAVE = "curso-claude-code-v1";
  var memoria = null;
  function ler() {
    if (memoria) return memoria;
    try { memoria = JSON.parse(localStorage.getItem(CHAVE)) || {}; } catch (e) { memoria = {}; }
    memoria.aulas = memoria.aulas || {};
    return memoria;
  }
  function salvar() { try { localStorage.setItem(CHAVE, JSON.stringify(memoria)); } catch (e) {} }
  function aulaEstado(id) { var s = ler(); s.aulas[id] = s.aulas[id] || {}; return s.aulas[id]; }

  // ---------- Utilidades ----------
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) { if (k === "class") e.className = attrs[k]; else e.setAttribute(k, attrs[k]); }
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function raiz() { return document.body.getAttribute("data-raiz") || ""; }
  function todasAulas() {
    var r = [];
    CATALOGO.forEach(function (m) { if (m.pronto) m.aulas.forEach(function (a) { if (a.arq) r.push({ m: m, a: a }); }); });
    return r;
  }
  function totalPlanejado() { var t = 0; CATALOGO.forEach(function (m) { t += m.aulas.length; }); return t; }
  function concluidas() { var s = ler(), n = 0; for (var k in s.aulas) if (s.aulas[k].ok) n++; return n; }
  function copiarTexto(txt, btn) {
    function feito() { if (btn) { var o = btn.textContent; btn.textContent = "Copiado"; setTimeout(function () { btn.textContent = o; }, 1300); } }
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(txt).then(feito, fallback); } else fallback();
    function fallback() { var t = el("textarea"); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch (e) {} t.remove(); feito(); }
  }

  // ---------- Tema ----------
  function aplicarTema() { var t = ler().tema; if (t) document.documentElement.setAttribute("data-tema", t); }
  function alternarTema() {
    var atual = document.documentElement.getAttribute("data-tema");
    var escuroSistema = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
    var ehEscuro = atual ? atual === "escuro" : escuroSistema;
    var novo = ehEscuro ? "claro" : "escuro";
    document.documentElement.setAttribute("data-tema", novo);
    ler().tema = novo; salvar();
  }
  aplicarTema();

  // ---------- Topo ----------
  function montarTopo(migalha) {
    var topo = el("header", { class: "topo" });
    var inn = el("div", { class: "topo-in" });
    var btInd = el("button", { class: "bt-indice", type: "button", title: "Mostrar ou esconder o índice do curso", "aria-label": "Índice do curso", "aria-controls": "indice" }, "☰");
    inn.appendChild(btInd);
    inn.appendChild(el("a", { class: "marca", href: raiz() + "index.html" }, '<span class="logo">&gt;_</span><span>Curso Claude Code</span>'));
    inn.appendChild(el("div", { class: "migalha" }, migalha || ""));
    var bt = el("button", { title: "Alternar tema claro/escuro", "aria-label": "Alternar tema" }, "◐ Tema");
    bt.onclick = alternarTema;
    inn.appendChild(bt);
    topo.appendChild(inn);
    var barra = el("div", { class: "barra-prog" }, '<div></div>');
    topo.appendChild(barra);
    document.body.insertBefore(topo, document.body.firstChild);
    var pct = Math.round(concluidas() / totalPlanejado() * 100);
    barra.firstChild.style.width = pct + "%";
    barra.title = "Progresso geral: " + pct + "%";
    montarIndice(btInd);
    montarRodape();
  }

  // ---------- Rodapé (autor) ----------
  function montarRodape() {
    if (document.querySelector(".rodape")) return;
    var r = el("footer", { class: "rodape" },
      '<span>Quem fez este curso:</span>' +
      '<a href="https://github.com/matheuslei" target="_blank" rel="noopener noreferrer">GitHub</a>' +
      '<a href="https://www.linkedin.com/in/matheusleidev/" target="_blank" rel="noopener noreferrer">LinkedIn</a>');
    document.body.appendChild(r);
  }

  // ---------- Índice lateral (todas as páginas com topo) ----------
  // Desktop largo: fixo à esquerda (pode esconder). Telas menores: gaveta aberta pelo botão ☰.
  function montarIndice(botao) {
    var atualId = document.body.getAttribute("data-aula");
    var pagina = location.pathname.replace(/\\/g, "/");
    var aside = el("aside", { class: "indice", id: "indice", "aria-label": "Índice do curso" });
    var html = '<div class="ind-topo"><input type="search" class="ind-busca" placeholder="Buscar aula…" aria-label="Buscar aula no índice"></div><nav class="ind-lista">';
    html += '<a class="ind-fixo" href="' + raiz() + 'index.html">🏠 Início e trilha</a>';
    html += '<a class="ind-fixo" href="' + raiz() + 'referencia/cola-comandos.html">⌨ Cola de comandos</a>';
    html += '<a class="ind-fixo" href="' + raiz() + 'referencia/glossario.html">📖 Glossário</a>';
    html += '<a class="ind-fixo" href="' + raiz() + 'podcasts.html">🎧 Podcasts</a>';
    html += '<a class="ind-fixo" href="' + raiz() + 'certificado.html">🎓 Certificado</a>';
    CATALOGO.forEach(function (m) {
      var feitas = 0, total = m.aulas.length, temAtual = false;
      var itens = m.aulas.map(function (a) {
        var st = (a.id && ler().aulas[a.id]) || {};
        if (st.ok) feitas++;
        var disp = m.pronto && a.arq;
        var atual = a.id && a.id === atualId; if (atual) temAtual = true;
        var ic = st.ok ? '<span class="ind-st ok" title="Concluída">✓</span>' : st.visto ? '<span class="ind-st visto" title="Iniciada">◐</span>' : '<span class="ind-st" title="Não iniciada">○</span>';
        var tit = esc(a.titulo) + (a.min ? ' <small>' + a.min + ' min</small>' : "");
        return disp
          ? '<a class="ind-aula' + (atual ? " atual" : "") + '" href="' + raiz() + "modulos/" + m.pasta + "/" + a.arq + '"' + (atual ? ' aria-current="page"' : "") + ">" + ic + "<span>" + tit + "</span></a>"
          : '<span class="ind-aula breve">' + ic + "<span>" + tit + " <small>(em breve)</small></span></span>";
      }).join("");
      if (m.slides && m.pronto) {
        var hrefS = raiz() + "modulos/" + m.pasta + "/slides.html";
        itens += '<a class="ind-aula ind-slides" href="' + hrefS + '"><span class="ind-st">▤</span><span>Slides de revisão</span></a>';
      }
      if (m.pronto) {
        var qf = ler().aulas[m.id + "qf"] || {}, qok = qf.quizTotal && qf.quiz >= Math.ceil(qf.quizTotal * 0.7);
        var atualQ = atualId === m.id + "qf"; if (atualQ) temAtual = true;
        itens += '<a class="ind-aula ind-slides' + (atualQ ? " atual" : "") + '" href="' + raiz() + "modulos/" + m.pasta + '/quiz-final.html"><span class="ind-st' + (qok ? " ok" : "") + '">' + (qok ? "✓" : "?") + "</span><span>Quiz final" + (qf.quizTotal ? " <small>" + qf.quiz + "/" + qf.quizTotal + "</small>" : "") + "</span></a>";
      }
      var aberto = temAtual || (!atualId && pagina.indexOf("/modulos/" + m.pasta + "/") >= 0);
      html += '<details class="ind-mod"' + (aberto ? " open" : "") + '><summary><span class="ind-n">' + m.n + '</span><span class="ind-mt">' + esc(m.titulo) + '</span><span class="ind-cont' + (feitas === total && total ? " tudo" : "") + '">' + feitas + "/" + total + "</span></summary>" + itens + "</details>";
    });
    html += "</nav>";
    aside.innerHTML = html;
    var fundo = el("div", { class: "ind-fundo", "aria-hidden": "true" });
    document.body.appendChild(fundo); document.body.appendChild(aside);
    var hTopo = ($(".topo") || {}).offsetHeight || 58; aside.style.top = hTopo + "px"; fundo.style.top = hTopo + "px";

    var largo = window.matchMedia("(min-width: 1200px)");
    function estado() { return largo.matches ? ler().indice !== false : document.body.classList.contains("ind-gaveta"); }
    function aplica() {
      var fixo = largo.matches && ler().indice !== false;
      document.body.classList.toggle("com-indice", fixo);
      if (largo.matches) document.body.classList.remove("ind-gaveta");
      botao.setAttribute("aria-expanded", String(fixo || document.body.classList.contains("ind-gaveta")));
    }
    botao.onclick = function () {
      if (largo.matches) { ler().indice = !(ler().indice !== false); salvar(); }
      else document.body.classList.toggle("ind-gaveta");
      aplica();
      if (estado()) { var b = aside.querySelector(".ind-busca"); if (b && !largo.matches) b.focus(); }
    };
    fundo.onclick = function () { document.body.classList.remove("ind-gaveta"); aplica(); };
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && document.body.classList.contains("ind-gaveta")) { document.body.classList.remove("ind-gaveta"); aplica(); botao.focus(); } });
    if (largo.addEventListener) largo.addEventListener("change", aplica);
    aplica();
    setTimeout(function () { document.body.classList.add("ind-anim"); }, 60); // sem animação na carga da página

    // busca no índice
    var busca = aside.querySelector(".ind-busca");
    busca.oninput = function () {
      var q = busca.value.trim().toLowerCase();
      aside.querySelectorAll(".ind-mod").forEach(function (d) {
        var algum = false;
        d.querySelectorAll(".ind-aula").forEach(function (a) {
          var bate = !q || a.textContent.toLowerCase().indexOf(q) >= 0 || d.querySelector(".ind-mt").textContent.toLowerCase().indexOf(q) >= 0;
          a.style.display = bate ? "" : "none"; if (bate) algum = true;
        });
        d.style.display = algum ? "" : "none";
        if (q) d.open = algum;
      });
    };
    var cur = aside.querySelector(".atual");
    var listaEl = aside.querySelector(".ind-lista");
    aside.querySelectorAll(".ind-fixo").forEach(function (a) { if (a.pathname === location.pathname || (/index\.html$/.test(a.pathname) && /\/$/.test(location.pathname) && a.pathname.replace("index.html", "") === location.pathname)) { a.classList.add("atual"); a.setAttribute("aria-current", "page"); } });
    if (cur) listaEl.scrollTop = Math.max(0, cur.offsetTop - listaEl.clientHeight / 2);
  }

  // ---------- Blocos de código copiáveis ----------
  function prepararCodigos() {
    document.querySelectorAll(".cod").forEach(function (c) {
      if (c.querySelector(".copiar")) return;
      var txt = c.getAttribute("data-copiar") || (c.querySelector("code") ? c.querySelector("code").textContent : c.textContent);
      var b = el("button", { class: "copiar", type: "button" }, "Copiar");
      b.onclick = function () { copiarTexto(txt.trim(), b); };
      c.appendChild(b);
    });
  }

  // ---------- Podcasts (áudio gerado no NotebookLM, em podcast/audio/) ----------
  // Para ligar um episódio: copie o arquivo para podcast/audio/ e preencha `podcast` no módulo do CATALOGO.
  // Os players ficam só em podcasts.html; a trilha e a 1ª aula de cada módulo mostram um link discreto.
  function podcastLink(m) {
    var url = raiz() + "podcasts.html#ep" + (m.n + 1), st = ler().aulas["pod-" + m.id] || {};
    if (!m.podcast) return el("p", { class: "pod-breve" }, "🎧 Podcast do Módulo " + m.n + ': em produção · <a href="' + url + '">ver os podcasts</a>');
    return el("p", { class: "pod-breve" }, "🎧 Sem tempo? Este módulo tem podcast (~" + m.podcast.min + " min)" + (st.ouvido ? " ✓ ouvido" : "") + ' · <a href="' + url + '">ouvir o episódio ' + (m.n + 1) + "</a>");
  }

  function iniciarPodcasts() {
    montarTopo("Podcasts do curso");
    var lista = $("#episodios"), auds = [], total = CATALOGO.length, prontos = 0, ouvidos = 0;
    CATALOGO.forEach(function (m, k) {
      var ep = m.n + 1, st = aulaEstado("pod-" + m.id), p = m.podcast;
      var sec = el("section", { class: "bloco episodio" + (p ? "" : " em-producao"), id: "ep" + ep });
      var cab = '<div class="ep-cab"><div class="mod-num">' + ep + "</div><div><h3>Episódio " + ep + " · " + esc(m.titulo) +
        ' <span class="selo cinza">' + m.nivel + '</span></h3><p class="t-dim">Módulo ' + m.n + " · " + esc(m.desc) + "</p></div>" +
        '<div class="ep-st">' + (p ? (st.ouvido ? "✓ ouvido" : "~" + p.min + " min") : "em produção") + "</div></div>";
      sec.appendChild(el("div", null, cab));
      var aulas = raiz() + "modulos/" + m.pasta + "/" + m.aulas[0].arq;
      if (p) {
        prontos++; if (st.ouvido) ouvidos++;
        var au = el("audio", { controls: "", preload: "metadata", src: raiz() + "podcast/audio/" + p.arq }), ult = 0;
        au.style.width = "100%";
        var aviso = el("p", { class: "pod-nota" }, (st.pos ? "Continua de onde você parou. " : "") + '<a href="' + aulas + '">Ir para as aulas do módulo →</a>');
        au.addEventListener("loadedmetadata", function () { if (st.pos && st.pos < au.duration - 5) au.currentTime = st.pos; });
        au.addEventListener("play", function () { auds.forEach(function (x) { if (x !== au) x.pause(); }); });
        au.addEventListener("timeupdate", function () { if (Math.abs(au.currentTime - ult) > 5) { ult = au.currentTime; st.pos = Math.floor(au.currentTime); salvar(); } });
        au.addEventListener("ended", function () {
          st.pos = 0; st.ouvido = true; salvar();
          sec.querySelector(".ep-st").textContent = "✓ ouvido";
          var prox = CATALOGO.slice(k + 1).filter(function (x) { return x.podcast; })[0];
          if (prox && !sec.querySelector("button")) {
            var b = el("button", { class: "primario", type: "button" }, "▶ Próximo: episódio " + (prox.n + 1));
            b.onclick = function () { var a2 = $("#ep" + (prox.n + 1) + " audio"); a2.scrollIntoView({ behavior: "smooth", block: "center" }); a2.play(); b.remove(); };
            sec.appendChild(b);
          }
        });
        au.addEventListener("error", function () { aviso.textContent = "Não achei o arquivo podcast/audio/" + p.arq + ". Confira se ele está na pasta do curso."; });
        auds.push(au); sec.appendChild(au); sec.appendChild(aviso);
      } else {
        sec.appendChild(el("p", { class: "pod-nota" }, 'Este episódio ainda não ficou pronto. Enquanto isso, estude pelas <a href="' + aulas + '">aulas do módulo</a>.'));
      }
      lista.appendChild(sec);
    });
    $("#pod-stats").innerHTML = '<div class="stat"><b>' + prontos + "/" + total + '</b><span>episódios prontos</span></div><div class="stat"><b>' + ouvidos + "/" + prontos + "</b><span>ouvidos até o fim</span></div>";
  }

  // ---------- Página de aula ----------
  function iniciarAula() {
    var id = document.body.getAttribute("data-aula");
    var lista = todasAulas(), idx = -1;
    lista.forEach(function (x, i) { if (x.a.id === id) idx = i; });
    var atual = lista[idx];
    montarTopo(atual ? "Módulo " + atual.m.n + " · " + esc(atual.m.titulo) + " › " + esc(atual.a.titulo) : "");
    prepararCodigos();
    var st = aulaEstado(id); st.visto = Date.now(); salvar();
    var cab = $(".cab-aula");
    if (cab && atual && atual.m.aulas[0].id === id) cab.parentNode.insertBefore(podcastLink(atual.m), cab.nextSibling);

    // botão concluir
    var alvo = $("#concluir");
    if (alvo) {
      var box = el("div", { class: "concluir" });
      var b = el("button", { class: "primario", type: "button" });
      var msg = el("span", { class: "concluida" });
      function pinta() { b.textContent = st.ok ? "Desmarcar conclusão" : "Marcar aula como concluída"; b.className = st.ok ? "" : "primario"; msg.textContent = st.ok ? "✓ Aula concluída" : ""; }
      b.onclick = function () { st.ok = !st.ok; salvar(); pinta(); };
      pinta(); box.appendChild(b); box.appendChild(msg); alvo.appendChild(box);
    }

    // navegação
    var nav = el("nav", { class: "nav-aulas", "aria-label": "Navegação entre aulas" });
    var ant = lista[idx - 1], prox = lista[idx + 1];
    function link(x, cls, rot) {
      var href = raiz() + "modulos/" + x.m.pasta + "/" + x.a.arq;
      return el("a", { class: cls, href: href }, "<small>" + rot + "</small>" + esc(x.a.titulo));
    }
    nav.appendChild(ant ? link(ant, "ant", "← Aula anterior") : el("a", { class: "ant", href: raiz() + "index.html" }, "<small>←</small>Início do curso"));
    if (atual && atual.m.slides && (!prox || prox.m.id !== atual.m.id)) {
      nav.appendChild(el("a", { class: "prox", href: "slides.html" }, "<small>Revisão do módulo →</small>Slides do Módulo " + atual.m.n));
    } else if (prox) nav.appendChild(link(prox, "prox", "Próxima aula →"));
    else nav.appendChild(el("a", { class: "prox", href: raiz() + "index.html" }, "<small>→</small>Voltar ao início"));
    $("main").appendChild(nav);
  }

  // ---------- Terminal simulado ----------
  // cfg: { titulo, prompt, intro, comandos:{cmd: saida|function}, padroes:[[RegExp, saida|fn]], metas:[cmd], desconhecido, aoLimpar }
  function terminal(id, cfg) {
    var raizEl = document.getElementById(id); if (!raizEl) return;
    var st = aulaEstado(document.body.getAttribute("data-aula"));
    st.term = st.term || {}; var feitas = st.term[id] = st.term[id] || [];
    var t = el("div", { class: "term", role: "region", "aria-label": "Terminal simulado" });
    t.appendChild(barraJanela(cfg.titulo || "Terminal (simulação)"));
    var saida = el("div", { class: "term-saida", "aria-live": "polite" });
    t.appendChild(saida);
    var linha = el("div", { class: "term-linha-in" });
    var pr = el("span", { class: "pr" }, esc(cfg.prompt || ">"));
    var inp = el("input", { type: "text", spellcheck: "false", autocomplete: "off", "aria-label": "Digite um comando", placeholder: cfg.placeholder || "digite aqui e pressione Enter" });
    linha.appendChild(pr); linha.appendChild(inp); t.appendChild(linha);
    raizEl.appendChild(t);
    var metasBox = null;
    // Terminal com uma única meta = jogo: o desafio só conta quando o jogo chega ao fim.
    var jogo = cfg.jogo != null ? cfg.jogo : !!(cfg.metas && cfg.metas.length === 1);
    var FIM_JOGO = cfg.fimJogo || /class="t-ok">\s*(✓\s*)?(Fim|Treino concluído|Resultado)/;
    if (cfg.metas && cfg.metas.length) {
      raizEl.appendChild(el("div", { class: "term-status" }, jogo ? "Desafio: comece com o comando abaixo e jogue até o fim:" : "Desafio: experimente estes comandos (clique para preencher):"));
      metasBox = el("div", { class: "metas" }); raizEl.appendChild(metasBox);
      cfg.metas.forEach(function (m) {
        var b = el("button", { class: "meta", type: "button" }, esc(m));
        b.onclick = function () { inp.value = m; inp.focus(); };
        metasBox.appendChild(b);
      });
    }
    raizEl.appendChild(el("p", { class: "ilustrativo" }, "Simulação didática: as saídas são ilustrativas e podem diferir da versão real."));
    var hist = [], hi = 0;
    function escreve(html) { saida.innerHTML += html; saida.scrollTop = saida.scrollHeight; }
    function intro() { saida.innerHTML = ""; if (cfg.intro) escreve(cfg.intro + "\n"); }
    function norm(s) { return s.trim().replace(/\s+/g, " "); }
    function pintaMetas() {
      if (!metasBox) return;
      var bs = metasBox.querySelectorAll(".meta");
      cfg.metas.forEach(function (m, i) { bs[i].classList.toggle("feita", feitas.indexOf(norm(m).toLowerCase()) >= 0); });
      if (cfg.metas.every(function (m) { return feitas.indexOf(norm(m).toLowerCase()) >= 0; }) && !raizEl._parabens) {
        raizEl._parabens = true;
        raizEl.querySelector(".term-status").innerHTML = '<span style="color:var(--ok);font-weight:600">✓ Desafio do terminal completo.</span>';
      }
    }
    function executar(bruto) {
      var c = norm(bruto); if (!c) return;
      hist.push(c); hi = hist.length;
      escreve('<span class="t-acc">' + esc(pr.textContent) + "</span> " + esc(c) + "\n");
      var low = c.toLowerCase();
      if ((cfg.limpar || ["clear", "cls"]).indexOf(low) >= 0) { intro(); registra(low); return; }
      var r = null;
      if (cfg.comandos) { for (var k in cfg.comandos) { if (k.toLowerCase() === low) { r = cfg.comandos[k]; break; } } }
      if (r == null && cfg.padroes) { for (var i = 0; i < cfg.padroes.length; i++) { var m = c.match(cfg.padroes[i][0]); if (m) { r = cfg.padroes[i][1]; if (typeof r === "function") r = r(m, c); break; } } }
      if (typeof r === "function") r = r(c);
      if (r == null) r = typeof cfg.desconhecido === "function" ? cfg.desconhecido(c) : (cfg.desconhecido || '<span class="t-dim">Comando não simulado nesta aula. Use os comandos do desafio abaixo.</span>');
      escreve(r + "\n\n");
      if (jogo) { if (FIM_JOGO.test(String(r))) registra(norm(cfg.metas[0]).toLowerCase(), true); }
      else registra(low);
    }
    function registra(low, forcar) {
      if (jogo && !forcar) return;
      if (cfg.metas) { cfg.metas.forEach(function (m) { if (norm(m).toLowerCase() === low && feitas.indexOf(low) < 0) feitas.push(low); }); salvar(); pintaMetas(); }
    }
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { executar(inp.value); inp.value = ""; }
      else if (e.key === "ArrowUp") { if (hi > 0) { hi--; inp.value = hist[hi]; } e.preventDefault(); }
      else if (e.key === "ArrowDown") { if (hi < hist.length - 1) { hi++; inp.value = hist[hi]; } else { hi = hist.length; inp.value = ""; } e.preventDefault(); }
    });
    t.addEventListener("click", function () { if (!window.getSelection().toString()) inp.focus(); });
    intro(); pintaMetas();
  }

  // Barra de janela no estilo Windows Terminal (aba com título + botões da janela).
  function barraJanela(titulo) {
    return el("div", { class: "term-barra" }, '<span class="wt-aba"><span class="wt-ic">&gt;_</span>' + esc(titulo) + '<span class="wt-x">✕</span></span><span class="wt-mais">+ ⌄</span><span class="wt-jan">─&nbsp;&nbsp;☐&nbsp;&nbsp;✕</span>');
  }

  // ---------- Player de sessão (clone visual do Claude Code no terminal) ----------
  // passos: [{t:'cmd'|'user'|'claude'|'tool'|'out'|'perm'|'nota'|'html', x:'texto', ms:pausa, leg:'legenda'}]
  // cfg: { titulo, altura, prompt (shell), cwd, versao, modelo, modo (linha de status), inicio, ilustrativo }
  function player(id, cfg) {
    var raizEl = document.getElementById(id); if (!raizEl) return;
    var passos = cfg.passos;
    var t = el("div", { class: "term cc", role: "region", "aria-label": "Demonstração animada do Claude Code" });
    t.appendChild(barraJanela(cfg.titulo || "Demonstração"));
    var saida = el("div", { class: "term-saida" }); saida.style.minHeight = (cfg.altura || 260) + "px"; saida.style.maxHeight = "460px";
    var caixa = el("div", { class: "cc-caixa" }, '<div class="cc-in"><span class="cc-pr">❯</span>&nbsp;<span class="cc-txt"></span><span class="cursor"></span></div><div class="cc-status"></div>');
    var caixaTxt = caixa.querySelector(".cc-txt");
    caixa.querySelector(".cc-status").textContent = cfg.modo || "? for shortcuts";
    t.appendChild(saida); t.appendChild(caixa); raizEl.appendChild(t);
    var ctrl = el("div", { class: "player-ctrl" });
    var bPlay = el("button", { type: "button", class: "primario" }, "▶ Reproduzir");
    var bProx = el("button", { type: "button" }, "Passo ⏭");
    var bReini = el("button", { type: "button" }, "↺ Reiniciar");
    var bVel = el("button", { type: "button", title: "Velocidade" }, "1x");
    var prog = el("div", { class: "prog" }, "<div></div>");
    ctrl.appendChild(bPlay); ctrl.appendChild(bProx); ctrl.appendChild(bReini); ctrl.appendChild(bVel); ctrl.appendChild(prog);
    raizEl.appendChild(ctrl);
    var leg = el("div", { class: "player-ctrl" }, '<span class="leg"></span>'); raizEl.appendChild(leg);
    var legTxt = leg.firstChild;
    if (cfg.ilustrativo !== false) raizEl.appendChild(el("p", { class: "ilustrativo" }, "Demonstração ilustrativa, no visual do Claude Code no terminal: textos e números podem variar conforme a versão."));
    var i = 0, rodando = false, timer = null, vel = 1, ocupado = false, modoClaude = false;
    var pr = cfg.prompt || "PS C:\\estudos\\taskflow>";
    var LOGO_CC = '<svg class="cc-logo" viewBox="0 0 18 6" width="90" height="42" preserveAspectRatio="none" aria-hidden="true"><g fill="#d97757"><rect x="3" y="0" width="1.04" height="1.04"/><rect x="3" y="1" width="1.04" height="1.04"/><rect x="4" y="0" width="1.04" height="1.04"/><rect x="5" y="0" width="1.04" height="1.04"/><rect x="4" y="1" width="1.04" height="1.04"/><rect x="6" y="0" width="1.04" height="1.04"/><rect x="7" y="0" width="1.04" height="1.04"/><rect x="6" y="1" width="1.04" height="1.04"/><rect x="7" y="1" width="1.04" height="1.04"/><rect x="8" y="0" width="1.04" height="1.04"/><rect x="9" y="0" width="1.04" height="1.04"/><rect x="8" y="1" width="1.04" height="1.04"/><rect x="9" y="1" width="1.04" height="1.04"/><rect x="10" y="0" width="1.04" height="1.04"/><rect x="11" y="0" width="1.04" height="1.04"/><rect x="10" y="1" width="1.04" height="1.04"/><rect x="11" y="1" width="1.04" height="1.04"/><rect x="12" y="0" width="1.04" height="1.04"/><rect x="13" y="0" width="1.04" height="1.04"/><rect x="13" y="1" width="1.04" height="1.04"/><rect x="14" y="0" width="1.04" height="1.04"/><rect x="14" y="1" width="1.04" height="1.04"/><rect x="1" y="2" width="1.04" height="1.04"/><rect x="2" y="2" width="1.04" height="1.04"/><rect x="3" y="2" width="1.04" height="1.04"/><rect x="3" y="3" width="1.04" height="1.04"/><rect x="4" y="2" width="1.04" height="1.04"/><rect x="5" y="2" width="1.04" height="1.04"/><rect x="4" y="3" width="1.04" height="1.04"/><rect x="5" y="3" width="1.04" height="1.04"/><rect x="6" y="2" width="1.04" height="1.04"/><rect x="7" y="2" width="1.04" height="1.04"/><rect x="6" y="3" width="1.04" height="1.04"/><rect x="7" y="3" width="1.04" height="1.04"/><rect x="8" y="2" width="1.04" height="1.04"/><rect x="9" y="2" width="1.04" height="1.04"/><rect x="8" y="3" width="1.04" height="1.04"/><rect x="9" y="3" width="1.04" height="1.04"/><rect x="10" y="2" width="1.04" height="1.04"/><rect x="11" y="2" width="1.04" height="1.04"/><rect x="10" y="3" width="1.04" height="1.04"/><rect x="11" y="3" width="1.04" height="1.04"/><rect x="12" y="2" width="1.04" height="1.04"/><rect x="13" y="2" width="1.04" height="1.04"/><rect x="12" y="3" width="1.04" height="1.04"/><rect x="13" y="3" width="1.04" height="1.04"/><rect x="14" y="2" width="1.04" height="1.04"/><rect x="15" y="2" width="1.04" height="1.04"/><rect x="14" y="3" width="1.04" height="1.04"/><rect x="16" y="2" width="1.04" height="1.04"/><rect x="4" y="4" width="1.04" height="1.04"/><rect x="6" y="4" width="1.04" height="1.04"/><rect x="11" y="4" width="1.04" height="1.04"/><rect x="13" y="4" width="1.04" height="1.04"/></g></svg>';
    var VERBOS = ["Thinking", "Pondering", "Brewing", "Clauding", "Noodling", "Cogitating"], GLIFOS = "·✢✳✶✻✽";
    function cabecalho() {
      return '<div class="cc-head">' + LOGO_CC + '<span><b>Claude Code</b> <span class="t-dim">' + esc(cfg.versao || "v2.1.327") + '</span>\n<span class="t-dim">' + esc(cfg.modelo || "Sonnet 5.5 with medium effort · Claude Pro") + '</span>\n<span class="t-dim">' + esc(cfg.cwd || "~\\estudos\\taskflow") + "</span></span></div>";
    }
    function entraClaude() {
      if (modoClaude) return;
      modoClaude = true; saida.appendChild(el("div", {}, cabecalho())); caixa.style.display = "";
    }
    function saiClaude() { if (!modoClaude) return; modoClaude = false; caixa.style.display = "none"; saida.appendChild(el("div", {}, "\n")); }
    function ferramenta(x) {
      var linhas = String(x).split("\n"), l0 = linhas.shift(), k = l0.indexOf("(");
      var topo = k > 0 ? "<b>" + esc(l0.slice(0, k)) + "</b>" + esc(l0.slice(k)) : "<b>" + esc(l0) + "</b>";
      return '<span class="cc-dot ok">●</span> ' + topo + (linhas.length ? '\n<span class="t-dim">' + esc(linhas.join("\n")) + "</span>" : "");
    }
    function fmt(p) {
      switch (p.t) {
        case "claude": return '<span class="cc-dot">●</span> ' + esc(p.x).replace(/\n/g, "\n  ");
        case "tool": return ferramenta(p.x);
        case "out": return modoClaude ? '<span class="t-dim">  ⎿  ' + esc(p.x).replace(/\n/g, "\n     ") + "</span>" : esc(p.x);
        case "perm": return '<div class="cc-perm">' + p.x + '\n<span class="t-dim">Esc to cancel</span></div>';
        case "nota": return '<span class="t-warn">// ' + esc(p.x) + "</span>";
        default: return p.x;
      }
    }
    function atualiza() { prog.firstChild.style.width = Math.round(i / passos.length * 100) + "%"; }
    function legenda(p) { legTxt.textContent = p && p.leg ? "💡 " + p.leg : ""; }
    function rola() { saida.scrollTop = saida.scrollHeight; }
    function digita(alvo, texto, fim) {
      var k = 0; ocupado = true;
      (function dig() {
        if (k <= texto.length) { alvo.textContent = texto.slice(0, k++); rola(); timer = setTimeout(dig, 28 / vel); }
        else { ocupado = false; fim(); }
      })();
    }
    function mostra(cb) {
      if (i >= passos.length) { parar(); bPlay.textContent = "▶ Reproduzir de novo"; return; }
      var p = passos[i++]; atualiza(); legenda(p);
      if (p.t === "cmd") {
        saiClaude();
        var bloco = el("div"); bloco.innerHTML = '<span class="cc-ps">' + esc(pr) + "</span> "; saida.appendChild(bloco);
        var alvo = el("span"), cur = el("span", { class: "cursor" }); bloco.appendChild(alvo); bloco.appendChild(cur);
        digita(alvo, p.x, function () { cur.remove(); cb && cb(p); });
        return;
      }
      if (p.t === "user") {
        entraClaude();
        digita(caixaTxt, p.x, function () {
          caixaTxt.textContent = "";
          saida.appendChild(el("div", { class: "cc-user" }, '<span class="cc-pr">❯</span> ' + esc(p.x))); rola();
          cb && cb(p);
        });
        return;
      }
      if (p.t === "claude" || p.t === "tool" || p.t === "perm") entraClaude();
      var bloco2 = el("div"); saida.appendChild(bloco2);
      function finaliza() { bloco2.className = p.t === "perm" ? "" : "cc-msg"; bloco2.innerHTML = fmt(p) + (p.t === "perm" ? "" : "\n"); rola(); cb && cb(p); }
      if ((p.t === "claude" || p.t === "tool") && rodando) {
        var verbo = VERBOS[Math.floor(Math.random() * VERBOS.length)], g = 0, n = 0; ocupado = true;
        (function gira() {
          if (n++ < 6) { bloco2.innerHTML = '<span class="t-acc">' + GLIFOS[g++ % GLIFOS.length] + " " + verbo + '… <span class="t-dim">(esc to interrupt)</span></span>'; rola(); timer = setTimeout(gira, 110 / vel); }
          else { ocupado = false; finaliza(); }
        })();
      } else finaliza();
    }
    function loop() { if (!rodando) return; mostra(function (p) { if (rodando) timer = setTimeout(loop, (p.ms || 900) / vel); }); }
    function parar() { rodando = false; if (!ocupado) clearTimeout(timer); bPlay.textContent = "▶ Continuar"; }
    bPlay.onclick = function () {
      if (rodando) { parar(); return; }
      if (i >= passos.length) reiniciar();
      rodando = true; bPlay.textContent = "⏸ Pausar"; if (!ocupado) loop();
    };
    bProx.onclick = function () { if (rodando) parar(); if (!ocupado) mostra(); };
    function reiniciar() {
      parar(); clearTimeout(timer); ocupado = false; i = 0; modoClaude = false; caixaTxt.textContent = ""; caixa.style.display = "none";
      saida.innerHTML = cfg.inicio ? cfg.inicio + "\n" : "";
      var p0 = passos[0]; if (p0 && p0.t !== "cmd" && p0.t !== "html" && p0.t !== "out") entraClaude();
      atualiza(); legenda(null); bPlay.textContent = "▶ Reproduzir";
    }
    bReini.onclick = reiniciar;
    bVel.onclick = function () { vel = vel === 1 ? 2 : vel === 2 ? 0.5 : 1; bVel.textContent = vel + "x"; };
    reiniciar();
  }

  // ---------- Diagrama em passos ----------
  // cfg: { nos:[{ic,rt}], passos:[{ativos:[i], setas:[i], titulo, texto}] }
  function passos(id, cfg) {
    var r = document.getElementById(id); if (!r) return;
    var nos = el("div", { class: "fluxo-nos" }), noEls = [], setaEls = [];
    cfg.nos.forEach(function (n, i) {
      if (i > 0) { var s = el("span", { class: "seta", "aria-hidden": "true" }, cfg.seta || "→"); nos.appendChild(s); setaEls.push(s); }
      var d = el("div", { class: "no" }, '<span class="ic" aria-hidden="true">' + n.ic + '</span><span class="rt">' + esc(n.rt) + "</span>");
      nos.appendChild(d); noEls.push(d);
    });
    r.appendChild(nos);
    var txt = el("div", { class: "passo-txt", "aria-live": "polite" }); r.appendChild(txt);
    var nav = el("div", { class: "passo-nav" });
    var bA = el("button", { type: "button" }, "← Anterior"), bP = el("button", { type: "button", class: "primario" }, "Próximo →");
    var pts = el("div", { class: "pontos" });
    nav.appendChild(bA); nav.appendChild(pts); nav.appendChild(bP); r.appendChild(nav);
    var atual = 0;
    cfg.passos.forEach(function (_, i) { var p = el("span", { title: "Passo " + (i + 1) }); p.onclick = function () { ir(i); }; pts.appendChild(p); });
    function ir(i) {
      atual = Math.max(0, Math.min(cfg.passos.length - 1, i));
      var p = cfg.passos[atual];
      noEls.forEach(function (n, k) { n.classList.toggle("ativo", (p.ativos || []).indexOf(k) >= 0); });
      setaEls.forEach(function (s, k) { s.classList.toggle("ativa", (p.setas || []).indexOf(k) >= 0); });
      txt.innerHTML = '<h3><span class="selo cinza">' + (atual + 1) + "/" + cfg.passos.length + "</span> " + p.titulo + "</h3><div>" + p.texto + "</div>";
      [].forEach.call(pts.children, function (d, k) { d.classList.toggle("on", k === atual); });
      bA.disabled = atual === 0; bP.textContent = atual === cfg.passos.length - 1 ? "Recomeçar ↺" : "Próximo →";
    }
    bA.onclick = function () { ir(atual - 1); };
    bP.onclick = function () { ir(atual === cfg.passos.length - 1 ? 0 : atual + 1); };
    ir(0);
  }

  // ---------- Quiz ----------
  // perguntas: [{p, op:[...], c: indice, ex: explicação}]
  function quiz(id, perguntas) {
    var r = document.getElementById(id); if (!r) return;
    var st = aulaEstado(document.body.getAttribute("data-aula"));
    var acertosPrimeira = 0, respondidas = 0;
    var placar = el("div", { class: "q-placar" });
    perguntas.forEach(function (q, qi) {
      var box = el("div", { class: "q" });
      box.appendChild(el("p", { class: "q-p" }, (qi + 1) + ". " + q.p));
      var fb = el("div", { class: "q-fb", "aria-live": "polite" });
      var tentou = false, resolvida = false;
      q.op.forEach(function (o, oi) {
        var b = el("button", { class: "q-op", type: "button" }, String.fromCharCode(65 + oi) + ") " + o);
        b.onclick = function () {
          if (resolvida) return;
          var ok = oi === q.c;
          if (ok) {
            b.classList.add("certa"); resolvida = true; respondidas++;
            if (!tentou) acertosPrimeira++;
            fb.className = "q-fb ok"; fb.innerHTML = "<strong>Correto.</strong> " + q.ex;
            if (respondidas === perguntas.length) {
              placar.textContent = "Resultado: " + acertosPrimeira + " de " + perguntas.length + " na primeira tentativa.";
              st.quiz = Math.max(st.quiz || 0, acertosPrimeira); st.quizTotal = perguntas.length; salvar();
            }
          } else {
            tentou = true; b.classList.add("errada"); b.disabled = true;
            fb.className = "q-fb no"; fb.innerHTML = "<strong>Ainda não.</strong> " + (q.dica || "Releia a alternativa e tente outra.");
          }
        };
        box.appendChild(b);
      });
      box.appendChild(fb); r.appendChild(box);
    });
    r.appendChild(placar);
  }

  // ---------- Checklist ----------
  function checklist(id, itens) {
    var r = document.getElementById(id); if (!r) return;
    var st = aulaEstado(document.body.getAttribute("data-aula")); st.check = st.check || [];
    var ul = el("ul", { class: "check" });
    itens.forEach(function (txt, i) {
      var li = el("li"), lab = el("label"), cb = el("input", { type: "checkbox" });
      cb.checked = !!st.check[i];
      cb.onchange = function () { st.check[i] = cb.checked; salvar(); };
      lab.appendChild(cb); lab.appendChild(el("span", null, txt)); li.appendChild(lab); ul.appendChild(li);
    });
    r.appendChild(ul);
  }

  // ---------- Slides ----------
  function iniciarSlides() {
    document.body.classList.add("modo-slides");
    var ss = [].slice.call(document.querySelectorAll(".slide"));
    var barra = el("div", { class: "slides-barra" });
    var bA = el("button", { type: "button", "aria-label": "Slide anterior" }, "←");
    var bP = el("button", { type: "button", "aria-label": "Próximo slide" }, "→");
    var cont = el("span"), prog = el("div", { class: "prog" }, "<div></div>");
    var bTela = el("button", { type: "button", title: "Tela cheia (F)" }, "⛶ Tela cheia");
    var bSair = el("a", { href: document.body.getAttribute("data-voltar") || "../../index.html" }, "Sair");
    var bTema = el("button", { type: "button" }, "◐"); bTema.onclick = alternarTema;
    [bA, cont, bP, prog, bTema, bTela, bSair].forEach(function (x) { barra.appendChild(x); });
    $(".slides").appendChild(barra);
    var i = 0;
    var h = parseInt((location.hash || "").replace("#", ""), 10); if (h > 0 && h <= ss.length) i = h - 1;
    function ir(n) {
      i = Math.max(0, Math.min(ss.length - 1, n));
      ss.forEach(function (s, k) { s.classList.toggle("on", k === i); });
      cont.textContent = (i + 1) + " / " + ss.length;
      prog.firstChild.style.width = ((i + 1) / ss.length * 100) + "%";
      history.replaceState(null, "", "#" + (i + 1));
    }
    bA.onclick = function () { ir(i - 1); }; bP.onclick = function () { ir(i + 1); };
    bTela.onclick = function () { if (!document.fullscreenElement) { document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); } else document.exitFullscreen(); };
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { ir(i + 1); e.preventDefault(); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { ir(i - 1); e.preventDefault(); }
      else if (e.key === "Home") ir(0); else if (e.key === "End") ir(ss.length - 1);
      else if (e.key === "f" || e.key === "F") bTela.onclick();
    });
    prepararCodigos();
    ir(i);
  }

  // ---------- Página inicial ----------
  function iniciarIndex() {
    montarTopo("Do zero ao avançado · estudo pessoal offline");
    var s = ler(), lista = $("#modulos"), total = 0, feitas = 0, quizA = 0, quizT = 0;
    CATALOGO.forEach(function (m) {
      var div = el("section", { class: "modulo" + (m.pronto ? "" : " bloq") });
      var nOk = 0;
      m.aulas.forEach(function (a) { total++; if (a.id && s.aulas[a.id] && s.aulas[a.id].ok) { nOk++; feitas++; } if (a.id && s.aulas[a.id] && s.aulas[a.id].quizTotal) { quizA += s.aulas[a.id].quiz; quizT += s.aulas[a.id].quizTotal; } });
      var pct = m.pronto ? nOk + "/" + m.aulas.length + " concluídas" : "em breve";
      div.appendChild(el("div", { class: "mod-cab" }, '<div class="mod-num">' + m.n + '</div><div><h3>' + esc(m.titulo) + ' <span class="selo cinza">' + m.nivel + '</span></h3><p>' + esc(m.desc) + '</p></div><div class="mod-pct">' + pct + "</div>"));
      var ul = el("ul", { class: "mod-aulas" });
      m.aulas.forEach(function (a) {
        var ok = a.id && s.aulas[a.id] && s.aulas[a.id].ok;
        var li = el("li");
        var disp = m.pronto && a.arq;
        li.innerHTML = '<span class="st ' + (ok ? "ok" : "") + '">' + (ok ? "✓" : disp ? "○" : "·") + "</span>" +
          (disp ? '<a href="modulos/' + m.pasta + "/" + a.arq + '">' + esc(a.titulo) + "</a>" : "<span>" + esc(a.titulo) + (m.pronto ? ' <small>(em breve)</small>' : "") + "</span>") +
          (a.min ? '<span class="min">' + a.min + " min</span>" : "");
        ul.appendChild(li);
      });
      if (m.slides) { var li = el("li"); li.innerHTML = '<span class="st">▤</span><a href="modulos/' + m.pasta + '/slides.html">Slides de revisão do módulo</a>'; ul.appendChild(li); }
      if (m.pronto) { var qf = s.aulas[m.id + "qf"] || {}; var liQ = el("li"); liQ.innerHTML = '<span class="st">?</span><a href="modulos/' + m.pasta + '/quiz-final.html">Quiz final do módulo</a>' + (qf.quizTotal ? ' <small class="t-dim">(' + qf.quiz + "/" + qf.quizTotal + ")</small>" : ""); ul.appendChild(liQ); }
      div.appendChild(ul);
      if (m.pronto) div.appendChild(podcastLink(m));
      lista.appendChild(div);
    });
    var prox = null; todasAulas().some(function (x) { if (!(s.aulas[x.a.id] && s.aulas[x.a.id].ok)) { prox = x; return true; } });
    $("#stats").innerHTML =
      '<div class="stat"><b>' + feitas + "/" + total + "</b><span>aulas concluídas</span></div>" +
      '<div class="stat"><b>' + Math.round(feitas / total * 100) + "%</b><span>do curso</span></div>" +
      '<div class="stat"><b>' + (quizT ? Math.round(quizA / quizT * 100) + "%" : "—") + "</b><span>acertos nos quizzes</span></div>" +
      '<div class="stat"><b style="font-size:1rem;line-height:1.4">' + (prox ? '<a href="modulos/' + prox.m.pasta + "/" + prox.a.arq + '">' + esc(prox.a.titulo) + " →</a>" : "Tudo pronto") + "</b><span>próxima aula sugerida</span></div>";
    $("#exportar").onclick = function () {
      var blob = new Blob([JSON.stringify(ler(), null, 2)], { type: "application/json" });
      var a = el("a", { href: URL.createObjectURL(blob), download: "progresso-curso-claude-code.json" }); document.body.appendChild(a); a.click(); a.remove();
    };
    $("#importar").onclick = function () { $("#arq-import").click(); };
    $("#arq-import").onchange = function (e) {
      var f = e.target.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () { try { var d = JSON.parse(rd.result); if (!d.aulas) throw 0; memoria = d; salvar(); location.reload(); } catch (x) { alert("Arquivo inválido: não parece um progresso exportado deste curso."); } };
      rd.readAsText(f);
    };
    $("#zerar").onclick = function () { if (confirm("Apagar todo o progresso salvo neste navegador? Exporte antes se quiser guardar.")) { memoria = { aulas: {} , tema: ler().tema }; salvar(); location.reload(); } };
  }

  // ---------- Páginas de referência (busca) ----------
  function iniciarReferencia() {
    montarTopo(document.body.getAttribute("data-titulo") || "Referência");
    prepararCodigos();
    var inp = $("#busca"); if (!inp) return;
    inp.addEventListener("input", function () {
      var q = inp.value.trim().toLowerCase();
      document.querySelectorAll("[data-busca]").forEach(function (item) { item.classList.toggle("oculta", q && item.textContent.toLowerCase().indexOf(q) < 0); });
      document.querySelectorAll(".grupo-cola").forEach(function (g) { g.classList.toggle("oculta", q && !g.querySelector("[data-busca]:not(.oculta)")); });
    });
    document.querySelectorAll("[data-copia]").forEach(function (b) { b.onclick = function () { copiarTexto(b.getAttribute("data-copia"), b); }; });
  }

  // ---------- Vídeo animado com narração (Web Speech API, voz do sistema) ----------
  // cfg: { titulo, cenas:[{ fala:"texto narrado", html:"marcação da cena", dur:segundos(opcional) }] }
  // Na marcação, elementos com data-t="1.5" aparecem 1,5 s (em velocidade 1x) após o início da cena.
  var VELS = [1, 1.25, 1.5, 1.75, 2];
  function pontuaVoz(v) {
    var n = v.name, p = 0;
    if (/natural/i.test(n)) p += 100;          // vozes neurais (Edge com internet)
    if (/online/i.test(n)) p += 40;
    if (/google/i.test(n)) p += 60;            // Chrome com internet
    if (/francisca|thalita|antonio/i.test(n)) p += 20;
    if (/maria/i.test(n)) p += 10;
    if (/^pt[-_]br/i.test(v.lang)) p += 5;
    return p;
  }
  function video(id, cfg) {
    var raizEl = document.getElementById(id); if (!raizEl) return;
    var cenas = cfg.cenas, st = aulaEstado(document.body.getAttribute("data-aula")), pref = ler();
    var temVoz = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    var vozes = [], voz = null, narrar = temVoz && pref.videoVoz !== false, legendas = true;
    var vel = VELS.indexOf(pref.videoVel) >= 0 ? pref.videoVel : 1.25;

    var caixa = el("div", { class: "video" });
    var palco = el("div", { class: "v-palco", role: "region", "aria-label": "Vídeo: " + (cfg.titulo || ""), tabindex: "0" });
    var cenaEl = el("div", { class: "v-cena" });
    var leg = el("div", { class: "v-legenda", "aria-live": "polite" }, "<span></span>");
    var capa = el("div", { class: "v-capa" });
    palco.appendChild(cenaEl); palco.appendChild(leg); palco.appendChild(capa);
    caixa.appendChild(palco);
    var ctrl = el("div", { class: "v-ctrl" });
    var bPlay = el("button", { type: "button", class: "primario" }, "▶ Assistir");
    var bAnt = el("button", { type: "button", title: "Cena anterior", "aria-label": "Cena anterior" }, "⏮");
    var bProx = el("button", { type: "button", title: "Próxima cena", "aria-label": "Próxima cena" }, "⏭");
    var linha = el("div", { class: "v-linha-tempo" });
    var tempo = el("span", { class: "v-tempo" });
    var bVel = el("button", { type: "button", title: "Velocidade (atalho: + e -)", class: "v-vel" });
    var bVoz = el("button", { type: "button", title: "Liga/desliga a narração" });
    var selVoz = el("select", { class: "v-sel", "aria-label": "Escolher voz", title: "Escolher voz" });
    var bCC = el("button", { type: "button", title: "Legendas", class: "on" }, "CC");
    var bTela = el("button", { type: "button", title: "Tela cheia" }, "⛶");
    [bPlay, bAnt, bProx, linha, tempo, bVel, bVoz, selVoz, bCC, bTela].forEach(function (x) { ctrl.appendChild(x); });
    caixa.appendChild(ctrl);
    var nota = el("p", { class: "v-nota" }); caixa.appendChild(nota);
    raizEl.appendChild(caixa);

    // ----- vozes -----
    function carregaVozes() {
      if (!temVoz) return;
      vozes = speechSynthesis.getVoices().filter(function (v) { return /^pt/i.test(v.lang); })
        .sort(function (a, b) { return pontuaVoz(b) - pontuaVoz(a) || (/^pt[-_]br/i.test(b.lang) - /^pt[-_]br/i.test(a.lang)); });
      var salva = vozes.filter(function (v) { return v.name === pref.videoVozNome; })[0];
      voz = salva || vozes[0] || null;
      selVoz.innerHTML = "";
      vozes.forEach(function (v) {
        var o = el("option", { value: v.name }, esc(v.name.replace(/^Microsoft\s+/, "").replace(/\s*-\s*Portuguese\s*\((Brazil|Portugal)\)/i, " ($1)").replace("Brazil", "Brasil")));
        if (voz && v.name === voz.name) o.selected = true;
        selVoz.appendChild(o);
      });
      pintaVoz();
    }
    function pintaVoz() {
      bVoz.classList.toggle("on", narrar); bVoz.textContent = narrar ? "🔊" : "🔇";
      bVoz.setAttribute("aria-label", narrar ? "Desligar narração" : "Ligar narração");
      bVel.textContent = String(vel).replace(".", ",") + "x";
      var natural = vozes.some(function (v) { return /natural|google/i.test(v.name); });
      selVoz.style.display = !usandoAudio && vozes.length > 1 ? "" : "none";
      if (usandoAudio && narrar) { nota.textContent = "Narração gravada."; return; }
      if (!temVoz) nota.textContent = "Seu navegador não tem narração por voz: acompanhe pelas legendas.";
      else if (!narrar) nota.textContent = "Narração desligada: o vídeo avança pelas legendas.";
      else if (!voz) nota.textContent = "Nenhuma voz em português no sistema: o vídeo segue pelas legendas.";
      else if (!natural) nota.innerHTML = "Dica: para uma voz bem mais natural, abra o curso no <strong>Microsoft Edge com internet</strong> e escolha uma voz “Natural” (ex.: Francisca ou Antonio) no seletor de voz.";
      else nota.textContent = "Voz: " + voz.name + ".";
    }
    if (temVoz) { carregaVozes(); speechSynthesis.addEventListener && speechSynthesis.addEventListener("voiceschanged", carregaVozes); }
    else { narrar = cfg.audio !== false && pref.videoVoz !== false; selVoz.style.display = "none"; }

    // ----- tempo -----
    var segs = cenas.map(function (_, i) { var s = el("span", { title: "Cena " + (i + 1) }, "<i></i>"); s.onclick = function () { ir(i, !tocando); }; linha.appendChild(s); return s; });
    function base(c) {
      var palavras = (c.fala || "").split(/\s+/).length, maxT = 0;
      (c.html.match(/data-t="([\d.]+)"/g) || []).forEach(function (m) { maxT = Math.max(maxT, parseFloat(m.replace(/\D*([\d.]+).*/, "$1"))); });
      return c.dur || Math.max(3, palavras / 2.8, maxT + 1.2);
    }
    var bases = cenas.map(base);
    function dur(i) { return bases[i] / vel; }
    function total() { var t = 0; for (var k = 0; k < cenas.length; k++) t += dur(k); return t; }
    function fmt(s) { s = Math.round(s); return Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2); }

    var atual = 0, tocando = false, iniciou = false, timer = null, inicioCena = 0, decorrido = 0, vozAcabou = true, tempoAcabou = true, raf = null, falas = [];
    // Áudio gravado (ex.: ElevenLabs): <raiz>/audio/<id-da-aula>-NN.mp3. Se o arquivo não existir, usa a voz do sistema.
    var audioEl = null, audioOk = {}, usandoAudio = false, aulaId = document.body.getAttribute("data-aula") || id;
    function srcAudio(i) { return (cfg.audioBase || raiz() + "audio/") + aulaId + "-" + ("0" + (i + 1)).slice(-2) + ".mp3"; }
    // pré-carrega só a duração de cada MP3 para a linha do tempo refletir o áudio real
    if (cfg.audio !== false) cenas.forEach(function (c, i) {
      var m = new Audio(); m.preload = "metadata";
      m.onloadedmetadata = function () { if (isFinite(m.duration) && m.duration > 0) { audioOk[i] = audioOk[i] !== false; bases[i] = Math.max(bases[i] * 0.5, m.duration + 0.4); capaInicial(); tique(); } };
      m.onerror = function () { audioOk[i] = false; };
      m.src = srcAudio(i);
    });
    function render(i) {
      var c = cenas[i];
      palco.style.setProperty("--vel", vel);
      cenaEl.innerHTML = c.html;
      cenaEl.querySelectorAll("[data-t]").forEach(function (e) { e.style.animationDelay = (parseFloat(e.getAttribute("data-t")) / vel) + "s"; });
      cenaEl.querySelectorAll(".v-barra > i[style*='animation-delay']").forEach(function (e) { e.style.animationDelay = (parseFloat(e.style.animationDelay) / vel) + "s"; });
      leg.firstChild.textContent = c.fala || "";
      segs.forEach(function (s, k) { s.firstChild.style.width = k < i ? "100%" : "0"; });
    }
    function paraTudo() { clearTimeout(timer); cancelAnimationFrame(raf); if (temVoz) speechSynthesis.cancel(); falas = []; if (audioEl) { audioEl.onended = audioEl.onerror = null; audioEl.pause(); audioEl = null; } }
    function talvezAvance() { if (vozAcabou && tempoAcabou && tocando) { clearTimeout(timer); timer = setTimeout(function () { ir(atual + 1); }, 150); } }
    function narrarCena(i) {
      vozAcabou = true;
      if (!narrar) return;
      if (cfg.audio === false || audioOk[i] === false) { falar(cenas[i].fala); return; }
      vozAcabou = false;
      var a = new Audio(srcAudio(i)), falhou = false; audioEl = a;
      a.preservesPitch = true; a.playbackRate = vel;
      function cai() { if (falhou || audioEl !== a) return; falhou = true; audioOk[i] = false; audioEl = null; falar(cenas[i].fala); }
      a.onended = function () { if (audioEl === a) { vozAcabou = true; talvezAvance(); } };
      a.onerror = cai;
      a.onplaying = function () { audioOk[i] = true; if (!usandoAudio) { usandoAudio = true; pintaVoz(); } };
      var pr = a.play(); if (pr && pr.catch) pr.catch(function (e) { if (e && e.name === "NotAllowedError") { vozAcabou = true; talvezAvance(); } else cai(); });
    }
    function falar(texto) {
      vozAcabou = true;
      if (!narrar || !voz || !texto) return;
      vozAcabou = false;
      var partes = texto.match(/[^.!?…:]+[.!?…:]*/g) || [texto];
      partes.forEach(function (p, k) {
        var u = new SpeechSynthesisUtterance(p.trim()); u.voice = voz; u.lang = voz.lang;
        u.rate = Math.min(2.2, vel * 1.08); u.pitch = 1;
        if (k === partes.length - 1) u.onend = function () { vozAcabou = true; talvezAvance(); };
        u.onerror = function (e) { if (e.error !== "interrupted" && e.error !== "canceled") { vozAcabou = true; talvezAvance(); } };
        falas.push(u); speechSynthesis.speak(u);
      });
    }
    function tique() {
      var d = decorrido + (tocando ? (performance.now() - inicioCena) / 1000 : 0);
      segs[atual].firstChild.style.width = Math.min(100, d / dur(atual) * 100) + "%";
      var antes = 0; for (var k = 0; k < atual; k++) antes += dur(k);
      tempo.textContent = fmt(Math.min(antes + d, total())) + " / " + fmt(total());
      if (tocando) raf = requestAnimationFrame(tique);
    }
    // com narração, a cena dura o que a fala durar (mínimo: animações terminarem); sem narração, o tempo estimado
    function minimo() { return narrar && (voz || usandoAudio || cfg.audio !== false) ? dur(atual) * 0.55 : dur(atual); }
    function agendaTempo(restante) { tempoAcabou = false; clearTimeout(timer); timer = setTimeout(function () { tempoAcabou = true; talvezAvance(); }, Math.max(0, restante) * 1000); }
    function ir(i, manual) {
      paraTudo();
      if (i >= cenas.length) { fim(); return; }
      atual = Math.max(0, i); decorrido = 0; render(atual);
      capa.style.display = "none";
      if (manual) { tocando = false; iniciou = true; palco.classList.add("pausado", "estatico"); bPlay.textContent = "▶ Continuar"; tique(); return; }
      palco.classList.remove("pausado", "estatico");
      tocando = true; iniciou = true; inicioCena = performance.now(); bPlay.textContent = "⏸ Pausar";
      narrarCena(atual); agendaTempo(minimo()); tique();
    }
    function pausar() {
      if (!tocando) return; tocando = false; decorrido += (performance.now() - inicioCena) / 1000;
      clearTimeout(timer); palco.classList.add("pausado"); if (audioEl) audioEl.pause(); else if (temVoz && narrar) speechSynthesis.pause(); bPlay.textContent = "▶ Continuar";
    }
    function continuar() {
      if (!iniciou) { ir(0); return; }
      if (tocando) return;
      if (palco.classList.contains("estatico")) { ir(atual); return; }
      tocando = true; inicioCena = performance.now(); palco.classList.remove("pausado"); bPlay.textContent = "⏸ Pausar";
      if (audioEl) audioEl.play(); else if (temVoz && narrar && speechSynthesis.paused) speechSynthesis.resume();
      if (!tempoAcabou) agendaTempo(minimo() - decorrido); else talvezAvance();
      tique();
    }
    function fim() {
      tocando = false; iniciou = false; palco.classList.add("pausado"); segs.forEach(function (s) { s.firstChild.style.width = "100%"; });
      tempo.textContent = fmt(total()) + " / " + fmt(total());
      capa.innerHTML = '<div><button type="button">↺ Assistir de novo</button><small>Fim do vídeo</small></div>'; capa.style.display = "grid";
      capa.querySelector("button").onclick = function (e) { e.stopPropagation(); ir(0); };
      bPlay.textContent = "▶ Assistir de novo";
      st.videos = st.videos || {}; st.videos[id] = true; salvar();
    }
    function mudaVel(delta) {
      var k = VELS.indexOf(vel); k = delta === 0 ? (k + 1) % VELS.length : Math.max(0, Math.min(VELS.length - 1, k + delta));
      vel = VELS[k]; pref.videoVel = vel; salvar(); pintaVoz(); capaInicial();
      if (tocando) ir(atual); else { render(atual); tique(); }
    }
    function capaInicial() {
      if (iniciou) return;
      capa.innerHTML = '<div><button type="button">▶ Assistir (' + fmt(total()) + ")</button><small>" + esc(cfg.titulo || "") + "</small></div>";
      capa.querySelector("button").onclick = function (e) { e.stopPropagation(); ir(0); };
    }
    bPlay.onclick = function () { tocando ? pausar() : continuar(); };
    palco.onclick = function (e) { if (e.target.closest(".v-capa")) return; tocando ? pausar() : continuar(); };
    palco.onkeydown = function (e) {
      if (e.key === " " || e.key === "k") { e.preventDefault(); bPlay.onclick(); }
      else if (e.key === "ArrowRight") ir(atual + 1, !tocando); else if (e.key === "ArrowLeft") ir(atual - 1, !tocando);
      else if (e.key === "+" || e.key === "=") mudaVel(1); else if (e.key === "-") mudaVel(-1);
    };
    bAnt.onclick = function () { ir(atual - 1, !tocando); };
    bProx.onclick = function () { ir(atual + 1, !tocando); };
    bVel.onclick = function () { mudaVel(0); };
    bVoz.onclick = function () { narrar = !narrar; pref.videoVoz = narrar; salvar(); pintaVoz(); if (tocando) ir(atual); };
    selVoz.onchange = function () {
      voz = vozes.filter(function (v) { return v.name === selVoz.value; })[0] || voz;
      pref.videoVozNome = voz && voz.name; salvar(); pintaVoz();
      if (tocando) ir(atual); else if (temVoz && voz) { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance("Olá! Esta é a minha voz."); u.voice = voz; u.lang = voz.lang; u.rate = vel * 1.08; speechSynthesis.speak(u); }
    };
    bCC.onclick = function () { legendas = !legendas; leg.classList.toggle("off", !legendas); bCC.classList.toggle("on", legendas); };
    bTela.onclick = function () { if (!document.fullscreenElement) { palco.requestFullscreen && palco.requestFullscreen(); } else document.exitFullscreen(); };
    window.addEventListener("beforeunload", function () { if (temVoz) speechSynthesis.cancel(); });
    render(0); palco.classList.add("pausado", "estatico"); capaInicial(); pintaVoz(); tique();
  }

  function iniciarPagina(migalha) { montarTopo(migalha || ""); prepararCodigos(); }
  window.Curso = { CATALOGO: CATALOGO, iniciarPagina: iniciarPagina, iniciarPodcasts: iniciarPodcasts, estado: ler, salvarEstado: salvar, iniciarAula: iniciarAula, iniciarIndex: iniciarIndex, iniciarSlides: iniciarSlides, iniciarReferencia: iniciarReferencia,
    terminal: terminal, player: player, passos: passos, quiz: quiz, checklist: checklist, video: video };
})();
