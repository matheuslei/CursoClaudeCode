# Módulo 0: Base

Curso "Claude Code: do zero ao avançado" (estudo pessoal, em português do Brasil). Nível: Zero. Tema: Terminal, Git e o que é um agente de IA.

Projeto de treino usado em todo o curso: TaskFlow, um gerenciador de tarefas de linha de comando em Python, só com a biblioteca padrão. Dados de exemplo são fictícios.

Aulas: 0.1 Terminal em 20 minutos; 0.2 Git essencial: sua rede de segurança; 0.3 O que é um agente de IA (e o Claude Code).

## Aula 0.1: Terminal em 20 minutos

### Resumo do vídeo da aula

Nesta aula você vai perder o medo do terminal: o mínimo para usar o Claude Code com tranquilidade. O terminal é uma conversa de texto com o computador. Você digita um comando, o shell interpreta, o sistema executa e a resposta aparece na tela. No Windows usamos o PowerShell. O prompt começa com P S e mostra em qual pasta você está. Cinco comandos resolvem quase tudo: P W D mostra onde você está, L S lista o conteúdo, C D entra numa pasta, M K dir cria uma pasta, e cat mostra um arquivo. Dois truques economizam horas: a tecla Tab completa nomes de pastas e arquivos, e a seta para cima traz de volta os comandos anteriores. E atenção: Remove Item apaga de verdade, sem passar pela Lixeira. Quando o Claude pedir para rodar um comando assim, leia antes de aprovar. Resumindo: entender o terminal é entender o que o Claude está fazendo por você.

### Conteúdo da aula

Objetivo: abrir o PowerShell, se localizar nas pastas e criar arquivos só com comandos, que é o mínimo para usar o Claude Code com tranquilidade.

#### Por que importa

O Claude Code nasceu no terminal. Mesmo usando o app desktop ou o VS Code, você vai ver o Claude rodando comandos, e é você quem decide se aprova cada um. Entender o básico do terminal transforma esses pedidos de permissão de "texto misterioso" em algo que você lê e julga em segundos.

Cenário O Claude pede permissão para rodar Remove-Item -Recurse .\dados. Você aprovaria? Ao final desta aula você saberá que isso apaga a pasta dados inteira e vai responder com segurança.

#### Conceito: como o terminal funciona

O terminal é uma conversa de texto com o computador: você digita um comando, ele executa e responde. Navegue pelos passos:

#### Os comandos essenciais

No PowerShell, muitos comandos têm um nome longo e um "apelido" curto (alias). Você pode usar qualquer um.

| Quero… | Comando curto | Nome completo

| Saber em que pasta estou | pwd | Get-Location

| Listar o que tem na pasta | ls ou dir | Get-ChildItem

| Entrar numa pasta | cd nome | Set-Location

| Voltar uma pasta | cd .. |

| Criar pasta | mkdir nome | New-Item -ItemType Directory

| Criar arquivo vazio | ni nota.txt | New-Item

| Ver conteúdo de arquivo | cat nota.txt | Get-Content

| Limpar a tela | cls | Clear-Host

| Apagar (cuidado!) | rm nome | Remove-Item

Dois truques que economizam horas Tab completa nomes de pastas e arquivos. Digite cd Doc e aperte Tab. ↑ traz de volta os comandos anteriores.

##### Como abrir

Aperte Win, digite Terminal (ou PowerShell) e Enter. Você verá algo como PS C:\Users\seu.usuario>. O PS indica PowerShell e o caminho mostra onde você está.

#### Exercício real

Agora no seu PowerShell de verdade:

- Abra o Terminal e vá para a sua pasta pessoal: cd ~

- Crie a pasta que usaremos no curso inteiro: C:\Users\<você>\estudos-claude

- Dentro dela, crie o arquivo diario.md e escreva uma linha nele usando o comando Set-Content

- Mostre o conteúdo do arquivo na tela

Ver gabarito

cd ~ mkdir estudos-claude cd estudos-claude Set-Content diario.md "Dia 1: aprendi o terminal" cat diario.md

~ é um atalho para sua pasta de usuário. Set-Content cria (ou sobrescreve) o arquivo com o texto. Para adicionar linhas sem apagar, use Add-Content.

#### Erros comuns

##### "não é reconhecido como nome de cmdlet"

Erro de digitação ou programa não instalado. Confira a grafia.

##### Caminhos com espaço

Use aspas: cd "Meus Documentos". O Tab coloca as aspas para você.

##### Prompt C:\> sem PS

Você está no CMD antigo, não no PowerShell. Alguns comandos mudam. Abra o Terminal/PowerShell.

##### rm não tem lixeira

Arquivo apagado pelo terminal não vai para a Lixeira. Leia duas vezes antes de aprovar.

##### Consigo fazer?

#### Para ir além

- Guia de terminal da documentação oficial (em inglês)

- PowerShell 101 da Microsoft (em português)

