# Podcasts do curso no NotebookLM

Uma série de 11 episódios, um por módulo, para quem não tem tempo de ler a aula nem de ver o vídeo.

## Como gerar (um caderno, 11 fontes, 11 episódios)

1. **Crie o caderno.** No NotebookLM, crie um caderno chamado "Curso Claude Code: do zero ao avançado".
2. **Envie as fontes.** Em **Adicionar fontes**, envie os 11 arquivos de `podcast/fontes/`. Cada arquivo é a fonte única de um módulo.
3. **Gere um episódio por vez:**
   - Na lista de fontes, **desmarque todas** e marque só a do episódio. Assim o áudio não mistura módulos.
   - No painel **Estúdio**, abra **Visão geral em áudio**, clique em **Personalizar** e confira se o idioma é português (Brasil).
   - Cole o prompt do episódio, que é completo e não precisa de mais nada, e gere o áudio.
4. **Baixe e renomeie** cada áudio, por exemplo `ep04-fluxo.m4a`.
5. **Ligue o episódio ao curso:**
   - Copie o arquivo para `podcast/audio/`.
   - No `assets/curso.js`, adicione ao módulo no `CATALOGO` o campo `podcast: { arq: "ep04-fluxo.m4a", min: 18 }`.
   - O episódio aparece em `podcasts.html`, e a trilha e a primeira aula do módulo ganham um link para ele.
   - Ou peça ao Claude Code: "liguei o episódio 4, coloque no curso".

## Episódios prontos

| Episódio | Arquivo | Duração | Conferido |
|---|---|---|---|
| 1 · Base | `podcast/audio/ep01-base.m4a` | 18 min | 23/11/2026: fiel à fonte; ressalva: diz que o Git guarda só as diferenças (na verdade guarda versões completas) |
| 2 · Primeiros passos | `podcast/audio/ep02-primeiros-passos.m4a` | 11 min | 24/11/2026 (versão 2 do prompt): seguiu a estrutura (abertura, três pontos-chave, desafio do concluir e gancho) e corrigiu auto mode e erro 403; ressalvas: diz "barra invertida" para os comandos (é a barra /), dá exemplos de auto mode que a fonte não traz (ler é seguro, apagar pasta trava) e afirma que instalação mal feita é o "motivo número 1" de abandono; ficou abaixo dos 15 min pedidos |
| 3 · Contexto é tudo | `podcast/audio/ep03-contexto.m4a` | 17 min | 24/11/2026 (versão 2 do prompt): seguiu a estrutura (abertura, três pontos-chave, desafio do /init e gancho) e é fiel à fonte; ressalvas: diz "custo entre 13 e 30 dólares por dia" (a fonte: média de ~US$ 13, abaixo de 30 para 90%), exagera regras conflitantes ("surta") e fecha com uma reflexão que repete "anota sem a gente ver" |
| 4 · Fluxo profissional | `podcast/audio/ep04-fluxo.m4a` | 13 min | 25/11/2026 (versão 2 do prompt): seguiu a estrutura (abertura, três pontos-chave, desafio da spec e gancho) e é fiel à fonte: quatro etapas, /clear depois de duas correções, plan mode (Shift+Tab aprova, Esc antes, Ctrl+G), spec de cinco seções com entrevista, testes commitados antes, injetar o "hoje", evidência e /code-review; ressalva: simplifica ao dizer que o /rewind só desfaz a conversa (ele também desfaz as edições do Claude; quem fica de fora são as correções do --fix) |
| 5 · Permissões e segurança | `podcast/audio/ep05-permissoes.m4a` | 15 min | 25/11/2026 (versão 2 do prompt): seguiu a estrutura (abertura, três pontos-chave, desafio do deny no .env e gancho) e é fiel à fonte, inclusive em auto mode (3 seguidos ou 20 no total), ordem deny, ask, allow, sandbox só no WSL 2 e revogar segredo vazado; ressalvas: abre com uma cena inventada (o assistente apaga o banco) e fecha com uma reflexão |

**Antes de usar, confira:**

