# Módulo 6: MCP e integrações

Curso "Claude Code: do zero ao avançado" (estudo pessoal, em português do Brasil). Nível: Intermediário. Tema: Servidores MCP, VS Code e Desktop.

Projeto de treino usado em todo o curso: TaskFlow, um gerenciador de tarefas de linha de comando em Python, só com a biblioteca padrão. Dados de exemplo são fictícios.

Aulas: 6.1 O que é MCP; 6.2 Instalar e autenticar um servidor; 6.3 Criar um MCP em Python; 6.4 VS Code e app Desktop.

## Aula 6.1: O que é MCP

### Resumo do vídeo da aula

Muito do seu trabalho está fora do código: tarefas, documentação, bancos de dados. O M C P liga o Claude a tudo isso. Pense numa tomada padrão. Um servidor M C P feito uma vez funciona no Claude Code, no app Desktop, no V S Code e em outros clientes compatíveis. Um servidor oferece ferramentas, que são ações que o Claude chama; recursos, que são dados que você menciona com arroba; e prompts, que viram comandos. Ele se conecta de dois jeitos: S T D I O, um programa que roda na sua máquina, ou H T T P, um serviço hospedado acessado por uma URL. Cada servidor ocupa um pouco do contexto. O tool search, ligado por padrão, só carrega as definições completas quando o Claude precisa. Mesmo assim, remova os que você não usa. E o mais importante: só conecte servidores confiáveis. Conteúdo externo pode esconder instruções maliciosas. Na empresa, isso é decisão da segurança da informação.

### Conteúdo da aula

Objetivo: entender o Model Context Protocol, o que um servidor MCP oferece ao Claude, como ele se conecta e quais são os riscos antes de instalar qualquer um.

#### Por que importa

Por padrão o Claude Code lê arquivos, edita e roda comandos. Mas muito do seu trabalho está em outros sistemas: o gerenciador de tarefas, a documentação, um banco de dados, o navegador. O MCP (Model Context Protocol) é um padrão aberto que liga o Claude a essas ferramentas sem você copiar e colar nada.

Analogia MCP é como uma tomada padrão: qualquer aparelho com o plugue certo funciona em qualquer tomada. Um servidor MCP feito uma vez funciona no Claude Code, no app Desktop, no VS Code e em outros clientes compatíveis.

#### Conceito: cliente, servidor e ferramentas

#### O que um servidor MCP oferece

##### 🛠 Ferramentas (tools)

Ações que o Claude pode chamar: "buscar issue", "consultar tabela", "abrir página". Aparecem com nomes como mcp__servidor__ferramenta.

##### 📄 Recursos (resources)

Dados que você menciona com @, no formato @servidor:protocolo://caminho.

##### 💬 Prompts

Modelos prontos que viram comandos: /servidor:prompt no menu / (ou /mcp__servidor__prompt).

##### Dois jeitos de conectar (transportes)

| Transporte | Onde roda | Exemplo

| stdio | Um programa na sua máquina, iniciado pelo Claude Code | Navegador controlado (Playwright), seu próprio script Python

| http | Um serviço hospedado, acessado por URL | Servidor de documentação, Notion, Sentry

Existe também o sse, que a documentação marca como depreciado. Prefira http quando o serviço oferecer.

##### Custo de contexto

Cada servidor conectado ocupa um pouco da janela de contexto, porque os nomes das ferramentas e as instruções do servidor carregam em toda sessão. O Claude Code reduz isso com o tool search (ligado por padrão): as definições completas das ferramentas só carregam quando o Claude precisa delas. Mesmo assim, remova servidores que você não usa.

Saídas muito grandes também são controladas: o padrão máximo é de 25.000 tokens por resultado (ajustável com a variável MAX_MCP_OUTPUT_TOKENS).

Segurança: só servidores confiáveis Um servidor MCP pode ler dados, executar ações e trazer conteúdo externo. A documentação alerta: verifique se você confia em cada servidor antes de conectar, porque servidores que buscam conteúdo externo podem expor você a prompt injection (instruções maliciosas escondidas no conteúdo). Na empresa, conectar um MCP a sistemas ou dados corporativos é decisão da área de segurança da informação. Em estudo, use servidores públicos inofensivos e dados fictícios.

#### Exercício de reflexão

