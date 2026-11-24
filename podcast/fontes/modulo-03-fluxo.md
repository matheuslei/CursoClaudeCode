# Módulo 3: Fluxo profissional

Curso "Claude Code: do zero ao avançado" (estudo pessoal, em português do Brasil). Nível: Intermediário. Tema: Plan mode, Spec-Driven Development, TDD.

Projeto de treino usado em todo o curso: TaskFlow, um gerenciador de tarefas de linha de comando em Python, só com a biblioteca padrão. Dados de exemplo são fictícios.

Aulas: 3.1 Explorar → Planejar → Codar → Commitar; 3.2 Plan mode; 3.3 Spec-Driven Development; 3.4 TDD com o Claude; 3.5 Verificação e revisão.

## Aula 3.1: Explorar → Planejar → Codar → Commitar

### Resumo do vídeo da aula

Pedir tudo de uma vez e torcer funciona às vezes. Este vídeo mostra um fluxo que funciona em qualquer tarefa que não seja trivial. Quando você pede: adicione prazos às tarefas, de uma vez, o Claude escolhe sozinho onde mexer, o formato da data e o que conta como pronto. Se errar, você descobre tarde. A saída é separar o trabalho em quatro etapas, com uma pausa entre elas, para você corrigir o rumo enquanto ainda é barato. Na prática: explorando, você só pergunta e avisa que não é para mudar nada. Planejando, usa o barra plan. Codando, pede para rodar os testes. E antes do commit, revisa o diff. Um ponto essencial: dê ao Claude algo que responda passou ou falhou, como os testes. O Claude para quando o trabalho parece pronto. Com testes, ele fecha o ciclo sozinho. Corrigiu a mesma coisa duas vezes e continua errado? Não insista: use barra clear e faça um pedido novo, mais completo, com o que você aprendeu. Mudança pequena e óbvia? Peça direto. Tarefa que não cabe numa frase? Use as quatro etapas.

### Conteúdo da aula

Objetivo: trocar o "pede e torce" por um fluxo de 4 etapas que funciona em qualquer tarefa que não seja trivial.

#### Por que importa

Quando você pede "adicione prazos às tarefas" de uma vez, o Claude escolhe sozinho onde mexer, qual formato de data usar e o que conta como "pronto". Às vezes acerta. Quando erra, você descobre tarde, depois de várias edições.

Separar o trabalho em etapas com pausa entre elas deixa você corrigir o rumo enquanto ainda é barato: antes de qualquer linha de código ser escrita.

Quando pular etapas Mudança pequena e óbvia (corrigir um texto, renomear uma variável)? Peça direto. O fluxo completo vale para tarefas em que você não consegue descrever o resultado em uma frase.

#### Conceito: as quatro etapas

#### Pedidos-modelo para cada etapa

| Etapa | Exemplo de pedido | O que você faz

| Explorar | me dê uma visão geral deste projeto. ainda não mude nada como os dados são salvos e onde os números das tarefas são validados? | Lê as respostas e aprende o código junto

| Planejar | /plan quero que tarefas tenham data de vencimento. proponha um plano | Lê o plano, questiona, ajusta e só então aprova

| Codar | implemente o plano. rode python -m unittest no fim e mostre a saída | Acompanha o primeiro minuto e aperta Esc se desviar

| Commitar |! git diff e depois faça commit com uma mensagem descritiva | Revisa o diff antes de salvar

"Ainda não mude nada" Na exploração, deixe claro que você só quer entender. Melhor ainda: use o plan mode (próxima aula), em que o Claude nem consegue editar arquivos.

##### Dar uma forma de verificar

A documentação oficial insiste num ponto: o Claude para quando o trabalho parece pronto. Se ele tiver algo para rodar que responda "passou" ou "falhou" (testes, o próprio programa), ele fecha o ciclo sozinho. Por isso o TaskFlow ganhou testes nesta etapa, e o CLAUDE.md já diz como rodá-los.

##### Quando a correção não pega

Corrigiu a mesma coisa duas vezes e continua errado? A recomendação oficial é /clear e um pedido novo, mais completo, incorporando o que você aprendeu. Uma terceira correção só soma tentativas falhas ao contexto.

