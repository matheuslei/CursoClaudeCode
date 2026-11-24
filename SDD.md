# SDD — Curso interativo "Claude Code: do Zero ao Avançado"

> **Status:** v0.3 APROVADA (TaskFlow em Python) · Fase 1 (Módulos 0 e 1) e Fase 2 (Módulos 2 a 6) entregues em `curso-claude-code/` · Módulos 7 a 10 entregues via Spec Kit (`specs/001` a `004`) · curso completo, em revisão · **Data:** 19/11/2026
> **Histórico:** v0.1 previa publicação na web · v0.2 era para estudo pessoal em Markdown · **v0.3 passa a ser um curso interativo em HTML**, local e offline.

---

## 1. Visão

Montar um **curso interativo, em português, que roda no seu computador** e se abre no navegador, sem internet, sem instalação e sem conta. Ele leva você do básico ao avançado no Claude Code. Cada aula combina:
- explicação curta;
- demonstração animada;
- terminal simulado;
- quiz;
- exercício prático no Claude Code de verdade.

**Princípios**
1. **Aprender fazendo:** a simulação ensina e a prática real fixa o conteúdo.
2. **Microaulas:** de 15 a 25 minutos cada, com um checklist de "consigo fazer?".
3. **Especificar antes de codar:** o curso pratica o Spec-Driven Development, o mesmo método deste documento.
4. **Funciona no Windows:** comandos testados em PowerShell.
5. **Privacidade:** o progresso fica salvo só no seu navegador. Os exercícios usam apenas dados fictícios.

## 2. Objetivos de aprendizagem (ao final, você consegue…)

- Usar o Claude Code no terminal, no VS Code e no app desktop.
- Gerenciar o contexto (CLAUDE.md, memória, `/clear`, `/compact`, `/rewind`) e acompanhar o custo (`/usage`).
- Escolher o modo de permissão (inclusive o **auto mode**) e configurar regras com segurança.
- Seguir o fluxo **Explorar → Planejar → Especificar → Implementar → Verificar**.
- Criar **skills, subagentes, hooks e plugins**, e conectar **servidores MCP**.
- Trabalhar em paralelo (worktrees, agent view, subagentes em segundo plano).
- Automatizar com `claude -p`, GitHub Actions e tarefas agendadas.
- Entender o básico do **Agent SDK**.

## 3. Pesquisa: o que há de novo no Claude Code (nov/2026)

Fontes: documentação oficial (code.claude.com/docs) e notas semanais de novidades (semanas 13 a 37 de 2026). Recursos em *preview/beta* ficam sinalizados nas aulas e serão conferidos de novo quando cada aula for escrita.

- **Onde roda:** CLI (no Windows sem Git Bash usa PowerShell), VS Code e JetBrains, Desktop (com navegador embutido), Web/cloud e Remote Control.
- **Modelos e esforço:** Opus 5, Sonnet 5 e Fable 5.x com contexto de 1M; `/effort` (inclui `xhigh`); fast mode.
- **Permissões:** auto mode, regras `Tool(param:value)`, sandbox e `--safe-mode`.
- **Sessões:** CLAUDE.md e AGENTS.md, auto memory, `/rewind`, `/fork`, `/resume`, `/cd` e checkpoints.
- **Extensões:** skills (com `/skill-doctor`), subagentes (em segundo plano, fork mode), hooks condicionais, plugins (`claude plugin eval`), MCP (`claude mcp login`), output styles e status line.
- **Orquestração:** `claude agents`, worktrees, mensagens entre sessões, dynamic workflows, `/goal`, `/loop` e Monitor.
- **Qualidade e automação:** `/code-review`, `/ultrareview`, `claude -p`, GitHub Actions e tarefas agendadas.

Material complementar oficial e gratuito: Claude Academy e o comando `/powerup`. O curso indica esses materiais e não copia o conteúdo deles.

## 4. Estrutura do curso

### 4.1 Módulos (~45 aulas, ~15–20h)

