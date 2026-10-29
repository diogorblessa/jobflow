# Salvar a Análise em Arquivo (EnvironmentToolset)

O agente salva cada análise num arquivo JSON usando as ferramentas de arquivo do **EnvironmentToolset** do ADK. O formato do JSON segue o esquema de `assets/analise_template.md`, pensado para ser lido pelo app JobFlow no futuro.

---

## Ferramentas disponíveis

| Ferramenta | Para que serve | Argumentos |
|---|---|---|
| `WriteFile` | Cria o arquivo ou **sobrescreve** o arquivo inteiro | `path` (texto), `content` (texto) |
| `ReadFile` | Lê um arquivo e devolve o conteúdo com o número de cada linha | `path` (texto), `start_line` e `end_line` (opcionais) |

Use **só** essas duas.

## Nome do arquivo

* Formato: `analise-<empresa>-<titulo>.json`.
* Converta empresa e título para minúsculas, remova acentos, troque qualquer caractere que não seja letra ou número por hífen e não deixe hífens repetidos nem nas pontas.
* Exemplo: empresa "Lumen Analytics" e título "Engenheiro(a) de Dados Pleno" geram `analise-lumen-analytics-engenheiro-a-de-dados-pleno.json`.
* Use sempre caminho **relativo**, sem pastas. **Não** use caminho absoluto (`/home/...`) nem `../`.

## Como gravar

1. Monte o JSON completo seguindo o esquema do template.
2. Confira o checklist:
   - [ ] JSON válido: aspas duplas, sem vírgula sobrando no final de listas ou objetos e sem comentários.
   - [ ] `etapa` escrita exatamente como no JobFlow.
   - [ ] `tipo`, `status` e `faixa` só com os valores permitidos, sem acento.
   - [ ] `aderencia` é número inteiro de 0 a 100, igual ao mostrado na resposta.
   - [ ] `geradoEm` é a data de hoje no formato `YYYY-MM-DD`.
   - [ ] O conteúdo tem só o JSON, sem cerca de código nem texto explicativo.
3. Chame `WriteFile` com `path` igual ao nome do arquivo e `content` igual ao JSON.

Exemplo de chamada:

````json
{
  "path": "analise-lumen-analytics-engenheiro-a-de-dados-pleno.json",
  "content": "<JSON completo da análise>"
}
````

## Como interpretar a resposta

| Resposta da ferramenta | O que fazer |
|---|---|
| `{"status": "ok", ...}` | Sucesso. Informe o caminho na seção 5 da resposta. |
| `{"status": "error", "error": "Path escapes working directory: ..."}` | O caminho estava errado. Tente de novo **uma vez** só com o nome do arquivo. |
| Qualquer outro erro | Não insista. Diga em uma frase que não foi possível salvar e mostre o JSON num bloco de código json na seção 5. |

Nunca diga que salvou o arquivo sem ter recebido `"status": "ok"`.

## Nova análise da mesma vaga

1. Chame `ReadFile` com o nome do arquivo da vaga. A resposta vem com o número de cada linha na frente: esses números **não** fazem parte do arquivo.
2. Se a resposta for `File not found`, trate como primeira análise.
3. Grave o JSON novo **inteiro** com `WriteFile` no mesmo nome. A versão anterior é substituída.
