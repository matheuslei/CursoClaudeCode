# Módulo 8: Plugins

Curso "Claude Code: do zero ao avançado" (estudo pessoal, em português do Brasil). Nível: Avançado. Tema: Instalar, criar, avaliar e compartilhar plugins.

Projeto de treino usado em todo o curso: TaskFlow, um gerenciador de tarefas de linha de comando em Python, só com a biblioteca padrão. Dados de exemplo são fictícios.

Aulas: 8.1 O que é um plugin, instalar e gerenciar; 8.2 Criar o plugin do TaskFlow; 8.3 Medir com claude plugin eval; 8.4 Marketplace local.

## Aula 8.1: O que é um plugin, instalar e gerenciar

### Resumo do vídeo da aula

Nesta aula, você vai entender o que é um plugin, e como instalar um sem levar surpresa junto. Um plugin é uma pasta que junta skills, subagentes, hooks e servidores MCP, e instala tudo de uma vez. Os plugins vêm de marketplaces, que são catálogos. O oficial da Anthropic já vem adicionado. O comando barra plugin abre o gerenciador. Na instalação, você escolhe o escopo: só para você, para todo o projeto, ou só para você neste projeto. Atenção: um plugin roda código com as suas permissões, e ocupa contexto em toda sessão. Leia os detalhes antes de instalar.

### Conteúdo da aula

Objetivo: saber o que um plugin carrega, quando vale usar um em vez das peças soltas, e instalar, desativar e remover plugins com segurança, conferindo o custo de contexto antes.

#### Por que importa

Nos módulos 5, 6 e 7 você criou várias peças para o TaskFlow: skills, um hook, um servidor MCP e um subagente. Elas funcionam, mas estão espalhadas em pastas e configurações diferentes. Levar tudo para outro projeto, ou para um colega, dá trabalho.

Um plugin é uma pasta que junta essas peças e instala tudo como uma unidade, com um comando e com atualizações.

Analogia As peças soltas são ferramentas avulsas na bancada. O plugin é a maleta: as mesmas ferramentas, organizadas, com etiqueta e fáceis de levar.

#### Conceito: do marketplace à sua sessão

#### O essencial

##### O que um plugin pode trazer

##### 📘 Skills

Instruções que o Claude carrega quando a tarefa pede, ou que você roda como comando.

##### 🤖 Subagentes

Ajudantes com contexto próprio (Módulo 7).

##### 🪝 Hooks

Comandos que rodam sozinhos em momentos do ciclo, como depois de cada edição.

##### 🔌 Servidores MCP

Ferramentas externas (Módulo 6).

Também pode trazer comandos no formato antigo, executáveis em bin/, estilos de resposta, temas, monitores e servidores de linguagem (LSP). Um plugin com hooks escritos em JavaScript se chama mod; fica fora deste curso.

##### Plugin ou peças soltas?

| Situação | Use

| Uma skill só para você, num projeto | Peça solta em .claude/skills/

| Várias peças que andam juntas | Plugin

| Levar o mesmo conjunto para vários projetos ou pessoas | Plugin

| Versões e atualizações controladas | Plugin num marketplace

##### Marketplaces

Um marketplace é um catálogo: lista plugins e onde buscar cada um. Não é uma loja hospedada. O marketplace oficial, claude-plugins-official, é adicionado sozinho na primeira sessão interativa. Outros você adiciona com /plugin marketplace add.

| Nível | Quais

| Oficial | Nomes reservados da Anthropic, como claude-plugins-official

| Comunidade | claude-community e outros da Anthropic

| Terceiros | Todos os outros, inclusive o do seu colega ou da sua empresa

##### Instalar

dentro da sessão /plugin # gerenciador: abas Discover, Installed, Marketplaces, Errors /plugin install commit-commands@claude-plugins-official # abre os detalhes desse plugin

O painel de detalhes mostra Will install (o que o plugin adiciona) e, para plugins do marketplace oficial, Context cost: quantos tokens ele soma a cada mensagem e quantos quando é usado. Depois você escolhe o escopo:

| Escopo | Para quem | Onde fica registrado

