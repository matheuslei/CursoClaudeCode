// Extrai as perguntas de Curso.quiz(...) de cada aula, rodando os scripts inline num sandbox.
const fs = require("fs"), path = require("path"), vm = require("vm");
const raiz = process.argv[2];
const src = fs.readFileSync(path.join(raiz, "assets/curso.js"), "utf8");
// pega o CATALOGO do curso.js
const cat = vm.runInNewContext("(function(){" + src.slice(src.indexOf("var CATALOGO"), src.indexOf("];", src.indexOf("var CATALOGO")) + 2) + "; return CATALOGO;})()");
const saida = {};
for (const m of cat) {
  if (!m.pronto) continue;
  saida[m.id] = { n: m.n, titulo: m.titulo, pasta: m.pasta, perguntas: [] };
  for (const a of m.aulas) {
    if (!a.arq) continue;
    const html = fs.readFileSync(path.join(raiz, "modulos", m.pasta, a.arq), "utf8");
    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x => x[1]);
    const capt = [];
    const noop = new Proxy(function () {}, { get: () => noop, apply: () => noop });
    const Curso = new Proxy({}, { get: (t, k) => k === "quiz" ? (id, arr) => capt.push(arr) : noop });
    const ctx = { Curso, document: noop, window: noop, console };
    for (const s of scripts) { try { vm.runInNewContext(s, ctx); } catch (e) { /* ignora */ } }
    const qs = capt.flat();
    qs.forEach((q, i) => saida[m.id].perguntas.push(Object.assign({ aula: a.titulo, idx: i }, q)));
  }
}
fs.writeFileSync(process.argv[3], JSON.stringify(saida, null, 1));
for (const k in saida) console.log(k, saida[k].perguntas.length);