- **Nomes de menus e limites:** os nomes dos menus, a seleção de fontes e o limite de caracteres do campo são suposição minha, a partir de como o NotebookLM costuma funcionar. Confira na tela. Cada prompt tem cerca de 900 a 1.100 caracteres. Se o campo recusar, corte o parágrafo "Regras".
- **Envio para serviço externo:** o NotebookLM é um serviço externo do Google. As fontes trazem só o conteúdo do curso, com dados fictícios. Mesmo assim, siga a política de uso de ferramentas externas da Firjan e, em caso de dúvida, consulte a área de segurança da informação antes de enviar.
- **Revisão humana:** os episódios são rascunhos. Ouça antes de compartilhar, porque o NotebookLM pode simplificar demais ou errar um comando.

Se você mudar alguma aula, gere as fontes de novo e substitua a fonte no caderno:

```powershell
python -X utf8 ferramentas/gera_fontes_podcast.py
```

---

## Episódio 1 de 11 · Base: terminal, Git e agentes (fonte: `modulo-00-base.md`)

```text
Episódio 1 de 11 da série "Claude Code: do zero ao avançado". Use apenas a fonte modulo-00-base.
Abra apresentando a série: 11 episódios, do zero ao avançado, com o projeto de treino TaskFlow (gerenciador de tarefas em Python) como fio condutor.
Tema: para quem nunca abriu um terminal. Desmistifique o terminal (pastas, comandos básicos, PowerShell no Windows) e mostre o Git como rede de segurança: o commit é um ponto de salvamento para desfazer o que o Claude fizer. Explique a diferença entre um chat de IA e um agente que lê arquivos, roda comandos e decide os próximos passos. Apresente as 4 competências de fluência em IA (Delegação, Descrição, Discernimento e Diligência), com um exemplo de cada.
Regras: português do Brasil, conversa entre um colega experiente e outro aprendendo; comandos falados como se pronunciam; não invente nada fora da fonte; não fale sobre como os dados são enviados, guardados ou usados para treinar a IA, a menos que a fonte diga; avise o que é opcional ou tem custo.
Feche com três pontos-chave, um desafio prático curto e o gancho: no próximo episódio, instalar o Claude Code e a primeira sessão.
```

## Episódio 2 de 11 · Primeiros passos (fonte: `modulo-01-primeiros-passos.md`)

Versão 2 (24/11/2026), escrita depois da conferência da primeira geração, que inventou afirmações sobre envio de dados e não seguiu a estrutura da série.

```text
Episódio 2 de 11 da série "Claude Code: do zero ao avançado". Use apenas a fonte modulo-01-primeiros-passos.
Comece dizendo literalmente "Este é o episódio 2 de 11" e lembre em uma frase o episódio 1: terminal, Git como rede de segurança e o que é um agente.
Tema: o primeiro dia com o Claude Code no Windows. Siga a ordem das aulas: instalar (as duas opções e por que o instalador nativo é o recomendado), a primeira sessão com o TaskFlow (explorar, pedir algo específico, aprovar lendo o diff, testar e fazer commit), os comandos com barra e os atalhos (Esc, Shift Tab, exclamação, arroba). Termine com a anatomia de um bom pedido: o quê, onde, restrições e critério de pronto, com um pedido ruim e a versão melhorada.
Precisão: o auto mode aprova sozinho só o que um classificador considera seguro, não tudo; o erro 403 vem de proxy ou firewall corporativo e a solução é falar com a TI, sem explicar mais nada; o primeiro commit guarda a versão inicial do TaskFlow; não fale de IA local.
Regras: português do Brasil, conversa entre um colega experiente e outro aprendendo; comandos falados como se pronunciam; não invente nada fora da fonte; não fale sobre como os dados são enviados, guardados ou usados para treinar a IA, nem sobre telemetria; avise o que é opcional ou tem custo. Duração: entre 15 e 20 minutos.
Feche com três pontos-chave, o desafio de pedir ao Claude o comando concluir no TaskFlow e fazer o commit, e o gancho: no episódio 3, por que o contexto é tudo.
```

## Episódio 3 de 11 · Contexto é tudo (fonte: `modulo-02-contexto.md`)

Versão 2 (24/11/2026), escrita depois de duas gerações: a primeira durou 32 minutos e chamou a memória de "secreta"; a segunda usou por engano o prompt do Episódio 2 e abriu como "episódio 2".