| # | Módulo | Nível | Conteúdo |
|---|---|---|---|
| 0 | **Base** | Zero | Terminal PowerShell, Git essencial, o que é um agente de IA |
| 1 | **Primeiros passos** | Iniciante | Instalação no Windows, primeira sessão, interface, comandos `/`, atalhos, `!` e `@` |
| 2 | **Contexto é tudo** | Iniciante | Janela de contexto, `/init` e CLAUDE.md, memória, `/clear` `/compact` `/rewind`, `/usage` |
| 3 | **Fluxo profissional** | Intermediário | Plan mode, Spec-Driven Development, TDD com Claude, prompts eficazes, verificação |
| 4 | **Permissões e segurança** | Intermediário | Modos de permissão, auto mode, allow/ask/deny, sandbox, segredos e dados pessoais |
| 5 | **Personalização** | Intermediário | settings.json, skills, comandos próprios, output styles, status line, hooks |
| 6 | **MCP e integrações** | Intermediário | Conceito de MCP, instalar e autenticar um servidor, criar um MCP simples, VS Code, Desktop |
| 7 | **Subagentes e paralelismo** | Avançado | Subagentes customizados, background e fork, worktrees, agent view, `/goal` |
| 8 | **Plugins** | Avançado | Anatomia de um plugin, empacotar skills, hooks e MCP, `plugin eval` |
| 9 | **Automação** | Avançado | `claude -p`, GitHub Actions, `/code-review`, tarefas agendadas |
| 10 | **Agent SDK** | Expert | O loop do agente, ferramentas próprias, permissões e hooks no SDK |
| ★ | **Desafio final** | — | Construir o projeto TaskFlow completo, da spec até o CI |

### 4.2 Projeto de treino: "TaskFlow"

Uma CLI simples de lista de tarefas, com dados fictícios. A cada módulo ela ganha uma camada: spec → código → testes → CLAUDE.md → hook de lint → servidor MCP → subagente revisor → plugin → GitHub Actions → agente SDK.

### 4.3 Anatomia de uma aula (página HTML)

| Bloco | Componente interativo |
|---|---|
| 1. Objetivo e tempo estimado | Cabeçalho com nível e módulo |
| 2. Por que importa | Texto curto + um cenário real |
| 3. Conceito | **Diagrama animado passo a passo** (botões Anterior/Próximo) |
| 4. Demonstração | **Player de sessão**: uma "gravação" animada do Claude Code com play, pausa e velocidade |
| 5. Pratique na simulação | **Terminal simulado**: você digita comandos e recebe respostas didáticas |
| 6. Quiz | 3 a 5 perguntas com explicação do acerto e do erro |
| 7. Exercício real | Enunciado para fazer no Claude Code de verdade + **gabarito que só abre num clique** |
| 8. Erros comuns e "consigo fazer?" | Checklist que marca a aula como concluída |
| 9. Para ir além | Links da doc oficial + "Conferido em: <data/versão>" |

### 4.4 Componentes extras

- **Slides por módulo:** um deck HTML de revisão (navegação com setas, modo tela cheia do navegador e impressão em PDF).
- **Cola de comandos interativa:** busca por comando ou atalho e botão de copiar.
- **Painel de progresso:** módulos concluídos, pontuação dos quizzes e próxima aula sugerida.
- **Glossário** com busca.

## 5. Especificação técnica

| Item | Decisão | Motivo |
|---|---|---|
| Tecnologia | **HTML + CSS + JavaScript puro**, sem frameworks, sem build e sem bibliotecas externas | Abre com duplo clique, funciona offline e ninguém precisa instalar nada |
| Componentes | Um `curso.js` e um `curso.css` compartilhados; cada aula só descreve o seu conteúdo (terminal, quiz, passos) | Aulas consistentes e fáceis de corrigir |
| Progresso | `localStorage` do navegador, com botões para exportar e importar o progresso | Nada sai da máquina; se o navegador limpar os dados, você recupera pelo arquivo exportado |
| Visual | Tema claro e escuro, legível no notebook, fonte monoespaçada nos terminais | Conforto para estudar |
| Acessibilidade | Navegação por teclado, contraste adequado, texto alternativo nos diagramas | Inclusão |
| Navegador | Edge ou Chrome atuais | Padrão no Windows corporativo |