Escreva no seu diario.md (e faça commit):

- Dois sistemas que você usa no trabalho e que fariam sentido como servidor MCP.

- Para cada um: seria stdio ou http? Quais 2 ferramentas ele teria?

- Qual o maior risco de conectar cada um, e quem na organização deveria aprovar?

Ver um exemplo de resposta

Sistema 1: gerenciador de chamados (hospedado) → http. Ferramentas: buscar_chamado, comentar_chamado. Risco: o Claude comentar em chamados reais por engano; dados pessoais de solicitantes. Aprovação: segurança da informação e privacidade (LGPD).

Sistema 2: pasta local de relatórios fictícios → stdio (um script Python). Ferramentas: listar_relatorios, ler_relatorio. Risco: baixo se for só leitura de dados de teste. Mesmo assim, comece com permissões somente leitura.

Repare no padrão: comece só com leitura e libere escrita depois de confiar.

#### Erros comuns

##### Instalar tudo que aparece

Cada servidor é código de terceiros com acesso às suas coisas. Instale só o que precisa e confia.

##### Esquecer servidores ligados

Servidores parados ocupam contexto. Revise com /mcp e remova os que não usa.

##### Confundir MCP com plugin

Plugin é um pacote que pode conter servidores MCP, skills e hooks (Módulo 8).

##### Dar acesso de escrita logo de cara

Para bancos e APIs, a doc recomenda credenciais somente leitura quando possível.

##### Consigo fazer?

#### Para ir além

- Referência MCP do Claude Code (em inglês)

- Introdução ao Model Context Protocol

- Introduction to Model Context Protocol (Anthropic Academy, gratuito, em inglês).

## Aula 6.2: Instalar e autenticar um servidor

### Resumo do vídeo da aula

O fluxo é sempre o mesmo, para qualquer servidor: adicionar, conferir, usar e, se precisar, remover. Para um servidor hospedado, use claude M C P add com transporte H T T P, um nome que você escolhe e a URL. O servidor de documentação do Claude Code é um ótimo primeiro teste. Para um servidor local, o padrão é S T D I O. Tudo depois dos dois traços é o comando que inicia o servidor. Esquecer os dois traços é o erro mais comum. Confira com claude M C P list, que mostra o status de cada servidor. Dentro da sessão, o barra M C P abre o painel para autenticar e reconectar. O escopo define onde fica salvo: local, o padrão, só para você neste projeto; project, num arquivo ponto M C P ponto json que vai para o Git; ou user, para todos os seus projetos. Serviços com login usam claude M C P login. E servidores vindos de um ponto M C P ponto json pedem sua aprovação antes de rodar, para que um repositório clonado não execute nada sem você consentir.

### Conteúdo da aula

Objetivo: adicionar, verificar, usar e remover um servidor MCP pela linha de comando, escolher o escopo certo e entender o fluxo de login dos servidores que pedem autenticação.

#### Por que importa

O fluxo é sempre o mesmo para qualquer servidor: adicionar → conferir → usar → (remover). Dominando esses quatro passos com um servidor inofensivo, você consegue conectar qualquer outro com segurança.

Vamos usar o servidor de documentação do Claude Code, sugerido na própria documentação para o primeiro teste: é hospedado, faz busca nos docs e não exige login.

#### Conceito: o ciclo de vida de um servidor

#### Os comandos

Rode no PowerShell, fora de uma sessão do claude. O claude mcp add funciona igual no PowerShell e no Prompt de Comando.

##### Servidor hospedado (http)

claude mcp add --transport http claude-code-docs https://code.claude.com/docs/mcp

- --transport http: o servidor está numa URL

- claude-code-docs: um nome que você escolhe (aparece nas chamadas e nos comandos)

- a URL do servidor

##### Servidor local (stdio)

claude mcp add playwright -- npx -y @playwright/mcp@latest

Sem --transport, o padrão é stdio. Tudo depois do -- é o comando que o Claude Code roda para iniciar o servidor. Este exemplo precisa do Node.js 18+ e usa o Chrome instalado.

O -- importa Ele separa as opções do Claude Code (--transport, --env, --scope) do comando do servidor. Esquecer o -- é a causa mais comum de servidor stdio que não inicia.

##### Gerenciar

| Comando | O que faz