```text
Episódio 3 de 11 da série "Claude Code: do zero ao avançado". Use apenas a fonte modulo-02-contexto.
Comece dizendo literalmente "Este é o episódio 3 de 11" e lembre em uma frase o episódio 2: instalação, primeira sessão, comandos e atalhos.
Tema: a memória de trabalho do Claude, para iniciantes. Siga a ordem das aulas: a janela de contexto e por que as respostas pioram quando ela lota; o CLAUDE.md e o barra init; a memória automática e o barra memory; quando usar barra clear, barra compact e barra rewind; custo, modelos e barra usage.
Precisão: o CLAUDE.md é contexto, não trava, e nunca deve ter senhas; com regras conflitantes o Claude pode escolher qualquer uma; a memória automática fica na sua máquina e você revê tudo pelo barra memory, então não a chame de secreta, invisível ou blindada; depois do barra clear dá para retomar com barra resume; o rewind não desfaz comandos de terminal nem edições fora do Claude Code; o fast mode tem preço por token maior e, nas assinaturas, usa créditos extras. Não especule sobre o futuro da programação.
Regras: português do Brasil, conversa entre um colega experiente e outro aprendendo; comandos falados como se pronunciam; não invente nada fora da fonte; não fale sobre como os dados são enviados ou usados para treinar a IA. Duração: entre 15 e 20 minutos.
Feche com três pontos-chave, o desafio de rodar o barra init no TaskFlow e revisar o CLAUDE.md gerado, e o gancho: no episódio 4, um fluxo profissional de trabalho.
```

## Episódio 4 de 11 · Fluxo profissional (fonte: `modulo-03-fluxo.md`)

Versão 2 (24/11/2026), no formato que funcionou nos episódios 2 e 3.

```text
Episódio 4 de 11 da série "Claude Code: do zero ao avançado". Use apenas a fonte modulo-03-fluxo.
Comece dizendo literalmente "Este é o episódio 4 de 11" e lembre em uma frase o episódio 3: janela de contexto, CLAUDE.md, memória e custo.
Tema: trocar o "pede e torce" por método, no nível intermediário, usando o exemplo de dar data de vencimento às tarefas do TaskFlow. Siga a ordem das aulas: explorar, planejar, codar e commitar; o plan mode; o Spec-Driven Development; o TDD com o Claude; verificação e revisão.
Precisão: no plan mode o Claude lê e investiga, mas não edita até você aprovar; na tela de aprovação, Shift Tab aprova o plano, então para sair sem aprovar aperte Esc antes; Control G abre o plano no editor; a spec tem cinco seções curtas (objetivo, requisitos, fora de escopo, critérios de aceite no formato dado, quando, então, e casos de borda) e o Claude pode te entrevistar para escrevê-la; no TDD os testes são commitados antes e o Claude não pode alterá-los, senão o atalho para o verde é mudar o teste; "está pronto" não basta, peça evidência; o barra code-review revisa como alguém que não viu a conversa. Não especule sobre o futuro da programação.
Regras: português do Brasil, conversa entre um colega experiente e outro aprendendo; comandos falados como se pronunciam; não invente nada fora da fonte; não fale sobre como os dados são enviados ou usados para treinar a IA. Duração: entre 15 e 20 minutos.
Feche com três pontos-chave, o desafio de pedir ao Claude que te entreviste e escreva a spec do prazo em specs barra prazo ponto md, e o gancho: no episódio 5, permissões e segurança.
```

## Episódio 5 de 11 · Permissões e segurança (fonte: `modulo-04-permissoes.md`)

Versão 2 (25/11/2026), no formato que funcionou nos episódios 2 e 3.

