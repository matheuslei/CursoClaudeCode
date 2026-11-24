# Revisão esperada de `buscar_com_bug.py` (aula 9.2)

O arquivo `buscar_com_bug.py` tem problemas de propósito. Uma boa revisão (`/code-review`,
`/security-review` ou o subagente `revisor-taskflow`) deve achar algo parecido com isto.
A redação real varia a cada execução.

| Gravidade | Onde | Problema | Correção |
|---|---|---|---|
| Grave (segurança) | `filtrar` | `eval` com texto vindo do usuário executa qualquer código Python. Também viola a regra do CLAUDE.md. | Trocar a expressão livre por um parâmetro (`filtrar(feita)`). |
| Grave (bug) | `primeira_pendente` | Usa `pendentes[1]`: pula a primeira pendente e quebra (`IndexError`) quando só há uma. | Devolver a primeira pendente (laço ou `pendentes[0]`). |
| Ajustar (bug) | `buscar` | A docstring promete ignorar maiúsculas, mas a comparação diferencia. | Comparar com `casefold()` dos dois lados. |
| Ajustar | arquivo todo | Funcionalidade nova sem teste próprio (regra do CLAUDE.md). | Criar `tests/test_buscar.py`. |

Versão corrigida: `buscar.py` e `tests/test_buscar.py` nesta pasta.
