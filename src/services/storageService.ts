/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Candidatura, Perfil } from '../types/index.ts';
import { obterDataHojeISO } from '../utils/prazoUtils.ts';

const CHAVE_CANDIDATURAS = 'jobflow_candidaturas';
const CHAVE_PERFIL = 'jobflow_perfil';

export interface IStorageService {
  listarCandidaturas(): Promise<Candidatura[]>;
  criarCandidatura(dados: Omit<Candidatura, 'id' | 'criadoEm' | 'atualizadoEm'>): Promise<Candidatura>;
  atualizarCandidatura(id: string, dados: Partial<Candidatura>): Promise<Candidatura>;
  excluirCandidatura(id: string): Promise<void>;
  obterPerfil(): Promise<Perfil>;
  salvarPerfil(perfil: Perfil): Promise<Perfil>;
}

// Dados iniciais de demonstração para primeiro acesso (caso o localStorage esteja vazio)
const PERFIL_PADRAO: Perfil = {
  nome: 'Alexandre Mendes',
  cargoDesejado: 'Engenheiro de Software Frontend / Full Stack',
  resumoProfissional: 'Desenvolvedor com foco em React, TypeScript, arquitetura de interfaces de alta performance e microsserviços. Experiência em empresas nacionais e times internacionais.',
  habilidades: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'GraphQL', 'REST APIs', 'Testes Automatizados'],
  anosExperiencia: 5,
};