| claude mcp list | Lista os servidores e o status (✔ Connected,! Needs authentication, ✘ Failed to connect…)

| claude mcp get <nome> | Detalhes e escopo de um servidor, incluindo a mensagem de erro

| claude mcp remove <nome> | Remove o servidor

| claude mcp login <nome> | Faz o login OAuth pelo terminal

| claude mcp logout <nome> | Apaga as credenciais guardadas

| /mcp (dentro da sessão) | Painel: status, autenticar, reconectar

##### Escopos: onde o servidor fica salvo

| Escopo | Arquivo | Vale para

| local (padrão) | %USERPROFILE%\.claude.json, na entrada do projeto | Só você, só este projeto

| project | .mcp.json na raiz do projeto | Todos que clonarem o projeto (vai para o Git)

| user | %USERPROFILE%\.claude.json, chave mcpServers | Só você, todos os projetos

claude mcp add --scope user --transport http claude-code-docs https://code.claude.com/docs/mcp

O escopo é fixo: para mudar, remova e adicione de novo. Exemplo de .mcp.json (escopo project):

{ "mcpServers": { "claude-code-docs": { "type": "http", "url": "https://code.claude.com/docs/mcp" } } }

Na primeira vez que o Claude Code encontra um servidor de .mcp.json, ele pede sua aprovação. Isso existe para que um repositório clonado não rode programas na sua máquina sem você consentir.

##### Servidores que pedem login

Serviços como Sentry, Linear e Notion usam OAuth: você adiciona a URL e o status fica! Needs authentication. Depois abra /mcp, selecione o servidor e escolha Authenticate, ou rode claude mcp login <nome>. O navegador abre para você autorizar.

Contas e tokens Não conecte contas corporativas sem aprovação da TI e da segurança da informação. Nunca cole tokens em prompts. Se um servidor exigir token (--header "Authorization: Bearer ..."), trate-o como senha: ele fica gravado no arquivo de configuração.

#### Exercício real

- Na pasta taskflow, adicione o servidor de documentação (escopo padrão)

- Confirme com claude mcp list que aparece ✔ Connected

- Abra claude, rode /mcp e veja as ferramentas do servidor

- Peça: use o servidor claude-code-docs para explicar o que são escopos de MCP. Aprove a chamada e confira que ela vem rotulada com o nome do servidor

- Rode /context e procure as ferramentas MCP (podem aparecer como deferred, pelo tool search)

- Saia e remova o servidor

Ver gabarito

cd ~\estudos-claude\taskflow claude mcp add --transport http claude-code-docs https://code.claude.com/docs/mcp claude mcp list claude # dentro da sessão: /mcp use o servidor claude-code-docs para explicar o que são escopos de MCP /context /exit # de volta ao PowerShell: claude mcp remove claude-code-docs

Ao adicionar, o comando confirma algo como Added HTTP MCP server claude-code-docs ... to local config e mostra qual arquivo foi alterado. Se aparecer ✘ Failed to connect, rode claude mcp get claude-code-docs para ver o erro. Em rede corporativa, pode ser proxy (fale com a TI).

Para testar a URL no PowerShell, use curl.exe -I https://code.claude.com/docs/mcp (com .exe, para não cair no alias Invoke-WebRequest). Um 404 ou 405 ainda indica que o servidor responde.

#### Erros comuns

##### "No MCP servers configured"

Você adicionou em outro projeto (escopo local é por pasta). Adicione de novo aqui ou use --scope user.

##### stdio não inicia

Faltou o --, ou o programa (Node, Python) não está instalado. Rode o comando do servidor direto no terminal para ver o erro.

##### Demora para iniciar

O padrão de espera é 30 s. Aumente: $env:MCP_TIMEOUT = "60000"; claude

##### Editou o .mcp.json e nada mudou

Ele é lido ao iniciar a sessão. Saia e abra de novo.

##### Consigo fazer?

#### Para ir além

- MCP quickstart oficial, que é a base desta aula

- Referência MCP: escopos, autenticação, variáveis de ambiente

## Aula 6.3: Criar um MCP em Python

### Resumo do vídeo da aula

