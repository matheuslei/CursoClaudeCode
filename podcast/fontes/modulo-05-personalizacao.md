# Módulo 5: Personalização

Curso "Claude Code: do zero ao avançado" (estudo pessoal, em português do Brasil). Nível: Intermediário. Tema: settings, skills, output styles, hooks.

Projeto de treino usado em todo o curso: TaskFlow, um gerenciador de tarefas de linha de comando em Python, só com a biblioteca padrão. Dados de exemplo são fictícios.

Aulas: 5.1 settings.json e precedência; 5.2 Skills; 5.3 Output styles e status line; 5.4 Hooks.

## Aula 5.1: settings.json e precedência

### Resumo do vídeo da aula

Nesta aula, você vai descobrir onde cada configuração do Claude Code deve ficar e qual valor vale quando há conflito. O Claude ponto MD é orientação: o Claude lê e tenta seguir. Já o settings ponto json é aplicado pela própria ferramenta: permissões, hooks, modelo padrão e variáveis de ambiente. São três arquivos principais. O de usuário vale para todos os seus projetos. O de projeto é do time e vai para o Git. E o local é só seu, naquele projeto, e fica fora do Git. Quando a mesma chave aparece em mais de um lugar, vale a de nível mais alto. No topo, o gerenciado da organização. Depois, a linha de comando, o local, o projeto e, por último, o usuário. Três detalhes que confundem: listas como permissões se somam entre os arquivos. O JSON é estrito, sem comentários. E barra status mostra quais arquivos foram carregados. Resumindo: exceção sua vai no settings local. Regra do time vai no settings do projeto, commitado.

### Conteúdo da aula

Objetivo: saber em qual arquivo cada configuração deve ficar, prever qual valor vale quando há conflito e conferir o que foi carregado.

#### Por que importa

O CLAUDE.md é orientação: o Claude lê e tenta seguir. Já o settings.json é aplicado pela ferramenta, siga o Claude ou não: permissões, hooks, modelo padrão, variáveis de ambiente. Saber onde colocar cada chave evita o clássico "configurei e não funcionou".

Cenário Você liberou python para rodar sem perguntar, mas só no seu computador. Seu colega clonou o projeto e o Claude pergunta tudo para ele. Por quê? A regra foi salva no settings.local.json, que é só seu e fica fora do Git.

#### Conceito: a pilha de precedência

Quando a mesma chave aparece em mais de um lugar, vale a de nível mais alto. Navegue de baixo para cima:

#### Os arquivos e para que servem

| Escopo | Arquivo | Afeta quem | Use para

| Usuário | ~/.claude/settings.json | Você, em todos os projetos desta máquina | Preferências pessoais: tema, modelo padrão, suas regras

| Projeto compartilhado | .claude/settings.json | Todos no projeto (se commitado) | Permissões, hooks e plugins do time

| Projeto local | .claude/settings.local.json | Só você, só neste projeto | Exceções pessoais; testar antes de compartilhar

| Gerenciado | managed-settings.json e outras fontes da organização | Todos onde a organização implantar | Política de segurança e conformidade

No Windows, ~/.claude é %USERPROFILE%\.claude (ex.: C:\Users\ana\.claude). Instalar o Claude Code não cria nenhum desses arquivos: eles surgem quando você muda algo no /config, quando escolhe "Yes, and don't ask again" (vai para o settings.local.json) ou quando você os cria.

##### Exemplo de arquivo (formato da documentação)

.claude/settings.json { "$schema": "https://json.schemastore.org/claude-code-settings.json", "permissions": { "allow": [ "Bash(python -m unittest *)" ], "deny": [ "Read(./.env)", "Read(./.env.*)" ] } }

JSON estrito Nada de comentários // nem vírgula sobrando no final. Um erro de sintaxe vira "Settings Error" na próxima sessão. A linha $schema dá autocompletar e validação no VS Code.

##### Três detalhes que confundem

- Listas se somam: permissions.allow de vários arquivos é combinado, não substituído.

