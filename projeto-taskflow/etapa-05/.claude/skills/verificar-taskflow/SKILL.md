---
description: Confere uma mudança no TaskFlow antes de dizer que terminou. Use sempre que terminar de alterar tarefas.py ou os testes, antes de responder que a tarefa está pronta.
---

Antes de dizer que terminou:

1. Rode `python -m unittest` e mostre a última linha da saída.
2. Rode o comando que você mudou com dados fictícios, por exemplo:
   `python tarefas.py adicionar "Tarefa de teste"` e `python tarefas.py listar`.
   Mostre a saída.
3. Releia o pedido do usuário e diga, item por item, onde cada um foi atendido.
4. Rode `git diff --stat` e confirme que só mudaram os arquivos esperados.

Se algo falhar, corrija e repita. Nunca diga "pronto" sem mostrar essas saídas.