| Usuário | Você, em todos os projetos | ~/.claude/settings.json

| Projeto | Todos que trabalham no repositório | .claude/settings.json

| Local | Você, só neste repositório | .claude/settings.local.json

Depois de instalar, digite /: as skills aparecem com o prefixo do plugin, como /commit-commands:commit.

##### Gerenciar pela linha de comando

PowerShell claude plugin list # o que está instalado, escopo e status claude plugin details commit-commands # componentes e custo em tokens claude plugin disable commit-commands@claude-plugins-official claude plugin enable commit-commands@claude-plugins-official claude plugin uninstall commit-commands@claude-plugins-official

##### Segurança e custo

Plugin roda código com as suas permissões Hooks, servidores MCP e executáveis de um plugin rodam no seu computador, fora do sandbox e sem passar pelas suas regras de permissão. Antes de instalar, leia os detalhes e, se puder, os arquivos hooks/hooks.json, .mcp.json e bin/. No computador da empresa, plugins de terceiros dependem do aval da segurança da informação.

Todo plugin ativo ocupa contexto O nome e a descrição de cada skill e subagente entram em toda mensagem, mesmo que você não use. Na aba Installed, o grupo Not used recently mostra plugins que você pode desativar.

#### Exercício real: avaliar, instalar e remover

Prepare a pasta de treino do módulo (README da etapa 08, passo 1). Esta prática instala um plugin do marketplace oficial e é opcional: se a rede ou a política da empresa bloquear, faça só a simulação e os passos 1 e 2.

- Na pasta de treino, abra claude e rode /plugin. Passe pelas abas com Tab. Em Marketplaces, veja se claude-plugins-official está lá.

- Rode /plugin install commit-commands@claude-plugins-official. Leia Will install e Context cost. Anote: quantos tokens por turno?

- Escolha Install for you, in this repo only (escopo local).

- Digite /commit e veja os comandos com o prefixo commit-commands:. Não precisa rodá-los.

- Saia e, no PowerShell, rode claude plugin list e claude plugin details commit-commands.

- Desative com claude plugin disable commit-commands@claude-plugins-official, confira na lista, e remova com claude plugin uninstall commit-commands@claude-plugins-official --scope local.

Ver o que observar

- Passo 2: o painel lista os comandos do plugin e duas estimativas: Every turn (sempre) e When invoked (quando usado). É isso que você compara antes de decidir.

- Passo 3: escopo local grava em .claude/settings.local.json da pasta de treino; nada muda nos seus outros projetos.

- Passo 6: desativar mantém instalado, mas tira do contexto; remover apaga de vez. O --scope local precisa bater com o escopo da instalação.

- Se o /plugin não abrir ou o marketplace não aparecer, a política da organização pode estar bloqueando. Não contorne: fale com a TI.

#### Erros comuns

##### Instalar sem ler

O plugin roda código com as suas permissões. Leia o que ele instala antes.

##### Plugins demais ativos

Cada um soma tokens a toda mensagem. Desative o que não usa.

##### Escopo errado

Escopo de projeto liga o plugin para todo o time. Para testar, use local.

##### Confundir com o Claude Marketplace

O site claude.com/marketplace é uma vitrine; não é um marketplace que você adiciona com /plugin.

##### Consigo fazer?

#### Para ir além

- Visão geral de plugins e Instalar e gerenciar (em inglês).

- Segurança e confiança em plugins (em inglês).

- Mods e gestão de plugins para organizações: fora deste curso; veja a seção "Mods" e "Manage plugins for your organization" na documentação.

- Próxima aula: transformar as peças do TaskFlow num plugin.

- Claude Code in Action (Anthropic Academy, em inglês): lição sobre empacotar o setup do time num plugin.

## Aula 8.2: Criar o plugin do TaskFlow

### Resumo do vídeo da aula

