---
name: analise-vaga
description: Analisa uma candidatura do JobFlow comparando a descrição da vaga com o perfil da pessoa. Extrai a stack exigida, calcula a aderência, aponta pontos fortes e lacunas priorizadas pela etapa atual do processo seletivo e salva a análise em JSON. Use quando a pessoa colar uma vaga, perguntar se combina com uma vaga, quiser saber o que falta para uma vaga ou pedir para analisar uma candidatura.
---

# [IMPORTANTE] UTILIZAR ESTA SKILL PARA ANALISAR VAGAS DO JOBFLOW

Esta skill transforma uma candidatura do JobFlow em uma análise objetiva: stack exigida, aderência ao perfil, pontos fortes e lacunas prioritárias para a etapa atual.

## Regra de Ativação (Gating Rule)

Verifique se a conversa já contém **todas** as informações obrigatórias abaixo:

| # | Informação obrigatória | Campo no JobFlow |
|---|---|---|
| 1 | **Empresa e título da vaga** | `empresa`, `titulo` |
| 2 | **Descrição da vaga** com requisitos ou responsabilidades | `descricao` |
| 3 | **Habilidades do perfil** | `habilidades` |

Informações opcionais, usadas quando presentes: etapa atual (`etapa`), cargo desejado (`cargoDesejado`), resumo profissional (`resumoProfissional`) e anos de experiência (`anosExperiencia`).

* **Se faltar alguma informação obrigatória:** **NÃO chame** a ferramenta `load_skill_resource`. Faça **uma única mensagem**, curta, pedindo **apenas** o que falta.
* **Se a etapa atual não for informada:** assuma `Aplicado` e declare a suposição no início da resposta.
* **Se todas as informações obrigatórias estiverem presentes:** prossiga imediatamente para as instruções abaixo.

## Instruções (apenas depois que o gating for satisfeito)

1. Use a ferramenta `load_skill_resource` para ler `references/workflow.md`.
2. Siga **estritamente** o `references/workflow.md`. Ele indica o momento de carregar `assets/analise_template.md` e `references/salvar_analise.md`.
3. Salve a análise com a ferramenta `WriteFile`, seguindo `references/salvar_analise.md`.

## Regras gerais

* Responda sempre em **português do Brasil**, de forma direta e honesta.
* **Nunca invente experiência.** Só conte como atendido o que aparece no perfil. Sem evidência, o requisito é "parcial" ou "lacuna", nunca "atende".
* Use a etapa exatamente como no JobFlow: Wishlist, Aplicado, Screening com recrutador, Desafio técnico, Entrevista técnica, Entrevista cultural, Oferta ou Rejeitado.