- Linha de comando: claude --settings '{"model": "..."}' vale só para aquela sessão, acima dos seus arquivos e abaixo do gerenciado.

- Gerenciado vence tudo: se a organização define uma chave, nada nos seus arquivos muda isso. /status mostra se há fonte gerenciada.

##### Mudar e conferir

- /config abre o menu de opções pessoais (tema, editor, etc.).

- /config chave=valor muda uma opção direto, ex.: /config verbose=true.

- /status mostra a linha Setting sources: quais arquivos foram carregados.

- A maioria das edições vale sem reiniciar: o Claude Code observa os arquivos. Exceções: model e effortLevel (use /model e /effort).

##### O mapa da pasta .claude

| CLAUDE.md (raiz do projeto) | Instruções carregadas em toda sessão

| .claude/settings.json | Permissões, hooks, env, modelo (aplicado)

| .claude/settings.local.json | Suas exceções, fora do Git

| .claude/rules/ | Instruções por tema (opcionalmente por caminho)

| .claude/skills/ | Skills (aula 5.2)

| .claude/commands/ | Comandos de arquivo único (formato antigo; prefira skills)

| .claude/output-styles/ | Estilos de resposta (aula 5.3)

| .claude/agents/ | Subagentes (Módulo 7)

| .mcp.json (raiz) | Servidores MCP do time (Módulo 6)

#### Exercício real

No TaskFlow (ou na cópia em projeto-taskflow/etapa-05):

- Crie .claude/settings.json que libera Bash(python -m unittest *) e bloqueia leitura de ./.env

- Valide o JSON: python -m json.tool .claude\settings.json

- Abra claude e rode /status: confira a linha Setting sources

- Rode /config e mude o tema. Descubra em qual arquivo a mudança foi salva

- Faça commit do .claude/settings.json (e confirme que o settings.local.json, se existir, não entrou)

Ver gabarito

{ "$schema": "https://json.schemastore.org/claude-code-settings.json", "permissions": { "allow": ["Bash(python -m unittest *)"], "deny": ["Read(./.env)", "Read(./.env.*)"] } }

- python -m json.tool imprime o JSON formatado se estiver válido, ou aponta a linha do erro.

- /status deve listar Project settings (e User settings, se você já tiver um).

- A troca de tema vai para ~/.claude/settings.json (usuário).

- Se o settings.local.json foi criado pelo Claude Code, ele já o colocou nas exclusões globais do Git. Se criou à mão, adicione ao .gitignore.

#### Erros comuns

##### Comentário no JSON

// isso quebra. Settings são JSON estrito.

##### Arquivo certo, pasta errada

O .claude/settings.json é lido da pasta onde você abriu o Claude. Abra na raiz do projeto.

##### Commitar o settings.local.json

É pessoal. Se for para o Git, suas exceções viram regra do time.

##### "Não pega" por causa do gerenciado

Se a organização fixou a chave, seus arquivos não mudam nada. Veja /status.

##### Consigo fazer?

#### Para ir além

- Settings files and precedence

- All settings: todas as chaves

- Explore the .claude directory

## Aula 5.2: Skills

### Resumo do vídeo da aula

Nesta aula, você vai transformar um pedido que você repete toda hora numa skill reutilizável. Sabe aquele pedido longo que você digita várias vezes? Revise o diff, confira os testes, sugira o commit. Uma skill guarda esse procedimento num arquivo, e você chama com um comando. Diferente do Claude ponto MD, que entra em toda sessão, o conteúdo completo da skill só entra no contexto quando ela é usada. Cada skill é uma pasta com um arquivo skill ponto MD. No topo, a description é a parte mais importante: é ela que o Claude lê para decidir quando usar a skill. E uma linha com exclamação roda um comando antes, como injetar o diff atual. Por padrão, tanto você quanto o Claude podem chamar a skill. Com disable model invocation, só você chama, bom para ações sensíveis. Com user invocable falso, só o Claude. Barra skills lista as disponíveis, e barra skill doctor mostra quanto contexto cada uma custa. Atenção: leia o conteúdo antes de instalar skills de terceiros. A regra é simples: repetiu o mesmo pedido? Transforme em skill.

