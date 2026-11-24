# Módulo 9: Automação

Curso "Claude Code: do zero ao avançado" (estudo pessoal, em português do Brasil). Nível: Avançado. Tema: claude -p em scripts, /code-review, GitHub Actions e agendamentos.

Projeto de treino usado em todo o curso: TaskFlow, um gerenciador de tarefas de linha de comando em Python, só com a biblioteca padrão. Dados de exemplo são fictícios.

Aulas: 9.1 Modo não interativo (claude -p); 9.2 Revisão de código com o Claude; 9.3 Claude Code no GitHub Actions; 9.4 Tarefas agendadas e loops.

## Aula 9.1: Modo não interativo (claude -p)

### Resumo do vídeo da aula

Nesta aula, o Claude Code sai do chat e entra nos seus scripts: o modo não interativo, com claude hífen p. Com hífen p, você manda o pedido, o Claude trabalha e imprime a resposta. Sem conversa e sem esperar você. O código de saída diz se deu certo. Dá para usar pipe: o conteúdo de um arquivo ou de um git diff entra pela entrada padrão, e a resposta pode ir para um arquivo. Com hífen hífen output format json, a resposta vem estruturada: o texto no campo result, o ID da sessão e o custo estimado. No PowerShell, o ConvertFrom Json lê tudo. Sem ninguém para aprovar, defina limites. Hífen hífen allowedTools libera só as ferramentas necessárias, e hífen hífen max turns limita quantos turnos o Claude pode usar. Cuidado com o custo: cada chamada consome o seu plano. Um claude hífen p dentro de um laço multiplica esse gasto. Comece pequeno e meça.

### Conteúdo da aula

Objetivo: rodar o Claude Code dentro de scripts do PowerShell com claude -p, ler a resposta em JSON, limitar ferramentas e turnos, e saber quanto cada chamada custa.

#### Por que importa

Até aqui você conversou com o Claude: pediu, leu, aprovou. Mas muita tarefa se repete igual toda vez: revisar um arquivo antes do commit, explicar um log de erro, resumir o que mudou. Para isso existe o modo não interativo: o Claude recebe o pedido, trabalha e imprime a resposta, sem conversa. Assim ele cabe num script, num atalho ou num pipeline de CI.

##### 🔁 Repetível

O mesmo comando, com as mesmas regras, toda vez.

##### 🧩 Encaixável

Lê do pipe, escreve em arquivo, devolve JSON para o script decidir o próximo passo.

##### 🪙 Mensurável

A saída JSON traz o custo estimado de cada chamada.

Aviso de custo Cada claude -p consome o uso do seu plano (ou créditos da API), igual a uma conversa. Um claude -p dentro de um laço multiplica o gasto pelo número de voltas. Teste com uma chamada, meça e só então automatize.

#### Conceito: o que acontece numa chamada

#### As flags que você mais vai usar

Acrescente -p (ou --print) a qualquer comando claude. O processo termina com código 0 quando dá certo e diferente de zero quando falha, então o script pode testar $LASTEXITCODE.

PowerShell claude -p "Quais funções de tarefas.py não têm docstring?" Get-Content erro.txt | claude -p "explique a causa deste erro em 3 linhas" > explicacao.txt git diff | claude -p "aponte erros de digitação neste diff, um por linha"

| Flag | Para quê

| --output-format | text (padrão), json (resultado + ID da sessão + metadados) ou stream-json (um JSON por linha, em tempo real; use com --verbose).

| --json-schema | Com --output-format json, a resposta segue o esquema e vem no campo structured_output. Confira se o campo existe antes de usar.

| --max-turns | Limita os turnos do agente (só no modo -p). Sem ele, não há limite.

| --max-budget-usd | Para a execução quando o gasto estimado chega ao valor (só no modo -p). É estimativa local e pode passar um pouco do teto.

| --allowedTools | Ferramentas que rodam sem pedir permissão, com a sintaxe de regras do Módulo 4: "Read,Grep", "Bash(git diff *)".

| --permission-mode | Modo da sessão: dontAsk nega tudo que pediria aprovação (bom para CI travado), acceptEdits aceita edições.

| --append-system-prompt | Acrescenta instruções ao prompt padrão, por exemplo "você é um revisor de segurança".

| --continue / --resume <id> | Continua a última conversa ou uma sessão específica (o ID vem no JSON).

##### Quem aprova as permissões?

No -p não há ninguém para clicar em "Yes". A partir da v2.1.302, uma execução -p começa no modo Manual quando nada define o modo: o que precisaria de aprovação é negado, a não ser que esteja em --allowedTools, numa regra allow ou num hook. Leituras na pasta de trabalho não precisam de aprovação. Por isso, libere só o que a tarefa exige.

No Windows No Windows, o Claude costuma rodar comandos pela ferramenta PowerShell, que tem regras próprias. Uma regra Bash(python -m unittest *) não libera o mesmo comando no PowerShell. Para scripts, prefira o padrão do pipe: o seu script roda os testes e manda o resultado para o Claude, que só precisa ler.

##### JSON no PowerShell

