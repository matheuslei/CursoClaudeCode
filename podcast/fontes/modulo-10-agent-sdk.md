# Módulo 10: Agent SDK

Curso "Claude Code: do zero ao avançado" (estudo pessoal, em português do Brasil). Nível: Expert. Tema: Construa seu próprio agente em Python: loop, ferramentas, permissões, hooks e custo.

Projeto de treino usado em todo o curso: TaskFlow, um gerenciador de tarefas de linha de comando em Python, só com a biblioteca padrão. Dados de exemplo são fictícios.

Aulas: 10.1 O loop do agente; 10.2 Ferramentas próprias; 10.3 Permissões e hooks no SDK; 10.4 Subagentes, custo e o agente TaskFlow.

## Aula 10.1: O loop do agente

### Resumo do vídeo da aula

Último módulo! Nesta aula, você sai do terminal do Claude Code e escreve o seu próprio agente em Python, com o Claude Agent SDK. O SDK é o mesmo motor do Claude Code, só que como biblioteca. O loop é simples: o Claude lê o pedido, chama ferramentas, recebe os resultados e repete até responder sem ferramentas. O jeito mais curto é a função query. Você passa o prompt e as opções, e percorre as mensagens com async for. As mensagens chegam em ordem: a SystemMessage de início, as AssistantMessage com texto ou chamada de ferramenta, as UserMessage com os resultados e, no fim, a ResultMessage. Nas opções você define o system prompt, as ferramentas permitidas, a pasta de trabalho, e as travas: max sublinhado turns e max sublinhado budget sublinhado U S D. Para conversar em vários turnos, use o ClaudeSDKClient. E atenção: o SDK usa chave de API, cobrada por uso. Na empresa, só com aval da segurança da informação.

### Conteúdo da aula

Objetivo: instalar o Claude Agent SDK em Python, escrever um agente que lê o TaskFlow com query(), entender cada mensagem do loop e limitar turnos e gasto com as opções.

#### Por que importa

Até aqui você usou o Claude Code conversando com ele no terminal. O Claude Agent SDK entrega o mesmo motor (as mesmas ferramentas, o mesmo loop, o mesmo gerenciamento de contexto) como uma biblioteca para Python e TypeScript. Com ele, o agente vira parte do seu programa: um robô que organiza tarefas, revisa código ou responde a um sistema, sem ninguém digitando.

| Você quer… | Use

| Trabalhar no dia a dia, conversando no terminal | Claude Code (CLI): Módulos 1 a 9

| Colocar o agente do Claude Code dentro do seu programa Python ou TypeScript | Agent SDK: este módulo

| Chamar a API direto e escrever você mesmo o loop de ferramentas | Client SDK (fora do escopo)

Custo e autorização O SDK usa uma chave de API da Anthropic, cobrada por uso: cada execução do agente gasta. Use a chave da sua conta pessoal de estudo, nunca a da empresa sem autorização. Uso em projeto da empresa só com aval da segurança da informação e da área responsável. Na dúvida sobre contrato, dados ou custos, procure essas áreas antes de rodar.

#### Conceito: o loop, passo a passo

#### Instalar e escrever o primeiro agente

##### Instalação (PowerShell, na pasta de treino)

O pacote se chama claude-agent-sdk e pede Python 3.10 ou mais novo. Na maioria das instalações ele já traz o Claude Code embutido. O passo a passo completo está no README da etapa 10.

PowerShell python -m venv .venv .\.venv\Scripts\python.exe -m pip install claude-agent-sdk $env:ANTHROPIC_API_KEY = "sua-chave-aqui"

A chave é segredo Troque sua-chave-aqui pela sua chave só no terminal. Não escreva a chave em arquivo .py, README, print ou chat. O SDK não lê arquivos .env sozinho. A doc avisa que o login do claude.ai não serve para produtos feitos com o SDK: use chave de API (ou Amazon Bedrock, Google Cloud ou Microsoft Foundry, se a sua organização usa).

##### O menor agente possível

agente_loop.py (versão curta) import asyncio from claude_agent_sdk import query, ClaudeAgentOptions, ResultMessage async def main(): async for mensagem in query( prompt="Explique o que o tarefas.py faz.", options=ClaudeAgentOptions(allowed_tools=["Read", "Glob", "Grep"]), ): if isinstance(mensagem, ResultMessage) and mensagem.subtype == "success": print(mensagem.result) asyncio.run(main())

- query() é assíncrona: devolve as mensagens aos poucos, e você as percorre com async for.

- prompt é o pedido; options é um ClaudeAgentOptions com a configuração.

- Você não executa as ferramentas: o SDK executa Read, Glob, Grep e devolve o resultado ao Claude.

##### As mensagens do loop

| Classe (Python) | Quando chega

| SystemMessage | Eventos da sessão. O subtype "init" abre a sessão; "compact_boundary" avisa que houve compactação.

| AssistantMessage | Uma para cada bloco da resposta: texto (TextBlock) ou chamada de ferramenta (ToolUseBlock).

| UserMessage | O resultado de cada ferramenta, que volta ao Claude.

| StreamEvent | Só com include_partial_messages=True: pedacinhos de texto em tempo real.

| ResultMessage | O fim: texto final (result), subtype, num_turns, total_cost_usd e session_id.

Confira o tipo com isinstance(), importando as classes de claude_agent_sdk. Um turno é uma volta do loop: o Claude responde e, se pediu ferramentas, o SDK as executa e devolve os resultados.

##### O fim do loop: subtype da ResultMessage

| subtype | O que houve | Tem result?

| success | Terminou normalmente | sim

| error_max_turns | Bateu no limite de turnos | não

| error_max_budget_usd | Bateu no teto de gasto | não

| error_during_execution | Um erro interrompeu o loop | não

Envolva em try Quando a query() termina num resultado de erro, ela entrega a ResultMessage e depois levanta uma exceção (de propósito). Coloque o async for num try/except para o script encerrar limpo.

##### As opções que você mais vai usar

| Opção de ClaudeAgentOptions | Para quê

| system_prompt | As instruções fixas do agente (papel, idioma, regras).

