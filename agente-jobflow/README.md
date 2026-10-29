# Agente JobFlow (`agente-jobflow`)

Agente autônomo baseado no **Google ADK** (Agent Development Kit) em Python, desenvolvido para analisar vagas de tecnologia em comparação com o perfil do candidato no JobFlow.

---

## 🎯 Objetivo

A partir das informações de uma candidatura (empresa, título da vaga, descrição e etapa do processo) e do perfil do candidato (habilidades, resumo profissional e experiência), o agente:
1. **Extrai a stack técnica:** separa competências em requisitos obrigatórios e desejáveis.
2. **Calcula a aderência percentual:** avalia a compatibilidade de forma transparente e honesta (sem inventar experiências).
3. **Mapeia pontos fortes e lacunas:** prioriza ações concretas de acordo com a etapa atual do processo seletivo (*Wishlist, Aplicado, Screening, Desafio técnico, Entrevista técnica, Entrevista cultural, Oferta, Rejeitado*).
4. **Persiste e atualiza relatórios JSON:** utiliza ferramentas seguras de arquivo (`WriteFile` e `ReadFile`) para salvar o resultado em `analises/` no formato consumível pelo app JobFlow.

---

## 📂 Arquitetura

O projeto adota separação de responsabilidades (SoC) e boas práticas de arquitetura de software:

```text
agente-jobflow/
├── app/
│   ├── config.py             # Configurações de modelo, diretórios e caminhos
│   ├── prompt.py             # Instruction provider dinâmico (injeção de data YYYY-MM-DD)
│   ├── tools.py              # Ferramentas de arquivo (FerramentasDeArquivo) e SkillToolset
│   ├── agent.py              # Composição do root_agent e exposição do app ADK
│   └── skills/
│       └── analise-vaga/     # Skill com divulgação progressiva (SKILL.md, references, assets)
├── analises/                 # Diretório de persistência de JSONs (ignorado no Git)
├── tests/
│   └── unit/
│       └── test_verificacao.py # Testes determinísticos do agente e ferramentas
├── .env.example              # Modelo de variáveis de ambiente
├── pyproject.toml            # Dependências gerenciadas via uv
└── README.md
```

---

## 🚀 Pré-requisitos e Instalação

1. **Python 3.12+**
2. **uv** (gerenciador rápido de pacotes Python):
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

### 1. Configurar variáveis de ambiente

Copie o arquivo de exemplo para `.env`:

```bash
cp .env.example .env
```

Edite o `.env` e insira sua chave da API do Google AI Studio:

```env
GOOGLE_GENAI_USE_VERTEXAI=FALSE
GEMINI_API_KEY=sua-api-key-do-gemini-aqui
MODEL=gemini-3.8-flash
```

> [!CAUTION]
> O arquivo `.env` e as análises geradas em `analises/` contêm dados sensíveis e credenciais privadas, estando blindados e ignorados pelo Git. Nunca versione credenciais reais.

### 2. Sincronizar dependências

```bash
uv sync
```

---

## 🖥️ Execução Local (ADK Web)

Inicie o servidor de desenvolvimento do ADK:

```bash
uv run adk web --allow_origins="*"
```

- Acesse a interface web em `http://127.0.0.1:8000` (ou via **Web Preview** na porta 8000 no Google Cloud Shell).
- Selecione o agente `app` na barra lateral para iniciar a conversa interativa.

---

## 🧪 Testes Automatizados

O projeto inclui testes de validação determinísticos que verificam a configuração do agente, isolamento de ferramentas, injeção de data e integridade da skill sem necessidade de chamadas externas de LLM:

```bash
uv run pytest
```
