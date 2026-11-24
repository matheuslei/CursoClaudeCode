# Módulo 7: Subagentes e paralelismo

Curso "Claude Code: do zero ao avançado" (estudo pessoal, em português do Brasil). Nível: Avançado. Tema: Subagentes, segundo plano, worktrees, agent view, /goal e equipes.

Projeto de treino usado em todo o curso: TaskFlow, um gerenciador de tarefas de linha de comando em Python, só com a biblioteca padrão. Dados de exemplo são fictícios.

Aulas: 7.1 Subagentes customizados; 7.2 Segundo plano e fork; 7.3 Worktrees; 7.4 Agent view e /goal; 7.5 Orquestração em escala.

## Aula 7.1: Subagentes customizados

### Resumo do vídeo da aula

Nesta aula, você vai criar um ajudante especializado: um subagente que revisa o TaskFlow e devolve só o resumo. Quando o Claude lê dezenas de arquivos para responder, tudo isso ocupa a sua janela de contexto. Um subagente trabalha numa janela própria e devolve só o resultado. Cada subagente é um arquivo Markdown na pasta ponto claude barra agents. No topo, o nome e a description, que diz quando usar. Tools limita as ferramentas. O resto do arquivo são as instruções. Você aciona pelo nome, num pedido normal, ou com arroba agent, hífen e o nome. O Claude também delega sozinho quando a description combina com o pedido. E alguns já vêm prontos: o Explore, que busca no código só lendo, o Plan, que pesquisa no modo de planejamento, e o general purpose, para tarefas com várias etapas. Mas nem tudo vale delegar. Mudança pequena e conversa de vai e volta ficam aqui. Cada subagente começa sem contexto e gasta os próprios tokens.

### Conteúdo da aula

Objetivo: saber quando vale delegar uma tarefa a um subagente e criar o seu próprio, um revisor do TaskFlow que você chama pelo nome e que devolve só o resumo do que encontrou.

#### Por que importa

No Módulo 2 você viu que a janela de contexto é o recurso mais precioso da sessão. Toda vez que o Claude lê vinte arquivos para responder uma pergunta, essas leituras ficam na conversa e empurram o resto para fora.

Um subagente é um assistente que roda numa janela de contexto própria, com instruções e ferramentas próprias. Ele faz o trabalho pesado e devolve à conversa principal só o resultado. Você ganha duas coisas:

##### 🧹 Contexto preservado

As leituras e buscas do subagente não entram na sua conversa. Só o resumo volta.

##### 🎯 Especialização

Um revisor com regras fixas, só com ferramentas de leitura, faz sempre a mesma revisão, do mesmo jeito.

Analogia É como pedir a um colega que leia um relatório de 80 páginas e te mande um parágrafo. Você não precisa ler as 80 páginas; só precisa do parágrafo.

#### Conceito: como a delegação acontece

#### Anatomia de um subagente

Cada subagente é um arquivo Markdown com um cabeçalho YAML (frontmatter). O corpo do arquivo vira as instruções do subagente (o prompt de sistema).

.claude/agents/revisor-taskflow.md --- name: revisor-taskflow description: Revisa mudanças no código do TaskFlow antes de juntar. Use depois de alterar qualquer arquivo .py ou quando o usuário pedir uma revisão. Somente leitura. tools: Read, Grep, Glob, Bash model: inherit --- Você é o revisor do TaskFlow. Rode `python -m unittest`, confira docstrings, dados fictícios e mensagens em português. Não edite arquivos. Responda com: Testes, Achados (por gravidade) e Veredito.

| Campo | Obrigatório? | Para quê

| name | sim | Identificador do subagente (letras minúsculas e hífens).

| description | sim | Quando usar. É o que o Claude lê para decidir se delega sozinho. A parte mais importante do arquivo.

| tools | não | Ferramentas permitidas, separadas por vírgula (ou lista YAML). Se omitir, herda todas as disponíveis para subagentes.

| model | não | sonnet, opus, haiku, fable, um ID completo ou inherit (o mesmo da conversa).

Existem outros campos opcionais (disallowedTools, permissionMode, maxTurns, skills, mcpServers, hooks, memory, isolation…). Eles aparecem na referência oficial; nesta aula, os quatro acima bastam.

##### Onde o arquivo fica

| Escopo | Pasta | Quando usar

| Projeto | .claude/agents/ | Subagente do projeto, compartilhável com o time pelo Git.

| Usuário | ~/.claude/agents/ | Seu, vale em todos os seus projetos.

| Sessão | claude --agents '{...}' | Definido em JSON só para aquela sessão (testes rápidos).

Se o mesmo nome existir em dois lugares, o de projeto vence o de usuário. Subagentes de plugins (Módulo 8) e os gerenciados pela organização também entram nessa ordem.