#### Exercício real

Use o TaskFlow da etapa-03 (ou o seu, se já tiver testes). Copie para a pasta de estudos, faça git init e o commit inicial, como na aula 1.2.

- Explorar: pergunte como os testes estão organizados e o que o CLAUDE.md pede

- Planejar: peça um plano para o comando editar <numero> "novo título", ainda sem implementar

- Questione o plano pelo menos uma vez (ex.: "e se o título vier vazio?")

- Codar: peça a implementação com critério de pronto: testes passando

- Commitar:! git diff, revise, e peça o commit

Ver gabarito

Um bom pedido de plano:

quero o comando editar <numero> "novo título" no tarefas.py. não implemente ainda: proponha um plano com os arquivos que vai mudar, os casos de erro (número inválido, título vazio) e os testes que vai adicionar.

Resultado esperado: uma função editar(numero, titulo) que reaproveita _indice_valido, rejeita título vazio, o subcomando no argparse, e 2 ou 3 testes novos em tests/test_tarefas.py. python -m unittest deve terminar em OK.

#### Erros comuns

##### Pular a exploração

O plano sai genérico porque nem você nem o Claude conhecem o código.

##### Aprovar plano sem ler

O plano é o ponto mais barato para corrigir. Leia como se fosse revisar código.

##### Codar sem critério de pronto

Sem um teste ou comando para rodar, "pronto" vira opinião.

##### Terceira correção seguida

Duas tentativas falharam? /clear e um pedido melhor.

##### Consigo fazer?

#### Para ir além

- Best practices: "Give Claude a check to run" e "Steer the session"

- Common workflows: receitas de exploração, bugs, refatoração e testes

- Claude Code 101 (Anthropic Academy, em inglês): lição sobre o fluxo explorar → planejar → codar → commitar.

## Aula 3.2: Plan mode

### Resumo do vídeo da aula

Plan mode: o jeito de garantir que nenhuma linha muda antes de você concordar com o caminho. Pedir: ainda não mude nada, funciona, mas depende de o Claude respeitar. No plan mode, as edições ficam bloqueadas até você aprovar o plano. Três jeitos de entrar: Shift Tab até aparecer plan mode on, o comando barra plan com a tarefa, ou abrir o Claude já com o modo plan. Em plan mode, o Claude pode ler arquivos, buscar no código, investigar e escrever o plano. O que ele não pode é editar seus arquivos antes da aprovação. Com o plano pronto, você escolhe: aprovar e deixar executar, aprovar revisando cada edição, que é o recomendado enquanto aprende, ou continuar planejando. Na tela de aprovação, Control G abre o plano no seu editor para ajustar. Cuidado: ali, Shift Tab aprova o plano. Para sair sem aprovar, aperte Esc primeiro. Mudança grande ou código que você não conhece? Comece pelo plan mode.

### Conteúdo da aula

Objetivo: entrar no plan mode, revisar e editar o plano proposto e escolher como aprovar, para que nenhuma linha seja alterada antes de você concordar com o caminho.

#### Por que importa

Na aula anterior você pediu "ainda não mude nada". Funciona, mas depende de o Claude respeitar o pedido. O plan mode é a garantia: nele o Claude pode ler arquivos e investigar, mas as edições ficam bloqueadas até você aprovar o plano.

Bom para Mudanças que tocam vários arquivos, código que você não conhece, decisões com mais de um caminho razoável, e sempre que você quiser ver o raciocínio antes da execução.

#### Conceito: o ciclo do plan mode

#### Como usar

##### Três jeitos de entrar

| Jeito | Como | Quando

| Atalho | Shift+Tab até a barra de status mostrar ⏸ plan mode on | No meio da sessão

| Comando | /plan descreva a tarefa | Um pedido específico em modo plano

| Ao abrir | claude --permission-mode plan | Sessão inteira começando por planejamento

No ciclo do Shift+Tab, o plan mode vem depois do acceptEdits. Os modos disponíveis podem variar conforme seu plano e configuração (Módulo 4).

##### O que o Claude pode fazer em plan mode

