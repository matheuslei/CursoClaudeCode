# Módulo 4: Permissões e segurança

Curso "Claude Code: do zero ao avançado" (estudo pessoal, em português do Brasil). Nível: Intermediário. Tema: Modos, auto mode, regras e sandbox.

Projeto de treino usado em todo o curso: TaskFlow, um gerenciador de tarefas de linha de comando em Python, só com a biblioteca padrão. Dados de exemplo são fictícios.

Aulas: 4.1 Modos de permissão; 4.2 Auto mode; 4.3 Regras allow, ask e deny; 4.4 Sandbox; 4.5 Segredos e dados pessoais.

## Aula 4.1: Modos de permissão

### Resumo do vídeo da aula

Quanto o Claude pode fazer sem perguntar? Quem decide isso é o modo de permissão. De um lado, mais controle: você aprova cada ação. Do outro, mais autonomia: o Claude trabalha sem interrupções. Cada modo é um ponto nesse caminho. Manual pergunta antes de editar arquivos e rodar comandos. Accept edits aceita as edições de arquivo sozinho. Plan só investiga e propõe um plano, sem mudar nada. Auto usa um classificador que libera o que é seguro e bloqueia o arriscado. E bypass não pergunta nada: só serve para ambientes isolados e descartáveis. Para trocar de modo durante a sessão, aperte Shift Tab. O modo atual aparece perto do campo de digitação. Como escolher? Aprendendo, use Manual. Mudança grande, comece pelo plan. No dia a dia, auto. E lembre: regras de bloqueio continuam valendo em qualquer modo.

### Conteúdo da aula

Objetivo: conhecer os seis modos de permissão, saber trocar entre eles e escolher o modo certo para cada situação.

#### Por que importa

O modo de permissão define o que o Claude pode fazer sem perguntar. Modo errado tem dois custos: perguntas demais (você aprova no automático e para de ler) ou perguntas de menos (algo é feito sem você ver). Escolher bem o modo é o equilíbrio entre velocidade e controle.

Cenário Você vai só investigar um bug sem mexer em nada: use plan. Vai implementar algo que já planejou num projeto de estudo com Git: acceptEdits ou auto agilizam. Vai rodar num servidor de produção: nenhum modo "liberado".

#### Conceito: do mais restrito ao mais liberado

#### Os modos em detalhe

| Modo (valor) | Roda sem perguntar | Quando usar

| default (rótulo Manual) | Só leituras. Toda edição, comando ou acesso à rede pergunta. | Aprendendo; projeto sensível; quer ver cada passo

| acceptEdits | Leituras, edições de arquivo e comandos comuns de arquivo (mkdir, touch, mv, cp, rm, rmdir, sed) dentro da pasta de trabalho. Caminhos protegidos ainda perguntam. | Implementar algo já combinado, com Git como rede

| plan | Leituras (e comandos aprovados pelo classificador do auto mode, quando disponível). Edições ficam bloqueadas até você aprovar o plano. | Investigar, planejar antes de mexer (Módulo 3)

| auto | Tudo, com um classificador revisando cada ação em segundo plano | Menos interrupções com uma camada de segurança (próxima aula)

| dontAsk | Só o que já está pré-aprovado por regras. O que perguntaria é negado. | CI e scripts (Módulo 9)

| bypassPermissions | Tudo, sem perguntas nem checagens de segurança | Só em ambientes isolados (container, VM, sem internet)

Regras deny valem em todos os modos Mesmo no bypassPermissions, uma regra deny continua bloqueando. Já as regras allow não fazem diferença nesse modo, porque tudo é permitido. Veremos regras na aula 4.3.

##### Como trocar de modo

Durante a sessão: Shift+Tab (em alguns terminais Windows, Alt+M). Se você está em auto, o primeiro toque vai para default; depois o ciclo segue default → acceptEdits → plan (e outros modos, quando habilitados). A barra de status mostra o modo ativo.

Ao abrir:

claude --permission-mode plan claude --permission-mode acceptEdits claude --permission-mode default

Como padrão, no settings.json (Módulo 5 aprofunda):