A documentação usa jq; no PowerShell, o ConvertFrom-Json já resolve, sem instalar nada:

PowerShell $r = claude -p "Resuma o README.md" --output-format json --max-turns 3 | ConvertFrom-Json $r.result # o texto da resposta $r.session_id # para continuar com --resume $r.total_cost_usd # custo estimado (pode diferir da fatura)

##### Outros pontos que valem saber

- Skills e comandos personalizados funcionam no -p: escreva /nome-da-skill no pedido. Comandos que só existem na interface, como /login, não.

- Pipe tem limite de 10 MB. Acima disso, salve em arquivo e cite o caminho no pedido.

- --bare pula hooks, skills, plugins, MCP, memória e CLAUDE.md para o resultado ser igual em qualquer máquina. Mas ele não usa o login da assinatura: exige ANTHROPIC_API_KEY no ambiente. A doc avisa que ele deve virar o padrão do -p numa versão futura. Neste curso, não usamos --bare.

- --permission-prompts none (v2.1.259 ou mais nova) avisa ao Claude que ninguém vai aprovar nada, para ele não ficar tentando de novo.

#### Exercício real: o seu revisar.ps1

Use a pasta de treino do Módulo 9. Se ainda não criou, siga o README da etapa 09 (passo 1; o Git é opcional nesta aula).

Antes de começar Cada passo abaixo chama o Claude uma vez e consome o seu plano. Rode cada um uma vez, sempre com --max-turns. Só código de treino com dados fictícios: código ou dados da empresa só com aval da área de segurança da informação.

- No PowerShell, na pasta de treino: claude -p "Quais funções de tarefas.py não têm docstring? Responda só com os nomes." --max-turns 3

- Repita pedindo JSON e guarde numa variável: $r = claude -p "Liste as funções de tarefas.py" --output-format json --max-turns 3 | ConvertFrom-Json. Mostre $r.result e $r.total_cost_usd.

- Crie revisar.ps1 que: (a) roda python -m unittest; (b) junta o resultado e o conteúdo de um arquivo; (c) manda tudo pelo pipe para claude -p com --output-format json e --max-turns; (d) salva result num arquivo revisao-*.md e mostra o custo.

- Rode .\revisar.ps1 -Arquivo tarefas.py e leia o relatório. Ele aponta as funções sem docstring?

Ver o gabarito

Arquivo completo em projeto-taskflow/etapa-09/gabarito/revisar.ps1. O coração dele:

revisar.ps1 (trecho) param([string]$Arquivo = "", [int]$MaxTurnos = 3) $utf8 = New-Object System.Text.UTF8Encoding $false [Console]::OutputEncoding = $utf8; $OutputEncoding = $utf8 # acentos no pipe $testes = (python -m unittest 2>&1 | Out-String) # 1. testes locais (sem custo) $codigo = Get-Content $Arquivo -Raw -Encoding UTF8 # 2. o que revisar $contexto = "Resultado dos testes:`n$testes`nCódigo ($Arquivo):`n$codigo" $pedido = "Revise o código recebido seguindo o CLAUDE.md. Não edite arquivos. " + "Responda com Testes, Achados e Veredito." $bruto = $contexto | claude -p $pedido --output-format json ` --max-turns $MaxTurnos --allowedTools "Read,Grep,Glob" # 3. chamada limitada if ($LASTEXITCODE -ne 0) { Write-Host ($bruto | Out-String); exit $LASTEXITCODE } $r = ($bruto | Out-String) | ConvertFrom-Json # 4. JSON -> objeto Set-Content "revisao-$(Get-Date -Format 'yyyy-MM-dd-HHmm').md" $r.result -Encoding UTF8 "Custo estimado: US$ {0:N4}" -f [double]$r.total_cost_usd

Por que o script roda os testes, e não o Claude? Assim o Claude não precisa de permissão de shell (que no -p seria negada) e você gasta menos turnos. O pipe leva tudo pronto.

Resultado esperado (ilustrativo): testes passaram (6); 🟡 adicionar, listar, concluir, remover e main sem docstring; veredito "ajustar antes".

Se o PowerShell bloquear o script, rode-o com powershell -ExecutionPolicy Bypass -File .\revisar.ps1 -Arquivo tarefas.py (vale só para essa execução) ou peça orientação à TI.

#### Erros comuns

##### Laço sem limite

foreach com claude -p em 200 arquivos = 200 chamadas pagas. Teste com 1, use --max-turns e, com API, --max-budget-usd.

##### Esperar que ele peça permissão

No -p, o que precisa de aprovação é negado. Libere com --allowedTools só o necessário, ou entregue os dados pelo pipe.

##### Ler JSON como texto

Com --output-format json, a resposta está em .result. Use ConvertFrom-Json em vez de cortar texto.

##### Acentos quebrados

O Windows PowerShell 5.1 manda texto pelo pipe em outra codificação. Ajuste $OutputEncoding e [Console]::OutputEncoding para UTF-8.

##### Chave no script

Nunca escreva ANTHROPIC_API_KEY num arquivo. Se precisar dela, use variável de ambiente ou cofre de segredos.