| allowed_tools | Pré-aprova ferramentas: rodam sem pedir permissão. Não limita: as outras continuam existindo.

| disallowed_tools / tools | Tiram ferramentas do agente. Ex.: disallowed_tools=["Bash"] remove o Bash; tools=["Read", "Grep"] deixa só essas embutidas.

| cwd | A pasta de trabalho do agente (padrão: a pasta de onde o script rodou).

| max_turns | Máximo de turnos. Sem limite por padrão.

| max_budget_usd | Teto de gasto estimado, em dólares. Sem limite por padrão. O valor 0 é recusado.

| model | O modelo: um alias ("sonnet", "opus", "haiku") ou um ID completo. Sem ele, vale o modelo padrão do Claude Code.

| effort | Quanto o Claude raciocina: "low" a "max". Menos esforço, menos tokens.

##### query() ou ClaudeSDKClient?

| | query() | ClaudeSDKClient

| Sessão | Nova a cada chamada | A mesma, em várias trocas

| Interromper (interrupt()) | não | sim

| Uso típico | Tarefa única | Conversa contínua, chat

conversa.py (trecho) async with ClaudeSDKClient(options=opcoes) as cliente: await cliente.query("Liste os comandos do TaskFlow.") async for mensagem in cliente.receive_response(): print(mensagem) await cliente.query("Agora resuma em uma linha.") # lembra da troca anterior async for mensagem in cliente.receive_response(): print(mensagem)

receive_response() entrega as mensagens até a ResultMessage daquela troca, inclusive. Você vai montar um agente assim na aula 4.

##### Streaming: texto em tempo real

Por padrão, cada AssistantMessage chega com o bloco completo. Para mostrar o texto enquanto é gerado, ligue include_partial_messages=True e trate o StreamEvent (de claude_agent_sdk.types): os eventos content_block_delta com delta do tipo text_delta trazem os pedaços de texto.

#### Exercício real: o agente leitor do TaskFlow

Prepare a pasta de treino seguindo o README da etapa 10 (cópia fora do curso, ambiente virtual, pacote e chave só no terminal).

Este exercício gasta Cada execução chama a API. Com as travas abaixo, o gasto de uma execução tende a ser pequeno, mas confira o valor estimado que o script imprime e acompanhe o consumo no console da sua conta.

- Na raiz da pasta de treino, crie agente_loop.py.

- Configure ClaudeAgentOptions com: um system_prompt em português pedindo resposta curta; allowed_tools só com Read, Glob e Grep; Bash, Write e Edit em disallowed_tools; cwd na pasta do script; max_turns=8; max_budget_usd=0.50.

- Peça: "Leia o tarefas.py e explique o que o TaskFlow faz e quais comandos ele tem."

- Imprima o texto de cada TextBlock, o nome de cada ToolUseBlock e, na ResultMessage, o subtype, o num_turns e o total_cost_usd.

- Rode com .\.venv\Scripts\python.exe agente_loop.py. Depois troque para max_turns=1 e veja o error_max_turns.

Ver o gabarito

Arquivo também em projeto-taskflow/etapa-10/gabarito/agente_loop.py.