Reinicie depois do primeiro arquivo Editar um subagente existente vale em poucos segundos, sem reiniciar. Mas, ao criar o primeiro arquivo numa pasta agents nova, reinicie a sessão para o Claude Code carregá-lo.

E o comando /agents? Na versão atual, /agents só mostra um lembrete: peça ao Claude para criar o subagente ou edite os arquivos de .claude/agents/ e ~/.claude/agents/. Em versões antigas (até a 2.1.197) ele abria um assistente com abas. Se o seu ainda abrir o assistente, atualize com claude update.

##### Como acionar

- Pelo nome, em linguagem normal: "use o subagente revisor-taskflow para revisar minhas mudanças".

- Por menção: digite @ e escolha revisor-taskflow (agent) na lista, ou escreva @agent-revisor-taskflow.

- Automático: o Claude delega sozinho quando o pedido combina com a description. Frases como "use proactively" incentivam isso.

- Sessão inteira como o subagente: claude --agent revisor-taskflow.

##### Subagentes que já vêm prontos

##### 🔎 Explore

Rápido e somente leitura, feito para buscar e analisar o código.

##### 🗺 Plan

Pesquisa o contexto no plan mode (Módulo 3) antes de apresentar o plano.

##### 🧰 general-purpose

Para tarefas com várias etapas que exigem explorar e agir.

##### Quando NÃO delegar

| Situação | Por quê

| Mudança pequena e pontual | O subagente começa sem contexto e precisa se situar; fazer aqui é mais rápido.

| Tarefa com muito vai e volta | Você precisa conversar e ajustar; o subagente só devolve o resultado final.

| Pergunta sobre o que já está na conversa | A resposta já está no contexto. Use /btw para uma pergunta rápida paralela.

| Muitos subagentes de uma vez | Cada um gasta os próprios tokens e os resultados detalhados também ocupam contexto quando voltam.

#### Exercício real: o revisor do TaskFlow

Use a pasta de treino do Módulo 7. Se ainda não criou, siga o README da etapa 07 (passo 1; o Git do passo 2 é opcional nesta aula).

- Na pasta de treino, abra claude e peça: "crie um subagente de projeto chamado revisor-taskflow, somente leitura (Read, Grep, Glob, Bash), que rode os testes e revise docstrings, dados fictícios e mensagens em português, respondendo com Testes, Achados e Veredito". Ou crie o arquivo .claude/agents/revisor-taskflow.md à mão.

- Leia o arquivo criado. A description diz quando usar? tools está restrito?

- Como é o primeiro arquivo da pasta agents, saia e abra o claude de novo.

- Peça: "use o subagente revisor-taskflow para revisar o tarefas.py" (ou @agent-revisor-taskflow revise o tarefas.py).

- Observe: a chamada aparece com o nome do subagente, e na conversa volta só o relatório. Rode /context e compare com uma sessão em que você pediu a mesma revisão direto.

Dica O tarefas.py da etapa 07 tem funções sem docstring de propósito. Um bom revisor deve apontar isso.

Ver o gabarito

Arquivo também disponível em projeto-taskflow/etapa-07/gabarito/.claude/agents/revisor-taskflow.md.

.claude/agents/revisor-taskflow.md --- name: revisor-taskflow description: Revisa mudanças no código do TaskFlow antes de juntar (merge). Use depois de implementar ou alterar qualquer arquivo .py do projeto, ou quando o usuário pedir uma revisão. Somente leitura; não edita arquivos. tools: Read, Grep, Glob, Bash model: inherit --- Você é o revisor do TaskFlow, uma CLI de tarefas em Python que usa só a biblioteca padrão. 1. Descubra o que mudou (git status / git diff; sem Git, revise os arquivos citados). 2. Rode python -m unittest e anote o resultado. 3. Verifique: testes passam e funcionalidade nova tem teste; nomes em português e docstring curta; só biblioteca padrão; números 1-based com _indice_valido; só dados fictícios; mensagens em português. 4. Não edite nenhum arquivo. Responda: **Testes**, **Achados** (🔴 Grave / 🟡 Ajustar / 🟢 Sugestão) e **Veredito** (pode juntar / ajustar antes).

Resultado esperado (ilustrativo): testes passaram (6); 🟡 adicionar, listar, concluir, remover e main sem docstring; veredito "ajustar antes".

Por que Bash se é somente leitura? Para rodar os testes e o git diff. A instrução "não edite" mais a ausência de Edit/Write em tools garantem que ele não altera arquivos; os comandos Bash continuam passando pelas suas permissões (Módulo 4).

#### Erros comuns

##### Description vaga

"Ajuda com código" não diz quando usar: o Claude delega na hora errada ou nunca. Diga a situação: "use depois de alterar arquivos .py…".

##### Ferramentas demais

Sem tools, o subagente herda todas, inclusive editar. Um revisor só precisa ler e testar.