{ "permissions": { "defaultMode": "default" } }

Modo inicial atual Segundo a documentação, a partir da versão 2.1.283 as sessões interativas no terminal e no VS Code começam em auto por padrão. Confira o modo na barra de status assim que abrir. Se preferir aprender aprovando cada passo, volte para default com Shift+Tab ou fixe o defaultMode.

--dangerously-skip-permissions Equivale a bypassPermissions. A própria documentação recomenda usar só em containers, VMs ou dev containers sem internet, e avisa que não há proteção contra prompt injection. Numa máquina de trabalho, não use.

#### Exercício real

No TaskFlow (com tudo commitado):

- Abra com claude e anote qual modo aparece na barra de status

- Aperte Shift+Tab várias vezes e observe o ciclo de modos

- Em plan, peça: adicione o comando "editar <numero> <novo titulo>". Repare que ele investiga e propõe um plano, sem editar

- Aprove o plano e escolha seguir com edições aprovadas automaticamente (ou troque para acceptEdits)

- Revise com! git diff e faça commit

- Saia e reabra com claude --permission-mode plan para confirmar que começa em plan

Ver gabarito

- Passo 1: em versões recentes deve aparecer o auto mode; em versões ou planos onde ele não está disponível, Manual.

- Passo 3: em plan, ele lê o tarefas.py, propõe onde criar a função editar e o novo subcomando no argparse, e pede aprovação do plano antes de qualquer edição.

- Passo 5: o diff deve mostrar só a função nova e o registro do subcomando. Se aparecer algo a mais, peça para desfazer.

- Passo 6: a barra de status já mostra plan ao abrir.

#### Erros comuns

##### Ficar em Manual e aprovar tudo sem ler

Se você aprova no automático, a proteção virou teatro. Use regras (aula 4.3) para liberar o que é seguro e leia o resto.

##### acceptEdits sem Git

Edições sem pergunta só são tranquilas se você consegue desfazer. Commit antes.

##### "Plan mode não editou nada!"

É o objetivo. Ele só edita depois que você aprova o plano.

##### bypass "só para testar"

Fora de um ambiente isolado, não existe "só para testar" com acesso total à sua máquina.

##### Consigo fazer?

#### Para ir além

- Permission modes: documentação oficial

- Configure permissions

## Aula 4.2: Auto mode

### Resumo do vídeo da aula

Aprovar dezenas de pedidos por tarefa cansa. E quem cansa aprova sem ler. O auto mode resolve isso. No auto mode, um modelo classificador separado revisa cada ação antes de ela rodar. O que parece seguro roda direto. O que parece arriscado é bloqueado. Por padrão, ele bloqueia coisas como baixar e executar código, force push, deploys de produção e git reset hard. E libera o dia a dia: operações de arquivo na pasta de trabalho, instalar dependências a partir dos manifestos e push para as branches do repositório, exceto as de deploy. Depois de três bloqueios seguidos ou vinte no total, ele volta a perguntar para você. E um combinado na conversa, como não faça push, não vira regra. Lembre: o auto mode reduz pedidos, mas não garante segurança. Para proibir de verdade, use uma regra deny.

### Conteúdo da aula

Objetivo: entender como o classificador do auto mode decide, o que ele bloqueia e por que ele não substitui regras deny.

#### Por que importa

Aprovar 40 pedidos por tarefa cansa, e quem cansa aprova sem ler. O auto mode é o meio-termo entre "perguntar tudo" e "liberar tudo": um modelo classificador separado revisa cada ação antes de rodar e bloqueia as que parecem arriscadas. É o modo inicial das sessões interativas recentes, então você provavelmente já está usando.

Nas palavras da documentação O auto mode reduz os pedidos de permissão, mas não garante segurança. Ele é uma camada a mais, não a única.

#### Conceito: o caminho de uma ação no auto mode

#### O que bloqueia, o que libera

##### 🚫 Bloqueado por padrão (exemplos)

Baixar e executar código (curl | bash); force push; deploys e migrações de produção; git reset --hard; terraform destroy; merge de PR não aprovado; enviar dados sensíveis para endpoints externos; destruir de forma irreversível arquivos que já existiam.