##### Consigo fazer?

#### Para ir além

- Run Claude Code programmatically (em inglês): pipes, JSON, streaming, --bare e permissões no modo -p.

- CLI reference: todas as flags. Quem precisa de controle total em Python ou TypeScript usa o Agent SDK, tema do Módulo 10.

- Próxima aula: revisão de código com /code-review e /security-review.

## Aula 9.2: Revisão de código com o Claude

### Resumo do vídeo da aula

Nesta aula, o Claude revisa o seu código antes de você juntar: barra code review, barra security review e o seu revisor. Barra code review procura bugs nas mudanças da sua branch. Ela roda num subagente em segundo plano, e os achados chegam na conversa. Você escolhe o alvo e o esforço. Low traz poucos achados, com mais certeza. Níveis mais altos ampliam a busca. E hífen hífen fix aplica as correções. Barra security review olha só para segurança: injeção, autenticação e exposição de dados. Ela compara a sua branch com o remoto origin. E o revisor do Módulo 7 continua útil: ele segue as regras do seu projeto. Cada revisor tem o seu papel. Lembre: revisão automática ajuda, mas não substitui a sua leitura. E cada revisão também consome uso do plano.

### Conteúdo da aula

Objetivo: revisar mudanças antes de juntar com /code-review (alvo, esforço e --fix), checar segurança com /security-review e saber quando usar o seu subagente revisor.

#### Por que importa

Quem escreveu o código é a pior pessoa para revisá-lo: você lê o que quis escrever. Um revisor com outro olhar pega o índice errado, a docstring que mente, o eval esquecido. O Claude Code tem revisores prontos, que você chama com um comando e que também podem rodar em script (aula 1) e no GitHub (aula 3).

Analogia É o "passa o olho aqui antes de eu mandar?" que você pede a um colega. Só que disponível a qualquer hora, sempre com o mesmo método. E, como com o colega, a decisão final continua sendo sua.

#### Conceito: como o /code-review trabalha

#### Os revisores e como apontar cada um

##### /code-review (alias /review)

Procura bugs de funcionamento nas mudanças da sua branch. Funciona em qualquer plano e consome o uso como o resto da sessão. No terminal, roda como subagente em segundo plano, com contexto próprio (Módulo 7): você continua trabalhando e os achados chegam na conversa.

sintaxe /code-review [low|medium|high|xhigh|max|ultra] [--fix] [--comment] [--max-findings n|all|default] [alvo]

| Para revisar | Digite

| A branch atual e o que ainda não tem commit | /code-review

| Os últimos 15 commits | /code-review HEAD~15..HEAD

| Uma branch contra outra | /code-review main...minha-branch

| Um pull request pelo número | /code-review 1234

| Um arquivo ou pasta | /code-review buscar.py

Sem alvo, ele revisa os commits à frente da branch remota mais as mudanças sem commit. Se a branch não tem remota, compara com main ou com o commit anterior.

| Opção | O que faz

| low … max | Esforço. low traz os achados de que tem mais certeza (menos alarme falso); níveis mais altos ampliam a cobertura e gastam mais. Sem nível, ele reusa o último que você digitou.

| --fix | Depois de revisar, aplica as correções. As edições passam pelo seu modo de permissão.

| --max-findings | Muda quantos achados aparecem (v2.1.288 ou mais nova).

| --comment | Publica os achados num PR do GitHub ou MR do GitLab. Fora do escopo deste curso offline.

| ultra | Revisão profunda na nuvem (ultrareview), com vários agentes; exige conta claude.ai. Envia o código para fora do seu PC: em código da empresa, só com aval da segurança da informação.

--fix e o /rewind Uma revisão em segundo plano aplica o --fix fora dos checkpoints da sessão: o /rewind não desfaz essas edições. Faça commit antes e, se não gostar, desfaça pelo Git.

O /code-review segue o seu CLAUDE.md, inclusive no -p. Em script, ele roda em primeiro plano e imprime os achados: claude -p "/code-review low" --max-turns 10.

##### /security-review

Olha só para segurança: injeção, problemas de autenticação, exposição de dados. Compara a sua branch com origin/HEAD, ou seja, precisa de um remoto origin. Sem ele, falha com ambiguous argument 'origin/HEAD...'. Para treinar sem internet, o "remoto" pode ser outra pasta do seu PC (veja o exercício).

Caráter informativo Uma revisão automática de segurança ajuda a achar problemas, mas não é parecer de segurança. Em sistemas da empresa, decisões de segurança e privacidade (LGPD) passam pela área competente.

##### Qual revisor usar?

| Revisor | Procura | Quando

| /code-review | Bugs de funcionamento | Antes de juntar qualquer mudança

| /security-review | Vulnerabilidades | Mudanças que tocam entrada de usuário, arquivos, autenticação, dados

| revisor-taskflow (Módulo 7) | Regras do seu projeto | Checklist da equipe: docstrings, dados fictícios, idioma, testes

| /simplify | Limpeza (reuso, simplicidade) | O código funciona, mas pode ficar mais simples. Não procura bugs.

