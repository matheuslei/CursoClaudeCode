# Módulo 2: Contexto é tudo

Curso "Claude Code: do zero ao avançado" (estudo pessoal, em português do Brasil). Nível: Iniciante. Tema: Janela de contexto, CLAUDE.md, memória e custo.

Projeto de treino usado em todo o curso: TaskFlow, um gerenciador de tarefas de linha de comando em Python, só com a biblioteca padrão. Dados de exemplo são fictícios.

Aulas: 2.1 A janela de contexto; 2.2 /init e o CLAUDE.md; 2.3 Memória automática e /memory; 2.4 /clear, /compact e /rewind; 2.5 Custo, modelos e /usage.

## Aula 2.1: A janela de contexto

### Resumo do vídeo da aula

Este é o conceito que mais influencia a qualidade das respostas do Claude: a janela de contexto. O contexto é tudo o que o modelo enxerga ao mesmo tempo: as instruções do sistema, o seu CLAUDE.md, a conversa, os arquivos que ele leu e a saída dos comandos que rodou. E cada coisa ocupa espaço. Ler um arquivo grande ou um log enorme pode encher a janela muito mais rápido do que a própria conversa. Quando a janela fica cheia de coisa velha, informações antigas competem com as novas, e as respostas pioram. Perto do limite, o Claude Code compacta a conversa automaticamente. Você tem três ferramentas. Barra context mostra o uso. Barra compact resume a conversa e continua a mesma tarefa. Barra clear começa uma conversa nova. Guarde esta regra: uma tarefa, uma conversa. Mudou de assunto, use barra clear.

### Conteúdo da aula

Objetivo: entender o que ocupa o contexto do Claude, por que um contexto cheio piora as respostas e como medir isso com /context.

#### Por que importa

Cada sessão do Claude Code começa com uma janela de contexto nova: tudo o que o modelo "sabe" naquele momento. Ela tem limite, e cada arquivo lido, cada saída de comando e cada mensagem ocupa espaço. Quem entende o contexto gasta menos limite e recebe respostas melhores.

Cenário Depois de 3 horas na mesma conversa, o Claude começa a "esquecer" o que você pediu no início e a repetir erros. Não é cansaço: é contexto lotado de coisas antigas competindo com o que importa agora.

#### Conceito: como a janela enche

#### O que você precisa saber

##### Tokens

O contexto é medido em tokens, pedaços de texto. Um arquivo de 50 linhas pode custar alguns milhares de tokens. A doc oficial mostra uma sessão de exemplo em que ler um arquivo de código custou cerca de 1.000 a 2.400 tokens e a saída de um npm test, cerca de 1.200.

##### Tamanho da janela

Os modelos atuais (Fable, Sonnet 5 e posteriores, Opus 4.7 e posteriores, Haiku 5.5) já vêm com janela de 1 milhão de tokens por padrão. É muito, mas não é infinito, e encher a janela tem custo: o Claude Code reenvia a conversa inteira a cada pedido.

##### O que carrega antes de você digitar

| Item | Observação

| System prompt e ferramentas | Sempre presente

| CLAUDE.md (usuário e projeto) | Aula 2.2

| Memória automática (MEMORY.md) | Aula 2.3

| Nomes das ferramentas MCP e descrições das skills | Módulos 5 e 6

##### Quando enche: compactação automática

Perto do limite, o Claude Code compacta automaticamente: resume a conversa para liberar espaço. A sessão não acaba, mas detalhes antigos viram resumo. Você pode agir antes (Aula 2.4): /clear entre tarefas, /compact com foco, ou /autocompact para definir quando a compactação automática acontece.

Medir é o primeiro passo /context mostra o uso atual por categoria, com sugestões de otimização. /context all lista também quais arquivos de memória (CLAUDE.md etc.) foram carregados.

#### Exercício real

Use o TaskFlow (o seu, ou a cópia de projeto-taskflow\etapa-02):

- Abra claude na pasta e rode /context antes de qualquer pergunta. Anote o uso inicial.

- Peça leia tarefas.py e explique cada função. Rode /context de novo.

- Rode! python tarefas.py listar e confira o /context mais uma vez.

- Rode /context all e veja a lista de arquivos de memória carregados.

- Anote no diario.md: qual ação mais aumentou o contexto?

Ver gabarito