Com cerca de quarenta linhas de Python, você ensina o Claude a usar os seus próprios sistemas. Por que não rodar o script direto? Porque uma ferramenta M C P tem nome, descrição e parâmetros tipados. E você controla o que é permitido: aqui, só listar e adicionar. Crie um ambiente virtual e instale o pacote M C P. O S D K atual exige Python três ponto onze ou superior. Na máquina de trabalho, confirme com a TI antes de instalar. O código é simples. Você cria o servidor, marca cada função com o decorador tool, e roda com transporte S T D I O. A docstring vira a descrição que o Claude lê. Um cuidado importante: nunca use print num servidor S T D I O. A saída padrão é o canal do protocolo, e um print ali corrompe a comunicação. Devolva textos nas ferramentas. Para conectar, registre o servidor com claude M C P add, apontando o python do ambiente virtual e o arquivo do servidor. Depois confira com claude M C P list.

### Conteúdo da aula

Objetivo: escrever um servidor MCP próprio com o SDK oficial em Python, que expõe as tarefas do TaskFlow como ferramentas, e conectá-lo ao Claude Code.

#### Por que importa

Servidores prontos cobrem serviços populares. Mas os sistemas mais úteis para você costumam ser os seus: um script interno, uma planilha, uma API do time. Com cerca de 40 linhas de Python você ensina o Claude a usá-los do jeito certo, com regras e validações que você define.

Por que não deixar o Claude rodar o script direto? Pode, com python tarefas.py listar. Mas uma ferramenta MCP tem nome, descrição e parâmetros tipados. O Claude entende quando usar e o que passar, e você controla exatamente o que é permitido (aqui, só listar e adicionar; nada de apagar).

#### Conceito: de função Python a ferramenta

#### Passo a passo

Antes de instalar Esta aula exige instalar um pacote Python (mcp) com o pip. Na máquina de trabalho, confirme com a TI se você pode instalar pacotes. O SDK atual (v2) exige Python 3.11 ou superior: confira com python --version.

##### . Preparar o projeto

Use a pasta projeto-taskflow\etapa-06 do curso (já tem o servidor pronto, para conferir) ou adicione o servidor ao seu taskflow. Crie um ambiente virtual e instale o SDK:

cd ~\estudos-claude\taskflow python -m venv .venv .\.venv\Scripts\python.exe -m pip install "mcp[cli]"

Chamar o python.exe de dentro do .venv evita ter que "ativar" o ambiente, o que costuma ser bloqueado pela política de scripts do PowerShell em máquinas corporativas. Adicione .venv/ ao .gitignore.

##### . Escrever o servidor: servidor_mcp.py

from mcp.server import MCPServer from tarefas import carregar, salvar mcp = MCPServer("taskflow") @mcp.tool() def listar_tarefas() -> str: """Lista todas as tarefas do TaskFlow com número e status ([x] feita, [ ] pendente).""" tarefas = carregar() if not tarefas: return "Nenhuma tarefa cadastrada." linhas = [] for i, t in enumerate(tarefas, start=1): marca = "x" if t.get("feita") else " " linhas.append(f"{i}. [{marca}] {t['titulo']}") return "\n".join(linhas) @mcp.tool() def adicionar_tarefa(titulo: str) -> str: """Adiciona uma nova tarefa pendente ao TaskFlow. Use títulos curtos e fictícios.""" titulo = titulo.strip() if not titulo: return "Erro: o título não pode ser vazio." tarefas = carregar() tarefas.append({"titulo": titulo, "feita": False}) salvar(tarefas) return f"Tarefa {len(tarefas)} adicionada: {titulo}" if __name__ == "__main__": mcp.run(transport="stdio")

- MCPServer("taskflow") cria o servidor.

- @mcp.tool() transforma a função em ferramenta. A docstring vira a descrição que o Claude lê para decidir quando usar, e os tipos (titulo: str) viram os parâmetros.

- mcp.run(transport="stdio") conversa com o Claude Code pela entrada e saída padrão.

Nunca use print() num servidor stdio A saída padrão é o canal do protocolo. Um print ali dentro corrompe a comunicação e o servidor "quebra" sem motivo aparente. Devolva strings nas ferramentas.

Nota de versão No SDK v1.x, a classe se chamava FastMCP (from mcp.server.fastmcp import FastMCP). Na v2, a atual, ela virou MCPServer, e o import antigo gera ModuleNotFoundError. Tutoriais antigos na internet ainda usam FastMCP.

##### . Conectar ao Claude Code