## Aula 0.2: Git essencial: sua rede de segurança

### Resumo do vídeo da aula

O Git é a sua rede de segurança para trabalhar com inteligência artificial sem medo. Um agente edita vários arquivos em segundos. Às vezes acerta em cheio, às vezes não. O Git guarda cada versão do projeto, e você sempre pode voltar ao último ponto bom. O Git tem três áreas. Você edita na pasta de trabalho, escolhe o que vai salvar com git add, e grava uma versão no histórico com git commit. O ciclo do dia a dia: git status mostra o que mudou, git diff mostra as linhas, git add prepara e git commit salva a versão. Não gostou de uma mudança que ainda não foi salva? git restore descarta a mudança, e o arquivo volta ao último commit. A regra de ouro do curso: faça commit antes de pedir uma mudança grande ao Claude, e revise com git diff depois.

### Conteúdo da aula

Objetivo: criar um repositório, salvar versões com commits e desfazer mudanças, para trabalhar com IA sem medo de estragar nada.

#### Por que importa

Um agente de IA edita vários arquivos em segundos. Às vezes ele acerta em cheio, às vezes não. O Git guarda o histórico de cada versão do seu projeto: se algo der errado, você volta ao último ponto bom.

Regra de ouro do curso Antes de pedir uma mudança grande ao Claude, faça um commit. Depois, revise o que mudou com git diff.

O Claude Code também tem seus próprios checkpoints (/rewind, Módulo 2), mas eles cuidam só das edições feitas pelo Claude dentro da sessão. O Git é a rede de segurança completa e permanente.

#### Conceito: as três áreas do Git

#### Instalação e comandos essenciais

Instale o Git for Windows (recomendado também pelo Claude Code, que passa a ter acesso ao Bash). No PowerShell:

winget install --id Git.Git -e

Feche e reabra o terminal, e configure seu nome e e-mail (aparecem no histórico):

git config --global user.name "Seu Nome" git config --global user.email "seu.email@exemplo.com"

Máquina corporativa Se o winget estiver bloqueado ou pedir senha de administrador, confirme com a TI como instalar softwares. Não contorne políticas de segurança.

| Comando | Para quê

| git init | Transforma a pasta atual em repositório

| git status | Mostra o que mudou e o que está preparado. Use o tempo todo.

| git add arquivo / git add. | Prepara mudanças para o próximo commit

| git commit -m "mensagem" | Salva uma versão com descrição

| git log --oneline | Lista o histórico de commits

| git diff | Mostra exatamente o que mudou (linhas + e −)

| git restore arquivo | Descarta mudanças não commitadas de um arquivo

| git switch -c nome | Cria uma branch (linha paralela) e entra nela

#### Exercício real

- Na pasta estudos-claude (da aula anterior), inicialize um repositório Git

- Faça o primeiro commit com o arquivo diario.md

- Adicione uma linha "Dia 2: aprendi Git" ao diário e veja a mudança com git diff

- Faça o segundo commit e confira o histórico

Ver gabarito

cd ~\estudos-claude git init git add diario.md git commit -m "Primeiro registro do diário" Add-Content diario.md "Dia 2: aprendi Git" git diff git add diario.md git commit -m "Registro do dia 2" git log --oneline

No git diff, a linha nova aparece com + na frente. O git log --oneline deve mostrar 2 commits.

#### Erros comuns

##### "not a git repository"

Você não está na pasta do repositório ou esqueceu o git init.

##### "nothing to commit"

Ou não houve mudança, ou faltou o git add. Veja com git status.

##### "Please tell me who you are"

Falta configurar user.name e user.email.

##### Commits gigantes

Commits pequenos e frequentes facilitam voltar atrás. Um commit por ideia.

##### Consigo fazer?

#### Para ir além

- Livro Pro Git (gratuito, em português)

- Fluxos comuns com Git no Claude Code (em inglês)

## Aula 0.3: O que é um agente de IA (e o Claude Code)

### Resumo do vídeo da aula

Em pouco mais de um minuto, você vai entender como o Claude Code trabalha por dentro. Num chat comum, você pergunta, copia a resposta, testa e cola o erro de volta. Num agente, você dá o objetivo e ele age sozinho: lê, edita, roda e confere. Tudo começa com um objetivo claro. Por exemplo: o teste de prazo está falhando, corrija. Aí começa o loop. Primeiro, ele reúne contexto. Depois, age. Em seguida, verifica o resultado. Se não deu certo, volta ao começo com a informação nova. Na prática, fica assim: ele roda os testes, lê o código, edita, roda os testes de novo, e só então diz que terminou. E você continua no controle: aperta Esc para interromper, aprova as permissões e exige verificação antes de aceitar. Resumindo: o seu papel muda. Você especifica, supervisiona e revisa. Agora siga para o conceito passo a passo.

### Conteúdo da aula