```text
Episódio 5 de 11 da série "Claude Code: do zero ao avançado". Use apenas a fonte modulo-04-permissoes.
Comece dizendo literalmente "Este é o episódio 5 de 11" e lembre em uma frase o episódio 4: plan mode, spec, TDD e revisão.
Tema: deixar o Claude trabalhar sem perder o controle, no nível intermediário, com exemplos do TaskFlow. Siga a ordem das aulas: os modos de permissão; o auto mode; as regras allow, ask e deny; o sandbox; segredos e dados pessoais.
Precisão: Shift Tab troca o modo; bypass só serve para ambientes isolados e descartáveis; o auto mode usa um classificador, volta a perguntar depois de três bloqueios seguidos ou vinte no total, reduz pedidos mas não garante segurança, e um combinado na conversa não vira regra; a ordem é deny, depois ask, depois allow, e o bloqueio vence; escrever no CLAUDE.md não impede nada, só deny impede; o sandbox não funciona no Windows nativo, só no WSL 2, e por padrão a leitura continua ampla; tudo o que entra no contexto vai pela rede ao modelo, então segredo fica no ponto env com regra deny, e se vazar, revogue e gere outro, porque apagar não tira do histórico do Git. Segurança e dados pessoais na empresa passam pela área responsável; diga que é boa prática, não orientação jurídica.
Regras: português do Brasil, conversa entre um colega experiente e outro aprendendo; comandos falados como se pronunciam; não invente nada fora da fonte; sobre envio de dados, diga só o que a fonte diz. Duração: entre 15 e 20 minutos. Não especule sobre o futuro.
Feche com três pontos-chave, o desafio de criar uma regra deny para a leitura do ponto env no TaskFlow e conferir com barra permissions, e o gancho: no episódio 6, personalizar o Claude Code.
```

## Episódio 6 de 11 · Personalização (fonte: `modulo-05-personalizacao.md`)

```text
Episódio 6 de 11 da série "Claude Code: do zero ao avançado". Use apenas a fonte modulo-05-personalizacao.
Abra lembrando em uma frase o episódio anterior: modos de permissão, regras, sandbox e segredos.
Tema: deixar o Claude Code com a cara do seu time. Explique o settings.json e a ordem de precedência (usuário, projeto e local), com um exemplo de conflito. Mostre as skills como receitas que o Claude segue quando o assunto aparece, incluindo a skill de verificação que exige provas antes de dizer "pronto". Fale rapidamente de output styles e da status line. Termine com os hooks, comandos que rodam sempre em certos momentos, e deixe clara a diferença: a skill orienta, o hook garante.
Regras: português do Brasil, conversa entre um colega experiente e outro aprendendo; comandos falados como se pronunciam; não invente nada fora da fonte; não fale sobre como os dados são enviados, guardados ou usados para treinar a IA, a menos que a fonte diga; avise o que é opcional ou tem custo.
Feche com três pontos-chave, um desafio prático curto e o gancho: no próximo episódio, conectar o Claude a outros sistemas com MCP.
```

## Episódio 7 de 11 · MCP e integrações (fonte: `modulo-06-mcp.md`)

```text
Episódio 7 de 11 da série "Claude Code: do zero ao avançado". Use apenas a fonte modulo-06-mcp.
Abra lembrando em uma frase o episódio anterior: settings, skills, output styles e hooks.
Tema: conectar o Claude ao mundo de fora. Explique o MCP com a analogia de uma tomada padrão: um protocolo para o Claude usar ferramentas e dados de outros sistemas. Conte como instalar e autenticar um servidor, os cuidados com servidores de terceiros e como foi criar um servidor MCP simples em Python para o TaskFlow. Termine mostrando que o Claude Code também roda no VS Code e no app Desktop, e quando cada um é mais prático.
Regras: português do Brasil, conversa entre um colega experiente e outro aprendendo; comandos falados como se pronunciam; não invente nada fora da fonte; não fale sobre como os dados são enviados, guardados ou usados para treinar a IA, a menos que a fonte diga; avise o que é opcional ou tem custo.
Feche com três pontos-chave, um desafio prático curto e o gancho: no próximo episódio, começa o nível avançado, com subagentes e trabalho em paralelo.
```

## Episódio 8 de 11 · Subagentes e paralelismo (fonte: `modulo-07-subagentes.md`)

