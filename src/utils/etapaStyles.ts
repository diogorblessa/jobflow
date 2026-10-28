/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Etapa, ModeloContratacao, TipoAvisoPrazo } from '../types/index.ts';

export interface EstiloEtapa {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotColor: string;
  headerBarBg: string;
}

export const ESTILOS_ETAPAS: Record<Etapa, EstiloEtapa> = {
  Wishlist: {
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-700 dark:text-slate-300',
    badgeBorder: 'border-slate-300 dark:border-slate-700',
    dotColor: 'bg-slate-500',
    headerBarBg: 'bg-slate-400',
  },
  Aplicado: {
    badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
    badgeText: 'text-blue-700 dark:text-blue-300',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    dotColor: 'bg-blue-500',
    headerBarBg: 'bg-blue-500',
  },
  'Screening com recrutador': {
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/60',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    badgeBorder: 'border-cyan-200 dark:border-cyan-800',
    dotColor: 'bg-cyan-500',
    headerBarBg: 'bg-cyan-500',
  },
  'Desafio técnico': {
    badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
    badgeText: 'text-purple-700 dark:text-purple-300',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    dotColor: 'bg-purple-500',
    headerBarBg: 'bg-purple-500',
  },
  'Entrevista técnica': {
    badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
    badgeText: 'text-amber-800 dark:text-amber-300',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    dotColor: 'bg-amber-500',
    headerBarBg: 'bg-amber-500',
  },
  'Entrevista cultural': {
    badgeBg: 'bg-teal-50 dark:bg-teal-950/60',
    badgeText: 'text-teal-700 dark:text-teal-300',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    dotColor: 'bg-teal-500',
    headerBarBg: 'bg-teal-500',
  },
  Oferta: {
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/70',
    badgeText: 'text-emerald-800 dark:text-emerald-200 font-semibold',
    badgeBorder: 'border-emerald-300 dark:border-emerald-700',
    dotColor: 'bg-emerald-500',
    headerBarBg: 'bg-emerald-500',
  },
  Rejeitado: {
    badgeBg: 'bg-rose-50 dark:bg-rose-950/60',
    badgeText: 'text-rose-700 dark:text-rose-300',
    badgeBorder: 'border-rose-200 dark:border-rose-800',
    dotColor: 'bg-rose-400',
    headerBarBg: 'bg-rose-400',
  },
};

export const ESTILOS_MODELO: Record<ModeloContratacao, { bg: string; text: string; border: string }> = {
  CLT: {
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    text: 'text-sky-700 dark:text-sky-300',
    border: 'border-sky-200 dark:border-sky-800',
  },
  PJ: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    text: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-200 dark:border-indigo-800',
  },
  Internacional: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
};

export const ESTILOS_AVISO_PRAZO: Record<TipoAvisoPrazo, { bg: string; text: string; border: string; iconClass: string }> = {
  alerta: {
    bg: 'bg-rose-50 dark:bg-rose-950/50',
    text: 'text-rose-800 dark:text-rose-200 font-semibold',
    border: 'border-rose-300 dark:border-rose-700',
    iconClass: 'text-rose-600 dark:text-rose-400 animate-pulse',
  },
  atencao: {
    bg: 'bg-amber-100 dark:bg-amber-950/60',
    text: 'text-amber-900 dark:text-amber-200 font-medium',
    border: 'border-amber-300 dark:border-amber-700',
    iconClass: 'text-amber-600 dark:text-amber-400',
  },
  neutro: {
    bg: 'bg-slate-100 dark:bg-slate-800/80',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-300 dark:border-slate-700',
    iconClass: 'text-slate-500 dark:text-slate-400',
  },
};