##### Esperar que ele saiba da conversa

Um subagente novo começa sem o seu histórico. Passe no pedido o que ele precisa saber.

##### Não reiniciar

O primeiro arquivo numa pasta agents nova só carrega depois de reiniciar a sessão.

##### Consigo fazer?

#### Para ir além

- Referência de subagentes (em inglês): todos os campos do frontmatter, memória persistente, hooks e subagentes em segundo plano.

- Próxima aula: mandar trabalho para segundo plano e fazer fork da conversa.

- Introduction to subagents (Anthropic Academy, gratuito, em inglês).

## Aula 7.2: Segundo plano e fork

### Resumo do vídeo da aula

Nesta aula, você vai deixar o Claude trabalhando enquanto continua conversando: segundo plano e fork. Um comando demorado ou um subagente ocupando a tela? Aperte control B. O trabalho vai para o segundo plano e você volta a digitar. O comando barra tasks mostra o que está rodando e o que terminou. Para parar todos os subagentes em segundo plano, control X e depois control K, duas vezes. Fork é copiar a conversa. Barra fork cria uma sessão paralela, barra branch troca para uma ramificação, e barra subtask manda um subagente com todo o histórico. Lembre: cada trabalho paralelo gasta os próprios tokens. Paralelize o que é independente, e confira o custo com barra usage.

### Conteúdo da aula

Objetivo: manter o Claude trabalhando sem travar a conversa, acompanhar e parar o que está rodando, e ramificar a conversa para testar outro caminho sem perder o atual.

#### Por que importa

Até aqui, cada pedido ocupava a sessão: você esperava o Claude terminar para mandar o próximo. Isso é ruim quando a tarefa é longa, como rodar uma bateria de testes ou uma revisão grande.

##### ⏳ Segundo plano

O trabalho continua rodando, e você continua conversando. O resultado chega quando terminar.

##### 🌿 Fork

Você copia a conversa no ponto atual e testa outra ideia na cópia. O original fica intacto.

Analogia Segundo plano é colocar a roupa na máquina e ir fazer outra coisa. Fork é tirar uma cópia do documento antes de reescrever um capítulo inteiro.

#### Conceito: o que roda onde

#### Os comandos

##### Mandar para segundo plano e acompanhar

| Comando ou atalho | O que faz

| Ctrl+B | Manda para segundo plano o comando Bash ou o subagente que está rodando. Quem usa tmux aperta duas vezes.

| Pedir em texto | "rode os testes em segundo plano" também funciona.

| /tasks (ou /bashes) | Mostra e gerencia o trabalho em segundo plano da sessão, inclusive subagentes que já terminaram.

| Ctrl+X Ctrl+K | Para todos os subagentes em segundo plano da sessão. Aperte duas vezes em até 3 segundos para confirmar.

- Subagentes que a conversa principal inicia já começam em segundo plano por padrão.

- Se um subagente em segundo plano precisar de permissão, o pedido aparece na sua sessão, com o nome dele. Esc recusa só aquela ação.

- Comandos em segundo plano terminam quando você sai do Claude Code.

- Ctrl+T não é a lista de segundo plano: ele mostra ou esconde a lista de afazeres do Claude.

##### Ramificar a conversa (fork)

| Comando | O que acontece | Onde você fica

| /branch [nome] | Cria uma ramificação da conversa neste ponto. | Na ramificação. O original fica salvo; volte com /resume.

| /fork [pedido] | Copia a conversa para uma nova sessão em segundo plano. Com um pedido, a cópia já começa a trabalhar. | Na conversa atual. A cópia aparece no agent view (aula 4).

| /subtask <tarefa> | Inicia um subagente com todo o histórico (subagente fork). O resultado volta para esta conversa. | Na conversa atual.

| claude --continue --fork-session | Pela linha de comando: retoma a última conversa como uma sessão nova. | Numa sessão nova; a original não muda.

Subtask ou subagente comum? O subagente da aula 1 começa sem o seu histórico. O /subtask começa com ele: bom quando a tarefa depende do que vocês já discutiram.

Fork e arquivos Copiar a conversa não copia a pasta. Duas sessões editando os mesmos arquivos podem se atrapalhar. Por isso, o Claude Code orienta a cópia do /fork a criar um worktree próprio antes de editar código; worktrees são o assunto da próxima aula.

##### E o custo?

Cada subagente e cada sessão paralela gasta os próprios tokens. Paralelize o que é independente; para uma tarefa curta, esperar é mais barato. Confira o gasto com /usage (também /cost e /stats) e o contexto com /context.

#### Exercício real: revisor em segundo plano

Use a pasta de treino da aula 1 (README da etapa 07), com o subagente revisor-taskflow já criado.

- Abra claude na pasta de treino e peça: "use o subagente revisor-taskflow para revisar o tarefas.py".