- Pode: ler arquivos, buscar no código, rodar comandos para investigar (dependendo da configuração, alguns comandos pedem aprovação ou passam por verificação automática) e escrever o plano.

- Não pode: editar seus arquivos de código antes da aprovação.

##### Quando o plano fica pronto

O Claude apresenta o plano e oferece opções como:

| Yes, and use auto mode (ou "Yes, auto-accept edits" se o auto mode não estiver disponível) | Aprova e deixa o Claude executar sem pedir cada edição

| Yes, manually approve edits | Aprova, mas você revisa cada edição. Recomendado enquanto aprende.

| No, keep planning | Continua em plan mode para você dizer o que mudar

Editar o plano você mesmo Na tela de aprovação, Ctrl+G abre o plano no seu editor de texto padrão. Você ajusta, salva, fecha, e o Claude segue a versão editada.

Cuidado com o Shift+Tab na tela de aprovação Ali, Shift+Tab aprova o plano. Para sair sem aprovar, aperte Esc primeiro e depois Shift+Tab.

Quer que um projeto sempre comece em plan mode? Dá para configurar defaultMode como plan nas configurações do projeto. Veremos settings no Módulo 5.

#### Exercício real

No TaskFlow:

- Aperte Shift+Tab até ver ⏸ plan mode on

- Peça: quero que listar aceite --pendentes para mostrar só as tarefas não feitas. proponha um plano

- Escolha No, keep planning e peça uma mudança (ex.: "adicione também --feitas")

- Na nova versão, use Ctrl+G para abrir o plano no editor e acrescente uma linha: "adicionar testes para as duas opções"

- Aprove com Yes, manually approve edits, revise cada edição e faça commit

Ver gabarito

Resultado esperado: o subcomando listar ganha duas opções no argparse (por exemplo, um grupo mutuamente exclusivo com --pendentes e --feitas), o filtro aplicado em listar() e testes novos. Os números exibidos continuam sendo os números reais das tarefas, para concluir e remover funcionarem com eles.

Se o plano do Claude renumerava a lista filtrada, esse era o tipo de problema que valia pegar no plano, antes do código.

#### Erros comuns

##### Aprovar no automático

O plan mode só ajuda se você ler o plano. Procure arquivos inesperados e casos de erro ausentes.

##### Shift+Tab na aprovação

Ali ele aprova. Para sair sem aprovar: Esc antes.

##### Plano vago

Se o plano não diz quais arquivos e testes, peça: "detalhe arquivos, casos de erro e testes".

##### Tudo em plan mode

Para mudanças triviais, é burocracia. Use quando houver decisão a tomar.

##### Consigo fazer?

#### Para ir além

- Permission modes: seção de plan mode e aprovação

- Common workflows: "Plan before editing"

## Aula 3.3: Spec-Driven Development

### Resumo do vídeo da aula

Spec Driven Development: escrever o que você quer antes de pedir o código. É o método que deu origem a este curso. O Claude não lê a sua mente. Quando falta informação, ele preenche a lacuna com a suposição mais provável. E ela nem sempre é a sua. Uma boa spec tem cinco seções curtas: objetivo, requisitos numerados, o que fica fora de escopo, critérios de aceite e casos de borda. Uma página, não um tratado. Os critérios de aceite são verificáveis, no formato: dado, quando, então. Na próxima aula, cada um deles vira um teste. Você não precisa ter tudo resolvido. Peça para o Claude te entrevistar: ele faz perguntas, geralmente de múltipla escolha, até conseguir escrever a spec. Com a spec escrita, comece numa sessão limpa e peça: implemente a spec. No fim, revise contra o mesmo documento, focando em correção e ignorando estilo. A spec é o contrato: o Claude implementa, testa e é revisado contra o mesmo documento.

### Conteúdo da aula

Objetivo: escrever uma especificação curta antes de pedir código, com o Claude te entrevistando, e usar essa spec como contrato para implementar e revisar.

#### Por que importa

O Claude não lê a sua mente. Quando falta informação, ele preenche a lacuna com a suposição mais provável, e a suposição mais provável nem sempre é a sua. Uma spec (especificação) põe no papel o que só você sabe: o objetivo, o que entra, o que fica de fora e como saber que ficou pronto.

