# Módulo 1: Primeiros passos

Curso "Claude Code: do zero ao avançado" (estudo pessoal, em português do Brasil). Nível: Iniciante. Tema: Instalar, primeira sessão, comandos e atalhos.

Projeto de treino usado em todo o curso: TaskFlow, um gerenciador de tarefas de linha de comando em Python, só com a biblioteca padrão. Dados de exemplo são fictícios.

Aulas: 1.1 Instalação no Windows; 1.2 Primeira sessão com o TaskFlow; 1.3 Comandos com barra (/); 1.4 Atalhos, ! shell, @ menções e bons prompts.

## Aula 1.1: Instalação no Windows

### Resumo do vídeo da aula

Vamos instalar o Claude Code no Windows, conferir que funciona e resolver os erros mais comuns. Você precisa de quatro coisas: uma conta com acesso, como uma assinatura Claude paga ou o Claude Console; um terminal, aqui o PowerShell; o Claude Code instalado; e uma pasta de projeto. No PowerShell, rode o comando de instalação que aparece na tela. Ele não mostra progresso enquanto baixa, então aguarde. E essa versão se atualiza sozinha. Depois, abra um terminal novo e rode claude, traço traço version. Deve aparecer o número da versão. Entre na pasta do projeto e digite claude. Na primeira vez, o navegador abre para você entrar na conta, e as credenciais ficam salvas. Dois erros comuns: se claude não for reconhecido, abra um terminal novo. Se I R M não for reconhecido, você está no C M D, não no PowerShell. E se for a máquina do trabalho, confirme com a T I antes de instalar.

### Conteúdo da aula

Objetivo: instalar o Claude Code, confirmar que funciona e saber resolver os dois problemas mais comuns.

#### Por que importa

Instalação mal feita é o motivo nº 1 de desistência. Em 15 minutos você deixa tudo funcionando e entende o que foi instalado, para resolver problemas sozinho no futuro.

Antes de começar: máquina corporativa Confirme com a TI da sua organização se você pode instalar o Claude Code e usá-lo com sua conta. Ambientes corporativos podem ter proxy, bloqueio de instalação ou política sobre ferramentas de IA. Para estudar, use só projetos de teste com dados fictícios.

#### Conceito: o que você precisa

#### Passo a passo

##### Opção A: instalador nativo (recomendado)

Abra o PowerShell (prompt começa com PS) e rode:

irm https://claude.ai/install.ps1 | iex

O comando não mostra progresso enquanto baixa, então espere terminar. A versão nativa se atualiza sozinha em segundo plano.

##### Opção B: WinGet

winget install Anthropic.ClaudeCode

Pelo WinGet não há atualização automática. Rode de vez em quando: winget upgrade Anthropic.ClaudeCode.

##### Confirmar

Abra um terminal novo e rode:

claude --version

Deve aparecer um número de versão seguido de (Claude Code).

##### Primeiro login

cd ~\estudos-claude claude

Na primeira vez, o Claude Code abre o navegador para você entrar na conta. Tipos de conta aceitos: assinatura Claude (Pro, Max, Team, Enterprise), conta do Claude Console (créditos de API) ou provedores de nuvem corporativos. As credenciais ficam salvas, e para trocar de conta depois use /login.

Git for Windows: recomendado Com o Git for Windows instalado (aula 0.2), o Claude Code consegue usar o Bash. Sem ele, usa o PowerShell como shell. Os dois funcionam.

Prefere interface gráfica? O app Claude Desktop tem a aba Code, que já inclui o Claude Code (exige plano pago). Você pode usar os dois: o que aprender no terminal vale lá também.

#### Exercício real

- Instale o Claude Code (opção A ou B)

- Abra um terminal novo e rode claude --version

- Entre na pasta estudos-claude, rode claude e faça login

- Dentro da sessão, digite /status e anote no diario.md a versão e o modelo

- Rode /doctor para o checkup completo e saia com /exit

Ver gabarito

Se tudo deu certo, /status mostra versão, modelo, conta e conectividade, e o /doctor não aponta problemas graves. Exemplo de anotação no diário:

Dia 3: Claude Code instalado. Versão 2.1.xxx, modelo padrão: (o que aparecer no /status)

Se o /doctor apontar algo, leia a sugestão: ele diagnostica a instalação e as configurações e pode corrigir alguns problemas sozinho.

#### Erros comuns

| Mensagem | Causa | Solução

| claude não é reconhecido | Pasta de instalação fora do PATH, ou terminal aberto antes da instalação | Feche e abra o terminal. Persistindo, veja Fix your PATH

| 'irm' is not recognized | Você está no CMD, não no PowerShell | Abra o PowerShell (prompt PS)

| The token '&&' is not a valid statement separator | Comando do CMD rodado no PowerShell | Use o comando da versão PowerShell