Nesta aula, as peças soltas do TaskFlow viram um único plugin. O plugin precisa de uma pasta ponto claude hífen plugin com o arquivo plugin ponto JSON. É o manifesto, e só o nome é obrigatório. As peças ficam na raiz do plugin: skills, agents, a pasta hooks, e o arquivo ponto mcp ponto JSON. Para testar sem instalar, use claude hífen hífen plugin hífen dir. Editou? Rode barra reload hífen plugins. No plugin, tudo ganha o prefixo do nome. A skill vira barra taskflow, dois pontos, revisar hífen taskflow. Antes de usar, valide com claude plugin validate. Ele aponta o campo errado e mostra o que o plugin fornece.

### Conteúdo da aula

Objetivo: juntar a skill, o hook, o servidor MCP e o subagente do TaskFlow num plugin, validar, testar numa sessão sem instalar e entender os nomes com prefixo.

#### Por que importa

Até aqui, as peças do TaskFlow moram em .claude/ do projeto e no settings.json. Elas só valem naquele projeto. Como plugin, você carrega tudo em qualquer projeto com uma opção na linha de comando, e depois instala por nome (aula 4).

O que muda Duas coisas: onde os arquivos ficam (na pasta do plugin) e como eles se chamam (com o prefixo taskflow:).

#### Conceito: de peças soltas a plugin

#### Estrutura e regras

marketplace-taskflow/plugins/taskflow/ .claude-plugin/ plugin.json ← o manifesto (só ele fica aqui dentro!) skills/ revisar-taskflow/SKILL.md nova-funcionalidade/SKILL.md padroes-taskflow/SKILL.md agents/ revisor-taskflow.md hooks/ hooks.json ← o mesmo formato do "hooks" do settings.json scripts/ checar.py servidor/ servidor_mcp.py .mcp.json ← servidores MCP do plugin README.md

O erro mais comum Só o plugin.json vai dentro de .claude-plugin/. Pastas como skills/ colocadas ali dentro não carregam. E um CLAUDE.md na raiz do plugin também não carrega: instruções vão como skill.

##### O manifesto

.claude-plugin/plugin.json { "name": "taskflow", "description": "Skills, revisor, hook de sintaxe e servidor MCP do projeto de treino TaskFlow", "version": "1.0.0", "author": { "name": "Aluno do curso" } }

Só name é obrigatório (sem espaços). Ele vira o prefixo de tudo.

##### Caminhos: use as variáveis

Você não sabe onde o plugin será instalado. Por isso, hook e servidor apontam para os próprios arquivos com ${CLAUDE_PLUGIN_ROOT} e para o projeto com ${CLAUDE_PROJECT_DIR}.

hooks/hooks.json { "hooks": { "PostToolUse": [ { "matcher": "Edit|Write", "hooks": [ { "type": "command", "command": "python \"${CLAUDE_PLUGIN_ROOT}/scripts/checar.py\"" } ] } ] } }

.mcp.json { "mcpServers": { "tarefas": { "command": "python", "args": ["${CLAUDE_PLUGIN_ROOT}/servidor/servidor_mcp.py"], "env": { "TASKFLOW_DIR": "${CLAUDE_PROJECT_DIR}" } } } }

Por que mexer no checar.py e no servidor? No Módulo 5, o checar.py achava o projeto pela própria posição (.claude/hooks/). No plugin ele mora em outra pasta, então passa a ler a variável CLAUDE_PROJECT_DIR, que todo hook recebe. O servidor MCP faz o mesmo com TASKFLOW_DIR para achar o tarefas.py.

##### Nomes com prefixo

| Peça | Solta | No plugin

| Skill | /revisar-taskflow | /taskflow:revisar-taskflow

| Subagente | revisor-taskflow | taskflow:revisor-taskflow (@agent-taskflow:revisor-taskflow)

| Servidor MCP | taskflow | plugin:taskflow:tarefas no /mcp

| Hook | Sem prefixo. Se a cópia solta continuar no settings.json, ele roda duas vezes.

##### O ciclo de desenvolvimento

PowerShell claude plugin validate .\marketplace-taskflow\plugins\taskflow # confere manifesto e frontmatter claude --plugin-dir .\marketplace-taskflow\plugins\taskflow # carrega só nesta sessão claude --plugin-dir .\marketplace-taskflow\plugins\taskflow plugin details taskflow # inventário e custo