### Conteúdo da aula

Objetivo: transformar um pedido que você repete sempre numa skill reutilizável, chamada com /nome ou carregada pelo Claude quando a tarefa pede.

#### Por que importa

Você se pega digitando o mesmo pedido longo várias vezes? "Revise o diff, procure erros de validação, confira os testes, sugira mensagem de commit…". Uma skill guarda esse procedimento num arquivo. Você chama com /revisar-taskflow, e o time inteiro usa o mesmo padrão se a skill for commitada.

##### CLAUDE.md

O que o Claude deve saber sempre. Carregado em toda sessão.

##### Skill

Um procedimento para um tipo de tarefa. Só o corpo completo entra no contexto quando é usado.

#### Conceito: como uma skill é carregada

#### Anatomia de uma skill

Cada skill é uma pasta com um arquivo SKILL.md (e arquivos de apoio, se quiser):

| Escopo | Caminho | Vale para

| Pessoal | ~/.claude/skills/<nome>/SKILL.md | Todos os seus projetos nesta máquina

| Projeto | .claude/skills/<nome>/SKILL.md | Este repositório (commite para o time)

| Plugin | <plugin>/skills/<nome>/SKILL.md | Onde o plugin estiver ativo (Módulo 8)

Exemplo no formato da documentação, adaptado ao TaskFlow:

.claude/skills/revisar-taskflow/SKILL.md --- description: Revisa as mudanças não commitadas do TaskFlow e aponta riscos. Use quando o usuário pedir revisão do diff ou uma mensagem de commit. argument-hint: [foco opcional da revisão] --- ## Mudanças atuais !`git diff HEAD` ## Instruções Resuma as mudanças acima em 2 ou 3 tópicos. Depois liste riscos: validação de número da tarefa, tratamento de tarefas.json inexistente, mensagens de erro em português e testes que precisam ser atualizados. Foco extra pedido pelo usuário: $ARGUMENTS Termine sugerindo uma mensagem de commit em português. Se o diff estiver vazio, diga que não há mudanças.

##### O que cada parte faz

- Frontmatter (entre ---): todos os campos são opcionais, mas description é o mais importante. É ela que o Claude lê para decidir quando usar a skill.

- name: se omitido, o nome vem da pasta (revisar-taskflow → /revisar-taskflow).

- argument-hint: dica que aparece no menu /.

- $ARGUMENTS: recebe tudo o que você digita depois do comando. $0, $1… pegam por posição.

- !`comando`: roda antes de o Claude ver a skill, e a saída substitui a linha. Aqui injeta o diff atual.

##### Quem pode chamar

| Padrão | Você (/nome) e o Claude (quando a tarefa combina com a description)

| disable-model-invocation: true | Só você. Bom para ações sensíveis, como um /deploy

| user-invocable: false | Só o Claude. Não aparece no menu /

##### Comandos úteis

- /skills: lista as skills disponíveis

- /skill-doctor: mostra quanto contexto cada skill custa e quanto é usada

- /reload-skills: recarrega skills criadas ou editadas durante a sessão

##### Skills de verificação: o Claude confere o próprio trabalho

Um tipo de skill que vale muito: a que diz ao Claude como provar que terminou. Em vez de você lembrar de pedir "rode os testes e mostre", a skill guarda o roteiro de conferência do projeto, e o Claude a usa sozinho quando a description combina.

.claude/skills/verificar-taskflow/SKILL.md --- description: Confere uma mudança no TaskFlow antes de dizer que terminou. Use sempre que terminar de alterar tarefas.py ou os testes, antes de responder que a tarefa está pronta. --- Antes de dizer que terminou: 1. Rode `python -m unittest` e mostre a última linha da saída. 2. Rode o comando que você mudou com dados fictícios, por exemplo: `python tarefas.py adicionar "Tarefa de teste"` e `python tarefas.py listar`. Mostre a saída. 3. Releia o pedido do usuário e diga, item por item, onde cada um foi atendido. 4. Rode `git diff --stat` e confirme que só mudaram os arquivos esperados. Se algo falhar, corrija e repita. Nunca diga "pronto" sem mostrar essas saídas.