Quer outro comportamento? Uma skill de projeto chamada code-review substitui a embutida; o alias /review continua chamando a original.

#### Exercício real: revisar um arquivo com problemas

Use a pasta de treino com Git (passos 1 e 2 do README da etapa 09).

Custo e dados Cada revisão consome o seu plano: use low no primeiro teste e não use ultra aqui. Só código de treino com dados fictícios.

- (Opcional, para o /security-review) Ainda na main, crie um remoto local:

PowerShell git init --bare ..\origem-taskflow.git git remote add origin ..\origem-taskflow.git git push -u origin main git remote set-head origin main

- Crie uma branch: git switch -c busca.

- Copie projeto-taskflow/etapa-09/gabarito/buscar_com_bug.py (do curso) para a pasta de treino com o nome buscar.py. Ele tem problemas de propósito. Depois: git add buscar.py e git commit -m "busca".

- Abra o claude e rode /code-review low. Continue conversando enquanto ele trabalha.

- Se criou o remoto no passo 1, rode /security-review. Compare os achados.

- Peça a correção (/code-review --fix ou à mão), crie tests/test_buscar.py e rode python -m unittest.

Ver o gabarito

O que uma boa revisão deve achar (redação real varia). Detalhes em gabarito/revisao-esperada.md.

| Gravidade | Onde | Problema

| 🔴 Grave (segurança) | filtrar | eval com texto do usuário executa qualquer código. O /security-review deve apontar.

| 🔴 Grave (bug) | primeira_pendente | pendentes[1] pula a primeira e quebra com IndexError quando só há uma.

| 🟡 Ajustar (bug) | buscar | A docstring promete ignorar maiúsculas, mas a comparação diferencia.

| 🟡 Ajustar | arquivo | Sem teste próprio (regra do CLAUDE.md).

buscar.py (corrigido) def buscar(termo): """Retorna as tarefas cujo título contém o termo, ignorando maiúsculas e minúsculas.""" termo = termo.casefold() return [t for t in tarefas.carregar() if termo in t["titulo"].casefold()] def filtrar(feita): """Retorna as tarefas com o status pedido: True para feitas, False para pendentes.""" return [t for t in tarefas.carregar() if bool(t.get("feita")) == feita] def primeira_pendente(): """Retorna a primeira tarefa ainda não feita, ou None se não houver.""" for t in tarefas.carregar(): if not t.get("feita"): return t return None

Com gabarito/tests/test_buscar.py copiado para tests/, python -m unittest mostra Ran 11 tests e OK.

Erro ambiguous argument 'origin/HEAD...'? Falta o passo 1. Rode os quatro comandos na main e tente de novo.

#### Erros comuns

##### Aceitar tudo sem ler

Revisão automática erra para os dois lados: inventa problema e deixa passar outro. Leia cada achado antes de corrigir.

##### --fix sem commit antes

As edições da revisão em segundo plano não voltam com /rewind. Faça commit primeiro e desfaça pelo Git se precisar.

##### Usar ultra em tudo

ultra roda na nuvem, custa mais e envia o código para fora do PC. Comece com low.

##### /security-review sem origin

Ele compara com origin/HEAD. Sem remoto, falha antes de começar.

##### Confundir com /simplify

/simplify só limpa o código. Para achar bugs, use /code-review.

##### Consigo fazer?

#### Para ir além

- Review locally with /code-review (em inglês): alvos, níveis, --fix, primeiro plano e ultrareview.

- Commands: linhas de /code-review, /security-review e /simplify.

- Times nos planos Team e Enterprise podem ligar o serviço gerenciado "Code Review", que revisa todo PR no GitHub. É configurado pela organização, não por você.

- Próxima aula: levar a revisão para o GitHub Actions.

## Aula 9.3: Claude Code no GitHub Actions

### Resumo do vídeo da aula

Nesta aula, o Claude Code vai para o GitHub Actions e roda sozinho a cada pull request. A action oficial é anthropics barra claude code action, versão um. Com arroba claude num comentário, ela responde. Com um prompt no workflow, ela roda sozinha. O workflow é um arquivo YAML na pasta ponto github barra workflows. Ele diz quando rodar, com quais permissões e o que pedir ao Claude. A chave nunca fica no arquivo. Ela vai para os GitHub Secrets, e o workflow só faz referência a ela. Cada execução gasta minutos do GitHub e tokens. Limite com hífen hífen max turns, um tempo máximo no job e controle de concorrência. Neste curso, você escreve e confere o YAML no seu PC. Rodar no GitHub é opcional, só num repositório pessoal de teste.

### Conteúdo da aula

Objetivo: entender a action oficial do Claude Code, escrever um workflow YAML de revisão com segredos e limites de custo, e conferi-lo no seu PC antes de qualquer execução real.

#### Por que importa

Na aula 1 o Claude entrou nos seus scripts; na aula 2 ele virou revisor. O passo seguinte é tirá-lo do seu PC: no GitHub Actions, ele roda sozinho quando algo acontece no repositório, como um pull request aberto, um comentário com @claude ou um horário marcado.

