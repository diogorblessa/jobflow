# JobFlow

> 🚧 **Em construção.** Este README é provisório e vai ser atualizado conforme o projeto evolui.

JobFlow é uma aplicação web para organizar candidaturas a vagas de tecnologia. A ideia é sair da planilha solta e ter num só lugar todas as vagas, em que etapa cada uma está e quais prazos estão chegando.

Projeto desenvolvido durante a **Imersão Engenharia de Software: Dev na Era da IA** (Alura + Google).

## O que já funciona

- Cadastro, edição e exclusão de candidaturas
- Acompanhamento por etapa: Wishlist, Aplicado, Screening com recrutador, Desafio técnico, Entrevista técnica, Entrevista cultural, Oferta e Rejeitado
- Resumo com a contagem de candidaturas por etapa
- Avisos de prazo da próxima etapa (neutro, atenção para 3 dias ou menos, alerta quando vencido)
- Busca por texto e filtro por etapa
- Registro de versão do currículo enviada, modelo de contratação (CLT, PJ, Internacional), faixa salarial e observações
- Seção de perfil profissional (cargo desejado, resumo, habilidades, anos de experiência)
- Dados salvos no navegador via `localStorage`, com dados de exemplo no primeiro acesso

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Lucide (ícones) e Motion (animações)
- Google Gen AI SDK (planejado para as funcionalidades de IA)

## Estrutura

```
src/
├── components/   # Componentes de interface (lista, cards, formulário, perfil, modais)
├── services/     # Camada de persistência (storageService)
├── types/        # Tipos e enums do domínio (Candidatura, Perfil, Etapa)
└── utils/        # Regras de prazo e estilos por etapa
```

## Autor

**Diogo Blessa**
[GitHub](https://github.com/diogorblessa) · [LinkedIn](https://linkedin.com/in/diogorblessa)