- Por que funciona: a description diz quando (ao terminar uma mudança) e o corpo diz como. A prova aparece na conversa, onde você confere e onde o avaliador do /goal também consegue ler (Módulo 7).

- Skill ou hook? A skill orienta e pode ser pulada. Para uma regra que precisa valer sempre, como "não encerrar com teste falhando", use um hook (aula 5.4 e o hook de Stop da aula 9.4).

E o .claude/commands/? É o formato antigo, de arquivo único: .claude/commands/deploy.md vira /deploy. Ainda funciona, mas a documentação recomenda skills para coisas novas, porque elas aceitam arquivos de apoio. Para migrar, mova para .claude/skills/deploy/SKILL.md.

Skills de terceiros Uma skill pode rodar comandos (!`...`) e orientar o Claude. Leia o conteúdo antes de instalar skills que você não escreveu.

#### Exercício real

- No TaskFlow, crie .claude/skills/revisar-taskflow/SKILL.md com o conteúdo da aula

- Faça uma pequena mudança em tarefas.py (ex.: mude uma mensagem)

- Abra claude, rode /skills e confira se ela aparece. Se a sessão já estava aberta, use /reload-skills

- Rode /revisar-taskflow mensagens de erro

- Crie uma segunda skill, nova-funcionalidade, com disable-model-invocation: true, que recebe o nome da funcionalidade em $ARGUMENTS e manda o Claude: explorar, propor plano, esperar aprovação, implementar e testar

- Rode /skill-doctor e veja o custo de contexto das duas

- (Extra) Crie a skill verificar-taskflow da seção 3. Peça uma mudança pequena ("faça o listar mostrar o total de tarefas no fim") sem falar em testes e observe: o Claude usa a skill e mostra as provas antes de dizer que terminou?

Ver gabarito da skill nova-funcionalidade

--- description: Implementa uma funcionalidade nova no TaskFlow seguindo explorar, planejar, implementar e testar. argument-hint: [descrição da funcionalidade] disable-model-invocation: true --- Funcionalidade pedida: $ARGUMENTS 1. Leia tarefas.py e os testes existentes. 2. Proponha um plano curto (arquivos, funções, casos de teste) e ESPERE minha aprovação. 3. Implemente usando só a biblioteca padrão do Python. 4. Rode os testes e o comando novo; mostre a saída. 5. Sugira uma mensagem de commit em português.

Com disable-model-invocation: true, o Claude não dispara essa skill sozinho: só quando você digita /nova-funcionalidade .... Uma versão pronta está em projeto-taskflow/etapa-05/.claude/skills/.

#### Erros comuns

##### Description vaga

"Ajuda com código" não diz quando usar. Escreva o quê e quando: "Use quando o usuário pedir…".

##### Arquivo solto

A skill é uma pasta com SKILL.md dentro, não um .md solto em skills/.

##### Campo com nome errado

Campos com grafia errada são ignorados sem aviso. Use hífens: argument-hint.

##### Skill gigante

Muita coisa numa skill só gasta contexto. Divida e veja o custo com /skill-doctor.

##### Consigo fazer?

#### Para ir além

- Extend Claude with skills: frontmatter completo

- Explore the .claude directory

- Introduction to agent skills (Anthropic Academy, gratuito, em inglês) e a lição sobre skills de verificação do Claude Code in Action.

## Aula 5.3: Output styles e status line

### Resumo do vídeo da aula

Nesta aula, você vai mudar o jeito como o Claude responde e colocar informações úteis no rodapé do terminal. Enquanto estuda, você quer explicações. No dia a dia, quer respostas diretas. Um output style troca o jeito do Claude para a sessão inteira, sem repetir o pedido em cada mensagem. Os estilos embutidos são: Default, o padrão. Proactive, que já começa a implementar. Concise, direto ao ponto. Explanatory, que explica o porquê. E Learning, que deixa pequenos trechos para você escrever. Para trocar, use barra output style e o nome do estilo. Para criar o seu, escreva um arquivo Markdown na pasta output styles. No terminal, reinicie o Claude Code depois de criar. A status line é uma barra no rodapé que mostra, sem você perguntar, dados como o modelo e quanto contexto já foi usado. O jeito mais fácil é pedir com barra statusline. E lembre: estilo muda como o Claude responde, mas é instrução, não garantia. O que precisa acontecer sempre vai num hook, o assunto da próxima aula.