##### ✅ Liberado por padrão (exemplos)

Operações de arquivo locais na pasta de trabalho; instalar dependências a partir de lockfiles/manifestos; push para branches do repositório em que você está (exceto branches de deploy como production ou gh-pages).

O classificador também bloqueia ações que vão além do que você pediu, que miram infraestrutura não reconhecida, ou que parecem guiadas por conteúdo hostil que o Claude leu (prompt injection, por exemplo uma página web com "instruções escondidas").

##### Limites que você precisa conhecer

- Pausa automática: depois de 3 bloqueios seguidos ou 20 no total na sessão, o auto mode volta a perguntar para você. Esses números não são configuráveis.

- Combinados na conversa não são regras: se você diz "não faça push", isso vira um sinal para o classificador, mas não é gravado como regra e pode se perder quando o contexto é compactado. Para garantia, use uma regra deny.

- Regras ask continuam valendo: uma regra ask explícita força a pergunta mesmo no auto mode.

- Regras allow amplas são descartadas ao entrar no auto mode (ex.: Bash(*)). Regras estreitas como Bash(npm test) permanecem.

##### Disponibilidade (conforme a documentação)

- Disponível em todos os planos. Em Team e Enterprise vem ligado por padrão, e administradores podem desligar.

- Depende do modelo: na API da Anthropic, requer modelos a partir de Opus 4.6 / Sonnet 4.6, Haiku 5.5 ou um modelo Fable. Em Bedrock, Google Cloud e Foundry a lista é mais restrita.

- Para ser o modo padrão, "defaultMode": "auto" deve ir no settings do usuário (~/.claude/settings.json). No settings do projeto, não tem efeito.

Máquina corporativa Se o auto mode não aparecer no seu Shift+Tab, a organização pode tê-lo desativado por política. Isso é decisão da área responsável, então não tente contornar.

#### Exercício real

- No TaskFlow, confira se o auto mode está disponível (Shift+Tab até ver auto na barra de status)

- Em auto, peça: adicione uma opção --todas ao listar que mostre também as concluídas; rode e mostre. Conte quantas vezes ele te perguntou algo

- Ainda em auto, peça algo que deveria ser bloqueado: apague o histórico do git com git reset --hard HEAD~3. Observe a reação (não aprove se ele perguntar!)

- Anote no diario.md a diferença em número de perguntas comparado ao modo Manual

Ver gabarito

- Passo 2: espera-se poucas ou nenhuma pergunta. Editar arquivos na pasta e rodar o próprio script são ações locais e esperadas.

- Passo 3: git reset --hard está na lista de bloqueios padrão. O classificador deve bloquear ou você deve ser consultado. Se o auto mode não estiver disponível no seu plano ou modelo, a ação simplesmente pedirá permissão: recuse.

- Lição: auto mode reduz interrupções no que é rotina e segura o que é destrutivo. Mas o que você nunca quer que aconteça vai numa regra deny (aula 4.3).

#### Erros comuns

##### "Auto mode = seguro"

Reduz risco, não elimina. Revise o diff e mantenha deny para o que é crítico.

##### Confiar em "eu disse para não fazer"

Instrução na conversa pode se perder na compactação. Regra deny não se perde.

##### Ignorar uma pausa

Se ele voltou a perguntar após vários bloqueios, algo está estranho. Pare e entenda.

##### Ler conteúdo não confiável

Páginas e arquivos de terceiros podem conter instruções maliciosas. Fique atento ao que ele fizer depois de ler.

##### Consigo fazer?

#### Para ir além

- Permission modes: auto mode

- Configurar o auto mode (inclui /auto-mode-setup)

- Security: prompt injection e boas práticas

## Aula 4.3: Regras allow, ask e deny

### Resumo do vídeo da aula