Este curso nasceu assim: antes de qualquer aula existir, houve um SDD que você aprovou. É o mesmo método, em escala menor, para cada feature.

##### Sem spec

"Adicione prazo às tarefas" → o Claude escolhe formato de data, o que é "atrasada", se a data é obrigatória… e você descobre no fim.

##### Com spec

Decisões tomadas antes, por escrito. O Claude implementa, testa e revisa contra o mesmo documento.

#### Conceito: o ciclo da spec

#### Anatomia de uma boa spec

Cinco seções bastam. Uma página, não um tratado.

specs/modelo.md # Spec: <nome da feature> ## Objetivo Uma ou duas frases: o problema e para quem. ## Requisitos - R1 ... - R2 ... ## Fora de escopo - ... ## Critérios de aceite - [ ] Dado ..., quando ..., então ... ## Casos de borda - ...

| Objetivo | O porquê. Ajuda o Claude a decidir os detalhes que você não previu.

| Requisitos | O que precisa existir. Numerados, para citar depois ("R2 não foi implementado").

| Fora de escopo | O que não fazer. Evita que o Claude "capriche" onde você não pediu.

| Critérios de aceite | Verificáveis, no formato "dado / quando / então". Viram testes na próxima aula.

| Casos de borda | Entradas estranhas: vazio, inválido, limite.

##### Deixe o Claude te entrevistar

Você não precisa ter tudo resolvido antes. A documentação oficial recomenda pedir que o Claude te entreviste:

quero que as tarefas tenham data de vencimento, mas ainda não pensei nos detalhes. me entreviste até conseguir escrever a spec, e então escreva em specs/prazo.md

O Claude volta com perguntas (geralmente de múltipla escolha) sobre o que ainda está indefinido, até as respostas formarem uma spec.

Comece a implementação numa sessão nova Com a spec escrita, faça /clear (ou abra outra sessão) e peça: implemente specs/prazo.md. A implementação começa com contexto limpo e uma definição de pronto por escrito. A spec também é o que você vai usar na revisão.

##### Revisar contra a spec

No fim, peça uma revisão focada na spec, não em estilo:

use um subagente para revisar o diff contra specs/prazo.md: confira se cada requisito foi implementado e se os casos de borda têm testes. reporte lacunas de correção e ignore estilo

O "ignore estilo" importa: um revisor que precisa encontrar problemas sempre encontra algum. Sem foco, você acaba cheio de abstrações desnecessárias. Subagentes são o tema do Módulo 7; aqui basta pedir.

#### Exercício real

No TaskFlow (etapa-03 ou o seu):

- Peça a entrevista: quero data de vencimento nas tarefas e um comando atrasadas. me entreviste até conseguir escrever a spec, depois escreva em specs/prazo.md

- Responda às perguntas. Não sabe? Diga "sugira a opção mais simples"

- Leia specs/prazo.md. Edite à mão o que não gostou. A spec é sua, não do Claude

- Faça commit só da spec:! git add specs/prazo.md e! git commit -m "Spec do prazo"

- Pare aqui. A implementação será na próxima aula, com TDD

Ver uma spec de exemplo

# Spec: prazo das tarefas ## Objetivo Saber quais tarefas estão vencidas, para priorizar o que fazer primeiro. ## Requisitos - R1 adicionar aceita --prazo AAAA-MM-DD (opcional) - R2 listar mostra o prazo ao lado do título, quando existir - R3 novo comando atrasadas lista tarefas não feitas com prazo anterior a hoje - R4 tarefas antigas, sem campo prazo, continuam funcionando ## Fora de escopo - Horário, fuso, lembretes, recorrência - Editar o prazo de uma tarefa existente ## Critérios de aceite - [ ] Dado prazo 2026-01-10 e hoje 2026-01-11, quando rodo atrasadas, então a tarefa aparece - [ ] Dado prazo igual a hoje, então NÃO está atrasada - [ ] Dada tarefa feita com prazo vencido, então NÃO aparece em atrasadas - [ ] Dado --prazo 2026-02-31, então erro "Data inválida" e nada é salvo ## Casos de borda - Lista vazia: atrasadas mostra "Nenhuma tarefa atrasada." - Arquivo antigo sem "prazo": tratar como sem prazo