Dentro da sessão: /reload-plugins aplica o que você editou; /plugin → aba Errors mostra o que falhou; /mcp mostra se o servidor conectou.

#### Exercício real: o plugin taskflow

Na pasta de treino (README da etapa 08, passos 1 e 2), com o ambiente virtual ativado.

- Crie as pastas: New-Item -ItemType Directory -Force marketplace-taskflow\plugins\taskflow\.claude-plugin.

- Escreva o plugin.json do bloco 3.

- Copie as peças: .claude\skills e .claude\agents para dentro do plugin; o checar.py para scripts\; o servidor_mcp.py para servidor\.

- Crie hooks\hooks.json e .mcp.json como no bloco 3, e ajuste o checar.py e o servidor para lerem a pasta do projeto pelas variáveis. (Peça ao Claude: "ajuste estes dois scripts para achar o projeto por CLAUDE_PROJECT_DIR e TASKFLOW_DIR".)

- Rode claude plugin validate .\marketplace-taskflow\plugins\taskflow até aparecer ✔ Validation passed.

- Para evitar o hook duplicado, apague o bloco "hooks" de .claude\settings.json e as pastas soltas .claude\skills, .claude\agents e .claude\hooks da pasta de treino.

- Abra claude --plugin-dir .\marketplace-taskflow\plugins\taskflow. Digite /taskflow: e veja as skills; peça "use o subagente taskflow:revisor-taskflow para revisar o tarefas.py". Opcional, se você instalou o pacote mcp (passo 2 do README; exige Python 3.11 ou mais novo): rode /mcp e veja o servidor plugin:taskflow:tarefas. Sem o pacote, ele aparece com erro de conexão, e tudo bem: a aula se conclui com skills, subagente e hook.

- Edite a description de uma skill, rode /reload-plugins e confira que a mudança valeu.

Ver o gabarito

O plugin completo está em projeto-taskflow/etapa-08/gabarito/marketplace-taskflow/plugins/taskflow/. Ele tem uma skill a mais, padroes-taskflow, que o Claude pode usar sozinho e que a aula 3 usa na avaliação.

Saída real de claude --plugin-dir ... plugin details taskflow com o gabarito (Claude Code 2.1.327, 19/11/2026):

saída Component inventory Skills (3) nova-funcionalidade, padroes-taskflow, revisar-taskflow Agents (1) revisor-taskflow Hooks (1) PostToolUse (harness-only — no model context cost) MCP servers (1) tarefas Projected token cost Always-on: ~292 tok added to every session

O claude plugin validate também mostra avisos sobre README, licença e ícone. Eles valem para enviar ao diretório da Anthropic; para o seu uso, não impedem nada.

Servidor MCP não conectou? Esse passo é opcional. Confira no /mcp. O motivo mais comum é abrir o Claude sem o ambiente virtual ativado, ou sem o pacote mcp instalado: o python encontrado não tem o pacote. Se o pip for bloqueado no computador da empresa, siga sem o servidor e, se precisar dele, peça a instalação à TI.

#### Erros comuns

##### Peças dentro de .claude-plugin/

Só o plugin.json vai ali. O resto fica na raiz do plugin.

##### Caminho fixo

Use ${CLAUDE_PLUGIN_ROOT}; o plugin instalado fica em outra pasta.

##### Hook duplicado

Hooks não têm prefixo: remova a cópia do settings.json.

##### --plugin-dir na pasta errada

Aponte para a pasta do plugin (a que tem .claude-plugin/plugin.json), não para a do marketplace.

##### Consigo fazer?

#### Para ir além

- Criar um plugin e Componentes (em inglês): configurações do usuário (userConfig), executáveis em bin/, monitores.

- claude plugin init <nome> cria o esqueleto de um plugin em ~/.claude/skills/ que carrega em toda sessão.

- Próxima aula: medir se o plugin muda mesmo o comportamento do Claude.

## Aula 8.3: Medir com claude plugin eval

### Resumo do vídeo da aula