Os modos são o volume geral. As regras são o ajuste fino das permissões. Allow libera sem perguntar, como rodar os testes. Ask sempre pergunta, como um push. Deny bloqueia, como ler o arquivo ponto env. A ordem de avaliação é deny, depois ask, depois allow. Se houver conflito, o bloqueio vence, inclusive entre arquivos diferentes. O formato é o nome da ferramenta e, entre parênteses, o especificador. Coloque o asterisco depois do subcomando, para não liberar mais do que queria. As regras moram em arquivos de settings: o do usuário vale para todos os seus projetos, o do projeto é compartilhado com o time, e o local é só seu. Escrever no Claude ponto MD influencia o Claude, mas não impede. Para impedir de verdade, use deny. E confira tudo com barra permissions.

### Conteúdo da aula

Objetivo: escrever regras de permissão que liberam o que é seguro, perguntam o que é sensível e bloqueiam o que nunca deve acontecer, e saber em qual arquivo cada uma fica.

#### Por que importa

Modos são o "volume geral". Regras são o ajuste fino: "rodar testes, sempre pode; push, sempre pergunte; ler o .env, nunca". Com boas regras você tem menos interrupções e mais segurança ao mesmo tempo.

Importante Regras são aplicadas pelo Claude Code, não pelo modelo. Escrever "não leia o .env" no CLAUDE.md influencia o que o Claude tenta, mas não impede. Para impedir de verdade, use uma regra deny.

#### Conceito: a ordem de avaliação

#### Sintaxe e arquivos

Formato: Ferramenta ou Ferramenta(especificador).

| Regra | Casa com

| Bash | Todos os comandos Bash (igual a Bash(*))

| Bash(npm run build) | Exatamente npm run build

| Bash(npm run *) | npm run build, npm run test --watch, npm run… mas não npm install

| Bash(git push *) | Comandos que começam com git push

| PowerShell(Remove-Item *) | Comandos Remove-Item (e seus aliases, como rm e del) no PowerShell

| Read(./.env) | Ler o .env da pasta atual

| Read(./secrets/**) | Ler qualquer coisa dentro de secrets/

| Edit(/src/**/*.py) | Editar .py em src/ (a / inicial ancora na raiz do projeto quando a regra está no settings do projeto)

| WebFetch(domain:example.com) | Buscar páginas de example.com

| Agent(model:opus) | Por parâmetro (Ferramenta(param:valor)), só em regras deny e ask

Coloque o * depois do subcomando Bash(git log *) é preciso. Bash(git *) libera qualquer coisa do git, inclusive git push.

Windows: Bash ou PowerShell? Se o Git for Windows está instalado, o Claude usa a ferramenta Bash. Sem ele, usa PowerShell, com regras no formato PowerShell(...). Confira qual aparece nos pedidos de permissão e escreva a regra correspondente (ou as duas).

##### Onde as regras moram

| Arquivo | Escopo | Vai para o Git?

| ~/.claude/settings.json | Você, em todos os projetos | Não

| .claude/settings.json | Projeto, compartilhado com o time | Sim

| .claude/settings.local.json | Projeto, só você (onde "Yes, don't ask again" salva) | Não

| Managed settings | Organização (TI). Ninguém sobrescreve. | —

Deny vence entre escopos: se o usuário libera e o projeto nega (ou vice-versa), a regra deny bloqueia. Use /permissions para ver todas as regras e de qual arquivo cada uma vem.

#### Exercício real: regras do TaskFlow

- No TaskFlow, crie um arquivo .env com um segredo fictício: Set-Content .env "API_TOKEN=token-falso-123", e adicione .env ao .gitignore

- Crie .claude/settings.json com regras para: liberar python -m unittest, perguntar antes de git push e negar leitura do .env

- Abra claude, rode /permissions e confira as regras

- Teste: peça leia o .env e me diga o token. Deve ser bloqueado

- Faça commit do .claude/settings.json e do .gitignore (nunca do .env!)

Ver gabarito

{ "permissions": { "allow": [ "Bash(python -m unittest *)", "PowerShell(python -m unittest *)" ], "ask": [ "Bash(git push *)", "PowerShell(git push *)" ], "deny": [ "Read(./.env)", "Read(./.env.*)" ] } }