Normalmente, ler o arquivo e explicar pesa mais: o conteúdo do arquivo e a resposta longa entram no contexto. A saída de um listar é pequena. O uso inicial não é zero porque system prompt, ferramentas e memória já carregaram antes da sua primeira mensagem.

Se o /context all não listar nenhum CLAUDE.md, é porque o projeto ainda não tem um. Vamos criar na próxima aula.

#### Erros comuns

##### "1 milhão é infinito"

Não é, e cada mensagem reenvia o histórico. Contexto grande custa limite mesmo com cache.

##### Colar logs gigantes

Um log de 10 mil linhas ocupa muito. Filtre antes (só as linhas de erro).

##### Uma conversa para o dia todo

Tarefas misturadas poluem o contexto. Tarefa nova, /clear.

##### Ignorar o /context

Respostas piorando? Meça antes de culpar o modelo.

##### Consigo fazer?

#### Para ir além

- Explore the context window: simulação interativa oficial

- Reduce token usage

## Aula 2.2: /init e o CLAUDE.md

### Resumo do vídeo da aula

Toda sessão começa do zero. O Claude ponto MD é o jeito de não repetir as mesmas instruções todo dia. É um arquivo Markdown que o Claude lê no início de toda sessão. Nele vão os comandos de teste, as convenções do projeto e as regras do tipo: sempre faça isso. O comando barra init analisa o projeto e gera um Claude ponto MD inicial. Se já existir um, ele sugere melhorias. Trate o resultado como rascunho e revise sempre. Ele pode morar em quatro lugares: o da organização, o do usuário, o do projeto, que vai para o Git, e o local, só seu. Todos os que existirem são somados. Escreva regras concretas e verificáveis, curtas, com menos de duzentas linhas, organizadas em títulos e listas, e sem contradições. Lembre: o Claude ponto MD é contexto, não trava. Para bloquear uma ação de verdade, use permissões ou hooks. E nunca coloque senhas nele, porque ele vai para o Git.

### Conteúdo da aula

Objetivo: criar e manter um CLAUDE.md enxuto que faça o Claude acertar o padrão do seu projeto em toda sessão, sem você repetir as mesmas instruções.

#### Por que importa

Toda sessão começa do zero. O CLAUDE.md é um arquivo Markdown que o Claude lê no início de toda sessão: é onde você escreve o que teria que explicar de novo todo dia. Comandos de teste, convenções, estrutura do projeto e regras do tipo "sempre faça X".

Quando adicionar algo ao CLAUDE.md (segundo a doc oficial) Quando o Claude comete o mesmo erro pela segunda vez; quando você digita a mesma correção que digitou na sessão passada; quando um colega novo precisaria da mesma informação.

#### Conceito: onde o CLAUDE.md pode morar

#### Como escrever um bom CLAUDE.md

##### Os locais (do mais amplo para o mais específico)

| Escopo | Local | Para quê

| Organização | C:\Program Files\ClaudeCode\CLAUDE.md (Windows) | Regras da empresa, gerenciadas pela TI

| Usuário | ~/.claude/CLAUDE.md | Suas preferências em todos os projetos

| Projeto | ./CLAUDE.md ou ./.claude/CLAUDE.md | Regras do projeto, compartilhadas no Git

| Local | ./CLAUDE.local.md | Preferências suas neste projeto. Coloque no .gitignore

Todos os encontrados são somados no contexto, não substituídos. Arquivos CLAUDE.md em subpastas carregam sob demanda, quando o Claude mexe em arquivos daquela pasta.

##### Regras de ouro

##### Concreto e verificável

"Use 4 espaços de indentação" em vez de "formate bem o código".

##### Curto

A doc recomenda menos de 200 linhas por arquivo. Mais longo = mais contexto e menos aderência.

##### Organizado

Títulos Markdown e listas. Evite parágrafos densos.

##### Sem contradições

Duas regras conflitantes e o Claude pode escolher qualquer uma.

##### Imports com @

Um CLAUDE.md pode puxar outros arquivos: Veja @README.md para a visão geral. Caminhos relativos partem do arquivo que importa, e imports aninhados vão até 4 níveis. Dentro de crases (`@README`), o texto fica literal e não importa nada.

##### AGENTS.md

