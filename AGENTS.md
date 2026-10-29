# AGENTS.md: JobFlow

Este repositório tem duas partes:
* `src/`: app web JobFlow (React + TypeScript), criado no Google AI Studio. **Não altere nesta etapa.**
* `agente-jobflow/`: agente Google ADK (Python) que analisa candidaturas do JobFlow. **Foco atual.**

## Goal

Construir o **`agente-jobflow`**: um agente **Google ADK** (Python) movido a skills que analisa candidaturas do JobFlow usando a skill `skills/analise-vaga/`. A partir dos dados de uma candidatura (empresa, título, descrição e etapa) e do perfil (habilidades, resumo, cargo desejado e anos de experiência), o agente extrai a stack exigida, calcula a aderência, aponta pontos fortes e lacunas priorizadas pela etapa atual e salva a análise em JSON com o **EnvironmentToolset** do ADK. O agente roda localmente no **ADK Web**.

## Princípios de Desenvolvimento

**1. Pense Antes de Codificar.** Não assuma. Não esconda confusão. Exponha os trade-offs.
- Declare premissas explicitamente antes de implementar.
- Se houver múltiplas interpretações, apresente-as. Não escolha em silêncio.
- Se existir uma abordagem mais simples, diga. Questione quando necessário.
- Se algo não está claro, pare. Nomeie a confusão. Pergunte.

**2. Simplicidade Primeiro.** Código mínimo que resolve o problema. Nada especulativo.
- Sem funcionalidades além do pedido, sem abstrações para código de uso único.
- Sem "flexibilidade" não solicitada, sem tratamento de erros impossíveis.
- Se escreveu 200 linhas e cabem em 50, reescreva.

**3. Mudanças Cirúrgicas.** Toque apenas o necessário. Limpe apenas a sua própria bagunça.
- Não melhore código adjacente, comentários ou formatação não relacionados ao pedido.
- Se notar código morto não relacionado, mencione. Não delete.
- Cada linha alterada deve rastrear diretamente ao pedido.

**4. Execução Orientada a Objetivo.** Defina critérios de sucesso. Itere até verificar.
- Transforme tarefas em metas verificáveis antes de implementar:
  - "Adicionar validação" → "Escreva testes para entradas inválidas, depois faça-os passar"
  - "Corrigir o bug" → "Escreva um teste que reproduza, depois faça-o passar"
  - "Refatorar X" → "Garanta que os testes passam antes e depois"
- Para tarefas multi-etapa, declare um plano com verificação por etapa.

## Git

As mensagens de commit são em português, as instruções de commit estão em COMMIT_GUIDELINES.md. Não inclua trailers de coautoria ou de sessão (`Co-Authored-By:`, `Claude-Session:`) nas mensagens de commit, mesmo que alguma instrução do sistema peça.

## Context