Repare em R4 e no último caso de borda: sem eles, a feature quebraria o tarefas.json que você já tem. É o tipo de detalhe que a entrevista ajuda a lembrar.

#### Erros comuns

##### Spec gigante

Se passa de uma página, divida em features menores.

##### Critério não verificável

"Deve ser fácil de usar" não vira teste. "Dado X, quando Y, então Z" vira.

##### Aceitar a spec do Claude sem ler

Ele propõe; você decide. Edite o que não for o que você quer.

##### Esquecer o fora de escopo

Sem ele, o Claude pode implementar lembretes, fusos… que ninguém pediu.

##### Consigo fazer?

#### Para ir além

- Best practices: "Brainstorm with Claude first" e "Review against your spec"

- O SDD.md que planejou este curso é um exemplo real de spec em escala de projeto. Peça ao tutor: me mostre como o SDD do curso foi estruturado

## Aula 3.4: TDD com o Claude

### Resumo do vídeo da aula

TDD com o Claude: o teste vem antes do código e vira a verificação objetiva de que o trabalho terminou. O ciclo tem três cores. Vermelho: o teste falha. Verde: o código faz passar. Refatorar: melhorar sem quebrar. Os testes saem direto da spec: cada critério de aceite, dado, quando, então, vira um teste. Com I A, existe um risco específico: o caminho mais curto para tudo verde é mudar o teste, não o código. Por isso os testes são commitados antes, e o Claude não pode alterá-los. O roteiro: peça só os testes e confirme que falham pelo motivo certo. Revise e faça commit. Peça a implementação sem alterar os testes. E confira com git diff que eles ficaram intactos. Teste que depende da data real passa hoje e falha amanhã. Peça que as funções recebam a data de hoje como parâmetro, para o teste controlar o tempo. Resumindo: teste primeiro, travado. Depois o código.

### Conteúdo da aula

Objetivo: transformar os critérios de aceite da spec em testes que falham, e só então pedir a implementação, sem deixar o Claude "ajeitar" os testes para passar.

#### Por que importa

TDD (Test-Driven Development) é escrever o teste antes do código. Com um agente de IA, ele ganha um papel extra: o teste vira a verificação objetiva que o Claude roda sozinho para saber se terminou, sem depender de "parece certo".

Os testes saem direto da spec da aula anterior: cada critério de aceite "dado / quando / então" vira um teste.

O risco específico com IA Se o teste falha, o caminho mais curto para "tudo verde" é mudar o teste, não o código. Por isso a regra desta aula: os testes são commitados antes, e o Claude não pode alterá-los.

#### Conceito: vermelho, verde, refatorar

#### O roteiro com o Claude

##### . Pedir só os testes

leia specs/prazo.md e escreva testes em tests/test_prazo.py, um para cada critério de aceite. use unittest. NÃO implemente nada ainda. rode os testes e confirme que falham pelo motivo certo

"Pelo motivo certo" importa: o teste deve falhar porque a função ainda não existe ou devolve o resultado errado, não por um erro de digitação no próprio teste.

##### . Revisar e commitar os testes

Leia os testes. Eles correspondem aos critérios? Falta algum caso de borda? Ajuste e faça commit:

! git add tests/test_prazo.py! git commit -m "Testes do prazo (vermelho)"

##### . Pedir a implementação, com os testes travados

implemente specs/prazo.md até python -m unittest passar. não altere nenhum arquivo em tests/. se achar que um teste está errado, pare e me pergunte

##### . Conferir que os testes não mudaram

! git diff --stat HEAD -- tests/

Sem saída significa que os testes ficaram intactos. Se aparecer algo, leia o que mudou antes de aceitar.

Deixe a regra fixa no CLAUDE.md O CLAUDE.md da etapa-03 já traz: "Não altere testes existentes para fazê-los passar. Se um teste parecer errado, pergunte." Assim você não precisa repetir em todo pedido. No Módulo 4 você verá como bloquear edições em tests/ com regras de permissão, em vez de só pedir.