agente_loop.py import asyncio from pathlib import Path from claude_agent_sdk import ( AssistantMessage, ClaudeAgentOptions, ResultMessage, TextBlock, ToolUseBlock, query,) PASTA = Path(__file__).parent OPCOES = ClaudeAgentOptions( system_prompt=( "Você é o assistente do TaskFlow, uma CLI de tarefas em Python. " "Responda em português do Brasil, em no máximo 5 linhas. Não edite arquivos." ), allowed_tools=["Read", "Glob", "Grep"], # pré-aprovadas: só leitura disallowed_tools=["Bash", "Write", "Edit"], # nem aparecem para o Claude cwd=str(PASTA), # o agente trabalha nesta pasta max_turns=8, # trava contra loop longo max_budget_usd=0.50, # trava de gasto (estimado)) async def main(): try: async for mensagem in query( prompt="Leia o tarefas.py e explique o que o TaskFlow faz e quais comandos ele tem.", options=OPCOES, ): if isinstance(mensagem, AssistantMessage): for bloco in mensagem.content: if isinstance(bloco, TextBlock): print(f"Claude: {bloco.text}") elif isinstance(bloco, ToolUseBlock): print(f"[ferramenta] {bloco.name}") elif isinstance(mensagem, ResultMessage): if mensagem.subtype == "success": print(f"\nResultado: {mensagem.result}") else: print(f"\nParou: {mensagem.subtype}") print(f"Turnos: {mensagem.num_turns}") if mensagem.total_cost_usd is not None: print(f"Custo estimado: US$ {mensagem.total_cost_usd:.4f}") except Exception as erro: # query() avisa com uma exceção depois de entregar um resultado de erro print(f"A sessão terminou com erro: {erro}") if __name__ == "__main__": asyncio.run(main())

Resultado esperado (ilustrativo): uma ou duas linhas [ferramenta] Read, um resumo citando adicionar, listar, concluir e remover, Turnos pequeno e um custo estimado de centavos. Com max_turns=1, aparece Parou: error_max_turns e, em seguida, a mensagem do except.

Por que total_cost_usd pode ser None? No Python, esse campo é opcional; confira antes de formatar. E lembre: é uma estimativa local, não a cobrança oficial.

#### Erros comuns

##### "Not logged in" ou "Invalid API key"

A variável ANTHROPIC_API_KEY não está no terminal onde o script roda. Defina com $env: nessa mesma janela.

##### Achar que allowed_tools limita

Ele só pré-aprova. Para tirar uma ferramenta, use disallowed_tools ou tools.

##### Ler result sem olhar o subtype

result só existe no success. Confira o subtype antes.

##### Sem travas

Sem max_turns e max_budget_usd, um pedido aberto pode rodar muito e gastar além do previsto.

##### Consigo fazer?

#### Para ir além

- How the agent loop works (em inglês): turnos, mensagens, contexto e compactação.

- Referência do SDK em Python: todas as opções de ClaudeAgentOptions.

- Sessões: retomar (resume) e ramificar (fork_session) uma conversa.

- Próxima aula: dar ao agente ferramentas próprias do TaskFlow.

- Building with the Claude API (Anthropic Academy, gratuito, em inglês): para ir além do SDK e trabalhar direto com a API.

## Aula 10.2: Ferramentas próprias

### Resumo do vídeo da aula

Nesta aula, você dá ao seu agente ferramentas próprias, escritas em Python: listar, adicionar e concluir tarefas do TaskFlow. Uma ferramenta tem quatro partes: o nome, a descrição, os parâmetros de entrada e a função que roda quando o Claude a chama. No Python, o decorador arroba tool define a ferramenta. A função é assíncrona e devolve um dicionário com a lista content. Depois, create sublinhado sdk sublinhado mcp sublinhado server junta as ferramentas num servidor MCP que roda dentro do seu programa. Nada de processo separado, como no Módulo 6. O nome completo segue o padrão: mcp, dois sublinhados, o nome do servidor, dois sublinhados, o nome da ferramenta. É esse nome que vai na lista de ferramentas permitidas. Erro na ferramenta não derruba o agente. Devolva is sublinhado error verdadeiro com uma mensagem clara, e o Claude tenta outro caminho.

### Conteúdo da aula

Objetivo: transformar funções Python do TaskFlow em ferramentas que o agente chama sozinho, com @tool e create_sdk_mcp_server, e controlar quais delas ele enxerga e usa sem perguntar.

#### Por que importa

As ferramentas embutidas (Read, Edit, Bash…) servem para qualquer projeto. Mas o seu sistema tem operações próprias: adicionar uma tarefa, consultar um cadastro, abrir um chamado. Dar uma ferramenta própria para cada operação deixa o agente mais seguro e previsível: ele chama a sua função, com os parâmetros certos, em vez de editar o tarefas.json na mão ou montar comandos no Bash.

##### 🎯 Precisão

A descrição e os parâmetros dizem ao Claude exatamente o que a ferramenta faz e o que ela espera.

##### 🔒 Controle

Você valida a entrada na função e decide o que fica disponível. Sem Bash, sem edição livre.

Lembra do Módulo 6? Lá, o servidor_mcp.py rodava como um processo separado, ligado ao Claude Code por claude mcp add. No SDK, o servidor MCP roda dentro do seu programa: nada de outro processo, nada de registrar com comando.

#### Conceito: o caminho de uma chamada

#### Anatomia de uma ferramenta

Uma ferramenta tem quatro partes: nome, descrição, esquema de entrada e a função (o handler). No Python, as três primeiras vão no decorador @tool:

agente_ferramentas.py (trecho) from typing import Any from claude_agent_sdk import tool, create_sdk_mcp_server from tarefas import carregar, salvar @tool("adicionar_tarefa", "Adiciona uma tarefa pendente. Use títulos curtos e fictícios.", {"titulo": str}) async def adicionar_tarefa(args: dict[str, Any]) -> dict[str, Any]: titulo = str(args.get("titulo", "")).strip() if not titulo: return {"content": [{"type": "text", "text": "Erro: título vazio."}], "is_error": True} tarefas = carregar() tarefas.append({"titulo": titulo, "feita": False}) salvar(tarefas) return {"content": [{"type": "text", "text": f"Tarefa {len(tarefas)} adicionada: {titulo}"}]} SERVIDOR = create_sdk_mcp_server(name="taskflow", version="1.0.0", tools=[adicionar_tarefa])

| Parte | O que é

| Nome | Identificador único que o Claude usa na chamada ("adicionar_tarefa").

| Descrição | Quando e para que usar. É o que o Claude lê para decidir se chama. Escreva com cuidado.

| Esquema de entrada | Um dicionário nome → tipo ({"titulo": str}), que o SDK converte em JSON Schema. Para descrever um campo: Annotated[str, "texto"]. Para campo opcional, lista fechada (enum) ou faixa de valores, passe um JSON Schema completo.

| Handler | Função async que recebe args (já validados) e devolve um dicionário com content: uma lista de blocos, como {"type": "text", "text": "..."}.

##### Ligar o servidor ao agente

agente_ferramentas.py (opções) OPCOES = ClaudeAgentOptions( mcp_servers={"taskflow": SERVIDOR}, # a chave "taskflow" vira parte do nome tools=[], # tira as embutidas: só as do TaskFlow allowed_tools=["mcp__taskflow__*"], # pré-aprova todas deste servidor)

- Nome completo: mcp__{servidor}__{ferramenta}, em que {servidor} é a chave que você deu em mcp_servers. Ex.: mcp__taskflow__adicionar_tarefa.

- Curinga: mcp__taskflow__* pré-aprova todas as ferramentas desse servidor. Curinga só vale depois do prefixo literal: "*" ou "mcp__*" em allowed_tools são ignorados.

- Disponível × aprovado: tools controla quais embutidas o Claude enxerga (tools=[] tira todas; as ferramentas MCP continuam). allowed_tools controla o que roda sem pedir permissão.

##### Anotações: só leitura roda em paralelo

agente_ferramentas.py (trecho) from claude_agent_sdk import ToolAnnotations @tool( "listar_tarefas", "Lista as tarefas do TaskFlow com número e status.", {"type": "object", "properties": {}}, # sem parâmetros: JSON Schema completo annotations=ToolAnnotations(readOnlyHint=True), # não altera nada) async def listar_tarefas(args): ...

readOnlyHint=True permite ao SDK rodar a ferramenta em paralelo com outras de leitura (ferramentas próprias rodam uma de cada vez por padrão). É uma informação, não uma trava: se a função gravar no disco, ela grava. Mantenha a anotação honesta.

##### Erros: devolva, não derrube

| O que acontece | O que o Claude vê

| A função levanta uma exceção não tratada | A mensagem crua da exceção, como resultado de erro. O loop continua.

| A função devolve "is_error": True com um texto | A sua mensagem, com contexto ("a tarefa 9 não existe; liste primeiro"). O loop continua.

Busca de ferramentas Por padrão, o SDK adia o carregamento dos esquemas de ferramentas MCP e o Claude os busca quando precisa. Por isso, a saída pode mostrar uma chamada ToolSearch antes da sua ferramenta. É normal.

Só no TypeScript A doc lista recursos de ferramentas próprias que existem só no SDK de TypeScript (por exemplo, a política permission_policy). No Python, o @tool repassa apenas content e is_error.

#### Exercício real: ferramentas do TaskFlow

Use a pasta de treino da aula 1 (ambiente virtual e chave no terminal). Este exercício gasta: rode poucas vezes e confira o custo estimado.

- Na raiz da pasta de treino (ao lado de tarefas.py), crie agente_ferramentas.py.

- Escreva três ferramentas com @tool: listar_tarefas (sem parâmetros, readOnlyHint=True), adicionar_tarefa (titulo: str) e concluir_tarefa (numero: int). Reaproveite carregar() e salvar() do tarefas.py.

- Em concluir_tarefa, devolva is_error se o número não existir.

- Junte tudo com create_sdk_mcp_server(name="taskflow", ...), registre em mcp_servers, use tools=[], allowed_tools=["mcp__taskflow__*"] e as travas da aula 1.

- Peça: "Adicione as tarefas fictícias 'Revisar relatório de teste' e 'Organizar a mesa', conclua a primeira e me mostre a lista final." Imprima cada ToolUseBlock (nome e entrada).

- Confira com python tarefas.py listar que as tarefas foram gravadas de verdade.

Ver o gabarito

Arquivo completo em projeto-taskflow/etapa-10/gabarito/agente_ferramentas.py.

agente_ferramentas.py import asyncio from typing import Any from claude_agent_sdk import ( AssistantMessage, ClaudeAgentOptions, ResultMessage, ToolAnnotations, ToolUseBlock, create_sdk_mcp_server, query, tool,) from tarefas import carregar, salvar def _texto(msg: str, erro: bool = False) -> dict[str, Any]: """Monta o resultado no formato que o SDK espera (lista content).""" resultado: dict[str, Any] = {"content": [{"type": "text", "text": msg}]} if erro: resultado["is_error"] = True return resultado @tool( "listar_tarefas", "Lista as tarefas do TaskFlow com número e status ([x] feita, [ ] pendente).", {"type": "object", "properties": {}}, # sem parâmetros: JSON Schema completo annotations=ToolAnnotations(readOnlyHint=True), # só lê: pode rodar em paralelo) async def listar_tarefas(args: dict[str, Any]) -> dict[str, Any]: tarefas = carregar() if not tarefas: return _texto("Nenhuma tarefa cadastrada.") linhas = [] for i, t in enumerate(tarefas, start=1): marca = "x" if t.get("feita") else " " linhas.append(f"{i}. [{marca}] {t['titulo']}") return _texto("\n".join(linhas)) @tool("adicionar_tarefa", "Adiciona uma tarefa pendente. Use títulos curtos e fictícios.", {"titulo": str}) async def adicionar_tarefa(args: dict[str, Any]) -> dict[str, Any]: titulo = str(args.get("titulo", "")).strip() if not titulo: return _texto("Erro: o título não pode ser vazio.", erro=True) tarefas = carregar() tarefas.append({"titulo": titulo, "feita": False}) salvar(tarefas) return _texto(f"Tarefa {len(tarefas)} adicionada: {titulo}") @tool("concluir_tarefa", "Marca como feita a tarefa de número informado (começa em 1).", {"numero": int}) async def concluir_tarefa(args: dict[str, Any]) -> dict[str, Any]: tarefas = carregar() numero = int(args.get("numero", 0)) if numero < 1 or numero > len(tarefas): return _texto(f"Erro: a tarefa {numero} não existe. Liste as tarefas primeiro.", erro=True) tarefas[numero - 1]["feita"] = True salvar(tarefas) return _texto(f"Tarefa {numero} concluída.") SERVIDOR = create_sdk_mcp_server( name="taskflow", version="1.0.0", tools=[listar_tarefas, adicionar_tarefa, concluir_tarefa],) OPCOES = ClaudeAgentOptions( system_prompt="Você gerencia a lista do TaskFlow. Responda em português do Brasil, em poucas linhas.", mcp_servers={"taskflow": SERVIDOR}, tools=[], allowed_tools=["mcp__taskflow__*"], max_turns=10, max_budget_usd=0.50,) async def main(): pedido = ( "Adicione as tarefas fictícias 'Revisar relatório de teste' e " "'Organizar a mesa', conclua a primeira e me mostre a lista final.") try: async for mensagem in query(prompt=pedido, options=OPCOES): if isinstance(mensagem, AssistantMessage): for bloco in mensagem.content: if isinstance(bloco, ToolUseBlock): print(f"[ferramenta] {bloco.name}({bloco.input})") elif isinstance(mensagem, ResultMessage): if mensagem.subtype == "success": print(f"\n{mensagem.result}") else: print(f"\nParou: {mensagem.subtype}") if mensagem.total_cost_usd is not None: print(f"Custo estimado: US$ {mensagem.total_cost_usd:.4f}") except Exception as erro: print(f"A sessão terminou com erro: {erro}") if __name__ == "__main__": asyncio.run(main())

Resultado esperado (ilustrativo): chamadas mcp__taskflow__adicionar_tarefa (duas), mcp__taskflow__concluir_tarefa({'numero': 1}) e mcp__taskflow__listar_tarefas({}), e a lista final com a primeira marcada [x]. O número da tarefa depende do que já havia no seu tarefas.json.

#### Erros comuns

##### Nome errado em allowed_tools

Escrever adicionar_tarefa em vez de mcp__taskflow__adicionar_tarefa: a regra não casa e a chamada cai no fluxo de permissão.

##### Esquecer o async

O handler precisa ser async def e devolver o dicionário com content.

##### Descrição vaga

"Faz coisas com tarefas" não ajuda o Claude a escolher. Diga o que faz, o que espera e quando usar.

##### Deixar a exceção estourar

Funciona, mas o Claude recebe uma mensagem crua. Prefira is_error com um texto útil.

##### Consigo fazer?

#### Para ir além

- Give Claude custom tools (em inglês): imagens, recursos e o exemplo do conversor de unidades.

- Connect to external tools with MCP: ligar servidores MCP externos (como o do Módulo 6) ao SDK.

- Tool search: quando o agente tem dezenas de ferramentas.

- Próxima aula: decidir o que roda sozinho, o que pergunta e o que é bloqueado.

## Aula 10.3: Permissões e hooks no SDK

### Resumo do vídeo da aula

Nesta aula, você decide o que o seu agente faz sozinho, o que precisa da sua aprovação e o que é sempre bloqueado. Cada chamada de ferramenta passa por etapas: hooks, regras de negação, regras de pergunta, modo de permissão, regras de permissão e, por último, o seu callback. Os modos vão do default, que pergunta ao seu callback, ao dontAsk, que nega tudo o que precisaria perguntar. O bypassPermissions, só em ambiente isolado. O callback can sublinhado use sublinhado tool recebe o nome da ferramenta e a entrada, e devolve PermissionResultAllow ou PermissionResultDeny, com uma mensagem para o Claude. Já o hook PreToolUse roda antes das chamadas, até das aprovadas por regra. Ele pode negar com um motivo, e essa negação vale até no modo bypass. Com o hook PostToolUse você registra o que rodou, numa trilha de auditoria. Os hooks rodam no seu programa e não ocupam o contexto do Claude.

### Conteúdo da aula

Objetivo: controlar, em código, o que o agente faz sozinho, o que pergunta a você e o que é sempre bloqueado, usando regras, modos de permissão, o callback can_use_tool e hooks.

#### Por que importa

No Módulo 4 você aprovava cada ação no terminal. Um agente do SDK muitas vezes roda sem ninguém olhando. Então as decisões de permissão precisam estar no código: o que é seguro rodar direto, o que precisa de um "sim" humano e o que nunca pode acontecer.

##### ✅ Rodar direto

Ler e listar: allowed_tools.

##### 🙋 Perguntar

Concluir tarefa: can_use_tool.

##### ⛔ Bloquear sempre

Remover: hook PreToolUse (ou regra de negação).

#### Conceito: a ordem das decisões

Quando o Claude pede uma ferramenta, o SDK confere a chamada nesta ordem. Cada etapa pode decidir, mandar para o seu callback ou passar adiante.

#### Regras, modos, callback e hooks

##### Regras de permitir e negar

| Opção | Efeito

| allowed_tools=["Read", "Grep"] | Pré-aprovadas. As outras continuam existindo e caem no modo de permissão.

| disallowed_tools=["Bash"] | Nome sozinho: o Bash some do agente.

| disallowed_tools=["Bash(rm *)"] | Regra com escopo: o Bash fica, mas comandos que casam com rm * são negados em todos os modos.

##### Modos de permissão (permission_mode)

| Modo | Comportamento

| "default" | Sem aprovação automática pelo modo. O que precisa de aprovação e não casa com regra vai para o seu can_use_tool. Sem callback, é negado.

| "dontAsk" | Nunca pergunta: o que pediria aprovação é negado. Bom para agente sem ninguém para aprovar.

| "acceptEdits" | Aprova edições de arquivo e comandos de sistema de arquivos (mkdir, mv, cp…) dentro da pasta de trabalho.

| "plan" | O Claude explora e planeja; edições vão para o seu callback.

| "auto" | Um classificador revisa ações como comandos e acessos à rede. Disponibilidade depende do modelo e do provedor.

| "bypassPermissions" | Aprova quase tudo, inclusive ferramentas fora de allowed_tools. Só em ambiente isolado (contêiner, CI).

Com o ClaudeSDKClient, dá para trocar o modo no meio da sessão com await cliente.set_permission_mode("acceptEdits").

##### O callback can_use_tool

agente_permissoes.py (trecho) from claude_agent_sdk.types import PermissionResultAllow, PermissionResultDeny, ToolPermissionContext async def pode_usar( tool_name: str, input_data: dict, context: ToolPermissionContext) -> PermissionResultAllow | PermissionResultDeny: print(f"[permissão] {tool_name} {input_data}") if input("Permitir? (s/n): ").strip().lower() == "s": return PermissionResultAllow(updated_input=input_data) # roda (pode alterar a entrada) return PermissionResultDeny(message="O usuário recusou esta ação.") # o Claude lê o motivo

- Recebe o nome da ferramenta, a entrada e um contexto (com sugestões de regra).

- PermissionResultAllow(updated_input=...) deixa rodar; dá para devolver a entrada modificada.

- PermissionResultDeny(message=...) bloqueia; o Claude lê a mensagem e tenta outro caminho.

Contorno do Python (está na doc) Com query(), o exemplo oficial passa o pedido como um gerador assíncrono de mensagens e registra um hook PreToolUse "vazio" que devolve {"continue_": True}, para manter o fluxo aberto enquanto o can_use_tool espera a resposta. O gabarito faz o mesmo.

Aprovado antes nunca chega ao callback Uma chamada aprovada por regra (allowed_tools) ou pelo modo (acceptEdits, bypassPermissions) pula o can_use_tool. Checagem que precisa valer sempre vai num hook PreToolUse.

##### Hooks: funções suas em pontos do loop

agente_permissoes.py (trecho) from claude_agent_sdk.types import HookMatcher async def bloquear_remocao(input_data, tool_use_id, context): return { "hookSpecificOutput": { "hookEventName": input_data["hook_event_name"], "permissionDecision": "deny", "permissionDecisionReason": "Política do TaskFlow: remover tarefas só pela CLI, à mão.", } } hooks = { "PreToolUse": [HookMatcher(matcher="mcp__taskflow__remover_tarefa", hooks=[bloquear_remocao])], "PostToolUse": [HookMatcher(matcher="^mcp__taskflow__", hooks=[auditar])], }

- Cada callback recebe input_data (com tool_name, tool_input, hook_event_name, session_id, cwd…), o tool_use_id e um context.

- Devolver {} = "sem objeção". No PreToolUse, permissionDecision aceita "allow", "deny", "ask" ou "defer"; com vários hooks, o mais restritivo vence.

- Um deny de hook vale até no bypassPermissions. Um allow de hook não passa por cima das regras de negação.

- matcher casa com o nome da ferramenta (texto exato, lista com | ou expressão regular), nunca com caminho de arquivo. Sem matcher, roda para tudo. timeout em segundos é opcional.

- Hooks rodam no seu programa: não ocupam contexto do Claude.

| Eventos de hook no SDK em Python

| PreToolUse, PostToolUse, PostToolUseFailure, UserPromptSubmit, Stop, SubagentStart, SubagentStop, PreCompact, Notification, PermissionRequest. (SessionStart e SessionEnd existem só no TypeScript; no Python, só como hooks de comando no settings.json.)

Windows: barras invertidas No Windows, o file_path que chega ao hook usa \ (ex.: C:\projeto\.env). Se o seu hook procura caminhos, trate os dois tipos de barra.

#### Exercício real: o agente com política

Na pasta de treino, com o agente_ferramentas.py da aula 2 na raiz. Este exercício gasta: rode poucas vezes.

- Crie agente_permissoes.py importando as ferramentas da aula 2 e acrescente remover_tarefa (numero: int).

- Use permission_mode="default", tools=[] e allowed_tools só com listar e adicionar.

- Escreva o can_use_tool que pergunta s/n no terminal (vai pegar o concluir_tarefa).

- Escreva um hook PreToolUse que nega mcp__taskflow__remover_tarefa com um motivo, e um PostToolUse que anota cada ferramenta do TaskFlow em auditoria.log (JSON por linha).

- Passe o pedido como gerador assíncrono e inclua o hook "vazio" do contorno.

- Peça: "Liste as tarefas, adicione a tarefa fictícia 'Testar o agente', conclua a tarefa 1 e depois remova a tarefa 2." Responda s uma vez e n em outra execução. Abra o auditoria.log.

Ver o gabarito

Arquivo completo em projeto-taskflow/etapa-10/gabarito/agente_permissoes.py (precisa do agente_ferramentas.py na mesma pasta).

agente_permissoes.py import asyncio import json from datetime import datetime from pathlib import Path from typing import Any from claude_agent_sdk import ClaudeAgentOptions, ResultMessage, create_sdk_mcp_server, query, tool from claude_agent_sdk.types import ( HookMatcher, PermissionResultAllow, PermissionResultDeny, ToolPermissionContext,) from agente_ferramentas import _texto, adicionar_tarefa, concluir_tarefa, listar_tarefas from tarefas import carregar, salvar LOG = Path(__file__).with_name("auditoria.log") @tool("remover_tarefa", "Remove a tarefa de número informado (começa em 1).", {"numero": int}) async def remover_tarefa(args: dict[str, Any]) -> dict[str, Any]: tarefas = carregar() numero = int(args.get("numero", 0)) if numero < 1 or numero > len(tarefas): return _texto(f"Erro: a tarefa {numero} não existe.", erro=True) removida = tarefas.pop(numero - 1) salvar(tarefas) return _texto(f"Tarefa {numero} removida: {removida['titulo']}") SERVIDOR = create_sdk_mcp_server( name="taskflow", version="1.0.0", tools=[listar_tarefas, adicionar_tarefa, concluir_tarefa, remover_tarefa],) async def pode_usar( tool_name: str, input_data: dict, context: ToolPermissionContext) -> PermissionResultAllow | PermissionResultDeny: print(f"\n[permissão] {tool_name} {input_data}") resposta = input("Permitir? (s/n): ").strip().lower() if resposta == "s": return PermissionResultAllow(updated_input=input_data) return PermissionResultDeny(message="O usuário recusou esta ação.") async def bloquear_remocao(input_data, tool_use_id, context): return { "hookSpecificOutput": { "hookEventName": input_data["hook_event_name"], "permissionDecision": "deny", "permissionDecisionReason": "Política do TaskFlow: remover tarefas só pela CLI, à mão.", } } async def auditar(input_data, tool_use_id, context): registro = { "quando": datetime.now().isoformat(timespec="seconds"), "ferramenta": input_data["tool_name"], "entrada": input_data["tool_input"], } with LOG.open("a", encoding="utf-8") as arq: arq.write(json.dumps(registro, ensure_ascii=False) + "\n") return {} # Contorno exigido pela doc do SDK em Python para o can_use_tool com prompt em fluxo async def manter_fluxo(input_data, tool_use_id, context): return {"continue_": True} async def pedido(): yield { "type": "user", "message": { "role": "user", "content": ( "Liste as tarefas, adicione a tarefa fictícia 'Testar o agente', " "conclua a tarefa 1 e depois remova a tarefa 2." ), }, } OPCOES = ClaudeAgentOptions( system_prompt="Você gerencia o TaskFlow. Responda em português do Brasil. Se algo for negado, explique.", mcp_servers={"taskflow": SERVIDOR}, tools=[], permission_mode="default", allowed_tools=["mcp__taskflow__listar_tarefas", "mcp__taskflow__adicionar_tarefa"], can_use_tool=pode_usar, hooks={ "PreToolUse": [ HookMatcher(matcher="mcp__taskflow__remover_tarefa", hooks=[bloquear_remocao]), HookMatcher(matcher=None, hooks=[manter_fluxo]), ], "PostToolUse": [HookMatcher(matcher="^mcp__taskflow__", hooks=[auditar])], }, max_turns=12, max_budget_usd=0.50,) async def main(): try: async for mensagem in query(prompt=pedido(), options=OPCOES): if isinstance(mensagem, ResultMessage): if mensagem.subtype == "success": print(f"\n{mensagem.result}") else: print(f"\nParou: {mensagem.subtype}") if mensagem.total_cost_usd is not None: print(f"Custo estimado: US$ {mensagem.total_cost_usd:.4f}") except Exception as erro: print(f"A sessão terminou com erro: {erro}") print(f"Auditoria em: {LOG.name}") if __name__ == "__main__": asyncio.run(main())

Resultado esperado (ilustrativo): listar e adicionar rodam sem perguntar; aparece [permissão] mcp__taskflow__concluir_tarefa {'numero': 1} esperando o seu s; a remoção é negada com o motivo da política e o Claude explica isso na resposta final. O auditoria.log tem uma linha por ferramenta que rodou (a remoção negada não aparece).

#### Erros comuns

##### Checar só no callback

Se a ferramenta está em allowed_tools, o can_use_tool nunca é chamado para ela. Use um hook PreToolUse.

##### default sem callback

Tudo que precisa de aprovação é negado, e o agente "não faz nada". Ou pré-aprove, ou passe o can_use_tool.

##### Matcher com caminho

matcher casa com o nome da ferramenta. Para filtrar por arquivo, olhe tool_input["file_path"] dentro do hook.

##### bypassPermissions por comodidade

Ele ignora allowed_tools e aprova o resto. Fora de ambiente isolado, é risco real.

##### Consigo fazer?

#### Para ir além

- Configure permissions (em inglês): a ordem completa de avaliação e os detalhes de cada modo.

- Handle approvals and user input: o can_use_tool e as perguntas do AskUserQuestion.

- Hooks no SDK: alterar a entrada com updatedInput, hooks assíncronos e on_failure="block".

- Próxima aula: subagentes, custo e o projeto final, o agente TaskFlow.

## Aula 10.4: Subagentes, custo e o agente TaskFlow

### Resumo do vídeo da aula

Última aula do curso! Você junta tudo num agente TaskFlow que conversa no terminal, chama um subagente revisor e respeita um orçamento. No SDK, subagentes são definidos no código, com AgentDefinition: descrição, prompt, ferramentas e modelo. O Claude os chama pela ferramenta Agent. Cada subagente trabalha num contexto próprio e devolve só o resumo. Mas o gasto dele entra no total da consulta. A ResultMessage traz total sublinhado cost sublinhado U S D, uma estimativa calculada no seu computador. A cobrança de verdade aparece no console da sua conta. Para não ter surpresa: um teto de gasto com max budget, um limite de turnos contra loops, e um modelo menor, como o haiku, para tarefas simples. Parabéns! Você foi do primeiro comando no terminal até o seu próprio agente. Agora é praticar, sempre com dados fictícios e de olho no custo.

### Conteúdo da aula

Objetivo: definir um subagente em código, acompanhar e limitar o custo do agente e montar o projeto final: um agente TaskFlow que conversa no terminal, usa as suas ferramentas, respeita a sua política e chama um revisor.

#### Por que importa

Um agente de verdade junta várias peças: conversa contínua, ferramentas do domínio, regras de segurança e, às vezes, ajudantes especializados. E roda com dinheiro de verdade. Nesta aula você junta as aulas 1 a 3 e aprende a enxergar e travar o custo antes que ele vire surpresa.

Antes de rodar O projeto final faz várias chamadas à API por mensagem (e o subagente faz as dele). Use a chave da sua conta pessoal de estudo, mantenha o orçamento baixo e acompanhe o consumo no console da sua conta. Em projeto da empresa: só com aval da segurança da informação e da área responsável.

#### Conceito: o subagente dentro do SDK

#### Subagentes, custo e limites

##### Subagente em código: AgentDefinition

No Módulo 7 o subagente era um arquivo em .claude/agents/. No SDK, a doc recomenda defini-lo no código, na opção agents. O Claude o chama pela ferramenta Agent, que precisa estar disponível (e, para não perguntar, em allowed_tools).

agente_taskflow.py (trecho) from claude_agent_sdk import AgentDefinition, ClaudeAgentOptions REVISOR = AgentDefinition( description="Revisa o código Python do TaskFlow. Use quando o usuário pedir revisão do código.", prompt="Você revisa o TaskFlow... Não edite nada.", tools=["Read", "Grep", "Glob"], # somente leitura model="haiku", # alias de um modelo menor) opcoes = ClaudeAgentOptions( agents={"revisor-taskflow": REVISOR}, allowed_tools=["Read", "Glob", "Grep", "Agent"],)

| Campo | Obrigatório? | Para quê

| description | sim | Quando usar. O Claude decide a delegação por ela.

| prompt | sim | As instruções (o system prompt) do subagente.

| tools | não | Ferramentas permitidas. Se omitir, herda as disponíveis para subagentes.

| model | não | Alias ("haiku", "sonnet", "opus", "fable", "inherit") ou ID completo.

Há outros campos (maxTurns, effort, permissionMode…); no Python, os nomes de várias palavras ficam em camelCase, como na doc. Para saber se houve delegação, procure um ToolUseBlock com name "Agent" (versões antigas usavam "Task").

O que o subagente recebe Só o pedido que o Claude escreve na chamada da ferramenta Agent, as próprias instruções e as ferramentas. Não recebe o histórico da conversa. E devolve só o relatório final: o contexto do agente principal cresce pouco.

##### Custo: onde ver e o que significa

| Campo da ResultMessage | O que conta

| total_cost_usd | Custo estimado da chamada, com os subagentes.

| model_usage | Tokens e custo por modelo, com os subagentes.

| usage | Tokens só do loop principal (sem os subagentes).

Estimativa não é fatura O total_cost_usd é calculado no seu computador, com uma tabela de preços embutida no SDK. Pode divergir da cobrança real (mudança de preço, modelo novo). A doc é clara: use para acompanhar e orçar, nunca para cobrar alguém ou tomar decisão financeira. O valor oficial fica no console da sua conta.

Com o ClaudeSDKClient (entrada em fluxo), cada troca gera uma ResultMessage, e o total_cost_usd dela é o acumulado da conversa: leia o último, não some todos.

##### Travas de custo

| Trava | Como

| Teto de gasto | max_budget_usd. Conta os subagentes. Ao bater: error_max_budget_usd. A resposta que cruza o teto ainda termina, então deixe folga.

| Limite de turnos | max_turns, contra loops longos.

| Modelo menor | model="haiku" no subagente (ou no agente) para tarefas simples.

| Menos raciocínio | effort="low" para tarefas de busca e listagem.

| Profundidade e paralelismo | Pela opção env: CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH (padrão 3) e CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS (padrão 20).

##### Retomar depois

Toda ResultMessage traz o session_id. Guardando-o, uma nova query() com ClaudeAgentOptions(resume=session_id) continua a mesma conversa, com o contexto anterior.

#### Exercício real: o agente TaskFlow

Na pasta de treino, com agente_ferramentas.py (aula 2) e agente_permissoes.py (aula 3) na raiz. Este exercício gasta mais que os anteriores: cada mensagem é uma rodada do loop.

- Crie agente_taskflow.py reaproveitando o servidor, o can_use_tool e os hooks da aula 3.

- Defina o subagente revisor-taskflow com AgentDefinition: somente leitura e model="haiku".

- Use tools=["Read", "Glob", "Grep", "Agent"], cwd na pasta do script, max_turns=15 e max_budget_usd=1.00.

- Abra uma conversa com ClaudeSDKClient num laço: leia a mensagem do terminal, envie com query(), imprima as respostas de receive_response() e o custo acumulado. sair encerra.

- Registre um hook SubagentStop que imprime quando o revisor termina.

- Converse: "liste minhas tarefas", "adicione 'Preparar café da reunião de teste'", "revise o código do TaskFlow", "agora conclua a tarefa 1". Observe o custo acumulado a cada troca.

Ver o gabarito

Arquivo em projeto-taskflow/etapa-10/gabarito/agente_taskflow.py (precisa dos dois scripts anteriores na mesma pasta).

agente_taskflow.py import asyncio from pathlib import Path from claude_agent_sdk import ( AgentDefinition, AssistantMessage, ClaudeAgentOptions, ClaudeSDKClient, ResultMessage, TextBlock, ToolUseBlock,) from claude_agent_sdk.types import HookMatcher from agente_permissoes import SERVIDOR, auditar, bloquear_remocao, manter_fluxo, pode_usar PASTA = Path(__file__).parent REVISOR = AgentDefinition( description="Revisa o código Python do TaskFlow. Use quando o usuário pedir revisão do código.", prompt=( "Você revisa o TaskFlow (Python, só biblioteca padrão). Leia os arquivos .py e aponte, " "em até 5 itens: funções sem docstring, mensagens fora do português e riscos. Não edite nada." ), tools=["Read", "Grep", "Glob"], # somente leitura model="haiku", # alias: um modelo menor e mais barato para a revisão) async def subagente_terminou(input_data, tool_use_id, context): print(f"[subagente] terminou: {input_data['agent_id']}") return {} OPCOES = ClaudeAgentOptions( system_prompt=( "Você é o agente do TaskFlow. Gerencie tarefas com as ferramentas mcp__taskflow__ e, " "para revisar código, use o subagente revisor-taskflow. Responda em português do Brasil." ), cwd=str(PASTA), mcp_servers={"taskflow": SERVIDOR}, tools=["Read", "Glob", "Grep", "Agent"], # embutidas disponíveis (sem Bash, Write, Edit) agents={"revisor-taskflow": REVISOR}, permission_mode="default", allowed_tools=[ "Read", "Glob", "Grep", "Agent", "mcp__taskflow__listar_tarefas", "mcp__taskflow__adicionar_tarefa", ], can_use_tool=pode_usar, # concluir: pergunta no terminal hooks={ "PreToolUse": [ HookMatcher(matcher="mcp__taskflow__remover_tarefa", hooks=[bloquear_remocao]), HookMatcher(matcher=None, hooks=[manter_fluxo]), ], "PostToolUse": [HookMatcher(matcher="^mcp__taskflow__", hooks=[auditar])], "SubagentStop": [HookMatcher(hooks=[subagente_terminou])], }, max_turns=15, # por mensagem max_budget_usd=1.00, # para a conversa toda (estimado)) async def main(): print("Agente TaskFlow. Exemplos: 'liste minhas tarefas', 'revise o código'. Digite sair.") async with ClaudeSDKClient(options=OPCOES) as cliente: while True: texto = (await asyncio.to_thread(input, "\nvocê> ")).strip() if texto.lower() in ("sair", "exit"): break if not texto: continue await cliente.query(texto) async for mensagem in cliente.receive_response(): if isinstance(mensagem, AssistantMessage): for bloco in mensagem.content: if isinstance(bloco, TextBlock): print(f"agente> {bloco.text}") elif isinstance(bloco, ToolUseBlock): print(f"[ferramenta] {bloco.name}") elif isinstance(mensagem, ResultMessage): if mensagem.subtype != "success": print(f"[parou: {mensagem.subtype}]") if mensagem.total_cost_usd is not None: print(f"[custo acumulado estimado: US$ {mensagem.total_cost_usd:.4f}]") if __name__ == "__main__": asyncio.run(main())

Por que asyncio.to_thread(input, ...)? O input() trava o programa até você digitar. Rodá-lo numa thread evita travar o laço assíncrono do SDK.

Resultado esperado (ilustrativo): listar e adicionar rodam direto; "revise o código" mostra [ferramenta] Agent, depois [subagente] terminou: … e um resumo curto; concluir pede o seu s; o custo acumulado cresce a cada troca e o subagente entra na conta.

#### Erros comuns

##### Esquecer a ferramenta Agent

Se tools não inclui Agent, o Claude não consegue delegar ao subagente.

##### Somar o custo de cada troca

Numa conversa com o cliente, o total_cost_usd já é acumulado. Somar conta duas vezes.

##### Confiar em usage para o total

usage não inclui os subagentes. Use total_cost_usd ou model_usage.

##### Teto sem folga

A resposta que cruza o max_budget_usd ainda termina. O gasto pode passar um pouco do teto.

##### Consigo fazer?

#### Para ir além

- Subagents in the SDK (em inglês): retomar subagentes e limites de profundidade e paralelismo.

- Track cost and usage: custo por etapa, por modelo e em conversas longas.

- Work with sessions e Hosting the Agent SDK: retomar conversas e levar o agente para um servidor ou contêiner.

- Securely deploying AI agents: leitura obrigatória antes de colocar um agente em produção (e, na empresa, com as áreas responsáveis).

Fim do curso Você foi do terminal (Módulo 0) ao seu próprio agente (Módulo 10). Revise o módulo nos slides e, quando voltar ao Claude Code, lembre: a ferramenta muda rápido, então confira a doc oficial e o /help sempre que algo parecer diferente.