### Conteúdo da aula

Objetivo: mudar o jeito como o Claude responde (mais curto, mais didático, deixando código para você) e manter uma barra de status com modelo e uso de contexto sempre à vista.

#### Por que importa

Enquanto você estuda, quer explicações. No dia a dia, quer respostas diretas. Um output style troca o "jeito" do Claude para a sessão inteira, sem repetir o pedido em cada mensagem. E a status line mostra, sem você perguntar, quanto contexto já foi usado. Isso conecta direto com o Módulo 2.

#### Conceito: os estilos embutidos

#### Como usar

##### Trocar de estilo

- /output-style lista os estilos e marca o atual

- /output-style concise troca na hora (o comando ignora maiúsculas)

- /config → Output style abre um menu

- A escolha é salva em .claude/settings.local.json. No settings, o valor é sensível a maiúsculas: "outputStyle": "Explanatory"

##### Criar um estilo próprio

Um arquivo Markdown em ~/.claude/output-styles/ (pessoal) ou .claude/output-styles/ (projeto):

.claude/output-styles/tutor-ptbr.md --- name: Tutor PT-BR description: Responde em português, explica o porquê e propõe um mini exercício keep-coding-instructions: true --- Responda sempre em português do Brasil, de forma curta. Depois de cada mudança de código, explique em 2 tópicos o porquê da escolha. Ao final de cada tarefa, proponha um mini exercício de 1 linha para eu praticar o conceito usado.

- keep-coding-instructions: true mantém as instruções de engenharia de software do Claude Code. Sem ele, o estilo substitui essa parte, o que é útil quando o Claude não vai programar (ex.: assistente de escrita).

- No terminal, estilos são lidos ao iniciar: criou ou editou, reinicie o Claude Code.

Estilo × CLAUDE.md × hook Estilo muda como o Claude responde. CLAUDE.md diz o que ele precisa saber do projeto. E se algo precisa acontecer sempre, sem exceção (formatar após editar), use um hook (próxima aula). Estilo é instrução, não garantia.

##### Status line

Uma barra no rodapé que roda um comando seu e mostra o que ele imprimir. O Claude Code envia dados da sessão em JSON pela entrada padrão (stdin): modelo, pasta, % de contexto usado, custo estimado…

O jeito mais fácil é pedir:

/statusline mostre o modelo e a porcentagem de contexto usado

O Claude gera um script em ~/.claude/ e configura o settings para você. Para remover: /statusline remove. O formato no settings é:

{ "statusLine": { "type": "command", "command": "~/.claude/statusline.sh" } }

Windows O comando roda pelo Git Bash (se instalado) ou pelo PowerShell. Use barras normais nos caminhos (C:/Users/ana/.claude/statusline.ps1): no Git Bash, a barra invertida é "comida" e o script falha em silêncio. Para script PowerShell: "command": "powershell -NoProfile -File C:/Users/ana/.claude/statusline.ps1".

Campos úteis do JSON: model.display_name, workspace.current_dir, context_window.used_percentage, cost.total_cost_usd (estimativa, pode diferir da cobrança real).

#### Exercício real

- No TaskFlow, rode /output-style learning e peça adicione o comando "renomear <numero> <novo titulo>". O Claude deve deixar um TODO(human) para você completar

- Complete o trecho, avise o Claude e veja o comentário dele

- Crie .claude/output-styles/tutor-ptbr.md (conteúdo da aula), reinicie o Claude Code e ative com /output-style

- Rode /statusline mostre o modelo e a porcentagem de contexto e aprove as edições

- Volte ao estilo padrão: /output-style default

