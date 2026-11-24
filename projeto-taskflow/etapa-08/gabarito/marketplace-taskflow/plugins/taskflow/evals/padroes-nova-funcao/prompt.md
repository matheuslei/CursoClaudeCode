---
description: Ao pedir uma função nova do TaskFlow, o Claude segue os padrões do projeto.
max_turns: 6
allowed_tools: [Skill]
---

Estou num projeto chamado TaskFlow, uma lista de tarefas em Python. Cada tarefa é um dicionário
{"titulo": str, "feita": bool} numa lista. Escreva só a função que remove todas as tarefas já
concluídas e devolve quantas foram removidas. Responda com o código.