| 403, erro de rede ou certificado | Proxy ou firewall corporativo | Fale com a TI; veja Troubleshoot installation

##### Consigo fazer?

#### Para ir além

- Quickstart oficial

- Advanced setup: atualizar, desinstalar, outras formas

- App Desktop

- Claude Code 101 (Anthropic Academy, gratuito, em inglês): o curso introdutório oficial, bom para revisar os Módulos 1 a 3.

## Aula 1.2: Primeira sessão com o TaskFlow

### Resumo do vídeo da aula

Hora da primeira sessão de verdade, com o TaskFlow: uma lista de tarefas em Python, com dados fictícios. O fluxo que você vai repetir sempre: abrir na pasta certa, explorar, pedir algo específico, aprovar com consciência e salvar com commit. Comece perguntando. O Claude lê os arquivos que precisar; você não precisa colar código. Depois, peça algo específico. Em vez de melhore o código, diga exatamente o que quer: adicione o comando concluir, que marca a tarefa como feita. Para editar ou rodar comandos, o Claude pede permissão e mostra o que vai mudar. Leia o diff e aprove, ou recuse explicando o que prefere. Em vários planos, a sessão começa em auto mode, que aprova sozinho o que é seguro. Para aprender, aperte Shift Tab até o modo Manual. No fim, teste o resultado e faça o commit. Ciclo completo e reversível.

### Conteúdo da aula

Objetivo: abrir o Claude Code num projeto real, explorar o código com perguntas, fazer a primeira mudança aprovando permissões e salvar com Git.

#### Por que importa

Este é o fluxo que você vai repetir milhares de vezes: abrir → entender → pedir → aprovar → verificar → salvar. Fazer certo desde a primeira vez cria bons hábitos.

Durante o curso usaremos o TaskFlow, uma pequena lista de tarefas de linha de comando em Python, com dados fictícios. Ele cresce a cada módulo.

#### Conceito: anatomia de uma sessão

#### Preparando o projeto

O código inicial está na pasta do curso, em projeto-taskflow\etapa-01. Copie para a sua pasta de estudos e transforme em repositório Git (troque o caminho de origem pelo local onde está o curso):

Copy-Item -Recurse "C:\caminho\do\curso-claude-code\projeto-taskflow\etapa-01" ~\estudos-claude\taskflow cd ~\estudos-claude\taskflow git init git add. git commit -m "TaskFlow: versão inicial"

Você precisa do Python 3.10+. Teste com python --version. Se não tiver, winget install Python.Python.3.12 (confirme com a TI se necessário). Teste o app:

python tarefas.py adicionar "Estudar o Módulo 1" python tarefas.py listar

##### Como responder a um pedido de permissão

Quando o Claude quer editar um arquivo ou rodar um comando, aparece um quadro perguntando. As opções típicas:

| Yes | Permite só esta ação.

| Yes, and don't ask again… | Permite esta e as próximas parecidas, nesta sessão ou no projeto (o texto diz qual).

| No (e diga o que fazer) | Recusa. Você pode explicar o que prefere, e o Claude ajusta.

Shift+Tab alterna o modo de permissão da sessão (Manual, aceitar edições, plan…). O indicador de modo aparece perto do campo de digitação.

Sua sessão pode começar em auto mode Em vários planos, novas sessões começam no auto mode: um classificador aprova sozinho as ações consideradas seguras e você vê menos pedidos de permissão. Para esta aula, aperte Shift+Tab até o modo Manual (default), em que o Claude pede aprovação para editar e rodar comandos. Aprovar cada ação é a melhor forma de aprender o que o Claude faz. O Módulo 4 explica todos os modos.

#### Exercício real

Na pasta taskflow, rode claude e faça, em ordem:

- Pergunte: o que este projeto faz e como os dados são salvos?

- Pergunte: quais comandos o tarefas.py aceita hoje?

- Peça: adicione o comando "concluir <numero>" que marca a tarefa como feita e mostra [x] no listar

- Aprove as edições lendo o que muda. Teste você mesmo:! python tarefas.py concluir 1 e! python tarefas.py listar

- Peça: faça commit das mudanças com uma mensagem descritiva

Ver gabarito (uma solução possível)

O Claude deve criar algo equivalente a isto em tarefas.py (os detalhes podem variar):

def concluir(numero): tarefas = carregar() if numero < 1 or numero > len(tarefas): print(f"Tarefa {numero} não existe.") return tarefas[numero - 1]["feita"] = True salvar(tarefas) print(f"Tarefa {numero} concluída.")

…mais o registro do subcomando concluir no argparse e a marca [x]/[ ] no listar. Confira com git log --oneline: deve haver um commit novo, criado pelo Claude.

