# Fluxo de Trabalho: Análise de Vaga

Siga os passos na ordem. Não mostre cálculos intermediários, a menos que a pessoa peça.

---

## Passo 1: Extração da vaga

1. Liste os requisitos da vaga, juntando repetidos, com no máximo 12 itens.
2. Classifique cada requisito como **obrigatorio** ou **desejavel**. Se a vaga não separar, trate como obrigatório o que está em "requisitos" ou "o que esperamos" e como desejável o que está em "diferenciais" ou "nice to have".
3. Monte a **stack exigida**: só nomes de tecnologias (linguagens, frameworks, bancos de dados, cloud e ferramentas) citados na vaga, separados em obrigatória e desejável. Não inclua competências comportamentais.

## Passo 2: Comparação com o perfil

Para cada requisito, defina o status usando habilidades, resumo profissional e anos de experiência do perfil:

* **atende:** a habilidade ou experiência aparece explicitamente no perfil.
* **parcial:** o perfil tem algo equivalente ou relacionado (ex.: vaga pede Snowflake e o perfil tem BigQuery; vaga pede 5 anos e o perfil tem 3). A evidência deve explicar a equivalência em uma linha.
* **lacuna:** não há evidência no perfil. A evidência fica `-`.

Nunca deduza uma habilidade só pelo cargo desejado.

## Passo 3: Aderência

* Calcule só com os requisitos obrigatórios: (atende x 1 + parcial x 0,5) / total de obrigatórios x 100, arredondado para inteiro.
* Faixas: 75 ou mais = `alta`; 50 a 74 = `media`; abaixo de 50 = `baixa`.
* Escolha 2 ou 3 **pontos fortes**: itens do perfil que mais conversam com os requisitos obrigatórios.

## Passo 4: Lacunas prioritárias pela etapa atual

Escolha no máximo **3** lacunas ou parciais, priorizando obrigatórios antes de desejáveis e usando a etapa atual:

| Etapa atual | O que priorizar | Tipo de ação sugerida |
|---|---|---|
| Wishlist ou Aplicado | Lacunas obrigatórias mais visíveis no currículo | Mini-projeto que cubra a lacuna e destacar no currículo o que o perfil já tem |
| Screening com recrutador | Experiência, senioridade e requisitos de contexto | Pitch curto conectando os pontos fortes à vaga |
| Desafio técnico | Ferramentas da stack obrigatória | Praticar a ferramenta num exercício parecido com o desafio |
| Entrevista técnica | Conceitos e ferramentas obrigatórias, incluindo parciais | Saber explicar a equivalência e um projeto real do perfil |
| Entrevista cultural | Requisitos comportamentais e de colaboração | Preparar histórias reais no formato STAR |
| Oferta | Nenhuma lacuna prioritária | Informar que a análise serve só de registro |
| Rejeitado | Lacunas que mais pesaram | Registrar como aprendizado para as próximas vagas |

Para cada lacuna prioritária, escreva o **motivo** (por que importa agora) e uma **ação** concreta e possível de fazer.

## Passo 5: Resposta e arquivo

1. Use `load_skill_resource` para ler `assets/analise_template.md` e preencha a resposta na ordem do template.
2. Use `load_skill_resource` para ler `references/salvar_analise.md`.
3. Monte o JSON da análise seguindo o esquema do template e salve com `WriteFile`.
4. Na seção 5 da resposta, informe o caminho retornado pelo `WriteFile`. Não repita o JSON na conversa quando o arquivo tiver sido salvo.

## Passo 6: Nova análise

* **"Atualizei meu perfil" ou "mudei de etapa":** antes de refazer, chame `ReadFile` no arquivo da mesma vaga para saber a aderência anterior. Refaça os Passos 2 a 5 e sobrescreva o mesmo arquivo.
* Na resposta, diga o que mudou em relação à análise anterior (aderência anterior e nova, lacunas que saíram ou entraram).