Antes de tudo: dados e segurança No GitHub Actions o código roda fora do seu PC, num servidor do GitHub, e é enviado à API do Claude. Neste curso, você escreve e confere o workflow localmente. Rodar no GitHub é opcional e só num repositório pessoal de teste, com dados fictícios. Código ou dados da empresa só com aval da área de segurança da informação.

#### Conceito: do evento ao comentário

#### A action oficial e o workflow

A action se chama anthropics/claude-code-action, versão @v1. Ela é construída sobre o Agent SDK e funciona em dois modos, escolhidos automaticamente:

##### 💬 Interativo

Sem prompt no workflow. O Claude espera a frase @claude num comentário de issue ou PR e responde ali mesmo.

##### ⚙ Automação

Com prompt. Roda direto no evento (PR aberto, horário…). Por padrão, o resultado vai para o log da execução.

##### Anatomia do workflow

O workflow é um arquivo YAML em .github/workflows/. Este é o exemplo do curso (também em projeto-taskflow/etapa-09/gabarito/.github/workflows/claude-review.yml):

.github/workflows/claude-review.yml name: Revisão do TaskFlow on: # QUANDO roda pull_request: types: [opened, synchronize, ready_for_review, reopened] concurrency: # uma revisão por PR de cada vez (custo) group: claude-review-${{ github.event.pull_request.number }} cancel-in-progress: true jobs: revisar: runs-on: ubuntu-latest timeout-minutes: 15 # tempo máximo do job (custo) permissions: # o MÍNIMO necessário contents: read pull-requests: read id-token: write # exigido pela autenticação padrão da action steps: - uses: actions/checkout@v6 # baixa o código no servidor with: fetch-depth: 1 - uses: actions/setup-python@v5 with: python-version: "3.12" - uses: anthropics/claude-code-action@v1 with: anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }} # NUNCA a chave em si prompt: | Revise o código Python deste repositório seguindo o CLAUDE.md. Rode python -m unittest. Não edite arquivos. Responda em português com Testes, Achados e Veredito. claude_args: | --max-turns 10 --allowedTools "Read,Grep,Glob,Bash(python -m unittest *)"

| Entrada (with:) | Para quê

| prompt | O pedido (texto ou /nome-da-skill). Sem ele, modo interativo.

| claude_args | Qualquer flag da CLI: --max-turns, --model, --allowedTools… São as mesmas da aula 1.

| anthropic_api_key | Chave da API, sempre via ${{ secrets.ANTHROPIC_API_KEY }}.

| claude_code_oauth_token | Alternativa: token da sua assinatura (gerado com claude setup-token), via ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}.

| trigger_phrase | Troca o @claude padrão do modo interativo.

Ferramentas no modo automação Com um prompt de texto, o Claude não tem shell nem acesso à API do GitHub até você liberar com --allowedTools em claude_args. É a mesma ideia do -p: libere só o necessário. No servidor (Ubuntu), a ferramenta de shell é a Bash.

##### Segredos: a regra que não tem exceção

- A chave fica no GitHub, em Settings › Secrets and variables › Actions. O workflow só a referencia: ${{ secrets.ANTHROPIC_API_KEY }}.

- Nunca escreva uma chave ou token no YAML, no código, num print ou num chat. Se isso acontecer, apagar o arquivo não basta: revogue a chave no Console e crie outra.

- Excluir o segredo do repositório não invalida a chave; para aposentá-la, apague-a também no Claude Console.

- Em repositórios públicos, o GitHub não entrega segredos a PRs vindos de forks.

##### Duas formas de instalar

- Rápida: /install-github-app dentro do claude. Exige GitHub CLI logado, permissão de admin no repositório e repositório no github.com. Instala o app do Claude no GitHub, grava o segredo e abre um PR com os workflows.

- Manual: instalar o app do Claude no GitHub, criar o segredo e copiar o YAML. O app pede várias permissões de uma vez (o GitHub não permite aceitar só parte); leia a lista antes.

##### Custo: duas contas

| O que consome | Como limitar

| Minutos do GitHub Actions (servidores do GitHub) | timeout-minutes no job; concurrency para não rodar várias vezes; gatilhos específicos.

| Tokens do Claude (API ou assinatura, se usar token OAuth) | --max-turns em claude_args; pedido claro e específico; CLAUDE.md enxuto (é lido em toda execução).

Quem pode disparar? Em eventos de issue e PR, só quem tem acesso de escrita ao repositório; bots são recusados, salvo lista em allowed_bots. Agendamentos (on: schedule) rodam só a partir da branch padrão.

Versão beta antiga? Se encontrar @beta num workflow: troque por @v1, remova a entrada mode, troque direct_prompt por prompt e leve opções como max_turns e model para claude_args.

#### Exercício real: o workflow de revisão

Use a pasta de treino do Módulo 9 (README da etapa 09). Os passos 1 a 3 não usam internet nem gastam uso.

- Na pasta de treino, crie .github\workflows\claude-review.yml com um workflow que: roda em pull request; tem concurrency e timeout-minutes; declara permissions mínimas com id-token: write; usa anthropics/claude-code-action@v1; pega a chave de ${{ secrets.ANTHROPIC_API_KEY }}; e passa --max-turns e --allowedTools em claude_args.