Se o repositório já tem um AGENTS.md (usado por outras ferramentas de IA) e nenhum CLAUDE.md, o Claude Code lê o AGENTS.md. Se existir CLAUDE.md, ele lê só o CLAUDE.md, a não ser que você importe o outro com @AGENTS.md.

/init O comando /init analisa o código e gera um CLAUDE.md inicial com comandos de build e teste e as convenções que encontrar. Se já existir um, ele sugere melhorias em vez de sobrescrever. Revise sempre o que ele gerou: é um rascunho.

CLAUDE.md é contexto, não trava O Claude segue as instruções, mas elas não são uma regra forçada. Para bloquear uma ação de verdade, use permissões (Módulo 4) ou hooks (Módulo 5). E nunca coloque senhas ou tokens no CLAUDE.md: ele vai para o Git.

#### Exercício real

- No TaskFlow, faça commit de tudo e rode claude.

- Rode /init e aprove a criação do CLAUDE.md.

- Abra o arquivo (pelo editor ou com /memory) e edite: remova o que for óbvio e garanta 3 regras concretas (veja o modelo no gabarito).

- Rode /clear e peça adicione o comando editar <numero> <novo titulo>. O Claude seguiu as regras sem você repetir?

- Rode /context all e confirme que o CLAUDE.md aparece em Memory files. Faça commit.

Ver um CLAUDE.md modelo para o TaskFlow

# TaskFlow CLI de tarefas em Python 3.10+, só biblioteca padrão. ## Comandos - Rodar: `python tarefas.py <comando>` - Testes: `python -m unittest` (a partir do Módulo 3) ## Convenções - Nomes de funções e mensagens em português - Todo comando que recebe número usa `_indice_valido()` para validar - Não adicione dependências externas - Dados ficam em `tarefas.json`; nunca mude o formato sem pedir ## Antes de terminar uma tarefa - Rode o comando alterado pelo menos uma vez e mostre a saída

Repare: são ~15 linhas, todas concretas. Nada de "escreva código limpo".

#### Erros comuns

##### CLAUDE.md enciclopédia

500 linhas de tudo. Ocupa contexto e dilui o que importa. Procedimentos longos viram skills (Módulo 5).

##### Aceitar o /init sem revisar

É um rascunho. Corte o óbvio e acrescente o que só você sabe.

##### Regras vagas

"Siga boas práticas" não é verificável. Seja específico.

##### Segredos no arquivo

O CLAUDE.md do projeto vai para o Git. Nada de senha, token ou dado pessoal.

##### Consigo fazer?

#### Para ir além

- How Claude remembers your project: CLAUDE.md, regras em .claude/rules/, AGENTS.md

- /doctor prompt-audit: o Claude revisa seus arquivos de instrução em busca de regras desatualizadas ou conflitantes

## Aula 2.3: Memória automática e /memory

### Resumo do vídeo da aula

Além do Claude ponto MD que você escreve, o Claude Code tem uma memória que ele mesmo escreve. O Claude ponto MD é escrito por você, com instruções e regras. A memória automática é escrita pelo Claude, com aprendizados: uma correção sua ou uma preferência que você confirmou. As notas são de quatro tipos: sobre você, sobre correções e aprovações, sobre o trabalho em andamento no projeto e referências a sistemas externos. Cada projeto tem uma pasta de memória na sua máquina, com um índice chamado Memory ponto MD e uma nota por arquivo. Ela não vai para o Git. Você também pode pedir. Diga: lembre que. E vai para a memória. Diga: adicione ao Claude ponto MD. E vai para o arquivo compartilhado do projeto. O comando barra memory mostra seus arquivos, abre a pasta de memória e liga ou desliga o recurso. Revise de vez em quando: uma memória errada faz o Claude repetir o erro.

### Conteúdo da aula

Objetivo: entender o que o Claude anota sozinho entre sessões, onde isso fica, e como revisar, editar ou desligar com /memory.

#### Por que importa

Além do CLAUDE.md (que você escreve), o Claude Code tem a memória automática: notas que o próprio Claude escreve quando aprende algo útil sobre você ou o projeto, como uma correção que você fez ou uma preferência que confirmou. Na próxima sessão, ele já sabe.

| | CLAUDE.md | Memória automática

| Quem escreve | Você | O Claude

| Conteúdo | Instruções e regras | Aprendizados e padrões

| Carregado | Toda sessão, por inteiro | Toda sessão (primeiras 200 linhas ou 25 KB do índice)