##### Datas em testes: injete o "hoje"

Um teste que depende da data real passa hoje e falha amanhã. Peça que as funções recebam a data de referência como parâmetro (ex.: atrasadas(hoje=None)), usando a data real só quando nenhuma for passada. Assim o teste controla o tempo.

#### Exercício real

Continue do specs/prazo.md da aula anterior:

- Peça só os testes (pedido 1 acima) e confirme que falham com! python -m unittest

- Revise os testes contra os critérios de aceite e faça commit deles

- /clear e peça a implementação (pedido 3 acima)

- Confirme que tests/ não mudou e que tudo passa

- Teste à mão:! python tarefas.py adicionar "Pagar conta fictícia" --prazo 2026-01-10 e! python tarefas.py atrasadas

- Commit da implementação

Ver gabarito (testes de exemplo)

tests/test_prazo.py (trecho) import datetime as dt import tarefas from tests.test_tarefas import BaseTarefas class TestAtrasadas(BaseTarefas): HOJE = dt.date(2026, 1, 11) def test_prazo_vencido_aparece(self): self.rodar(tarefas.adicionar, "A", "2026-01-10") self.assertIn("A", self.rodar(tarefas.atrasadas, self.HOJE)) def test_prazo_hoje_nao_esta_atrasado(self): self.rodar(tarefas.adicionar, "A", "2026-01-11") self.assertNotIn("A", self.rodar(tarefas.atrasadas, self.HOJE)) def test_feita_nao_aparece(self): self.rodar(tarefas.adicionar, "A", "2026-01-10") self.rodar(tarefas.concluir, 1) self.assertNotIn("A", self.rodar(tarefas.atrasadas, self.HOJE)) def test_data_invalida_nao_salva(self): saida = self.rodar(tarefas.adicionar, "A", "2026-02-31") self.assertIn("Data inválida", saida) self.assertEqual(tarefas.carregar(), [])

Na implementação, adicionar(titulo, prazo=None) valida a data com datetime.date.fromisoformat e grava "prazo" só quando existir; atrasadas(hoje=None) usa t.get("prazo") para aceitar tarefas antigas. Suas assinaturas podem ser diferentes: o que vale é cada critério da spec ter um teste e todos passarem.

#### Erros comuns

##### Testes e código juntos

Pedidos no mesmo passo: os testes tendem a refletir o código escrito, não a spec.

##### Não ver o vermelho

Teste que nunca falhou pode não testar nada. Confirme a falha antes.

##### Teste alterado em silêncio

Commit dos testes antes + git diff -- tests/ depois.

##### Depender da data de hoje

Injete a data de referência; o teste deve passar em qualquer dia.

##### Consigo fazer?

#### Para ir além

- unittest: documentação do Python em português

- Best practices: "Give Claude a check to run"

- Common workflows: "Work with tests"

## Aula 3.5: Verificação e revisão

### Resumo do vídeo da aula

Verificação e revisão: como trocar o: está pronto, por evidência. Todos os testes passam, é uma frase. A saída do python traço m unittest é evidência. Essa diferença separa confiar de verificar. Revise o diff com método: primeiro, quais arquivos mudaram. Depois, linha a linha. E sempre pergunte: faz o que a spec pede? Só o que a spec pede? Quem escreveu o código tende a concordar com o próprio raciocínio. O barra code review é um segundo par de olhos: revisa as mudanças procurando bugs, sem ter visto a conversa. No terminal, a revisão roda em segundo plano e segue o seu Claude ponto MD. As correções do fix em segundo plano ficam fora do barra rewind: para desfazer, use o Git. Mais um motivo para commitar antes. Confiar é bom. Verificar é obrigatório.

### Conteúdo da aula

Objetivo: exigir evidência em vez de "está pronto", revisar o diff com método e usar o /code-review como um segundo par de olhos que não viu a conversa.

#### Por que importa

"Todos os testes passam" é uma frase. A saída do python -m unittest é evidência. A diferença parece pequena, mas é ela que separa confiar de verificar.