**Estrutura de pastas**

```
curso-claude-code/
├── index.html                ← página inicial: trilha + progresso
├── assets/  curso.css · curso.js
├── modulos/
│   ├── 00-base/
│   │   ├── 01-terminal.html
│   │   ├── ...
│   │   └── slides.html       ← revisão do módulo
│   └── 10-agent-sdk/
├── praticas/                 ← arquivos de partida dos exercícios reais
├── projeto-taskflow/         ← código de cada etapa do projeto
├── referencia/  cola-comandos.html · glossario.html
├── CLAUDE.md                 ← transforma o Claude em tutor do curso
└── LEIA-ME.md                ← como abrir e estudar
```

**Tutor embutido:** abrindo a pasta no Claude Code, o `CLAUDE.md` orienta o Claude a explicar aulas, corrigir exercícios e criar novas perguntas, sem entregar o gabarito de cara.

**Vídeos:** não estão no escopo, porque não consigo gerar vídeo com áudio. O "player de sessão" cumpre esse papel. Opcional: roteiros de gravação para você narrar no Clipchamp ou no PowerPoint.

## 6. Como vou produzir

1. **Fase 0:** aprovar esta SDD.
2. **Fase 1 (piloto):** componentes base (terminal, player, quiz, diagrama, progresso), `index.html`, cola de comandos, **Módulo 0 e Módulo 1 completos** com slides. Você estuda e aprova o estilo e a interatividade.
3. **Fase 2:** Módulos 2 a 6, com o TaskFlow até o MCP.
4. **Fase 3:** Módulos 7 a 10 e o desafio final.
5. **Fase 4:** revisão. Confiro na documentação atual cada comando citado e testo as páginas no Edge.

## 7. Critérios de aceite

- [ ] Abre por duplo clique e funciona sem internet.
- [ ] Toda aula tem os 9 blocos da §4.3 e pelo menos um terminal simulado ou player, mais um quiz.
- [ ] O progresso persiste ao fechar e reabrir o navegador, e a exportação e importação funcionam.
- [ ] Comandos conferidos na doc oficial e funcionando em PowerShell; recursos *preview/beta* sinalizados; saídas simuladas marcadas como "ilustrativas".
- [ ] O TaskFlow funciona do zero seguindo só as aulas.
- [ ] Nenhum dado pessoal, credencial ou conteúdo interno nos exemplos.

## 8. Riscos e premissas

| Item | Tratamento |
|---|---|
| A simulação pode divergir do Claude Code real | Saídas marcadas como ilustrativas; cada aula termina com prática na ferramenta real |
| O Claude Code muda toda semana | Selo "Conferido em" por aula; você pede ao tutor *"compare o curso com as novidades atuais"* |
| Recursos exigem plano pago ou de time | Cada aula indica o plano necessário |
| Ambiente corporativo (proxy, instalação, políticas de TI) | Confirmar com a TI da Firjan antes de instalar o Claude Code e conectar MCP; praticar em repositórios de teste |
| Volume de trabalho (~45 páginas interativas) | Produzir por fases, com o piloto validando o modelo antes |

## 9. Decisões que preciso de você

1. **Linguagem do TaskFlow:** Python ou TypeScript? *(Recomendo Python.)*
2. **Ponto de partida:** começo do zero (Módulo 0) ou você já usa terminal e Git e posso enxugar o início?
3. **Slides:** só em HTML ou também `.pptx`? *(Recomendo só HTML.)*

---
*Fontes: code.claude.com/docs (overview, llms.txt, whats-new, changelog) e academy.claude.com, consultadas em 17/11/2026.*