As linhas Bash(...) e PowerShell(...) cobrem os dois casos do Windows (com e sem Git Bash). No passo 4, a leitura deve ser negada. Atenção: a regra Read bloqueia as ferramentas de arquivo do Claude. Um comando de shell como cat .env é outra ferramenta. Para barrar também esse caminho, use o sandbox (próxima aula) ou regras deny para os comandos de leitura.

git add .gitignore .claude/settings.json git commit -m "Regras de permissão do projeto" git status # o .env NÃO pode aparecer como novo arquivo a commitar

#### Erros comuns

##### Allow amplo demais

Bash(git *) libera push, reset, tudo. Seja específico.

##### Tentar "exceção" no allow

Allow não abre exceção em deny. Se Bash(aws *) é deny, Bash(aws s3 ls) em allow não passa.

##### /caminho achando que é absoluto

Uma barra ancora no settings. Para absoluto, use //, como Read(//c/Users/voce/**).

##### Regra só no CLAUDE.md

Texto orienta; regra garante. Coisas críticas vão em deny.

##### Consigo fazer?

#### Para ir além

- Configure permissions: sintaxe completa, curingas, PowerShell, Read/Edit

- Settings: precedência entre arquivos (Módulo 5)

## Aula 4.4: Sandbox

### Resumo do vídeo da aula

Regras olham o texto do comando. Mas um comando pode fazer mais do que o texto revela. Um script Python pode apagar arquivos, e um npm install acessa a internet. O sandbox impede isso no nível do sistema operacional, mesmo que o comando tente. Ele isola a escrita, que só vale na pasta de trabalho, e a rede, que só alcança domínios autorizados. A lista começa vazia. Mas atenção: por padrão, a leitura continua ampla. Funciona no macOS, no Linux e no WSL dois. No Windows nativo e no WSL um, não funciona. No Windows, rode o Claude Code dentro do WSL dois. Ficam fora do sandbox as ferramentas de arquivo e web do Claude, os hooks, os servidores MCP locais e os comandos que você digita com exclamação. Regras controlam as ferramentas do Claude. O sandbox controla o que os comandos conseguem fazer. Juntos, formam uma defesa em camadas.

### Conteúdo da aula

Objetivo: entender o que o sandbox isola (arquivos e rede), onde ele funciona, inclusive no Windows via WSL2, e o que fica de fora.

#### Por que importa

Regras olham o texto do comando. Mas um comando pode fazer coisas que o texto não revela: um script Python que apaga arquivos, um npm install que acessa a internet. O sandbox é uma barreira do sistema operacional: mesmo que o comando tente, ele não consegue escrever fora da pasta nem acessar sites não autorizados.

Windows nativo: sem sandbox Segundo a documentação, o sandbox não funciona no Windows nativo: os comandos rodam sem isolamento. Para usá-lo no Windows, rode o Claude Code dentro do WSL2. No WSL1 também não funciona. Mesmo assim, vale entender o conceito: ele aparece em todo material avançado.

#### Conceito: as paredes do sandbox

#### Como funciona

| Plataforma | Suporte

| macOS | Sim (Seatbelt)

| Linux | Sim (bubblewrap e socat)

| WSL2 | Sim (bubblewrap)

| WSL1 | Não

| Windows nativo | Não: use WSL2

##### O que ele isola

- Escrita: só na pasta de trabalho, numa pasta temporária e em diretórios adicionados. Caminhos protegidos (configurações em .claude, .git/hooks, .bashrc…) continuam bloqueados.

- Rede: sem saída direta. Tudo passa por um proxy que só deixa passar domínios em network.allowedDomains, que começa vazio.

- Leitura: por padrão, ainda pode ler quase tudo da máquina, inclusive credenciais como ~/.ssh. Para restringir, há configurações próprias (filesystem.denyRead, credentials…).

##### Como ligar (Linux, macOS ou WSL2)

/sandbox

Abre um painel com o modo (auto-allow: comandos sandboxed rodam sem perguntar; ou permissões normais ), as exceções e a configuração. Ou, no ~/.claude/settings.json:

{ "sandbox": { "enabled": true } }

No Linux/WSL2, instale as dependências: sudo apt-get install bubblewrap socat.

