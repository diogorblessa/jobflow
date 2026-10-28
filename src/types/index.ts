/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Etapa =
  | 'Wishlist'
  | 'Aplicado'
  | 'Screening com recrutador'
  | 'Desafio técnico'
  | 'Entrevista técnica'
  | 'Entrevista cultural'
  | 'Oferta'
  | 'Rejeitado';

export const ETAPAS: Etapa[] = [
  'Wishlist',
  'Aplicado',
  'Screening com recrutador',
  'Desafio técnico',
  'Entrevista técnica',
  'Entrevista cultural',
  'Oferta',
  'Rejeitado',
];

export type ModeloContratacao = 'CLT' | 'PJ' | 'Internacional';

export const MODELOS_CONTRATACAO: ModeloContratacao[] = [
  'CLT',
  'PJ',
  'Internacional',
];

export interface Candidatura {
  id: string;
  empresa: string;
  titulo: string;
  link?: string;
  descricao?: string;
  dataCandidatura: string; // Formato YYYY-MM-DD
  etapa: Etapa;
  prazoProximaEtapa?: string; // Formato YYYY-MM-DD
  versaoCurriculo?: string; // Texto curto (ex.: "CV-Frontend-Senior-v2.pdf")
  modeloContratacao?: ModeloContratacao;
  faixaSalarial?: string;
  observacoes?: string;
  criadoEm: number;
  atualizadoEm: number;
}

export interface Perfil {
  nome: string;
  cargoDesejado: string;
  resumoProfissional: string;
  habilidades: string[];
  anosExperiencia: number | string;
}

export type TipoAvisoPrazo = 'neutro' | 'atencao' | 'alerta';

export interface AvisoPrazoInfo {
  tipo: TipoAvisoPrazo;
  texto: string;
  diasRestantes: number;
  dataFormatada: string;
}