const hoje = new Date();
const calcularDataRelativa = (diasOffset: number): string => {
  const d = new Date(hoje);
  d.setDate(d.getDate() + diasOffset);
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

const CANDIDATURAS_PADRAO: Candidatura[] = [
  {
    id: 'demo-1',
    empresa: 'Nubank',
    titulo: 'Senior Frontend Engineer',
    link: 'https://nubank.com.br/carreiras',
    descricao: 'Construção de aplicações escaláveis em React e TypeScript para produtos de crédito. Foco em UX, acessibilidade e performance.',
    dataCandidatura: calcularDataRelativa(-5),
    etapa: 'Desafio técnico',
    prazoProximaEtapa: calcularDataRelativa(2), // Faltam 2 dias -> Destaque de atenção!
    versaoCurriculo: 'CV-Senior-Frontend-2026.pdf',
    modeloContratacao: 'CLT',
    faixaSalarial: 'R$ 16.000 - R$ 19.000',
    observacoes: 'Desafio técnico recebido na terça-feira: criar dashboard financeiro com testes unitários. Entregar até as 18h no GitHub.',
    criadoEm: Date.now() - 500000,
    atualizadoEm: Date.now() - 200000,
  },
  {
    id: 'demo-2',
    empresa: 'Stripe',
    titulo: 'Staff Solutions Engineer',
    link: 'https://stripe.com/jobs',
    descricao: 'Integração de infraestrutura de pagamentos, suporte técnico avançado e arquitetura de integrações globais.',
    dataCandidatura: calcularDataRelativa(-10),
    etapa: 'Entrevista técnica',
    prazoProximaEtapa: calcularDataRelativa(5), // Em 5 dias -> Destaque neutro
    versaoCurriculo: 'CV-English-International.pdf',
    modeloContratacao: 'Internacional',
    faixaSalarial: '$9,000 - $11,000 USD/mês',
    observacoes: 'Aprovado no screening. Entrevista de sistema e arquitetura agendada com engenheiro nos EUA via Zoom.',
    criadoEm: Date.now() - 1000000,
    atualizadoEm: Date.now() - 300000,
  },
  {
    id: 'demo-3',
    empresa: 'Mercado Livre',
    titulo: 'Tech Lead / Especialista React',
    link: 'https://mercadolivre.com.br/carreiras',
    descricao: 'Liderança técnica de squad de checkout e pagamentos, arquitetura de micro-frontends.',
    dataCandidatura: calcularDataRelativa(-2),
    etapa: 'Screening com recrutador',
    prazoProximaEtapa: calcularDataRelativa(0), // Vence hoje -> Destaque de atenção!
    versaoCurriculo: 'CV-TechLead-v3.pdf',
    modeloContratacao: 'PJ',
    faixaSalarial: 'R$ 120/hora (~R$ 20.000/mês)',
    observacoes: 'Conversa de alinhamento com a tech recruiter Mariana às 15h.',
    criadoEm: Date.now() - 200000,
    atualizadoEm: Date.now() - 100000,
  },
  {
    id: 'demo-4',
    empresa: 'iFood',
    titulo: 'Desenvolvedor Frontend Pleno',
    link: 'https://carreiras.ifood.com.br',
    descricao: 'Desenvolvimento do portal de restaurantes parceiros.',
    dataCandidatura: calcularDataRelativa(-18),
    etapa: 'Desafio técnico',
    prazoProximaEtapa: calcularDataRelativa(-2), // Vencido há 2 dias -> Destaque de alerta
    versaoCurriculo: 'CV-Padrao-2026.pdf',
    modeloContratacao: 'CLT',
    faixaSalarial: 'R$ 11.000',
    observacoes: 'Prazo inicial venceu, solicitada extensão por email com o RH.',
    criadoEm: Date.now() - 1500000,
    atualizadoEm: Date.now() - 800000,
  },
  {
    id: 'demo-5',
    empresa: 'Vercel',
    titulo: 'Frontend Infrastructure Specialist',
    link: 'https://vercel.com/careers',
    descricao: 'Next.js, Edge network and frontend tooling optimization.',
    dataCandidatura: obterDataHojeISO(),
    etapa: 'Aplicado',
    versaoCurriculo: 'CV-OpenSource-Eng.pdf',
    modeloContratacao: 'Internacional',
    faixaSalarial: '$120,000 - $140,000 USD/ano',
    observacoes: 'Candidatura enviada pelo formulário oficial da Greenhouse com carta de apresentação.',
    criadoEm: Date.now() - 50000,
    atualizadoEm: Date.now() - 50000,
  },
];

class LocalStorageStorageService implements IStorageService {
  async listarCandidaturas(): Promise<Candidatura[]> {
    try {
      const data = localStorage.getItem(CHAVE_CANDIDATURAS);
      if (!data) {
        // Inicializa com dados padrão se não houver registros
        localStorage.setItem(CHAVE_CANDIDATURAS, JSON.stringify(CANDIDATURAS_PADRAO));
        return CANDIDATURAS_PADRAO;
      }
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (e) {
      console.error('Erro ao ler candidaturas do localStorage', e);
      return [];
    }
  }

  async criarCandidatura(dados: Omit<Candidatura, 'id' | 'criadoEm' | 'atualizadoEm'>): Promise<Candidatura> {
    const candidaturas = await this.listarCandidaturas();
    const agora = Date.now();
    const novaCandidatura: Candidatura = {
      ...dados,
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `cand-${agora}-${Math.random().toString(36).substring(2, 7)}`,
      criadoEm: agora,
      atualizadoEm: agora,
    };

    const atualizadas = [novaCandidatura, ...candidaturas];
    localStorage.setItem(CHAVE_CANDIDATURAS, JSON.stringify(atualizadas));
    return novaCandidatura;
  }

  async atualizarCandidatura(id: string, dados: Partial<Candidatura>): Promise<Candidatura> {
    const candidaturas = await this.listarCandidaturas();
    const index = candidaturas.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Candidatura com id ${id} não encontrada.`);
    }

    const candidaturaAtualizada: Candidatura = {
      ...candidaturas[index],
      ...dados,
      id, // Preserva o ID original
      atualizadoEm: Date.now(),
    };

    candidaturas[index] = candidaturaAtualizada;
    localStorage.setItem(CHAVE_CANDIDATURAS, JSON.stringify(candidaturas));
    return candidaturaAtualizada;
  }

  async excluirCandidatura(id: string): Promise<void> {
    const candidaturas = await this.listarCandidaturas();
    const filtradas = candidaturas.filter((c) => c.id !== id);
    localStorage.setItem(CHAVE_CANDIDATURAS, JSON.stringify(filtradas));
  }

  async obterPerfil(): Promise<Perfil> {
    try {
      const data = localStorage.getItem(CHAVE_PERFIL);
      if (!data) {
        localStorage.setItem(CHAVE_PERFIL, JSON.stringify(PERFIL_PADRAO));
        return PERFIL_PADRAO;
      }
      const parsed = JSON.parse(data);
      return parsed && typeof parsed === 'object' ? parsed : PERFIL_PADRAO;
    } catch (e) {
      console.error('Erro ao ler perfil do localStorage', e);
      return PERFIL_PADRAO;
    }
  }

  async salvarPerfil(perfil: Perfil): Promise<Perfil> {
    localStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfil));
    return perfil;
  }
}

// Exportação da instância singleton do serviço
export const storageService: IStorageService = new LocalStorageStorageService();