- Enquanto ele trabalha (se ele aparecer em primeiro plano, aperte Ctrl+B), faça outra pergunta: "explique em duas linhas o que a função _indice_valido faz".

- Rode /tasks e veja o revisor na lista. Espere o relatório chegar na conversa.

- Agora rode /branch teste-docstrings e peça: "adicione docstrings curtas a todas as funções do tarefas.py". Rode python -m unittest.

- Rode /resume e volte para a conversa original. Ela não sabe de nada do que aconteceu na ramificação. (Os arquivos, porém, mudaram: a ramificação é da conversa, não da pasta.)

- Rode /usage e veja quanto a sessão gastou.

Ver o que observar

- Passo 2: a sua pergunta é respondida enquanto o revisor ainda roda. Se ele pedir permissão para python -m unittest, o pedido aparece na sua tela com o nome dele.

- Passo 3: /tasks lista o subagente, rodando ou concluído.

- Passo 5: esta é a lição mais importante. /branch separa a conversa; os arquivos são os mesmos. Para separar arquivos, use worktrees (aula 3). Se quiser desfazer as docstrings, use git checkout -- tarefas.py na pasta de treino ou o rewind (Esc Esc, Módulo 3).

#### Erros comuns

##### Achar que fork copia arquivos

/branch e /fork copiam a conversa. A pasta é a mesma, a menos que a sessão use um worktree.

##### Sair com trabalho rodando

Comandos em segundo plano terminam quando você sai do Claude Code. Confira /tasks antes de sair.

##### Confundir Ctrl+T e /tasks

Ctrl+T mostra a lista de afazeres do Claude. O trabalho em segundo plano está em /tasks.

##### Paralelizar tudo

Cada trabalho paralelo gasta tokens próprios. Tarefa curta e dependente fica em primeiro plano.

##### Consigo fazer?

#### Para ir além

- Modo interativo (em inglês): atalhos e comandos em segundo plano.

- Lista de comandos (em inglês): /fork, /branch, /subtask e /tasks.

- Sessões na nuvem: o Claude Code também roda tarefas em máquinas da Anthropic (claude --cloud), fora deste módulo, que trabalha só na sua máquina. Veja Claude Code on the web (em inglês). Antes de usar com código da empresa, confirme com a área de segurança da informação.

- Próxima aula: worktrees, para separar também os arquivos.

## Aula 7.3: Worktrees

### Resumo do vídeo da aula

Nesta aula, duas sessões do Claude vão mexer no mesmo projeto ao mesmo tempo, sem uma atropelar a outra. O problema: duas sessões editando a mesma pasta. Uma salva por cima da outra, e os testes de uma quebram por causa da outra. A solução é o worktree do Git: uma segunda pasta de trabalho, com a sua própria branch, ligada ao mesmo repositório. Com claude, hífen hífen worktree e um nome, o Claude Code cria a pasta em ponto claude barra worktrees e a branch worktree hífen nome. Cada sessão faz a sua parte em arquivos diferentes. No fim, você junta as branches com git merge e roda os testes. Ao sair, se o worktree não tem mudanças, ele pode ser removido sozinho. Se tem, o Claude pergunta se você quer manter.

### Conteúdo da aula

Objetivo: rodar duas sessões do Claude Code no mesmo projeto ao mesmo tempo, cada uma num worktree próprio, e juntar as duas mudanças no fim com os testes passando.

#### Por que importa

Na aula 2 você viu que fork copia a conversa, mas não a pasta. Se duas sessões editam a mesma pasta ao mesmo tempo, uma pode salvar por cima da outra, e os testes de uma quebram por causa do código pela metade da outra.

Um worktree do Git resolve isso: é uma segunda pasta de trabalho, com a sua própria branch, ligada ao mesmo repositório. Cada sessão trabalha na sua pasta; no fim, você junta as branches.

Analogia Duas pessoas escrevendo no mesmo documento, cada uma numa cópia própria. No fim, alguém junta os dois trechos. Sem as cópias, uma apagaria o parágrafo da outra.

Precisa de Git Worktree é um recurso do Git. Nesta aula você usa a pasta de treino (cópia fora do curso, com Git só local; veja o README da etapa 07). A pasta do curso continua sem Git. Sem Git na máquina, faça a simulação e o plano B no fim do exercício.

#### Conceito: uma pasta por sessão

#### Como usar

##### O jeito do Claude Code: --worktree

PowerShell, na pasta de treino claude --worktree exportar # ou, abreviado: claude -w exportar

| O quê | Onde

| Pasta do worktree | .claude/worktrees/exportar/, na raiz do repositório

| Branch nova | worktree-exportar

| Sem nome? | O Claude Code inventa um, como bright-running-fox

| Ponto de partida | A branch padrão do repositório remoto; sem remoto (o caso da pasta de treino), o seu HEAD local