- Confira com o verificador do curso (troque <curso> pela pasta do curso):

PowerShell python "<curso>\projeto-taskflow\etapa-09\gabarito\conferir_workflow.py" .github\workflows\claude-review.yml

A meta é 0 erro(s). Depois, de propósito, troque a referência ao segredo por um texto qualquer e veja o verificador reclamar. Desfaça.

- Leia o seu YAML e responda: em que evento ele roda? Que ferramentas o Claude terá? O que limita o custo?

- Simulação (gasta uso, uma vez): rode no PC o mesmo pedido que a action faria, com os mesmos limites. Como você está no Windows, entregue os testes pelo pipe (aula 1) ou use o seu revisar.ps1:

PowerShell python -m unittest 2>&1 | claude -p "Este é o resultado dos testes. Revise o código Python deste repositório seguindo o CLAUDE.md. Não edite arquivos. Responda em português com Testes, Achados e Veredito." --max-turns 10 --allowedTools "Read,Grep,Glob"

- (Opcional) Num repositório pessoal de teste, só com o TaskFlow fictício: cadastre o segredo no GitHub, envie o workflow, abra um PR e leia o resultado no log da execução (aba Actions). Apague o repositório ou o segredo quando terminar.

Ver o gabarito

O YAML completo é o da seção 3 (arquivo gabarito/.github/workflows/claude-review.yml). Saída esperada do verificador:

saída [OK ] YAML válido (conferido com PyYAML). [OK ] Sem tabulação (YAML só aceita espaços). [OK ] Tem gatilho (on:). [OK ] Usa anthropics/claude-code-action@v1. [OK ] Nada da versão beta (@beta, direct_prompt). [OK ] A credencial vem de ${{ secrets.... }}. [OK ] Nenhuma chave escrita no arquivo. [OK ] Declara permissions. [OK ] Tem id-token: write (autenticação do app). [OK ] Limita turnos com --max-turns (custo). [OK ] Tem timeout-minutes (custo). [OK ] Tem concurrency (evita execuções em paralelo). 0 erro(s), 0 aviso(s).

Sem o pacote PyYAML, a primeira linha vira um AVISO (a sintaxe não é conferida, só o texto). Não precisa instalar nada para concluir o exercício.

Respostas do passo 3: roda quando um PR é aberto, atualizado, reaberto ou marcado como pronto; o Claude pode ler arquivos e rodar só python -m unittest; o custo é limitado por --max-turns 10, timeout-minutes: 15 e concurrency.

Por que a simulação usa pipe? No Windows, o Claude roda comandos pela ferramenta PowerShell, e a regra Bash(...) do YAML não valeria. O resultado da revisão deve ser parecido com o da aula 1.

#### Erros comuns

##### Chave no YAML

Qualquer pessoa com acesso ao repositório (ou ao histórico do Git) vê. Use ${{ secrets.… }} e, se vazou, revogue a chave.

##### Sem limites

Sem --max-turns, timeout-minutes e concurrency, cada push pode virar uma execução longa e paga.

##### Permissões demais

Uma revisão só lê: contents: read. Dê write apenas a workflows que precisam criar commits ou comentar.

##### Tabulação no YAML

YAML só aceita espaços. Uma tabulação quebra o arquivo inteiro.

##### Código da empresa em repositório de teste

O exercício é com o TaskFlow fictício. Código real só com aval da segurança da informação.

##### Consigo fazer?

#### Para ir além

- Claude Code GitHub Actions (em inglês): instalação, modos, exemplos (menções, skill de revisão, agendamento) e custos.

- Repositório da action: lista completa de entradas, segurança e exemplos.

- Usa GitLab? A doc tem uma página própria, "Claude Code GitLab CI/CD".

- Próxima aula: tarefas agendadas e loops, inclusive como elas se comparam a um on: schedule do GitHub.

- Claude Code in Action (Anthropic Academy, em inglês): lição sobre GitHub Actions e revisão de código.

## Aula 9.4: Tarefas agendadas e loops

### Resumo do vídeo da aula

Última aula do módulo: fazer o Claude trabalhar sozinho, no horário certo ou até cumprir um objetivo. Barra loop repete um pedido enquanto a sessão está aberta. Barra loop cinco m roda a cada cinco minutos. Sem intervalo, o Claude escolhe o ritmo. Um loop recorrente expira em sete dias e só roda com a sessão aberta. Para parar um loop de intervalo fixo, peça ao Claude para cancelar. Para rodar sem a sessão aberta, existem as tarefas agendadas: no app Desktop, no seu computador, ou na nuvem, com barra schedule, ainda em prévia. E o barra goal? Ele não olha o relógio: continua turno após turno até uma condição ser cumprida. Loop é tempo. Goal é objetivo. Todo disparo envia o contexto e consome o seu plano. Use intervalos longos, limites claros e cancele o que não precisa mais.

### Conteúdo da aula