Ponto de atenção: o Claude tratou número inválido (0, negativo, maior que a lista)? Se não, peça. Esse é o hábito de revisar.

#### Erros comuns

##### Abrir na pasta errada

O Claude só enxerga a pasta onde foi aberto. cd primeiro, claude depois.

##### Aprovar sem ler

Leia o diff de cada edição. É sua chance de pegar erro cedo.

##### Pedir tudo de uma vez

"Faça um sistema completo" gera bagunça. Peça em passos pequenos e verificáveis.

##### Não testar

Rode o programa você mesmo, ou peça ao Claude para rodar e mostrar a saída.

##### Consigo fazer?

#### Para ir além

- Quickstart oficial, passos 3 a 7

- Modos de permissão

## Aula 1.3: Comandos com barra (/)

### Resumo do vídeo da aula

Tudo o que você digita vai para o Claude, exceto o que começa com barra: esses comandos controlam a própria ferramenta. Não precisa decorar. Digite barra e uma lista aparece. Continue digitando para filtrar, e Tab completa. Para monitorar: barra context mostra o uso do contexto, barra usage mostra custo e limites, e barra status confere o ambiente. Para ajustar: barra model troca o modelo, e barra effort muda o nível de raciocínio. Tarefa simples, modelo e esforço menores. Para corrigir o rumo, barra rewind volta a um ponto anterior. Barra compact resume e continua a mesma tarefa. E barra clear começa uma conversa nova. E no PowerShell: claude traço c continua a última conversa, traço r escolhe qual retomar, e traço p responde e sai, ótimo para scripts. Regra prática: uma tarefa, uma conversa.

### Conteúdo da aula

Objetivo: conhecer os comandos que controlam a sessão (ajuda, modelo, contexto, histórico, custo) e as formas de abrir o Claude Code pelo terminal.

#### Por que importa

Tudo o que você digita vai para o Claude, exceto o que começa com /. Esses são comandos para a ferramenta: trocar modelo, limpar a conversa, ver custo. Saber os 12 principais te dá controle total da sessão.

Não decore Digite / e uma lista aparece. Continue digitando para filtrar (/con mostra /config, /context, /compact…). Tab completa.

#### Conceito: comandos por momento da sessão

#### Os comandos essenciais

| Comando | Para quê | Quando usar

| /help | Lista comandos disponíveis | Na dúvida

| /status | Versão, modelo, conta, conectividade | Conferir o ambiente

| /model | Troca o modelo (e salva como padrão) | Tarefa difícil → modelo maior

| /effort | Ajusta o esforço de raciocínio (low … xhigh, max, auto) | Problemas complexos

| /context | Mostra o uso da janela de contexto | Respostas piorando? Confira

| /clear | Conversa nova, contexto vazio | Mudou de assunto

| /compact | Resume a conversa para liberar espaço | Mesma tarefa, conversa longa

| /rewind | Volta conversa e/ou código a um ponto anterior | O Claude foi pelo caminho errado

| /resume | Retoma uma conversa anterior | Continuar o trabalho de ontem

| /usage | Custo, limites do plano, estatísticas | Acompanhar consumo

| /init | Cria o CLAUDE.md do projeto | Primeira vez num projeto (Módulo 2)

| /powerup | Lições interativas oficiais | Para complementar o curso

##### Abrindo o Claude Code de jeitos diferentes

| No terminal | O que faz

| claude | Sessão interativa normal

| claude "explique o tarefas.py" | Abre já com um pedido

| claude -c | Continua a conversa mais recente desta pasta

| claude -r | Escolhe qual conversa anterior retomar

| claude -p "pergunta" | Responde e sai, sem sessão interativa (ótimo para scripts, Módulo 9)

/clear não apaga para sempre A conversa anterior continua acessível pelo /resume. O /clear só começa uma conversa nova com contexto limpo.

#### Exercício real

Na pasta taskflow:

- Abra com claude, rode /context e anote quanto está em uso

- Peça explique a função listar e rode /context de novo. O que mudou?

- Rode /usage e veja o consumo da sessão

- Rode /clear, saia com /exit e volte com claude -r: encontre a conversa anterior na lista

- Fora da sessão, rode: claude -p "quantas funções existem em tarefas.py?"

Ver gabarito

- Passo 2: o uso de contexto aumenta, porque agora inclui o arquivo lido e a explicação. Tudo o que o Claude lê ocupa contexto.

- Passo 4: claude -r abre uma lista de conversas; a de antes do /clear aparece lá.

- Passo 5: o -p imprime a resposta e volta ao prompt do PowerShell, sem sessão interativa.

#### Erros comuns

##### Usar a mesma conversa para tudo

Assuntos misturados confundem o modelo. Assunto novo → /clear.

##### Confundir /clear e /compact