- Para uma segunda sessão paralela, abra outro terminal e rode o comando com outro nome.

- Coloque .claude/worktrees/ no .gitignore (o da etapa 07 já tem), para as pastas não aparecerem como arquivos novos.

- Se o Claude nunca rodou na pasta, rode claude uma vez antes para aceitar o aviso de confiança. Senão o --worktree para com erro.

- Você também pode pedir no meio da sessão: "trabalhe num worktree".

##### Ao sair da sessão

| Situação do worktree | O que o Claude Code faz

| Sem mudanças, sessão sem nome | Remove o worktree e a branch sozinho.

| Sem mudanças, sessão com nome | Pergunta antes, para você poder manter.

| Com mudanças ou commits novos | Pergunta se mantém ou remove. Manter preserva a pasta e a branch; para voltar, use o comando claude --worktree <nome> --resume que ele mostra ao sair.

Remover apaga o trabalho Escolher remover um worktree com mudanças apaga a pasta e a branch, com tudo o que estava nelas. Faça commit antes de sair se quiser guardar.

##### O jeito manual: git worktree

Útil para usar uma branch que já existe ou criar a pasta fora do repositório.

PowerShell git worktree add ../taskflow-exportar -b exportar # cria pasta e branch cd ../taskflow-exportar claude # sessão nessa pasta git worktree list # lista os worktrees git worktree remove ../taskflow-exportar # remove quando terminar

##### Subagentes em worktree

Um subagente também pode trabalhar no próprio worktree: peça "use worktrees para os seus agentes" ou ponha isolation: worktree no frontmatter do subagente (aula 1). Sem mudanças, o worktree dele é removido sozinho ao terminar.

#### Exercício real: duas funcionalidades em paralelo

Pré-requisito: pasta de treino com Git e o primeiro commit (passos 1 e 2 do README da etapa 07). As duas mudanças vão em arquivos diferentes, como manda o CLAUDE.md do projeto.

- Terminal 1, na pasta de treino: claude -w exportar. Peça: "crie exportar.py, que exporta as tarefas para CSV (numero, titulo, feita), com teste em tests/test_exportar.py, sem alterar tarefas.py. Rode os testes e faça commit".

- Terminal 2, na mesma pasta de treino: claude -w estatisticas. Peça: "crie estatisticas.py, que conta tarefas feitas e pendentes, com teste em tests/test_estatisticas.py, sem alterar tarefas.py. Rode os testes e faça commit".

- Enquanto as duas trabalham, num terceiro terminal, rode git worktree list. Você deve ver três pastas: a principal e as duas em .claude/worktrees/.

- Quando as duas terminarem, saia delas (/exit) e escolha manter os worktrees.

- Na pasta principal, junte as branches e rode os testes:

PowerShell, pasta de treino git merge worktree-exportar git merge worktree-estatisticas python -m unittest

- Opcional: peça ao revisor-taskflow (aula 1) uma revisão antes do merge.

- Limpe: git worktree remove .claude/worktrees/exportar, o mesmo para estatisticas, e git branch -d worktree-exportar worktree-estatisticas.

O merge abriu um editor? O Git pode pedir uma mensagem para o commit de merge. Salve e feche o editor, ou use git merge worktree-estatisticas -m "Junta estatisticas".

Ver o gabarito

Uma solução está em projeto-taskflow/etapa-07/gabarito/: exportar.py, estatisticas.py e os testes em gabarito/tests/. Elas usam tarefas.carregar() sem alterar o tarefas.py.

gabarito/estatisticas.py (trecho) def contar(lista): """Conta as tarefas por status e devolve um dicionário com total, feitas e pendentes.""" feitas = sum(1 for t in lista if t.get("feita")) return {"total": len(lista), "feitas": feitas, "pendentes": len(lista) - feitas}

Resultado esperado: depois dos dois merges, python -m unittest roda os testes antigos e os novos (11 com o gabarito) e mostra OK. Sem conflito, porque cada sessão criou arquivos próprios.

Este fluxo foi testado com git worktree add numa cópia de rascunho em 19/11/2026: dois worktrees, commits, dois merges e 11 testes passando.

Plano B: sem Git na máquina

Faça a simulação do bloco 5 e o exercício assim: copie a pasta de treino duas vezes (treino-exportar e treino-estatisticas), abra um claude em cada uma e, no fim, copie os arquivos novos de volta para a pasta original. É o mesmo raciocínio do worktree, só que feito à mão. Para instalar o Git numa máquina corporativa, peça à TI.

#### Erros comuns

##### Duas sessões no mesmo arquivo

Worktree evita que uma sobrescreva a outra durante o trabalho, mas, se as duas mudarem o tarefas.py, o merge pode dar conflito. Divida o trabalho por arquivo.

##### Fora de um repositório

Fora do Git aparece Can only use --worktree in a git repository. Rode git init, faça um commit e tente de novo.

