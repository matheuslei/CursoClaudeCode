# TaskFlow · etapa 05 (Módulo 5: Personalização)

O TaskFlow do Módulo 2 com uma pasta `.claude/` de exemplo, que mostra tudo o que você constrói no Módulo 5:

| Arquivo | Aula | O que faz |
|---|---|---|
| `.claude/settings.json` | 5.1 e 5.4 | Libera `python -m unittest`, bloqueia leitura de `.env` e configura o hook |
| `.claude/hooks/checar.py` | 5.4 | Hook PostToolUse: verifica a sintaxe dos `.py` após cada edição (sai com 2 se houver erro) |
| `.claude/skills/revisar-taskflow/SKILL.md` | 5.2 | `/revisar-taskflow [foco]`: revisa o diff e sugere commit |
| `.claude/skills/nova-funcionalidade/SKILL.md` | 5.2 | `/nova-funcionalidade <descrição>`: só você chama (`disable-model-invocation`) |
| `.claude/output-styles/tutor-ptbr.md` | 5.3 | Estilo "Tutor PT-BR" (ative com `/output-style`) |

## Como usar
```powershell
Copy-Item -Recurse <pasta-do-curso>\projeto-taskflow\etapa-05 ~\estudos-claude\taskflow-05
cd ~\estudos-claude\taskflow-05
git init; git add .; git commit -m "TaskFlow etapa 05"
claude
```
Abra o Claude **na raiz desta pasta**, para que o hook e as skills sejam encontrados. Confira com `/hooks`, `/skills` e `/status`.

Leia o hook e as skills antes de usar: eles rodam comandos na sua máquina. Use **apenas dados fictícios**.