/clear: recomeça. /compact: resume e continua.

##### Sempre o modelo mais caro

Tarefas simples vão bem com modelos menores e esforço menor. Economize limite.

##### Comando no meio do texto

O / só funciona no início da mensagem.

##### Consigo fazer?

#### Para ir além

- Referência completa de comandos (são dezenas!)

- Referência da CLI: todas as flags do claude

- Cola de comandos do curso

## Aula 1.4: Atalhos, ! shell, @ menções e bons prompts

### Resumo do vídeo da aula

Dois hábitos separam iniciantes de quem domina o Claude Code: interromper cedo e dar contexto preciso. Viu o Claude indo pelo caminho errado? Aperte Esc na hora. Ele para, mantém o que já fez, e você redireciona. Três prefixos: barra para comandos, exclamação para rodar um comando direto, e arroba para apontar um arquivo. Com a exclamação, o comando roda direto, sem pedir permissão. A saída entra no contexto e o Claude comenta o resultado. Um bom pedido tem quatro partes: o quê, onde, com arroba no arquivo, as restrições e o critério de pronto. E três atalhos úteis: Control J quebra linha sem enviar, Alt V cola uma imagem, e o ponto de interrogação, com o campo vazio, mostra todos os atalhos. E nunca cole senhas, tokens ou dados pessoais nos prompts. Nos estudos, use sempre dados fictícios.

### Conteúdo da aula

Objetivo: trabalhar com fluidez (interromper, voltar, rodar comandos, apontar arquivos) e escrever pedidos que dão certo na primeira tentativa.

#### Por que importa

Dois hábitos separam iniciantes de quem domina o Claude Code: interromper cedo quando algo vai pelo caminho errado (em vez de esperar terminar) e dar contexto preciso no pedido. Esta aula treina os dois.

#### Conceito: os 3 prefixos mágicos

#### Atalhos que você vai usar todo dia

| Atalho | O que faz

| Esc | Interrompe o Claude no meio. O que já foi feito fica, e você redireciona.

| Esc Esc | Com texto: limpa o rascunho. Com campo vazio: abre o rewind.

| Shift+Tab | Alterna o modo de permissão (em alguns terminais Windows: Alt+M)

| Ctrl+C | Interrompe; com nada rodando, limpa o campo; 2× sai

| ↑ / Ctrl+R | Histórico de mensagens / busca no histórico

| Ctrl+J ou \+Enter | Nova linha sem enviar (no Windows Terminal recente, Shift+Enter também)

| Alt+V | Cola imagem (print de tela, por exemplo) no Windows

| Ctrl+O | Mostra os detalhes das ferramentas usadas

|? | Com o campo vazio, mostra todos os atalhos

##### Anatomia de um bom pedido

##### 🎯 O quê

A mudança exata. "Adicione o comando remover <numero>"

##### 📍 Onde

Arquivos com @. "em @tarefas.py"

##### 📏 Restrições

"sem bibliotecas novas; mantenha o estilo atual"

##### ✅ Pronto quando…

"teste removendo a tarefa 2 e listando"

Dados sensíveis Não cole senhas, tokens, chaves de API, dados pessoais reais nem informações internas da organização nos prompts nem nas imagens. Em estudos, use sempre dados fictícios.

#### Exercício real

No TaskFlow, com claude aberto:

- Rode! python tarefas.py listar e veja o Claude comentar a saída

- Envie um pedido completo usando @tarefas.py para adicionar o comando remover <numero>, com restrição e critério de pronto

- Enquanto ele trabalha, pressione Esc uma vez, digite "use a mesma validação de número do concluir" e continue

- Escreva um pedido de 3 linhas usando Ctrl+J para quebrar linhas

- Revise com! git diff e faça commit

Ver um prompt-modelo

Adicione o comando "remover <numero>" em @tarefas.py. Restrições: sem bibliotecas novas; reaproveite a validação de número do concluir. Pronto quando: remover 2 tira a tarefa 2, a lista se renumera, e um número inválido mostra mensagem clara. Rode os dois casos e me mostre a saída.

Repare que o critério de pronto faz o Claude verificar sozinho e mostrar evidências.

#### Erros comuns

##### Esperar terminar algo errado

Viu que foi pelo caminho errado? Esc na hora. Economiza tempo e limite.

##### Ctrl+C para interromper

Funciona, mas pode limpar o campo ou sair. Para redirecionar, prefira Esc.

##### Pedido sem critério de pronto

Sem saber o que é "pronto", o Claude decide por você.

##### Enter no meio do pedido

Enter envia. Para quebrar linha: Ctrl+J.

##### Consigo fazer?

#### Para ir além

- Interactive mode: todos os atalhos

- Best practices: como escrever bons pedidos

- Configurar o terminal (Shift+Enter etc.)