##### Remover sem commit

Remover um worktree com mudanças apaga o trabalho. Faça commit antes de sair.

##### Esquecer o .gitignore

Sem .claude/worktrees/ no .gitignore, as pastas aparecem como arquivos novos no git status.

##### Consigo fazer?

#### Para ir além

- Worktrees no Claude Code (em inglês): .worktreeinclude para copiar arquivos ignorados, escolha da branch base e solução de problemas.

- Documentação do git worktree (em inglês).

- Próxima aula: acompanhar várias sessões no agent view e trabalhar até um objetivo com /goal.

## Aula 7.4: Agent view e /goal

### Resumo do vídeo da aula

Nesta aula: acompanhar várias sessões numa tela só, e deixar o Claude trabalhando até cumprir um objetivo. O comando claude agents abre o agent view: uma lista das sessões em segundo plano, mostrando quem trabalha, quem espera você e quem terminou. Para criar uma sessão em segundo plano, use claude hífen hífen bg com o pedido. Dentro de uma sessão aberta, barra bg manda ela para lá. Já o barra goal define uma condição de término. Depois de cada turno, um modelo avaliador lê a conversa e decide se a condição foi cumprida. Escreva uma condição verificável, com prova na conversa e um limite de turnos. E barra goal clear cancela quando quiser.

### Conteúdo da aula

Objetivo: acompanhar várias sessões em segundo plano numa tela só e deixar o Claude trabalhando sozinho até cumprir uma condição que você consegue verificar.

#### Por que importa

Com segundo plano, fork e worktrees, você logo tem três ou quatro sessões rodando. Ficar trocando de terminal para saber qual terminou e qual está esperando resposta cansa. E, em tarefas longas, responder "continue" a cada turno também cansa.

##### 🗂 Agent view

Uma lista de todas as sessões em segundo plano: quem trabalha, quem espera você e quem terminou.

##### 🎯 /goal

Você define quando a tarefa acaba. O Claude segue turno após turno até um avaliador confirmar.

Recurso em prévia O agent view está em research preview: telas e atalhos podem mudar. Se algo desta aula não bater com a sua versão, confira a página oficial ou rode claude update.

#### Conceito: o ciclo do /goal

#### Como usar

##### Agent view

| Comando ou tecla | O que faz

| claude agents | Abre o agent view. Esc volta para o terminal.

| claude --bg "pedido" | Cria uma sessão já em segundo plano. Com --name "rótulo", ela ganha um nome.

| /bg (ou /background) | Manda a sessão aberta para segundo plano.

| ← com o campo vazio | Manda a sessão para segundo plano e abre o agent view.

| ↑ ↓ | Escolhe uma sessão na lista.

| Espaço | Espia a última saída ou a pergunta pendente e responde sem sair da lista.

| Enter ou → | Entra na sessão para ver a conversa inteira. ← com o campo vazio sai de novo, sem parar a sessão.

| Ctrl+X | Para a sessão escolhida. Apertar de novo em até 2 segundos remove da lista.

Teclas conferidas em 19/11/2026; em prévia, podem mudar.

- As sessões continuam rodando mesmo se você fechar o terminal.

- Num repositório Git, cada sessão em segundo plano cria um worktree próprio antes de editar arquivos (aula 3). Fora do Git, elas não ficam isoladas umas das outras.

- Remover uma sessão do agent view apaga também o worktree dela, com mudanças sem commit. Faça commit antes.

- Se claude agents só imprimir a lista de subagentes e sair, a sua versão é antiga: rode claude update.

##### /goal

| Comando | O que faz

| /goal <condição> | Define o objetivo e já começa a trabalhar. Só existe um objetivo por sessão; um novo substitui o anterior.

| /goal | Mostra o objetivo atual: condição, tempo, turnos avaliados, tokens gastos e o último motivo do avaliador.

| /goal clear | Cancela o objetivo antes do fim (também aceita stop, off, cancel…).

Depois de cada turno, um modelo pequeno e rápido lê a conversa e responde: ainda não (o Claude continua), cumprido (o objetivo termina) ou impossível (o objetivo termina como falha).

O avaliador só lê a conversa Ele não roda comandos nem abre arquivos. Por isso a condição precisa de uma prova que apareça na conversa: "os testes passam e a saída aparece nesta conversa", e não só "o código está bom".

##### Uma boa condição tem

- Um fim mensurável: testes passando, um arquivo criado, uma contagem.

- Como provar: "python -m unittest mostra OK".

- Restrições: "sem alterar os testes existentes".

- Um limite: "ou pare após 15 turnos". Sem limite, uma tarefa difícil pode gastar muito.

exemplo /goal todas as funções de tarefas.py têm docstring curta, python -m unittest mostra OK nesta conversa, nenhum teste existente foi alterado, ou pare após 15 turnos