claude mcp add taskflow -- "$PWD\.venv\Scripts\python.exe" "$PWD\servidor_mcp.py" claude mcp list

O PowerShell troca $PWD pela pasta atual, então o comando fica salvo com caminhos completos e funciona de qualquer lugar. Para testar as ferramentas sem o Claude, o SDK traz um inspetor: .\.venv\Scripts\mcp.exe dev servidor_mcp.py (pode exigir Node.js).

#### Exercício real

- Crie o servidor_mcp.py no seu TaskFlow, instale o SDK e conecte com claude mcp add

- No claude, peça: liste minhas tarefas usando o servidor taskflow e depois adicione a tarefa "Revisar Módulo 6" pelo taskflow

- Confira fora do Claude: python tarefas.py listar

- Desafio: peça ao Claude para adicionar ao servidor a ferramenta concluir_tarefa(numero: int), com validação de número inválido. Lembre: depois de mudar o servidor, reinicie a sessão (ou use /mcp para reconectar)

- Faça commit (sem a pasta .venv!)

Ver gabarito do desafio

@mcp.tool() def concluir_tarefa(numero: int) -> str: """Marca como feita a tarefa de número indicado (1 = primeira da lista).""" tarefas = carregar() if numero < 1 or numero > len(tarefas): return f"Erro: a tarefa {numero} não existe. Há {len(tarefas)} tarefas." tarefas[numero - 1]["feita"] = True salvar(tarefas) return f"Tarefa {numero} concluída."

Pontos para conferir: a validação devolve uma mensagem (não um print nem uma exceção sem tratamento), e a docstring explica que a numeração começa em 1. É isso que guia o Claude a passar o número certo.

No .gitignore: .venv/ e tarefas.json (dados locais).

#### Erros comuns

##### ModuleNotFoundError: mcp

O servidor está rodando com um Python que não tem o SDK. Use o caminho do .venv\Scripts\python.exe no claude mcp add.

##### Import de FastMCP falha

Tutorial da v1. Na v2 use from mcp.server import MCPServer.

##### Servidor conecta e cai

Quase sempre um print() ou um erro no início. Rode python servidor_mcp.py direto para ver a mensagem.

##### Docstring vaga

"Faz coisas com tarefas" não ajuda. Diga o que a ferramenta faz, o formato dos parâmetros e o que devolve.

##### Consigo fazer?

#### Para ir além

- Documentação do SDK Python do MCP (inclui o guia de migração v1 → v2)

- Repositório do SDK Python

- Construir um servidor MCP, guia oficial do protocolo

## Aula 6.4: VS Code e app Desktop

### Resumo do vídeo da aula

É o mesmo motor do Claude Code em outras superfícies. Tudo o que você aprendeu vale em todas. No V S Code, instale a extensão Claude Code pelo painel de extensões. Ela exige o V S Code um ponto noventa e quatro ou superior. Na extensão você vê os diffs lado a lado, menciona linhas selecionadas com Alt K, comenta o plano antes de aprovar e abre várias conversas em abas. No app Desktop, na aba Code, você roda sessões em paralelo, revisa diffs comentando linhas, usa o navegador embutido e conecta servidores M C P pela interface. E dá para transitar: barra desktop leva a sessão do terminal para o app; barra resume no Desktop retoma sessões do terminal; e barra ide conecta o terminal ao V S Code. O Claude ponto MD, as configurações, os servidores M C P e as skills são os mesmos em todas as superfícies. Escolha a mais confortável para cada tarefa.

### Conteúdo da aula

Objetivo: usar o Claude Code dentro do VS Code e no app Desktop, aproveitar o que cada um faz melhor e saber o que é compartilhado com o terminal.

#### Por que importa

Até aqui usamos o terminal, onde tudo fica explícito. No dia a dia, muita gente prefere ver os diffs lado a lado, selecionar linhas com o mouse ou rodar várias sessões em paralelo. É o mesmo motor do Claude Code em outras "superfícies": o que você aprendeu vale em todas.

#### Conceito: um motor, várias superfícies

#### Na prática

##### Extensão do VS Code

- Instalar: Ctrl+Shift+X, pesquise "Claude Code" (ID anthropic.claude-code) e clique em Install. Requer VS Code 1.94 ou superior e uma conta paga do Claude ou do Console.