Carregar não é funcionar. Nesta aula, você mede se o plugin muda mesmo o comportamento do Claude. Cada caso de avaliação tem um pedido e alguns graders: verificações de passa ou falha, como uma expressão regular ou um juiz. O comando claude plugin eval roda cada caso com o plugin e sem ele. A diferença entre as notas é o que o plugin acrescentou. Cuidado com o custo: cada rodada é uma chamada real ao modelo. Para iterar, rode um caso só, uma vez, só com o plugin. Diferença perto de zero e a skill não foi usada? Melhore a description da skill e rode de novo.

### Conteúdo da aula

Objetivo: escrever um caso de avaliação, ler o relatório com e sem o plugin e decidir o que ajustar, sabendo quanto cada rodada custa.

#### Por que importa

A validação da aula 2 diz que o plugin carrega. Ela não diz se o Claude usa a skill na hora certa, nem se o resultado fica melhor com ela. Uma description vaga, por exemplo, faz a skill nunca ser escolhida.

O claude plugin eval roda pedidos realistas com e sem o seu plugin e dá uma nota para cada lado. A diferença é o que o plugin realmente acrescenta.

Custa uso real Cada rodada é uma sessão de verdade com o modelo, contada no seu plano ou na conta da API. Por padrão, cada caso roda 3 vezes com o plugin e 3 sem, e graders do tipo juiz fazem chamadas extras. A prática real desta aula é opcional: a simulação basta para concluir.

#### Conceito: como uma rodada funciona

#### Casos, graders e relatório

##### Onde ficam

dentro do plugin evals/ padroes-nova-funcao/ prompt.md ← o pedido e os limites da rodada graders/ docstring.md ← uma verificação por arquivo nome-em-portugues.md skill-usada.md results/ ← criado a cada execução (relatório)

evals/padroes-nova-funcao/prompt.md --- max_turns: 6 allowed_tools: [Skill] --- Estou num projeto chamado TaskFlow, uma lista de tarefas em Python. ... Escreva só a função que remove todas as tarefas já concluídas e devolve quantas foram removidas. Responda com o código.

O pedido é escrito como um usuário escreveria, sem citar a skill. Cada rodada começa numa pasta vazia, então tudo o que o Claude precisa saber vai no texto.

##### Tipos de grader

| Tipo | Passa quando | Custo

| regex | Uma expressão regular aparece (ou não) na resposta, no histórico ou num arquivo | Grátis

| tool_used | Uma ferramenta foi chamada, por exemplo a Skill com o nome da sua skill | Grátis

| tool_order | Uma ferramenta foi chamada antes de outra | Grátis

| file_exists | Um arquivo foi criado | Grátis

| llm | Um modelo juiz vota PASS no seu critério (2 de 3 votos) | Chamadas extras

| baseline | O juiz acha o resultado pelo menos tão bom quanto uma transcrição de referência | Chamadas extras

graders/skill-usada.md --- type: tool_used tool: Skill input_match: '"skill"\s*:\s*"(?:[\w-]+:)?padroes-taskflow"' ---

Dica da documentação: em cada caso, um grader olha o resultado (resposta ou arquivo) e outro olha o caminho (a skill foi usada?). O grader "a skill foi usada" não entra na nota com/sem plugin, porque sem o plugin ele nunca passaria; aparece só como indicador.

##### Rodar

PowerShell, na pasta do plugin claude plugin eval init # o Claude conversa com você e escreve a suíte claude plugin eval. # roda todos os casos (3 com + 3 sem, por caso) claude plugin eval. --case padroes-nova-funcao --runs 1 --ablation none # iterar barato claude plugin eval. --max-cost-usd 1 --no-publish # teto de custo estimado; relatório só local

Na primeira vez, o comando pergunta se você confia na pasta do plugin. Requer Claude Code 2.1.269 ou mais novo.

##### Ler o resultado

resumo (ilustrativo) CASE WITH W/OUT Δ RUNS COST NOTES padroes-nova-funcao 1.00 0.50 +0.50 6 $0.40

| Coluna | Significa

| WITH / W/OUT | Nota de 0 a 1 com e sem o plugin (média das rodadas)

| Δ | WITH menos W/OUT: o que o plugin acrescentou. Perto de zero = o plugin não fez diferença