Permissões continuam valendo O /goal não muda o modo de permissão. No modo manual, o Claude ainda pede para rodar os testes. Para deixar rodar sozinho, use um modo mais solto (Módulo 4) só na pasta de treino.

#### Exercício real: sessões em segundo plano e um objetivo

Use a pasta de treino com Git (README da etapa 07).

##### Parte A: agent view

- No PowerShell, na pasta de treino: claude --bg --name "testes" "rode python -m unittest e resuma o resultado em uma linha".

- Crie uma segunda: claude --bg --name "leitura" "liste as funções de tarefas.py que não têm docstring".

- Rode claude agents. Veja as duas na lista e o estado de cada uma.

- Escolha uma com ↑ ↓ e aperte Espaço para espiar a resposta. Se ela pedir permissão, responda por ali.

- Entre numa delas com Enter e saia com ← (campo vazio). Ao terminar, pare e remova as duas com Ctrl+X.

##### Parte B: /goal

- Abra claude na pasta de treino.

- Rode a condição do exemplo acima (docstrings + testes OK + limite de 15 turnos).

- Acompanhe o indicador ◎ /goal active. No meio, rode /goal para ver o status.

- Quando o avaliador marcar como cumprido, rode python -m unittest você mesmo e confira as docstrings. Não confie só no avaliador.

Ver o que observar

- Parte A: a sessão "testes" termina rápido com algo como "6 testes, OK". A "leitura" lista adicionar, listar, concluir, remover e main. Nenhuma das duas edita arquivos, então não precisam de worktree.

- Parte B: em geral o objetivo é cumprido em poucos turnos: o Claude adiciona as docstrings, roda os testes e a saída OK aparece na conversa. O avaliador lê essa saída e marca como cumprido. Se você tirar o trecho "nesta conversa", o avaliador pode ficar sem prova.

- Para desfazer: git checkout -- tarefas.py na pasta de treino.

#### Erros comuns

##### Condição sem prova

"O código está bom" não aparece na conversa. Peça uma saída concreta, como o resultado dos testes.

##### Sem limite de turnos

Uma condição difícil pode render muitos turnos e tokens. Inclua "ou pare após N turnos".

##### Remover sessão com trabalho

Remover no agent view apaga o worktree da sessão. Faça commit antes.

##### Paralelo fora do Git

Sem Git, sessões em segundo plano não ganham worktree e podem editar os mesmos arquivos.

##### Consigo fazer?

#### Para ir além

- Agent view (em inglês): filtros, fixar sessões e como desligar o recurso.

- /goal (em inglês): como o avaliador funciona, erros que cancelam o objetivo e uso com claude -p.

- Próxima aula: orquestração em escala e equipes de agentes.

## Aula 7.5: Orquestração em escala

### Resumo do vídeo da aula

Última aula do módulo: escolher o jeito certo de orquestrar vários agentes. São três níveis. Subagentes dentro de uma sessão. Várias sessões em paralelo, cada uma no seu worktree. E equipes de agentes, que conversam entre si. As equipes de agentes são experimentais. Uma sessão líder cria colegas, divide uma lista de tarefas, e eles trocam mensagens diretamente. Mas cada colega é uma sessão inteira, com contexto e tokens próprios. Comece com três a cinco, e prefira tarefas de pesquisa e revisão. A regra de ouro: use o nível mais simples que resolve. Só suba quando o paralelismo realmente compensar.

### Conteúdo da aula

Objetivo: escolher o nível certo de paralelismo para cada tarefa (subagentes, sessões paralelas ou equipe de agentes) e manter o custo sob controle.

#### Por que importa

Você já conhece as peças: subagentes (aula 1), segundo plano e fork (aula 2), worktrees (aula 3) e agent view (aula 4). Falta decidir quando usar cada uma. Mais agentes não quer dizer trabalho melhor: quer dizer mais tokens e mais coordenação.

Regra de ouro Use o nível mais simples que resolve. Suba de nível só quando o paralelismo realmente compensar.

#### Conceito: três níveis

| | 1. Subagentes | 2. Sessões paralelas | 3. Equipe de agentes

| O que é | Ajudantes dentro de uma sessão | Várias sessões suas, cada uma num worktree | Uma sessão líder e colegas que conversam entre si

| Comunicação | Devolvem o resultado a quem chamou | Você coordena (e, se disponível, mensagens entre sessões) | Mensagens diretas e lista de tarefas compartilhada

| Melhor para | Tarefa focada em que só o resultado importa | Mudanças independentes que você quer acompanhar | Trabalho que pede discussão: pesquisa, revisão, hipóteses concorrentes

| Custo | Menor | Médio: uma sessão inteira por tarefa | Maior: cada colega é uma sessão inteira

| Como | Aula 1 | Aulas 2 a 4 | Esta aula

#### Equipes de agentes (agent teams)