Objetivo: repetir um pedido com /loop, conhecer as tarefas agendadas do app Desktop e da nuvem, diferenciar /loop de /goal e escolher a ferramenta certa para cada rotina, de olho no custo.

#### Por que importa

Algumas tarefas não são "faça agora", e sim "faça de tempos em tempos ": ver se o build terminou, rodar os testes a cada meia hora, revisar os commits do dia toda manhã. Em vez de lembrar de pedir, você agenda. O desafio é escolher onde a tarefa roda (na sessão aberta, no seu computador ou na nuvem) e não deixar um agendamento esquecido gastando o seu plano.

Aviso de custo Todo disparo de um agendamento é um novo turno: ele envia o contexto e consome o seu plano, mesmo com você longe do teclado. Prefira intervalos longos, pedidos curtos e cancele o que não precisa mais. O /usage mostra uma linha para os loops mais pesados (v2.1.242 ou mais nova).

#### Conceito: onde cada agendamento roda

#### /loop, Desktop, nuvem e /goal

##### /loop: repetir enquanto a sessão está aberta

no claude /loop 5m rode python -m unittest e responda só OK ou FALHOU # intervalo fixo /loop confira se o build terminou # o Claude escolhe o ritmo /loop # prompt de manutenção ou .claude/loop.md

| Ponto | Como funciona

| Intervalo | Unidades s, m, h, d; o mínimo é 1 minuto (segundos são arredondados para cima). Intervalos "quebrados", como 7m, são ajustados e o Claude avisa qual escolheu.

| Sem intervalo | O Claude escolhe a espera a cada rodada, entre 1 minuto e 1 hora, e diz o motivo.

| Sem pedido | Roda um prompt de manutenção embutido (continuar trabalho pendente, cuidar do PR da branch, limpezas) ou o seu .claude/loop.md.

| Quando dispara | Só com o Claude Code aberto e ocioso, entre os seus turnos. Fechou o terminal, parou. Horários têm uma pequena variação proposital.

| Duração | Tarefas recorrentes expiram em 7 dias. Até 50 tarefas por sessão.

| Parar | Loop com ritmo do Claude: Esc com o campo vazio. Loop de intervalo fixo: peça "cancele o loop dos testes" (Esc e Ctrl+C não param).

| Listar | Pergunte "quais tarefas agendadas eu tenho?". Cada uma tem um ID de 8 caracteres.

Para um lembrete único, não precisa de /loop: escreva em linguagem natural, como "daqui a 45 minutos, confira se os testes passaram". Para desligar o agendador da sessão: variável de ambiente CLAUDE_CODE_DISABLE_CRON=1.

##### Tarefas agendadas sem sessão aberta

| | App Desktop (local) | Nuvem prévia | /loop

| Roda em | Seu computador | Nuvem da Anthropic | Seu computador

| Computador ligado? | Sim (app aberto, sem dormir) | Não | Sim

| Sessão aberta? | Não | Não | Sim

| Arquivos locais? | Sim | Não (clone novo do GitHub) | Sim

| Intervalo mínimo | 1 h nos formulários (1 min se pedir ao Claude) | 1 hora | 1 minuto

| Como criar | Aba Code › Scheduled › New task | /schedule ou claude.ai/code/routines | /loop

- Desktop (Claude Desktop 1.1.5368 ou mais novo): cada tarefa tem pasta, horário (Hourly, Daily, Weekdays, Weekly, Manual ou Custom com cron) e modo de permissão próprios. Se o computador dormiu no horário, ao acordar roda uma execução de recuperação da mais recente perdida (até 7 dias). O pedido fica em ~/.claude/scheduled-tasks/<nome>/SKILL.md.

- Nuvem (antes chamada de routines; em research preview ): planos Pro, Max, Ultra, Team e Enterprise, com login da assinatura claude.ai (não funciona com chave de API). Roda num clone do repositório do GitHub, por horário, chamada de API ou evento do GitHub. Gerencie com /schedule list, /schedule update e /schedule run (alias /routines). O código sai do seu PC: código da empresa só com aval da segurança da informação.

- GitHub Actions (aula 3) também agenda, com on: schedule e cron, rodando no servidor do GitHub.

##### /loop ou /goal?

| | O próximo turno começa quando… | Para quando…

| /loop | passa um intervalo de tempo | você cancela, o Claude decide que acabou (ritmo próprio) ou vencem 7 dias

| /goal (Módulo 7) | o turno anterior termina | um modelo avaliador confirma a condição (ou a julga impossível), ou você usa /goal clear

Regra prática: esperar algo de fora (build, deploy, PR) → /loop. Trabalhar até um resultado (testes passando) → /goal. O /goal também roda no -p: claude -p "/goal ..." vai até o fim numa só chamada.

##### Quanto conferir o que rodou sozinho?

Loop, /goal, tarefa agendada e claude -p têm uma coisa em comum: o Claude trabalha sem você olhando. A regra é simples: quanto menos você acompanhou, mais você confere.

| Como foi o trabalho | O que conferir antes de aceitar

| Você acompanhou cada passo | Leia o diff final e rode os testes uma vez.