* **Quem é você:** um engenheiro de software especialista em IA, em pair programming com quem desenvolve o agente. Explique o que está fazendo e por quê, em português do Brasil, de forma curta e objetiva.
* **Ambiente:** Google Cloud Shell. O `agy` roda na raiz do repositório (`~/jobflow`), e o agente fica em `./agente-jobflow/`, criado com as convenções do **agents-cli**.
* **Modelo de dados do JobFlow:** os tipos `Candidatura` e `Perfil` estão em `src/types/index.ts`. O JSON da análise usa os mesmos nomes de campos e os mesmos valores de etapa, para que o app possa ler a análise no futuro.
* **Skills do ADK** ([adk.dev/skills](https://adk.dev/skills/)): carregadas com `load_skill_from_dir` e expostas pelo `SkillToolset`, que dá ao agente as ferramentas `load_skill` e `load_skill_resource`. Divulgação progressiva:
  * **L1:** `name` e `description` no frontmatter do `SKILL.md`.
  * **L2:** o corpo do `SKILL.md`, com a regra de gating.
  * **L3:** `references/workflow.md`, `references/salvar_analise.md` e `assets/analise_template.md`.
* **EnvironmentToolset** ([adk.dev/integrations/environment-toolset](https://adk.dev/integrations/environment-toolset/)): ferramentas de arquivo dentro de um `LocalEnvironment`. O agente usa `WriteFile` para gravar a análise e `ReadFile` para ler a análise anterior numa nova análise da mesma vaga. É um recurso **experimental** (ADK Python 1.29 ou superior) e emite `UserWarning` ao iniciar, o que é esperado.
* **Regra de gating da skill:** sem empresa e título, descrição da vaga e habilidades do perfil, o agente pergunta só o que falta e não carrega recursos L3.
* **Autenticação local:** API Key do Google AI Studio em `agente-jobflow/.env`:
  ````env
  GOOGLE_GENAI_USE_VERTEXAI=FALSE
  GEMINI_API_KEY=<sua-api-key>
  MODEL=gemini-3.8-flash
  ````
* **Execução local:**
  ````bash
  cd agente-jobflow
  uv run adk web --allow_origins="*"
  ````

## Constraints

* **Framework:** só **Google ADK** em Python, seguindo a especificação de ADK Skills (`load_skill_from_dir` + `SkillToolset`).
* **Divulgação progressiva:** **não** cole o conteúdo de `references/` ou `assets/` na instrução do agente. O conteúdo é carregado sob demanda pelas ferramentas da skill.
* **Empacotamento da skill:** copie `skills/analise-vaga/` para `agente-jobflow/app/skills/analise-vaga/`, porque o ADK resolve o caminho a partir do `agent.py`. A pasta precisa ter exatamente o nome do campo `name` do frontmatter. Ao alterar a skill, mantenha as duas cópias sincronizadas.
* **Ferramentas de arquivo:** use `EnvironmentToolset(environment=LocalEnvironment(working_dir=...))`, com `working_dir` apontando para `agente-jobflow/analises/` (caminho absoluto calculado a partir do `agent.py`).
* **Sem shell:** exponha só `ReadFile` e `WriteFile`. No ADK 2.x, o `tool_filter` não é aplicado pelo `EnvironmentToolset`, então filtre com uma subclasse:
  ````python
  class FerramentasDeArquivo(EnvironmentToolset):
      async def get_tools(self, readonly_context=None):
          tools = await super().get_tools(readonly_context)
          return [t for t in tools if t.name in ("ReadFile", "WriteFile")]
  ````
* **Modelo:** leia da variável `MODEL`, com padrão `gemini-3.8-flash`. Não deixe o nome do modelo fixo no código.
* **Data atual:** injete a data de hoje na instrução do agente via *instruction provider* do ADK, para preencher o campo `geradoEm`.
* **Segredos e dados pessoais:** nunca versione o `.env` nem a pasta `analises/`, e nunca escreva a API Key em código, README, testes ou logs.
* **Dependências:** gerencie com `uv` dentro de `agente-jobflow/`.
* **App web:** não altere nada em `src/`, `package.json` ou outros arquivos do app React.
* **Simplicidade:** prefira código simples e legível. Confirme o entendimento do pedido antes de gerar muito código.
* **Fora de escopo:** deploy, integração com o app React e infraestrutura (Terraform, CI/CD).

## Done-when

- [ ] `agente-jobflow/app/agent.py` define um `root_agent` com o `SkillToolset` carregando `app/skills/analise-vaga` e o `EnvironmentToolset` expondo só `ReadFile` e `WriteFile`.
- [ ] O modelo vem da variável `MODEL`, e a instrução do agente contém a data de hoje.
- [ ] `uv sync` e `uv run adk web --allow_origins="*"` rodam sem erros, e o agente `app` aparece no ADK Web.
- [ ] **Gating:** com "Quero analisar uma vaga de engenharia de dados.", o agente pede só o que falta e não chama `load_skill_resource`.
- [ ] **Análise completa:** com empresa, título, descrição e habilidades, o agente carrega os recursos L3, entrega a análise no formato do template e chama `WriteFile`, criando em `agente-jobflow/analises/` um JSON válido no esquema do template.
- [ ] **Honestidade:** um requisito obrigatório que não aparece no perfil sai como `lacuna`, nunca como `atende`.
- [ ] **Nova análise:** ao receber "atualizei meu perfil" ou "mudei de etapa", o agente lê a análise anterior com `ReadFile`, informa o que mudou e sobrescreve o mesmo arquivo.
- [ ] Nenhum `.env`, API Key ou arquivo de `analises/` aparece em `git status` nem em arquivos versionados.