Experimental Equipes de agentes vêm desligadas e têm limitações conhecidas (retomar sessão, status de tarefas, encerramento). Use na pasta de treino, não em código importante.

##### Ligar

.claude/settings.json (na pasta de treino) { "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" } }

Depois, peça em linguagem normal, dizendo quantos colegas e o papel de cada um:

pedido Crie uma equipe com três colegas para revisar o TaskFlow: um olhando os testes, um olhando mensagens e textos para o usuário, e um procurando casos de erro. Cada um só lê e relata. Depois junte os achados.

##### Como funciona

- A sessão principal é a líder: cria os colegas, monta a lista de tarefas compartilhada e junta os resultados.

- Cada colega é uma sessão inteira, com janela de contexto própria. Ele carrega o CLAUDE.md do projeto, mas não o histórico da líder: o pedido precisa dizer o que ele deve saber.

- Os colegas trocam mensagens diretamente e pegam tarefas da lista sozinhos.

- Pedidos de permissão dos colegas aparecem na sessão da líder.

- Você pode usar um subagente da aula 1 como papel de colega: "crie um colega do tipo revisor-taskflow".

##### Como ver a equipe

| Modo | Como é | Onde funciona

| In-process (padrão) | Todos no seu terminal. Painel abaixo do campo de texto: ↑ ↓ escolhem um colega, Enter abre a conversa dele, x para o colega escolhido. | Qualquer terminal, inclusive no Windows

| Split panes | Cada colega num painel do terminal. | Precisa de tmux ou iTerm2. No Windows, use o modo in-process.

Para encerrar um colega, peça à líder: "peça ao colega de testes para encerrar". As pastas da equipe são limpas quando a sessão termina.

Efeito colateral ao ligar Com equipes ligadas, um subagente a que o Claude dá um nome pode virar colega de equipe, mesmo sem você pedir uma equipe. Se não estiver usando, volte a variável para "0".

##### Mensagens entre as suas sessões

Sem montar uma equipe, sessões suas (por exemplo, uma em cada worktree) podem trocar descobertas. /list-agents (ou /peers) lista com quem a sessão pode falar e o nome a usar. Esse recurso só aparece quando está disponível na sua sessão.

##### Custos: como não exagerar

- Equipes pequenas: comece com 3 a 5 colegas. Três focados costumam render mais que cinco dispersos.

- Comece por pesquisa e revisão: tarefas que só leem não têm o problema de dois colegas editarem o mesmo arquivo.

- Modelos mais baratos: peça "use Sonnet para cada colega", ou use model: haiku em subagentes simples.

- Meça: /usage mostra o gasto da sessão e /context, o uso da janela.

- Um arquivo, um dono: divida o trabalho por arquivo, como na aula 3.

#### Exercício (prática real opcional)

A prática real usa um recurso experimental e gasta bem mais tokens. Se preferir não ligar, a simulação guiada do bloco 4 e o jogo do bloco 5 bastam para concluir a aula.

- Na pasta de treino, crie .claude/settings.json com a variável do bloco 3 e abra claude.

- Rode /usage e anote o gasto inicial.

- Faça o pedido da equipe de revisão (três colegas, só leitura).

- Acompanhe no painel: escolha um colega com ↑ ↓ e abra com Enter.

- Quando a líder juntar os achados, rode /usage de novo e compare com o passo 2.

- Desligue: troque a variável para "0" ou apague o .claude/settings.json.

Ver o que observar

- Os três colegas aparecem no painel, cada um com seu papel. A lista de tarefas compartilhada aparece com Ctrl+T.

- Os achados se parecem com os do revisor da aula 1 (docstrings faltando), mas vindos de três ângulos.

- O gasto do passo 5 deve ser bem maior que o de uma revisão com um só subagente. Esse é o ponto: equipe compensa quando a discussão entre os colegas agrega, não para uma revisão simples.

- Se o Claude criar subagentes em vez de uma equipe, peça de novo dizendo explicitamente "crie uma equipe de agentes".

#### Erros comuns

##### Equipe para tarefa simples

Uma revisão focada sai mais barata com um subagente. Equipe é para trabalho que pede discussão.

##### Colegas no mesmo arquivo

Dois colegas editando o mesmo arquivo se sobrescrevem. Dê a cada um seus arquivos.

##### Pedido sem contexto

Os colegas não herdam o histórico da líder. Diga no pedido o que cada um precisa saber.

##### Esquecer o recurso ligado

Com equipes ligadas, subagentes com nome podem virar colegas. Desligue quando não estiver usando.

##### Consigo fazer?

#### Para ir além

- Agent teams (em inglês): exemplos de revisão em paralelo, hipóteses concorrentes e hooks de qualidade.

- Custos (em inglês): como reduzir o gasto com tokens.

- Revise o módulo nos slides do Módulo 7.
