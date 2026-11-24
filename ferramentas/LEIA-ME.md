# Ferramentas do curso

Para refazer os quizzes finais depois de mudar perguntas nas aulas (na pasta `curso-claude-code`):

```powershell
node ferramentas/extrai_quiz.js . ferramentas/quizzes.json
python -X utf8 ferramentas/gera_finais.py . ferramentas/quizzes.json
```

O primeiro comando lê as perguntas de `Curso.quiz` de cada aula; o segundo regrava
`modulos/NN-nome/quiz-final.html` com 10 perguntas por módulo, em rodízio entre as aulas.

## Fontes para podcast (NotebookLM)

```
python -X utf8 ferramentas/gera_fontes_podcast.py
```

Regrava `podcast/fontes/modulo-NN-nome.md` com o texto das aulas e as falas dos vídeos de cada módulo. Os prompts de cada episódio estão em `podcast/PROMPTS.md`.