- Abrir: ícone ✻ (Spark) na barra do editor ou na barra lateral, ✻ Claude Code na barra de status, ou Ctrl+Shift+P → "Claude Code".

| Recurso | Como usar

| Diffs lado a lado | No modo Manual, cada edição abre um diff com aceitar/rejeitar

| @-menção com linhas | Selecione o trecho e aperte Alt+K: insere algo como @tarefas.py#5-10. O texto selecionado também vai como contexto

| Revisão de plano | No modo Plan, o plano abre como documento Markdown, e você comenta antes de aprovar

| Modo de permissão | Indicador abaixo do campo de prompt: Manual, Edit automatically, Plan, Auto

| Várias conversas | Ctrl+Shift+Esc abre uma conversa nova numa aba

| Alternar foco editor ↔ Claude | Ctrl+Esc

| Focus view | Ctrl+Alt+F esconde as chamadas de ferramenta e mostra só prompts e respostas

| MCP | /mcp no painel ou claude mcp add no terminal: gravam na mesma configuração

CLI dentro do VS Code Também dá para rodar claude no terminal integrado (Ctrl+`), mas isso exige a instalação standalone (Módulo 1): a extensão não coloca claude no PATH. De um terminal externo, /ide conecta a sessão ao VS Code.

##### App Desktop (aba Code)

- Sessões em paralelo na barra lateral, cada uma com conversa e pasta próprias. Ative worktree para uma sessão trabalhar isolada num Git worktree (Módulo 7).

- Revisão visual: clique nos totais (+12 -1) do card de mudanças para abrir o diff, comente linhas com o + e envie com Ctrl+Enter.

- Navegador embutido (Ctrl+Shift+B): o Claude sobe o servidor de desenvolvimento, abre a página e verifica a mudança enquanto você acompanha.

- Conectores: servidores MCP com configuração gráfica, pelo + ao lado do prompt.

- Do terminal para o Desktop: /desktop continua a sessão atual do CLI no app (Windows x64 ou macOS, com assinatura). No Desktop, /resume retoma sessões iniciadas no CLI.

Recursos avançados no Desktop O modo Bypass permissions é só para containers ou máquinas virtuais isoladas. Recursos como computer use e sessões SSH com credenciais: na empresa, consulte TI e segurança da informação antes de usar.

##### O que é igual em todas as superfícies

O CLAUDE.md do projeto, as configurações (~/.claude/settings.json, compartilhado entre a extensão e o CLI), os servidores MCP, as skills e os comandos com /. O que muda é a interface: como você vê diffs, aprova ações e organiza sessões.

#### Exercício real

- Instale a extensão do VS Code e abra a pasta taskflow (code. no PowerShell)

- Selecione a função listar em tarefas.py, aperte Alt+K e peça: adicione um resumo no final: "N tarefas, M concluídas"

- Revise o diff lado a lado e aceite

- Confira com /mcp no painel que o servidor taskflow da aula anterior aparece. É a mesma configuração do terminal

- (Opcional, se tiver o app Desktop) No terminal, abra claude no projeto, faça uma pergunta e rode /desktop. Veja a conversa continuar no app

Ver gabarito

No passo 2, a referência inserida fica parecida com @tarefas.py#40-47. O Claude sabe exatamente qual trecho alterar. Resultado esperado no fim do listar:

feitas = sum(1 for t in tarefas if t.get("feita")) print(f"{len(tarefas)} tarefas, {feitas} concluídas")

No passo 4, o servidor aparece porque a extensão e o CLI leem a mesma configuração de MCP. Se não aparecer, confira se ele foi adicionado em escopo local em outra pasta.

#### Erros comuns

##### claude não existe no terminal do VS Code

A extensão não instala o CLI no PATH. Instale a versão standalone.

##### Achar que são ferramentas diferentes

É o mesmo motor: CLAUDE.md, settings e MCP valem em todas.

##### Aceitar diffs grandes sem ler

Diffs com muitas mudanças não mostram botões por trecho. Revise o arquivo inteiro.

##### PATH no Desktop

O app Desktop no Windows não lê perfis do PowerShell. Configure o PATH nas variáveis de ambiente e reabra o app.

##### Consigo fazer?

#### Para ir além

- Claude Code no VS Code

- App Desktop e quickstart do Desktop

- IDEs JetBrains