| COST | Estimativa pelo preço de tabela das chamadas

| NOTES | A explicação do grader mais importante que falhou

O relatório completo (report.html) fica em evals/results/<data>/ e mostra o veredito e a explicação de cada grader em cada rodada.

#### Exercício: a avaliação do plugin taskflow

##### Parte A (sem custo)

- No seu plugin, crie evals\padroes-nova-funcao\ com o prompt.md e os três graders do gabarito (abaixo). Se ainda não tem a skill padroes-taskflow, copie-a do gabarito.

- Para cada grader, escreva numa frase o que ele verifica e se custa chamadas extras.

- Responda: se WITH e W/OUT saírem iguais, o que você conclui?

##### Parte B (opcional, gasta uso do plano)

- Na pasta do plugin: claude plugin eval. --case padroes-nova-funcao --runs 1 --ablation none --max-cost-usd 1 --no-publish. Responda y para confiar na pasta.

- Abra o report.html indicado. A skill foi usada? Qual grader falhou?

- Se a skill não foi usada, deixe a description mais específica e rode de novo. Só confirme com a rodada completa (claude plugin eval .) se quiser ver o Δ.

Ver o gabarito

A suíte está em projeto-taskflow/etapa-08/gabarito/marketplace-taskflow/plugins/taskflow/evals/.

- docstring.md (regex, grátis): a função tem docstring logo depois do def.

- nome-em-portugues.md (llm, chamadas extras): o juiz confere nomes em português.

- skill-usada.md (tool_used, grátis): a skill padroes-taskflow foi chamada. Indicador, fora da nota com/sem.

- WITH = W/OUT: o Claude já fazia aquilo sem o plugin; a skill não foi a responsável. Ou o caso é fácil demais, ou a skill não foi usada.

Esta suíte não foi executada na preparação do curso (custo); as notas mostradas nas simulações são ilustrativas.

#### Erros comuns

##### Pedido que cita a skill

Assim você não testa se o Claude a escolheria sozinho. Escreva como um usuário.

##### Confiar em uma rodada

O resultado varia. Use uma rodada para iterar e confirme com a rodada completa.

##### Juiz para tudo

Graders llm custam e variam. Para texto longo ou formato, prefira regex.

##### Esquecer o custo

Use --max-cost-usd e --ablation none enquanto ajusta.

##### Consigo fazer?

#### Para ir além

- Testar plugins com evals (em inglês): mocks de servidores MCP, preparar a pasta da rodada, uso em CI.

- A skill skill-creator tem uma comparação parecida, com outro formato de arquivo; as duas não leem os casos uma da outra.

- Próxima aula: instalar o seu plugin por nome, a partir de um marketplace local.

- Introduction to evals (Anthropic Academy, em inglês): a ideia de avaliação com casos de teste, vista pela API.

## Aula 8.4: Marketplace local

### Resumo do vídeo da aula

Para fechar o módulo, você vai instalar o seu plugin pelo nome, a partir de um marketplace na sua própria máquina. Um marketplace é uma pasta com o arquivo marketplace ponto JSON, que lista os plugins e onde buscar cada um. Adicione com claude plugin marketplace add e o caminho da pasta. Depois, instale com taskflow, arroba, e o nome do marketplace. Para outras pessoas, o mesmo catálogo iria para um repositório. No curso, nada é publicado. Remover o marketplace desinstala os plugins dele.

### Conteúdo da aula

Objetivo: criar um catálogo na sua máquina que lista o plugin taskflow, instalar o plugin por nome a partir dele e entender como o mesmo catálogo serviria a outras pessoas, sem publicar nada.

#### Por que importa

O --plugin-dir serve para desenvolver: vale só naquela sessão. Para usar o plugin em qualquer sessão, com escopo e atualização, ele precisa ser instalado, e instalar exige um marketplace.

A boa notícia: um marketplace pode ser só uma pasta no seu computador. É exatamente o mesmo arquivo que um time colocaria num repositório.

#### Conceito: o ciclo completo

#### O catálogo

marketplace-taskflow/ .claude-plugin/ marketplace.json ← o catálogo plugins/ taskflow/ ← o plugin da aula 2 .claude-plugin/plugin.json ...