##### O que fica fora do sandbox

- As ferramentas internas de arquivo e web: Read, Edit, Write, WebFetch, WebSearch. Para elas, valem as regras de permissão da aula anterior.

- Hooks, servidores MCP locais, status line.

- Comandos que você digita com! (na maioria das sessões).

- Se um comando falha no sandbox, o Claude pode pedir para rodá-lo fora. Quem aprova depende do modo. Para proibir isso: "allowUnsandboxedCommands": false.

Sandbox + regras = defesa em camadas Regras controlam as ferramentas do Claude; o sandbox controla o que os comandos de shell conseguem fazer no sistema. Um cobre o ponto cego do outro.

#### Exercício

Se você usa WSL2 (ou Linux/macOS):

- Instale as dependências e rode /sandbox numa cópia do TaskFlow dentro do WSL

- Peça ao Claude: rode touch ~/sandbox-teste e depois curl --noproxy '*' https://example.com

- Observe as falhas e anote as mensagens no diário

Se você está no Windows nativo (caso mais comum): faça o exercício de análise. Liste no diario.md três comandos que suas regras não pegariam, mas que o sandbox conteria, e decida se vale configurar o WSL2 (confirme com a TI se pode instalar).

Ver gabarito

- WSL2: o touch ~/sandbox-teste falha com algo como Read-only file system ou Operation not permitted, porque está fora da pasta. O curl falha com Could not resolve host, porque a rede não está liberada. Não rode esses testes você mesmo com !: isso costuma rodar fora do sandbox.

- Windows nativo, exemplos: python limpa.py (o script pode apagar qualquer coisa, e a regra só vê "python limpa.py"); npm install pacote (scripts de instalação acessam a rede); git clone https://… de um repositório desconhecido seguido de execução.

#### Erros comuns

##### "Ativei, então estou protegido" no Windows

No Windows nativo, os comandos rodam sem sandbox. Confira a plataforma.

##### Achar que bloqueia leitura

Por padrão, a leitura continua ampla. Proteja credenciais com configuração específica e regras Read deny.

##### Liberar domínios demais

allowedDomains começa vazio por um motivo. Libere só o necessário.

##### Excluir comandos à toa

excludedCommands roda aquele comando com acesso total, sempre.

##### Consigo fazer?

#### Para ir além

- Sandboxing: configuração completa

- Sandbox environments: dev containers e outras opções de isolamento

- Instalar o WSL (Microsoft, em português)

## Aula 4.5: Segredos e dados pessoais

### Resumo do vídeo da aula

Tudo o que entra no contexto é enviado pela rede ao modelo. Inclusive aquele token colado só para testar. Um segredo pode vazar pelo prompt, por um arquivo que o Claude leu, ou pela saída de um comando. Guarde segredos no ponto env, fora do Git. Crie um ponto env ponto example com valores falsos. E bloqueie a leitura com uma regra deny. Vazou? Revogue e gere outro. Apagar o arquivo depois não remove do histórico do Git. Se for credencial corporativa, avise a área responsável. Para estudar, use dados fictícios. Precisa de uma base real? Primeiro confirme com a área de privacidade. E prefira scripts que processam os dados localmente. Isto são boas práticas gerais, não orientação jurídica. Antes de usar dados reais, consulte a área de segurança da informação e a de privacidade da sua organização. A regra de ouro: o que não deve sair, não entra no contexto.

### Conteúdo da aula

Objetivo: manter senhas, tokens e dados pessoais fora do contexto do Claude, entender o que é enviado à Anthropic e saber quando procurar a área responsável.

#### Por que importa

Tudo o que entra no contexto (o que você digita, os arquivos que o Claude lê, as saídas de comandos) é enviado pela rede ao modelo. Um token colado "só para testar" ou uma planilha com CPFs lida "para analisar" saiu da sua máquina. A regra de ouro: o que não deve sair, não entra no contexto.

Aviso informativo Esta aula traz boas práticas gerais, não orientação jurídica. Uso de dados pessoais (LGPD), dados de clientes e informações internas segue as políticas da sua organização. Antes de usar o Claude Code com qualquer dado real, consulte a área de segurança da informação e a de privacidade/proteção de dados.

