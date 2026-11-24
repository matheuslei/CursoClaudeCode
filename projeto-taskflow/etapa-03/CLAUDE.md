# TaskFlow

CLI de lista de tarefas em Python 3.10+, só biblioteca padrão. Dados em `tarefas.json` (fictícios).

## Comandos
- Rodar: `python tarefas.py listar` (também `adicionar "..."`, `concluir N`, `remover N`)
- Testes: `python -m unittest` (na raiz do projeto). Rode sempre depois de mudar código.

## Regras
- Sem bibliotecas externas.
- Funções pequenas, nomes em português, docstring curta.
- Números de tarefa são 1-based; valide com `_indice_valido`.
- Não altere testes existentes para fazê-los passar. Se um teste parecer errado, pergunte.
- Specs de features ficam em `specs/` (ex.: `specs/prazo.md`). Implemente a partir da spec.
