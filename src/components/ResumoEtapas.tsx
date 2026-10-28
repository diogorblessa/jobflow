/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ETAPAS, Etapa } from '../types/index.ts';
import { ESTILOS_ETAPAS } from '../utils/etapaStyles.ts';

interface ResumoEtapasProps {
  contagemPorEtapa: Record<Etapa, number>;
  totalGeral: number;
  etapaFiltro: Etapa | 'todas';
  onSelecionarFiltro: (etapa: Etapa | 'todas') => void;
}

export const ResumoEtapas: React.FC<ResumoEtapasProps> = ({
  contagemPorEtapa,
  totalGeral,
  etapaFiltro,
  onSelecionarFiltro,
}) => {
  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900" aria-label="Resumo por etapa">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Resumo do Funil de Candidaturas
        </h2>
        {etapaFiltro !== 'todas' && (
          <button
            type="button"
            onClick={() => onSelecionarFiltro('todas')}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Limpar filtro (Ver todas)
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Opção Todas as candidaturas */}
        <button
          type="button"
          onClick={() => onSelecionarFiltro('todas')}
          className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
            etapaFiltro === 'todas'
              ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750'
          }`}
        >
          <span>Todas as candidaturas</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-bold ${
              etapaFiltro === 'todas'
                ? 'bg-blue-700 text-white'
                : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
            }`}
          >
            {totalGeral}
          </span>
        </button>

        {/* Todas as 8 etapas com suas respectivas cores */}
        {ETAPAS.map((etapa) => {
          const quantidade = contagemPorEtapa[etapa] || 0;
          const estilo = ESTILOS_ETAPAS[etapa];
          const isAtivo = etapaFiltro === etapa;

          return (
            <button
              key={etapa}
              type="button"
              onClick={() => onSelecionarFiltro(etapa)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                isAtivo
                  ? 'ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-slate-900 font-semibold shadow-xs ' + estilo.badgeBg + ' ' + estilo.badgeText + ' ' + estilo.badgeBorder
                  : estilo.badgeBg + ' ' + estilo.badgeText + ' ' + estilo.badgeBorder + ' hover:opacity-90'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${estilo.dotColor}`} />
              <span>{etapa}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-xs font-bold ${
                  quantidade > 0
                    ? 'bg-black/10 dark:bg-white/20'
                    : 'bg-black/5 text-slate-400 dark:bg-white/10 dark:text-slate-500'
                }`}
              >
                {quantidade}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