Objetivo: entender a diferença entre um chat e um agente, como funciona o loop agêntico e por que contexto e permissões são os dois conceitos mais importantes do curso.

#### Por que importa

Num chat, você pergunta e copia a resposta. Num agente, você descreve um objetivo e ele age: lê seus arquivos, edita código, roda testes, corrige o que falhou e repete até terminar. Isso muda o seu papel: de "quem digita o código" para quem especifica, supervisiona e revisa.

##### Chat comum

Você cola o código → ele sugere → você copia de volta → testa → cola o erro → repete.

##### Agente (Claude Code)

Você pede "corrija o teste que falha" → ele lê, edita, roda o teste, ajusta e mostra o resultado.

#### Conceito: o loop agêntico

#### As peças do Claude Code

##### 🧠 Modelo

O "cérebro" (Opus, Sonnet, Haiku, Fable). Troca com /model. Modelos maiores raciocinam melhor e custam mais.

##### 🧰 Ferramentas

Ler, buscar, editar arquivos, rodar comandos, acessar a web. Cada uso aparece na tela.

##### 📚 Contexto

Tudo o que o modelo enxerga: suas mensagens, arquivos lidos, saídas de comandos e o CLAUDE.md. Tem limite.

##### 🔐 Permissões

O que o Claude pode fazer sem perguntar. Você decide: aprovar cada ação ou liberar algumas.

##### Onde o Claude Code roda

É o mesmo motor em várias "superfícies": terminal (CLI), VS Code/JetBrains, app desktop (aba Code), web (claude.ai/code) e até o celular. O CLAUDE.md e as configurações valem em todas. Neste curso usamos principalmente o terminal, porque é onde tudo aparece de forma explícita, e mostramos as outras quando fizer diferença.

A IA erra Modelos podem "alucinar": afirmar algo plausível, mas falso. Por isso o fluxo profissional sempre inclui verificação: rodar testes, ler o diff, executar o programa. Você continua responsável pelo resultado.

##### Fluência em IA: as 4 competências

Saber os comandos é metade do caminho. A outra metade é saber trabalhar junto com a IA. O framework de AI Fluency, criado por Rick Dakan e Joseph Feller em parceria com a Anthropic, organiza isso em quatro competências (os "4D"). Resumo com outras palavras:

| Competência | A pergunta que ela faz | No Claude Code, aparece como…

| Delegação (Delegation) | O que eu peço à IA e o que eu faço eu mesmo? | Escolher o que delegar, o que revisar à mão e quando usar subagentes (Módulo 7).

| Descrição (Description) | Estou explicando o que quero com clareza? | Bons pedidos, CLAUDE.md, specs e critérios de pronto (Módulos 1 a 3).

| Discernimento (Discernment) | O resultado está certo e faz sentido? | Ler o diff, rodar os testes, desconfiar do "pronto" sem prova (Módulo 3).

| Diligência (Diligence) | Estou usando a IA de forma responsável? | Permissões, segredos, dados pessoais e dizer quando a IA ajudou (Módulo 4).

Volte a esta tabela quando algo der errado: quase sempre o problema está numa dessas quatro.

#### Exercício de reflexão

Sem usar o computador, escreva no seu diario.md (e faça commit!):

- Uma tarefa repetitiva do seu trabalho que um agente poderia fazer.

- Quais ferramentas ele precisaria usar (ler planilha? rodar script?).

- Como você verificaria que ele fez certo.

- O que ele não deveria poder fazer sem perguntar.

Ver um exemplo de resposta

Tarefa: consolidar 12 planilhas mensais (com dados fictícios) num relatório. Ferramentas: ler arquivos, rodar um script Python, escrever o relatório. Verificação: conferir totais com uma soma manual de 2 meses; rodar o script duas vezes e comparar. Sem perguntar, nunca: apagar ou sobrescrever as planilhas originais; enviar e-mails; acessar pastas fora do projeto.

Repare: você acabou de escrever uma mini-especificação. É exatamente o que faremos no Módulo 3 (Spec-Driven Development).

#### Erros comuns de mentalidade

##### "Ele sabe o que eu quero"

Não sabe. Pedidos vagos geram resultados vagos. Seja específico.

##### "Se rodou, está certo"

Rodar ≠ estar correto. Peça testes e verifique.

##### "Aprovar tudo é mais rápido"

Até o dia em que algo é apagado. Permissões existem para você manter o controle.

##### "Conversa longa = melhor"

Contexto cheio piora as respostas. Tarefa nova, conversa nova (/clear).

##### Consigo fazer?

#### Para ir além

- How Claude Code works: o loop agêntico e as ferramentas

- Visão geral oficial e todas as superfícies

- Anthropic Academy: cursos gratuitos oficiais, em inglês. Para esta aula: AI Fluency: Framework and foundations (os 4D em detalhe), AI capabilities and limitations (por que a IA erra) e Claude 101.