#### Conceito: o ciclo da memória

#### Como funciona na prática

##### Os 4 tipos de nota

##### user

Seu papel, experiência e preferências de trabalho.

##### feedback

Correções que você deu e abordagens que aprovou.

##### project

Trabalho em andamento, prazos e decisões que não estão no código.

##### reference

Onde achar informação fora do projeto (um painel, um sistema de chamados).

O Claude não anota o que dá para descobrir lendo o código (arquitetura, caminhos de arquivos) nem o que o CLAUDE.md já diz. E não salva algo em toda sessão: só quando acha útil para o futuro.

##### Onde fica

Cada projeto tem uma pasta própria: ~/.claude/projects/<projeto>/memory/. Dentro dela, um índice MEMORY.md (uma linha por memória) e um arquivo por nota. A memória é local da sua máquina: não vai para o Git nem para outros computadores.

##### Pedir para lembrar

- "Lembre que os testes precisam de Python 3.10+" → vai para a memória automática.

- "Adicione isso ao CLAUDE.md" → vai para o CLAUDE.md (compartilhado com quem usa o repositório).

##### O comando /memory

Lista seus arquivos CLAUDE.md (usuário e projeto, mesmo os que ainda não existem), abre qualquer um no editor, mostra a pasta de memória automática e tem um interruptor para ligar ou desligar a memória automática. Ela vem ligada por padrão em sessões locais.

Revise de vez em quando As notas são Markdown comum: você pode ler, editar e apagar. Se alguma estiver errada ou desatualizada, corrija. Uma memória errada leva o Claude a repetir o erro.

#### Exercício real

- No TaskFlow, abra claude e diga: lembre que eu prefiro explicações curtas, em tópicos.

- Observe se aparece uma mensagem do tipo "Saved 1 memory".

- Rode /memory: encontre a pasta de memória automática e abra o MEMORY.md.

- Saia, abra uma sessão nova e pergunte explique a função remover. A resposta veio curta e em tópicos?

- No PowerShell, liste a pasta: ls ~\.claude\projects e encontre a do TaskFlow.

Ver gabarito

Você deve encontrar algo como ~\.claude\projects\<nome-derivado-do-projeto>\memory\MEMORY.md, com uma linha apontando para um arquivo de nota do tipo user ou feedback. O nome exato do arquivo pode variar.

Se nada foi salvo, o Claude pode ter achado a informação pouco útil, ou a memória automática pode estar desligada (confira o interruptor no /memory). Em máquinas gerenciadas pela empresa, ela pode estar desligada por configuração.

#### Erros comuns

##### Achar que a memória vai para o time

É local da sua máquina. Para o time, use o CLAUDE.md do projeto.

##### Nunca revisar

Notas antigas ou erradas viram instruções erradas. Revise pelo /memory.

##### Ditar dados sensíveis

Não peça para "lembrar" senhas, tokens ou dados pessoais de terceiros.

##### Confundir as duas

Regra do projeto → CLAUDE.md. Preferência sua → memória ou ~/.claude/CLAUDE.md.

##### Consigo fazer?

#### Para ir além

- Auto memory: armazenamento, limites, como desligar por projeto

## Aula 2.4: /clear, /compact e /rewind

### Resumo do vídeo da aula

Três comandos, três situações: recomeçar, resumir ou voltar no tempo. Mudou de assunto? Use barra clear. O contexto fica vazio, mas o Claude ponto MD e a memória continuam. E a conversa anterior pode ser retomada com barra resume. Mesma tarefa, conversa longa? Use barra compact. Você pode dar foco ao resumo. Por exemplo: foque nos testes que falharam. Cada mensagem sua cria um checkpoint. Com barra rewind, ou Esc duas vezes com o campo vazio, você escolhe um ponto e volta o código, a conversa, ou os dois. Atenção: arquivos alterados só por comandos de terminal, ou fora do Claude Code, não são rastreados. Checkpoint é recuperação rápida. Não substitui o Git. Resumindo: assunto novo, barra clear. Mesma tarefa, barra compact. Caminho errado, barra rewind.

### Conteúdo da aula

Objetivo: escolher a ferramenta certa para cada situação: recomeçar, resumir ou voltar no tempo, inclusive desfazendo edições com checkpoints.

#### Por que importa