Ver gabarito

- No Learning, o Claude faz a parte rotineira e para num ponto de decisão (ex.: validar o novo título vazio), marcando TODO(human) e explicando o que você deve escrever.

- O estilo próprio aparece na lista do /output-style pelo name do frontmatter. Se não aparecer, você não reiniciou o Claude Code ou o arquivo está fora de output-styles/.

- Após o /statusline, seu ~/.claude/settings.json ganha a chave statusLine e a barra aparece no rodapé.

#### Erros comuns

##### "explanatory" no settings

No arquivo, o nome é sensível a maiúsculas: Explanatory. Errado = estilo padrão.

##### Estilo novo não aparece

Reinicie o Claude Code: estilos são lidos ao iniciar.

##### Status line em branco no Windows

Barra invertida no caminho. Use /.

##### Usar estilo como regra

Estilo é instrução, não garantia. Para garantir, hook.

##### Consigo fazer?

#### Para ir além

- Output styles

- Customize your status line: exemplos prontos, inclusive em PowerShell

## Aula 5.4: Hooks

### Resumo do vídeo da aula

Nesta aula, você vai aprender a diferença entre pedir e garantir: os hooks. Escrever no Claude ponto MD para sempre verificar a sintaxe funciona na maioria das vezes, mas não sempre. Um hook é executado pela ferramenta, toda vez, sem exceção. Os hooks se prendem a eventos. Os mais usados: quando a sessão começa, quando você envia um prompt, antes de uma ferramenta rodar, que pode bloquear a ação, depois que ela rodou, e quando o Claude termina de responder. A configuração fica no settings, na chave hooks: evento, matcher e comando. Aqui, depois de cada Edit ou Write, o TaskFlow roda um script Python que verifica a sintaxe. O código de saída do seu script decide o que acontece. Zero segue normalmente. Dois é bloqueante: no Pre Tool Use impede a ação, e a mensagem vai para o Claude. Qualquer outro, como um, não bloqueia. Cuidado: hooks rodam comandos com as suas permissões, sem pedir aprovação. Leia todo hook de projeto ou plugin antes de confiar. Barra hooks mostra os configurados e de onde vêm. Guarde assim: pedir é Claude ponto MD. Garantir é hook.

### Conteúdo da aula

Objetivo: fazer o Claude Code executar um comando seu automaticamente em momentos certos (após cada edição, antes de um comando), garantindo regras que não dependem de o Claude "lembrar".

#### Por que importa

Você pode escrever no CLAUDE.md "sempre verifique a sintaxe depois de editar". Na maioria das vezes ele faz, mas não sempre. Um hook é executado pela ferramenta, toda vez, sem exceção. É a diferença entre pedir e garantir.

##### Exemplos clássicos

Formatar/validar após editar · bloquear comando perigoso · notificar quando o Claude termina · injetar contexto ao iniciar a sessão.

##### Cuidado

Hooks rodam comandos com as suas permissões, sem pedir aprovação. Leia todo hook de projeto ou plugin antes de confiar.

#### Conceito: onde os hooks entram no ciclo

#### Configuração

Hooks ficam nos mesmos arquivos de settings da aula 5.1 (usuário, projeto, local ou gerenciado), na chave hooks. A estrutura tem 3 níveis: evento → grupo com matcher → lista de handlers.

.claude/settings.json (TaskFlow) { "hooks": { "PostToolUse": [ { "matcher": "Edit|Write", "hooks": [ { "type": "command", "command": "python .claude/hooks/checar.py" } ] } ] } }

E o script que ele chama: compila os .py do projeto e, se houver erro de sintaxe, sai com código 2 para o Claude receber o erro e corrigir.

.claude/hooks/checar.py import py_compile import sys from pathlib import Path sys.stderr.reconfigure(encoding="utf-8") # acentos legíveis no Windows raiz = Path(__file__).resolve().parents[2] # pasta do projeto erros = [] for arquivo in raiz.glob("*.py"): try: py_compile.compile(str(arquivo), doraise=True) except py_compile.PyCompileError as e: erros.append(str(e)) if erros: print("Erro de sintaxe após a edição:\n" + "\n".join(erros), file=sys.stderr) sys.exit(2) # 2 = o Claude vê a mensagem e pode corrigir sys.exit(0)