marketplace-taskflow/.claude-plugin/marketplace.json { "name": "treino-taskflow", "description": "Marketplace local de treino do curso (não publicado)", "owner": { "name": "Aluno do curso" }, "plugins": [ { "name": "taskflow", "source": "./plugins/taskflow", "description": "Skills, revisor, hook de sintaxe e servidor MCP do TaskFlow" } ] }

- Obrigatórios: name, owner e plugins; cada plugin precisa de name e source.

- O source relativo parte da raiz do marketplace (a pasta que contém .claude-plugin/) e não pode ter ...

- Use o mesmo nome no catálogo e no plugin.json.

- Nomes oficiais, como claude-plugins-official, são reservados: o Claude Code recusa.

##### Os comandos

PowerShell, na pasta de treino claude plugin validate .\marketplace-taskflow # confere o catálogo e cada plugin claude plugin marketplace add .\marketplace-taskflow # registra (nas settings do usuário) claude plugin install taskflow@treino-taskflow --scope local # instala por nome claude plugin list # confere claude plugin marketplace remove treino-taskflow # remove o catálogo e os plugins dele

Dentro da sessão, o equivalente é /plugin marketplace add ./marketplace-taskflow e /plugin install taskflow@treino-taskflow.

Editou o plugin? Num marketplace local com source relativo, o Claude Code lê os arquivos direto da pasta: a mudança vale na próxima sessão ou com /reload-plugins, sem mudar a versão.

##### E para outras pessoas?

| Forma | Como | No curso

| Direto | Mandar a pasta ou um .zip do plugin; a pessoa usa --plugin-dir | Não

| Marketplace próprio | O mesmo catálogo num repositório; a pessoa roda claude plugin marketplace add dono/repo | Não

| Diretório da Anthropic | Enviar para revisão; aparece no claude.ai e no Cowork | Não

Nada é publicado no curso Distribuir um plugin para outras pessoas, ainda mais com código ou dados da empresa, é decisão da área responsável e da segurança da informação. No curso, o marketplace fica só na sua máquina.

#### Exercício real: instalar o seu plugin por nome

Na pasta de treino, com o plugin da aula 2 em marketplace-taskflow\plugins\taskflow\.

- Crie marketplace-taskflow\.claude-plugin\marketplace.json como no bloco 3.

- Rode claude plugin validate .\marketplace-taskflow até passar.

- Rode claude plugin marketplace add .\marketplace-taskflow.

- Rode claude plugin install taskflow@treino-taskflow --scope local e depois claude plugin list.

- Abra claude (sem --plugin-dir!) e digite /taskflow:. Rode /plugin e veja o plugin na aba Installed.

- Limpe tudo: claude plugin marketplace remove treino-taskflow. Confira com claude plugin list que o plugin saiu junto.

Ver o gabarito

O catálogo completo está em projeto-taskflow/etapa-08/gabarito/marketplace-taskflow/, conferido com claude plugin validate (Claude Code 2.1.327, 19/11/2026: ✔ Validation passed).

- Passo 3: o add registra o marketplace nas settings do usuário; por isso o passo 6 remove no fim.

- Passo 4: o id de instalação é <nome do plugin>@<nome do marketplace>.

- Passo 6: remover o marketplace desinstala todos os plugins que vieram dele.

- Erro Source path does not exist: o source não parte da raiz do marketplace.

A instalação a partir do marketplace não foi executada na preparação do curso, para não mexer nas settings do computador; só a validação.

#### Erros comuns

##### Caminho com ..

O source parte da raiz do marketplace e não pode sair dela.

##### Nomes diferentes

Nome no catálogo diferente do plugin.json confunde a instalação. Use o mesmo.

##### Nome reservado

Nomes oficiais da Anthropic são recusados ao adicionar.

##### Esquecer de limpar

O marketplace fica nas settings do usuário até você remover.

##### Consigo fazer?

#### Para ir além

- Criar um marketplace e Publicar e distribuir (em inglês): versões, atualizações e repositórios privados.

- Revise o módulo nos slides do Módulo 8.