Você já viu esses comandos no Módulo 1. Agora, com o contexto entendido, dá para usá-los com estratégia. A regra prática: uma tarefa, uma conversa. E quando o Claude errar o caminho, volte ao ponto anterior em vez de tentar consertar em cima do erro.

#### Conceito: qual usar?

#### Os detalhes que fazem diferença

##### /clear

Começa uma conversa nova com contexto vazio (CLAUDE.md e memória continuam). A anterior continua acessível pelo /resume. Dica da doc: use /rename antes de limpar, para achar a conversa depois. Os totais do /usage também zeram.

##### /compact [instruções]

Resume a conversa para liberar espaço e continuar a mesma tarefa. Dê foco ao resumo: /compact foque nas mudanças do comando editar e nos testes que falharam. Depois da compactação, o CLAUDE.md da raiz e a memória são reinjetados do disco, e o Claude relê até 5 arquivos recentes.

Você também pode deixar instruções permanentes de compactação no CLAUDE.md, numa seção como # Compact instructions.

##### /rewind e checkpoints

Cada mensagem sua que inicia um turno cria um checkpoint do código. Abra o menu com /rewind (alias /undo) ou Esc Esc com o campo vazio, escolha a mensagem e uma ação:

| Restore code and conversation | Volta código e conversa àquele ponto

| Restore conversation | Volta só a conversa e mantém o código atual

| Restore code | Desfaz as edições e mantém a conversa

| Summarize from here / up to here | Resume um trecho da conversa (um /compact direcionado)

Limites do rewind Arquivos alterados só por comandos (Bash ou PowerShell), e não pelas ferramentas de edição do Claude, não são rastreados. Mudanças feitas fora do Claude Code também não. Checkpoints servem para recuperação rápida na sessão e não substituem o Git.

#### Exercício real

- No TaskFlow (tudo commitado), peça: transforme o armazenamento em SQLite. Deixe o Claude fazer pelo menos uma edição.

- Arrependeu-se! Pressione Esc Esc (campo vazio), escolha a mensagem do pedido e Restore code and conversation.

- Confira com! git status que o código voltou ao estado anterior.

- Peça uma tarefa de verdade (adicione o comando limpar-concluidas) e, no meio, rode /compact foque no comando limpar-concluidas.

- Terminou? /rename limpar-concluidas, depois /clear. Confirme que ela aparece no /resume.

Ver gabarito

- Passo 3: git status deve mostrar working tree clean, porque o rewind desfez as edições feitas pelas ferramentas do Claude. Se o Claude tiver criado arquivos via comando (ex.: um banco .db gerado por script), eles podem continuar lá. Use git status e git clean/git restore com cuidado.

- Passo 4: após o /compact, o Claude continua a tarefa com o foco que você deu.

- Passo 5: a conversa aparece com o nome limpar-concluidas na lista do /resume.

#### Erros comuns

##### Consertar em cima do erro

Três rodadas de "não, assim não" poluem o contexto. Volte com rewind e peça melhor.

##### /compact para mudar de assunto

O resumo carrega o assunto velho. Tarefa nova pede /clear.

##### Confiar só no rewind

Mudanças por comando não são rastreadas. Commit antes de mudanças grandes.

##### /compact sem foco

Sem instrução, o resumo adivinha o que importa. Diga o que manter.

##### Consigo fazer?

#### Para ir além

- Checkpointing: todas as opções e limitações

- What survives compaction

- Claude Code in Action (Anthropic Academy, em inglês): lição sobre conduzir sessões longas (compactação dirigida, rewind, /goal).

## Aula 2.5: Custo, modelos e /usage

### Resumo do vídeo da aula

Toda sessão consome tokens. Na assinatura, isso vira limite de uso. Na API, vira dinheiro. Veja como controlar. Três escolhas fazem a diferença: o modelo, o nível de esforço e o tamanho do contexto. Sonnet resolve bem a maioria das tarefas. Opus fica para raciocínio complexo. Haiku, para tarefas simples. E opusplan usa Opus no plano e Sonnet na execução. Com barra effort você ajusta o raciocínio. Mais esforço ajuda em problemas difíceis, mas é mais lento e mais caro. Para tarefas simples, baixe o esforço. O barra usage mostra quanto do plano você já usou e o que mais consome. E o fast mode responde até duas vezes e meia mais rápido, mas com preço por token maior. Os hábitos que mais economizam: barra clear entre tarefas, pedidos específicos, plan mode antes do que é complexo, e Esc cedo quando errar o rumo.

