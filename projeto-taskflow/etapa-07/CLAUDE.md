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
- Funcionalidade nova vai num arquivo próprio (ex.: `exportar.py`) com teste próprio em `tests/`,
  para que mudanças paralelas não editem o mesmo arquivo.
- Antes de juntar uma mudança, peça uma revisão ao subagente `revisor-taskflow`.