#### Conceito: por onde um segredo vaza

#### Práticas e fatos

##### Mantenha segredos fora do contexto

- Nunca cole senhas, tokens, chaves de API, certificados ou strings de conexão no prompt, nem em prints colados com Alt+V.

- Segredos em .env, com o arquivo no .gitignore. Para o Claude saber os nomes das variáveis, crie um .env.example com valores falsos.

- Bloqueie a leitura com regras deny: Read(./.env), Read(./.env.*), Read(./secrets/**) (aula 4.3).

- Revise o git diff antes de cada commit: segredo commitado fica no histórico, e apagar o arquivo depois não remove.

- Se um segredo vazou (colou, commitou, apareceu numa saída): revogue e gere outro. Avise a área responsável se for credencial corporativa.

##### Dados pessoais

- Para estudar e testar, use dados fictícios (nomes inventados, CPFs gerados para teste, e-mails @exemplo.com).

- Precisa trabalhar com uma base real? Primeiro, confirme com a área de privacidade se é permitido e em quais condições. Prefira amostras anonimizadas.

- Peça ao Claude para gerar scripts que processam os dados localmente, em vez de mandar os dados para ele ler.

##### O que a documentação diz sobre os seus dados

| Tipo de conta | Treino de modelos | Retenção padrão

| Consumidor (Free, Pro, Max, Ultra) | Só se a opção de melhorar modelos estiver ligada (você escolhe nas configurações de privacidade do claude.ai) | 5 anos com a opção ligada; 30 dias com ela desligada

| Comercial (Team, Enterprise, API) | A Anthropic não treina com código e prompts enviados nos termos comerciais, salvo adesão a programas específicos | 30 dias (Zero Data Retention disponível para contas elegíveis)

- Prompts e respostas trafegam criptografados (TLS 1.2+).

- As conversas ficam salvas localmente, em texto puro, em ~/.claude/projects/, por 30 dias por padrão (para permitir retomar sessões).

- /feedback e /bug enviam a conversa (inclusive código) à Anthropic, com retenção de 5 anos. Não use em sessões com conteúdo sensível.

Resumo de code.claude.com/docs/en/data-usage em 18/11/2026. Políticas mudam; os termos de uso e a política de privacidade são a referência oficial.

#### Exercício real

No TaskFlow (o .env fictício e a regra deny vêm da aula 4.3):

- Crie um .env.example com API_TOKEN=coloque-seu-token-aqui e commite

- Peça ao Claude: adicione ao tarefas.py a leitura opcional de API_TOKEN via variável de ambiente; se não existir, siga sem ela. Não leia o .env

- Confira no diff que nenhum valor de token foi escrito no código

- Rode git log -p e confirme que o .env nunca entrou no histórico

- Escreva no diário: "com quem eu falaria na minha organização antes de usar dados reais?"

Ver gabarito

import os API_TOKEN = os.environ.get("API_TOKEN") # None se não definido; nunca escreva o valor no código

No diff deve aparecer só a leitura via os.environ.get, nunca o valor. No git log -p podem aparecer .env.example e .gitignore, mas não o .env. Resposta do passo 5: segurança da informação (credenciais, ferramentas) e privacidade/proteção de dados (dados pessoais, LGPD), e o gestor da área dona dos dados.

#### Erros comuns

##### "É só um token de teste"

Token de teste costuma dar acesso a ambiente real. Trate todo token como segredo.

##### Print com dados na tela

Uma imagem colada também é contexto. Recorte ou anonimize antes.

##### Apagar o arquivo e achar que resolveu

Segredo commitado continua no histórico do Git. Revogue o segredo.

##### /feedback com sessão sensível

Envia a conversa, inclusive código. Use só com conteúdo que pode sair.

##### Consigo fazer?

#### Para ir além

- Data usage: políticas de dados

- Security: boas práticas e prompt injection

- ANPD: Autoridade Nacional de Proteção de Dados (conteúdo informativo sobre a LGPD)
