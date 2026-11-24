# Roteiro de narração dos vídeos

Um MP3 por cena, nesta pasta, com o nome exato da coluna "Arquivo". O vídeo toca o MP3 da cena; se um arquivo faltar, aquela cena usa a voz do sistema.

## Como (re)gerar os áudios
Os áudios são gerados com vozes neurais da Microsoft pelo pacote `edge-tts` (o texto das falas é enviado ao serviço de voz da Microsoft; use só conteúdo do curso, sem dados pessoais):

```powershell
python -m pip install --user edge-tts
cd audio
python gerar_audios.py                                   # gera os que faltam (voz padrão: Francisca)
python gerar_audios.py --voz pt-BR-AntonioNeural --refazer   # trocar a voz de todos
```

Vozes pt-BR: `pt-BR-FranciscaNeural`, `pt-BR-AntonioNeural`, `pt-BR-ThalitaMultilingualNeural`. Compare em `amostras/`.
Para mudar uma fala: edite o texto abaixo (e o `fala` da cena na aula, que vira a legenda), apague o MP3 e rode o script de novo.

## Aula 0.3: O loop agêntico (7 cenas)

| Arquivo | Texto para narrar |
|---|---|
| `m0a3-01.mp3` | Em pouco mais de um minuto, você vai entender como o Claude Code trabalha por dentro. |
| `m0a3-02.mp3` | Num chat comum, você pergunta, copia a resposta, testa e cola o erro de volta. Num agente, você dá o objetivo e ele age sozinho: lê, edita, roda e confere. |
| `m0a3-03.mp3` | Tudo começa com um objetivo claro. Por exemplo: o teste de prazo está falhando, corrija. |
| `m0a3-04.mp3` | Aí começa o loop. Primeiro, ele reúne contexto. Depois, age. Em seguida, verifica o resultado. Se não deu certo, volta ao começo com a informação nova. |
| `m0a3-05.mp3` | Na prática, fica assim: ele roda os testes, lê o código, edita, roda os testes de novo, e só então diz que terminou. |
| `m0a3-06.mp3` | E você continua no controle: aperta Esc para interromper, aprova as permissões e exige verificação antes de aceitar. |
| `m0a3-07.mp3` | Resumindo: o seu papel muda. Você especifica, supervisiona e revisa. Agora siga para o conceito passo a passo. |

## Aula 2.1: A janela de contexto (6 cenas)

| Arquivo | Texto para narrar |
|---|---|
| `m2a1-01.mp3` | Este é o conceito que mais influencia a qualidade das respostas do Claude: a janela de contexto. |
| `m2a1-02.mp3` | O contexto é tudo o que o modelo enxerga ao mesmo tempo: as instruções do sistema, o seu Claude ponto MD, a conversa, os arquivos que ele leu e a saída dos comandos que rodou. |
| `m2a1-03.mp3` | E cada coisa ocupa espaço. Ler um arquivo grande ou um log enorme pode encher a janela muito mais rápido do que a própria conversa. |
| `m2a1-04.mp3` | Quando a janela fica cheia de coisa velha, informações antigas competem com as novas, e as respostas pioram. Perto do limite, o Claude Code compacta a conversa automaticamente. |
| `m2a1-05.mp3` | Você tem três ferramentas. Barra context mostra o uso. Barra compact resume a conversa e continua a mesma tarefa. Barra clear começa uma conversa nova. |
| `m2a1-06.mp3` | Guarde esta regra: uma tarefa, uma conversa. Mudou de assunto, use barra clear. |

## Aula 4.1: Modos de permissão (6 cenas)

| Arquivo | Texto para narrar |
|---|---|
| `m4a1-01.mp3` | Quanto o Claude pode fazer sem perguntar? Quem decide isso é o modo de permissão. |
| `m4a1-02.mp3` | De um lado, mais controle: você aprova cada ação. Do outro, mais autonomia: o Claude trabalha sem interrupções. Cada modo é um ponto nesse caminho. |
| `m4a1-03.mp3` | Manual pergunta antes de editar arquivos e rodar comandos. Accept edits aceita as edições de arquivo sozinho. Plan só investiga e propõe um plano, sem mudar nada. |
| `m4a1-04.mp3` | Auto usa um classificador que libera o que é seguro e bloqueia o arriscado. E bypass não pergunta nada: só serve para ambientes isolados e descartáveis. |
| `m4a1-05.mp3` | Para trocar de modo durante a sessão, aperte Shift Tab. O modo atual aparece perto do campo de digitação. |
| `m4a1-06.mp3` | Como escolher? Aprendendo, use Manual. Mudança grande, comece pelo plan. No dia a dia, auto. E lembre: regras de bloqueio continuam valendo em qualquer modo. |