##### Eventos mais usados

| SessionStart | Sessão começa ou é retomada

| UserPromptSubmit | Você envia um prompt, antes de o Claude processar

| PreToolUse | Antes de uma ferramenta rodar. Pode bloquear

| PostToolUse | Depois que uma ferramenta rodou com sucesso

| Notification | O Claude Code envia uma notificação

| Stop | O Claude termina de responder

Há muitos outros (PreCompact, SubagentStop, SessionEnd…). Veja a lista completa na documentação.

##### Matcher

- "Edit|Write": nomes exatos de ferramentas, separados por |

- "*", "" ou omitido: todas

- Com outros caracteres vira expressão regular, ex.: "mcp__memory__.*"

- Campo opcional "if" filtra com a sintaxe de permissões, ex.: "if": "Bash(git *)" (só em eventos de ferramenta)

##### Códigos de saída: o que o seu script devolve

| Código | Efeito

| 0 | Sucesso, segue normalmente

| 2 | Erro bloqueante: no PreToolUse impede a ação; o texto do stderr vira o motivo. No PostToolUse a ação já aconteceu, mas o stderr é mostrado ao Claude

| Outro (ex.: 1) | Erro não bloqueante: a ação segue e aparece um aviso de erro do hook. Atenção: exit 1 não bloqueia!

Windows Hooks de comando rodam pelo Git Bash (se instalado) ou pelo PowerShell; o campo "shell" aceita "bash" ou "powershell". Por isso o exemplo usa um script Python: o mesmo comando funciona nos dois. Use barras normais nos caminhos e abra o Claude na raiz do projeto.

/hooks abre um navegador somente leitura dos hooks configurados, com a origem de cada um (usuário, projeto, local, plugin).

#### Exercício real

- No TaskFlow, crie .claude/hooks/checar.py e adicione o hook ao .claude/settings.json (junte com as permissões da aula 5.1, num único JSON)

- Valide: python -m json.tool .claude\settings.json

- Abra claude na raiz do projeto e rode /hooks: o hook aparece em PostToolUse?

- Peça: adicione um comando "limpar" que remove todas as tarefas concluídas. Observe se o hook roda após cada edição

- Teste o bloqueio: peça introduza propositalmente um erro de sintaxe em tarefas.py para testarmos o hook. O Claude deve receber a mensagem do hook e corrigir

- Commit do .claude/

Ver gabarito (settings completo)

{ "$schema": "https://json.schemastore.org/claude-code-settings.json", "permissions": { "allow": ["Bash(python -m unittest *)"], "deny": ["Read(./.env)", "Read(./.env.*)"] }, "hooks": { "PostToolUse": [ { "matcher": "Edit|Write", "hooks": [ { "type": "command", "command": "python .claude/hooks/checar.py" } ] } ] } }

No passo 5, depois da edição com erro, aparece o texto "Erro de sintaxe após a edição…" e o Claude corrige em seguida, sem você pedir. A versão pronta está em projeto-taskflow/etapa-05/.

Se o hook não rodar: confira o /hooks, se o Claude foi aberto na raiz do projeto e se python funciona no terminal. Mensagens de "hook error" com código 1 indicam erro no próprio script.

#### Erros comuns

##### exit 1 para bloquear

Não bloqueia! Para impedir a ação no PreToolUse, use exit 2.

##### Matcher com nome errado

As ferramentas se chamam Edit, Write, Bash… com maiúscula.

##### Hook lento

Ele roda a cada edição. Rodar a suíte inteira de testes toda vez pode deixar tudo lento.

##### Confiar em hook alheio

Hook de projeto ou plugin roda comandos na sua máquina. Leia antes.

##### Consigo fazer?

#### Para ir além

- Guia de hooks (receitas práticas)

- Hooks reference: todos os eventos, entrada JSON e saída
