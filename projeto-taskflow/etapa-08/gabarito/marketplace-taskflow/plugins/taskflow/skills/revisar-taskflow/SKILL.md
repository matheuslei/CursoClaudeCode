---
description: Revisa as mudanças não commitadas do TaskFlow e aponta riscos. Use quando o usuário pedir revisão do diff ou uma mensagem de commit.
argument-hint: [foco opcional da revisão]
---

## Mudanças atuais

!`git diff HEAD`

## Instruções

Resuma as mudanças acima em 2 ou 3 tópicos. Depois liste riscos:
validação de número da tarefa, tratamento de tarefas.json inexistente,
mensagens de erro em português e testes que precisam ser atualizados.
Foco extra pedido pelo usuário: $ARGUMENTS
Termine sugerindo uma mensagem de commit em português.
Se o diff estiver vazio, diga que não há mudanças.