```text
Episódio 8 de 11 da série "Claude Code: do zero ao avançado". Use apenas a fonte modulo-07-subagentes.
Abra lembrando em uma frase o episódio anterior: MCP, servidores e integrações com VS Code e Desktop.
Tema: sair de "um assistente" para "uma pequena equipe". Explique os subagentes customizados (especialistas com contexto próprio, que devolvem só a conclusão), o trabalho em segundo plano e o fork de conversa. Mostre os worktrees como cópias isoladas do projeto para tarefas paralelas sem conflito. Apresente o agent view, o barra goal e a orquestração em escala, avisando o que é experimental. Dê um critério simples de quando paralelizar e de quando o custo e a revisão não compensam.
Regras: português do Brasil, conversa entre um colega experiente e outro aprendendo; comandos falados como se pronunciam; não invente nada fora da fonte; não fale sobre como os dados são enviados, guardados ou usados para treinar a IA, a menos que a fonte diga; avise o que é opcional ou tem custo.
Feche com três pontos-chave, um desafio prático curto e o gancho: no próximo episódio, empacotar tudo num plugin.
```

## Episódio 9 de 11 · Plugins (fonte: `modulo-08-plugins.md`)

```text
Episódio 9 de 11 da série "Claude Code: do zero ao avançado". Use apenas a fonte modulo-08-plugins.
Abra lembrando em uma frase o episódio anterior: subagentes, segundo plano, worktrees e orquestração.
Tema: empacotar o que a série ensinou. Explique o plugin como uma caixa que junta skills, agentes, hooks e servidores MCP para instalar de uma vez. Conte como foi montar o plugin do TaskFlow: o manifesto, as pastas e a validação. Explique por que medir com claude plugin eval, que é opcional e tem custo, e por isso pede um teto de gastos. Mostre como um marketplace local permite compartilhar o plugin com o time. Termine com os cuidados ao instalar plugins de terceiros.
Regras: português do Brasil, conversa entre um colega experiente e outro aprendendo; comandos falados como se pronunciam; não invente nada fora da fonte; não fale sobre como os dados são enviados, guardados ou usados para treinar a IA, a menos que a fonte diga; avise o que é opcional ou tem custo.
Feche com três pontos-chave, um desafio prático curto e o gancho: no próximo episódio, o Claude trabalhando sozinho em automações.
```

## Episódio 10 de 11 · Automação (fonte: `modulo-09-automacao.md`)

```text
Episódio 10 de 11 da série "Claude Code: do zero ao avançado". Use apenas a fonte modulo-09-automacao.
Abra lembrando em uma frase o episódio anterior: plugins, avaliação e marketplace.
Tema: o Claude trabalhando sem ninguém olhando. Explique o claude traço p em scripts (a pergunta entra, a resposta sai), a revisão de código automática, o Claude no GitHub Actions e as tarefas agendadas e loops. Ponto central: quanto menos você acompanhou, mais precisa conferir. Explique o hook de Stop, que só deixa o Claude encerrar quando os testes passam, e a proteção contra laço sem fim. Fale de custos e de dar só as permissões mínimas às automações.
Regras: português do Brasil, conversa entre um colega experiente e outro aprendendo; comandos falados como se pronunciam; não invente nada fora da fonte; não fale sobre como os dados são enviados, guardados ou usados para treinar a IA, a menos que a fonte diga; avise o que é opcional ou tem custo.
Feche com três pontos-chave, um desafio prático curto e o gancho: no último episódio, construir o seu próprio agente com o Agent SDK.
```

## Episódio 11 de 11 · Agent SDK (fonte: `modulo-10-agent-sdk.md`)

```text
Episódio 11 de 11, o final da série "Claude Code: do zero ao avançado". Use apenas a fonte modulo-10-agent-sdk.
Abra lembrando em uma frase o episódio anterior: claude traço p, revisão automática, GitHub Actions e agendamentos.
Tema: nível expert, sem perder a clareza. Explique o loop do agente (pensar, usar uma ferramenta, observar e repetir) e como o Agent SDK em Python deixa você montar o seu próprio agente. Conte como criar ferramentas próprias, controlar permissões e hooks no código e usar subagentes, sempre acompanhando o custo. Use como fio condutor o agente TaskFlow construído no módulo.
Regras: português do Brasil, conversa entre um colega experiente e outro aprendendo; comandos falados como se pronunciam; não invente nada fora da fonte; não fale sobre como os dados são enviados, guardados ou usados para treinar a IA, a menos que a fonte diga; avise o que é opcional ou tem custo.
Feche a série: recapitule a jornada do terminal até o agente próprio, explique quando usar o Claude Code pronto e quando construir um agente, e convide o ouvinte a fazer o quiz final e emitir o certificado do curso.
```