| /goal ou loop com você por perto | Os testes você mesmo; o diff inteiro; se nada fora do pedido mudou.

| Agendado, -p ou noturno, sem ninguém | Tudo acima, mais: o que ele disse que fez bate com o que fez (histórico e git log)? Revisão com contexto novo (/code-review, aula 9.2) antes de juntar.

E dá para não depender da memória: um hook de Stop (Módulo 5) roda toda vez que o Claude vai encerrar o turno. Se o script sair com código 2, o Claude não para: o texto do erro volta para ele como motivo para continuar.

.claude/settings.json (trecho) { "hooks": { "Stop": [ { "hooks": [ { "type": "command", "command": "python \"${CLAUDE_PROJECT_DIR}/.claude/hooks/testes_antes_de_parar.py\"" } ] } ] } }

O script roda python -m unittest. Se falhar, sai com 2 e manda o fim do erro; se passar, sai com 0. Está em projeto-taskflow/etapa-09/gabarito/.claude/hooks/testes_antes_de_parar.py (testado em 19/11/2026: libera com testes passando, bloqueia com testes falhando).

Evite o laço sem fim O hook recebe stop_hook_active: true quando o Claude já está continuando por causa dele. O script do gabarito libera a parada nesse caso. Além disso, o Claude Code ignora o bloqueio depois de várias continuações seguidas sem uso de ferramenta. Um teste que nunca passa vira só uma mensagem de erro, não um gasto infinito, mas confira mesmo assim.

#### Exercício real: um loop curto e cancelado

Use a pasta de treino do Módulo 9 (README da etapa 09).

Custo Cada disparo consome o seu plano. Deixe o loop rodar uma ou duas vezes e cancele. Não saia deixando um loop ativo.

- Abra o claude na pasta de treino e rode: /loop 5m rode python -m unittest e responda só OK ou FALHOU. Leia a confirmação: intervalo e ID da tarefa.

- Pergunte: "quais tarefas agendadas eu tenho?". Ache o ID e o próximo horário.

- Depois de um ou dois disparos, peça: "cancele o loop dos testes". Pergunte de novo a lista para confirmar que ficou vazia.

- (Opcional) Crie .claude/loop.md com o seu pedido padrão (modelo em gabarito/.claude/loop.md), rode /loop sem nada, espere uma rodada e pare com Esc no campo vazio.

- Compare com o /goal: /goal python -m unittest mostra OK nesta conversa, ou pare após 3 turnos. Qual dos dois depende do relógio?

- (Opcional, Desktop) No app, aba Code › Scheduled › New task: crie uma tarefa local na pasta de treino com horário Manual e clique em Run now. Assim nada roda sozinho depois.

Ver o gabarito

- Passo 1: o Claude converte 5m no cron */5 * * * *, agenda e confirma o ritmo e um ID de 8 caracteres. A cada disparo, roda os testes e responde OK (o TaskFlow tem 6 testes passando).

- Passos 2 e 3: por baixo, o Claude usa as ferramentas CronList (listar) e CronDelete (cancelar pelo ID). Esc não cancela um loop de intervalo fixo; é preciso pedir.

- Passo 4: conteúdo de exemplo do .claude/loop.md:

.claude/loop.md Rode python -m unittest. Se todos os testes passarem, responda só "OK, N testes". Se algum falhar, mostre o nome do teste e a primeira linha do erro. Não edite arquivos.

Sem intervalo, o Claude escolhe a espera; Esc com o campo vazio para esse tipo de loop.

- Passo 5: o /loop depende do relógio; o /goal depende da condição. Com os testes já passando, o /goal deve terminar logo no primeiro turno.

- Passo 6: com Manual, a tarefa só roda quando você clica em Run now. Se aparecer pedido de permissão, responda na sessão da execução (lista History da tarefa).

#### Erros comuns

##### Loop esquecido

Um /loop 1m deixado aberto dispara 60 vezes por hora, cada vez com todo o contexto. Use intervalos longos e cancele.

##### Achar que Esc para tudo

Esc só para o loop de ritmo próprio. O de intervalo fixo se cancela pedindo ao Claude.

##### Esperar que rode com o terminal fechado

/loop vive na sessão. Para rodar sem ela, use Desktop (PC ligado) ou nuvem.

##### Usar /loop para "até passar"

Repetir no relógio até os testes passarem desperdiça disparos. Isso é trabalho para o /goal.

##### Nuvem com código da empresa

A tarefa na nuvem clona o repositório fora do seu PC. Só com aval da segurança da informação.

##### Consigo fazer?

#### Para ir além

- Run prompts on a schedule (em inglês): /loop, cron, variação de horário, lembretes e limites.

- Desktop scheduled tasks e cloud scheduled tasks (research preview).

- /goal: avaliador, limites e uso no modo -p.

- Hooks, evento Stop (em inglês): bloquear a parada, stop_hook_active e o limite de continuações.

- Claude Code in Action (Anthropic Academy, gratuito, em inglês): lições sobre tarefas agendadas, headless e como confiar em execuções sem supervisão.

- Próximo módulo: Agent SDK, para construir o seu próprio agente em Python.