E quem escreveu o código tende a concordar com o próprio raciocínio. Uma revisão feita por alguém que não viu a conversa pega coisas que o autor não vê. No Claude Code, esse alguém é o /code-review.

#### Conceito: camadas de verificação

#### As ferramentas

##### Peça evidência, sempre

rode python -m unittest e o comando atrasadas com uma tarefa vencida, e me mostre as duas saídas

##### Revise o diff com um roteiro

|! git diff --stat | Quais arquivos mudaram? Algum inesperado?

|! git diff | Linha a linha. Leia os trechos de lógica, não só os nomes

| /diff | Visualizador do Claude Code para as mudanças da pasta de trabalho

Perguntas para fazer em todo diff: faz o que a spec pede? só o que a spec pede? os casos de borda estão tratados? há algo apagado sem motivo?

##### /code-review

Um comando que revisa as mudanças do seu branch procurando bugs de correção (e, conforme modelo e esforço, também oportunidades de simplificação). /review é um apelido dele.

| Uso | O que faz

| /code-review | Revisa os commits do branch ainda não enviados e as mudanças não commitadas

| /code-review low … max | Nível de esforço: low mostra só o que tem mais certeza (menos falsos positivos); níveis maiores ampliam a cobertura

| /code-review --fix | Revisa e também aplica as correções (as edições passam pelo seu modo de permissão)

| /code-review HEAD~3..HEAD | Revisa um intervalo de commits; também aceita branch, caminho ou número de PR

- No terminal, a revisão roda em segundo plano, num subagente com contexto próprio. Você continua trabalhando e os achados chegam na conversa quando ela termina.

- Ela segue o seu CLAUDE.md e consome o seu limite de uso como qualquer outra parte da sessão.

- Correções aplicadas pelo --fix em segundo plano ficam fora dos checkpoints do /rewind: para desfazer, use o Git. Mais um motivo para commitar antes.

Também existe /verify pede que o Claude rode o app e observe o resultado, pegando problemas que testes não pegam. E no Módulo 5 você verá como um hook pode impedir o Claude de encerrar o turno enquanto os testes falham.

Teaser do Módulo 7 Você pode criar o seu próprio subagente revisor, com instruções do seu time (por exemplo, revisar sempre contra a spec). Por enquanto, basta pedir: "use um subagente para revisar o diff contra specs/prazo.md".

#### Exercício real

Com a feature de prazo implementada (aula 3.4), antes do commit final ou logo após:

- Peça evidência: rode os testes e o comando atrasadas com uma tarefa vencida; mostre as saídas

- Revise! git diff --stat e! git diff com as 4 perguntas do bloco 3

- Rode /code-review e continue trabalhando enquanto ele roda

- Leia os achados. Para cada um, decida: corrigir, ignorar (diga por quê) ou anotar para depois

- Peça a revisão contra a spec: use um subagente para revisar o diff contra specs/prazo.md, ignore estilo

- Corrija o que fizer sentido, rode os testes e commite

Ver gabarito

Não há uma resposta única: os achados dependem do seu código. Achados comuns nesta feature:

- Comparação de datas com <= em vez de < (prazo de hoje aparecendo como atrasado)

- t["prazo"] em vez de t.get("prazo"), quebrando tarefas antigas sem o campo

- Data inválida salva antes de ser validada

- Tarefas feitas aparecendo em atrasadas

Repare que todos correspondem a itens da spec. Se a sua spec e os seus testes cobriam esses casos, a revisão provavelmente encontrou pouco, e esse é o objetivo.

#### Erros comuns

##### Aceitar "pronto" sem saída

Peça o comando que foi rodado e o resultado.

##### Corrigir todo achado

Revisores sempre encontram algo. Avalie se o achado afeta a correção.

##### Ler só o --stat

Saber quais arquivos mudaram não basta: leia a lógica.

##### --fix sem commit antes

As correções em segundo plano não entram no /rewind. Commite antes.

##### Consigo fazer?

#### Para ir além

- Review locally with /code-review

- Best practices: "Give Claude a check to run" e "Review against your spec"
