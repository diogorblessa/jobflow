# JobFlow

JobFlow é uma plataforma para organizar e potencializar candidaturas a vagas de tecnologia. O projeto une uma aplicação web para acompanhamento visual do funil de processos seletivos a um agente de IA especializado que analisa a aderência do perfil do candidato aos requisitos de cada vaga.

---

## 🏗️ Estrutura do Projeto

O repositório está dividido em duas frentes complementares:

```text
jobflow/
├── src/                      # Aplicação Web (React + TypeScript)
├── skills/                   # Especificações de Skills do Google ADK
│   └── analise-vaga/         # Skill de análise comparativa de vagas e perfis
├── agente-jobflow/           # Agente autônomo (Python + Google ADK)
│   ├── app/                  # Código modular do agente
│   │   ├── config.py         # Configurações e diretórios
│   │   ├── prompt.py         # Instruction provider com injeção de data
│   │   ├── tools.py          # Ferramentas de arquivo e carregamento de skill
│   │   └── agent.py          # Definição do root_agent e app
│   ├── analises/             # Diretório local seguro para saída JSON
│   └── tests/                # Testes automatizados com pytest
├── AGENTS.md                 # Diretrizes de desenvolvimento do agente
└── COMMIT_GUIDELINES.md      # Padrão semântico de commits
```

---

## 💻 1. Aplicação Web (`src/`)

Interface moderna para organizar o fluxo de processos seletivos e sair das planilhas manuais.

### Funcionalidades
- **Gestão de Candidaturas:** Cadastro, edição, busca e exclusão de vagas.
- **Funil por Etapas:** Acompanhamento por status (*Wishlist, Aplicado, Screening com recrutador, Desafio técnico, Entrevista técnica, Entrevista cultural, Oferta, Rejeitado*).
- **Alertas de Prazo:** Indicadores visuais inteligentes (neutro, atenção para 3 dias ou menos e alerta de vencimento).
- **Perfil do Candidato:** Registro de cargo pretendido, resumo profissional, habilidades e experiência.
- **Persistência Local:** Dados salvos no navegador via `localStorage`.

### Tecnologias
- React 19 + TypeScript
- Vite
- Tailwind CSS
- Lucide Icons & Motion

### Como executar o Frontend
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

---

## 🤖 2. Agente de Análise (`agente-jobflow/`)

Agente autônomo construído com o **Google ADK** (Agent Development Kit) em Python, projetado para analisar vagas e candidaturas com honestidade e precisão.

### Funcionalidades
- **Skill de Análise (`analise-vaga`):** Divulgação progressiva de conhecimento (L1 a L3).
- **Gating Estrito:** Valida previamente a presença de empresa, cargo, descrição da vaga e habilidades antes de processar.
- **Cálculo de Aderência:** Extrai stack técnica obrigatória/desejável, mapeia pontos fortes e identifica lacunas priorizadas pela etapa atual do processo seletivo.
- **Persistência Segura:** Utiliza `EnvironmentToolset` restrito estritamente a `ReadFile` e `WriteFile` para gravar e versionar relatórios JSON compatíveis com o JobFlow em `analises/`.
- **Prevenção de Alucinação:** Requisitos ausentes no perfil são marcados estritamente como lacunas, sem inventar experiências.

### Tecnologias
- Python 3.12+ & Google ADK
- Gemini 3.8 Flash (Google AI Studio)
- `uv` como gerenciador de dependências e ambiente

### Como executar o Agente
Consulte o guia completo em [`agente-jobflow/README.md`](agente-jobflow/README.md) ou inicie diretamente com:

```bash
cd agente-jobflow

# Criar e configurar o .env com sua GEMINI_API_KEY
cp .env.example .env

# Sincronizar dependências
uv sync

# Iniciar a interface Web do ADK
uv run adk web --allow_origins="*"
```

---

## 🧪 Testes

Para executar os testes automatizados do agente:

```bash
cd agente-jobflow
uv run pytest
```

---

## 👤 Autor

**Diogo Blessa**  
[GitHub](https://github.com/diogorblessa) · [LinkedIn](https://linkedin.com/in/diogorblessa)
