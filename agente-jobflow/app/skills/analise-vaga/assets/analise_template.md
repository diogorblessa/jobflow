# Template de Saída: Análise de Vaga

Preencha a resposta substituindo tudo que estiver entre `[colchetes]`. Mantenha os títulos e a ordem das seções.

---

## Resposta na conversa

````markdown
## 🔎 Análise: [Título da vaga] · [Empresa]

**Etapa atual:** [etapa] · **Aderência:** [X]% ([alta / média / baixa])

> **Suposições:** [suposições feitas no gating, ou "Nenhuma"]

### 1. Stack exigida
**Obrigatória:** [tecnologia], [tecnologia], ...
**Desejável:** [tecnologia], ... (ou "Nenhuma")

### 2. Requisitos x perfil

| Requisito | Tipo | Evidência no perfil | Status |
|---|---|---|---|
| [requisito] | Obrigatório / Desejável | [o que no perfil comprova, ou "-"] | ✅ Atende / 🟡 Parcial / ❌ Lacuna |

### 3. Pontos fortes
- [ponto forte]
- [ponto forte]

### 4. Lacunas prioritárias para a etapa "[etapa]"

| # | Lacuna | Por que importa agora | Ação |
|---|---|---|---|
| 1 | [lacuna] | [motivo] | [ação concreta] |

### 5. Arquivo salvo
📁 Salvei a análise em `[caminho retornado pelo WriteFile]`.

---
**Próximos passos:** posso refazer a análise quando você atualizar o perfil ou avançar de etapa.
````

---

## Esquema do JSON salvo

Os nomes dos campos seguem o padrão do JobFlow (camelCase, sem acento).

````json
{
  "empresa": "Lumen Analytics",
  "titulo": "Engenheiro(a) de Dados Pleno",
  "etapa": "Entrevista técnica",
  "geradoEm": "2026-10-29",
  "aderencia": 67,
  "faixa": "media",
  "stackExigida": {
    "obrigatoria": ["Python", "SQL", "dbt", "Airflow", "Spark", "AWS"],
    "desejavel": ["Kafka", "Terraform"]
  },
  "requisitos": [
    {"requisito": "Python e SQL avançados", "tipo": "obrigatorio", "status": "atende", "evidencia": "Python e SQL nas habilidades"},
    {"requisito": "Orquestração com Airflow", "tipo": "obrigatorio", "status": "lacuna", "evidencia": "-"},
    {"requisito": "Processamento distribuído com Spark", "tipo": "obrigatorio", "status": "parcial", "evidencia": "Databricks nas habilidades, plataforma baseada em Spark"}
  ],
  "pontosFortes": ["dbt e modelagem dimensional", "experiência com dados de marketing"],
  "lacunasPrioritarias": [
    {"lacuna": "Airflow", "motivo": "requisito obrigatório e provável tema da entrevista técnica", "acao": "montar uma DAG simples que rode um modelo dbt e saber explicar agendamento e retries"}
  ]
}
````

### Valores permitidos
* `etapa`: Wishlist, Aplicado, Screening com recrutador, Desafio técnico, Entrevista técnica, Entrevista cultural, Oferta, Rejeitado.
* `faixa`: `alta`, `media`, `baixa`.
* `tipo`: `obrigatorio`, `desejavel`.
* `status`: `atende`, `parcial`, `lacuna`.
* `lacunasPrioritarias`: de 0 a 3 itens.