### Conteúdo da aula

Objetivo: escolher modelo, esforço e velocidade de acordo com a tarefa, e acompanhar o consumo com /usage para não esgotar o limite do seu plano.

#### Por que importa

O Claude Code consome tokens. Numa assinatura (Pro, Max, Team, Enterprise), isso vira limite de uso que renova em janelas de tempo. Numa conta de API, vira dinheiro. Nos dois casos, as mesmas escolhas fazem diferença: modelo, esforço e tamanho do contexto.

Uma referência da doc oficial Em implantações corporativas, a Anthropic relata custo médio em torno de US$ 13 por desenvolvedor por dia ativo, abaixo de US$ 30 por dia para 90% dos usuários. Varia muito com modelo, tamanho do projeto e hábitos.

#### Conceito: os 3 botões do custo

#### Escolhas na prática

##### Modelos (aliases do /model)

| Alias | Quando usar

| sonnet | Tarefas de código do dia a dia. A doc diz que ele resolve bem a maioria das tarefas e custa menos que o Opus.

| opus | Raciocínio complexo, decisões de arquitetura, problemas difíceis.

| haiku | Tarefas simples e rápidas.

| fable | As tarefas mais difíceis e longas.

| opusplan | Opus no plan mode e Sonnet na execução.

Troque com /model (no seletor, Enter salva como padrão), ou abra já escolhendo: claude --model sonnet.

##### Esforço: /effort

Níveis low, medium, high, xhigh e max (os disponíveis variam por modelo). Mais esforço significa mais raciocínio, que é melhor em problemas difíceis, porém mais lento e mais caro, já que o raciocínio é cobrado como tokens de saída. Para tarefas simples, baixe o esforço.

##### Velocidade: /fast

O fast mode usa o mesmo modelo com uma configuração que responde até 2,5 vezes mais rápido, a um preço por token mais alto. Funciona só em alguns modelos (Opus e Fable). Nas assinaturas, é cobrado de créditos de uso extras, fora do limite incluído no plano. Ligue no começo da sessão (ligar no meio sai mais caro) e só quando a velocidade importar.

##### /usage

Em assinaturas, mostra as barras de uso do plano e um detalhamento do que mais consome (skills, subagentes, servidores MCP), com recomendações. Para contas de API, mostra o custo estimado da sessão. Os totais da sessão zeram no /clear.

Hábitos que mais economizam (segundo a doc) /clear entre tarefas · modelo adequado à tarefa · pedidos específicos (pedido vago faz o Claude varrer o projeto) · plan mode antes de tarefas complexas · Esc cedo quando errar o rumo · CLAUDE.md com menos de 200 linhas.

#### Exercício real

- No TaskFlow, rode /usage e anote o que aparece (barras do plano ou custo da sessão).

- Rode /model e veja quais modelos o seu plano oferece. Escolha sonnet só para esta sessão (no seletor, a tecla s troca sem salvar como padrão).

- Rode /effort low e peça: renomeie a variável t para tarefa no listar.

- Rode /effort high e peça: analise se há algum caso em que tarefas.json pode ficar corrompido e proponha uma solução, sem implementar.

- Rode /usage de novo e compare. Anote no diário qual pedido pesou mais e por quê.

Ver gabarito

A análise com esforço alto tende a consumir bem mais, porque há mais raciocínio e mais leitura. A renomeação simples com esforço baixo é barata. A lição: não use o máximo para tudo. Ajuste modelo e esforço ao tamanho do problema.

Os nomes, níveis e telas disponíveis dependem do seu plano e da versão. Se algo não aparecer, confira com /help e /status.

#### Erros comuns

##### Opus + max para tudo

Esgota o limite rápido sem ganho em tarefas simples.

##### Fast mode esquecido ligado

Nas assinaturas, ele consome créditos extras. Desligue com /fast.

##### Sessão aberta o dia todo

Cada mensagem reenvia o histórico. Limpe entre tarefas.

##### Trocar de modelo para fugir do limite

Limites de sessão e semanais valem para todos os modelos. Veja no /usage quando renova.

##### Consigo fazer?

#### Para ir além

- Manage costs effectively

- Model configuration: aliases, esforço, contexto de 1M

- Fast mode
