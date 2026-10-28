/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  Briefcase,
  Layers,
  Inbox,
  XCircle,
} from 'lucide-react';
import { Candidatura, ETAPAS, Etapa } from '../types/index.ts';
import { ResumoEtapas } from './ResumoEtapas.tsx';
import { CardCandidatura } from './CardCandidatura.tsx';

interface ListaCandidaturasProps {
  candidaturas: Candidatura[];
  onNovaCandidatura: () => void;
  onEditarCandidatura: (candidatura: Candidatura) => void;
  onSolicitarExclusao: (candidatura: Candidatura) => void;
}

export const ListaCandidaturas: React.FC<ListaCandidaturasProps> = ({
  candidaturas,
  onNovaCandidatura,
  onEditarCandidatura,
  onSolicitarExclusao,
}) => {
  const [etapaFiltro, setEtapaFiltro] = useState<Etapa | 'todas'>('todas');
  const [busca, setBusca] = useState('');

  // Contagem de candidaturas por etapa para o resumo
  const contagemPorEtapa = useMemo(() => {
    const mapa: Record<Etapa, number> = {
      Wishlist: 0,
      Aplicado: 0,
      'Screening com recrutador': 0,
      'Desafio técnico': 0,
      'Entrevista técnica': 0,
      'Entrevista cultural': 0,
      Oferta: 0,
      Rejeitado: 0,
    };

    candidaturas.forEach((c) => {
      if (mapa[c.etapa] !== undefined) {
        mapa[c.etapa]++;
      }
    });

    return mapa;
  }, [candidaturas]);

  // Filtragem e Ordenação: "das mais recentes para as mais antigas"
  const candidaturasFiltradasEOrdenadas = useMemo(() => {
    return candidaturas
      .filter((c) => {
        // Filtro por etapa
        if (etapaFiltro !== 'todas' && c.etapa !== etapaFiltro) {
          return false;
        }

        // Filtro de busca textual (empresa, título da vaga, observações ou versão do currículo)
        if (busca.trim() !== '') {
          const termo = busca.toLowerCase().trim();
          const bateEmpresa = c.empresa.toLowerCase().includes(termo);
          const bateTitulo = c.titulo.toLowerCase().includes(termo);
          const bateObs = c.observacoes?.toLowerCase().includes(termo);
          const bateCv = c.versaoCurriculo?.toLowerCase().includes(termo);
          if (!bateEmpresa && !bateTitulo && !bateObs && !bateCv) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        // Ordenação das mais recentes para as mais antigas:
        // Primeiro compara pela data da candidatura (YYYY-MM-DD) decrescente
        if (a.dataCandidatura !== b.dataCandidatura) {
          return b.dataCandidatura.localeCompare(a.dataCandidatura);
        }
        // Em caso de empate, pelo momento de criação no sistema
        return b.criadoEm - a.criadoEm;
      });
  }, [candidaturas, etapaFiltro, busca]);

  return (
    <div className="space-y-6">
      {/* Resumo com a quantidade de candidaturas por etapa */}
      <ResumoEtapas
        contagemPorEtapa={contagemPorEtapa}
        totalGeral={candidaturas.length}
        etapaFiltro={etapaFiltro}
        onSelecionarFiltro={setEtapaFiltro}
      />

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por empresa, cargo, anotações..."
            className="w-full rounded-xl border border-slate-300 py-2 pl-10 pr-4 text-sm transition-colors focus:border-blue-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          {busca && (
            <button
              type="button"
              onClick={() => setBusca('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Limpar busca"
            >
              <XCircle className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Dropdown de Etapa para visualização alternativa em mobile */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={etapaFiltro}
            onChange={(e) => setEtapaFiltro(e.target.value as Etapa | 'todas')}
            className="w-full sm:w-auto rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            aria-label="Filtrar candidaturas por etapa"
          >
            <option value="todas">Todas as etapas ({candidaturas.length})</option>
            {ETAPAS.map((et) => (
              <option key={et} value={et}>
                {et} ({contagemPorEtapa[et]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contagem de resultados visíveis */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          Exibindo <strong>{candidaturasFiltradasEOrdenadas.length}</strong>{' '}
          {candidaturasFiltradasEOrdenadas.length === 1 ? 'candidatura' : 'candidaturas'}
          {etapaFiltro !== 'todas' && ` na etapa "${etapaFiltro}"`}
          {busca && ` correspondentes à busca "${busca}"`}
          {' (ordenadas da mais recente para a mais antiga)'}
        </span>
      </div>

      {/* Mensagem quando não houver candidaturas cadastradas */}
      {candidaturas.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-12 text-center dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            <Inbox className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            Nenhuma candidatura cadastrada
          </h3>
          <p className="mt-1.5 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Comece a organizar suas oportunidades de tecnologia. Cadastre a primeira vaga com empresa, prazos de desafios e notas de entrevistas.
          </p>
          <button
            type="button"
            onClick={onNovaCandidatura}
            className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 active:scale-98 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Cadastrar primeira candidatura</span>
          </button>
        </div>
      ) : candidaturasFiltradasEOrdenadas.length === 0 ? (
        /* Mensagem quando o filtro não retornar resultados */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <Filter className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Nenhuma candidatura encontrada
          </h3>
          <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Nenhuma vaga corresponde aos filtros ou termos de busca aplicados.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {etapaFiltro !== 'todas' && (
              <button
                type="button"
                onClick={() => setEtapaFiltro('todas')}
                className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              >
                Limpar filtro de etapa
              </button>
            )}
            {busca && (
              <button
                type="button"
                onClick={() => setBusca('')}
                className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              >
                Limpar busca textual
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Grid de Cartões de Candidatura */
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {candidaturasFiltradasEOrdenadas.map((candidatura) => (
            <CardCandidatura
              key={candidatura.id}
              candidatura={candidatura}
              onEditar={onEditarCandidatura}
              onSolicitarExclusao={onSolicitarExclusao}
            />
          ))}
        </div>
      )}
    </div>
  );
};
