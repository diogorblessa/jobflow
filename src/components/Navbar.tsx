/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Briefcase, User, Plus } from 'lucide-react';

interface NavbarProps {
  abaAtiva: 'candidaturas' | 'perfil';
  onMudarAba: (aba: 'candidaturas' | 'perfil') => void;
  totalCandidaturas: number;
  onAbrirNovaCandidatura: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  abaAtiva,
  onMudarAba,
  totalCandidaturas,
  onAbrirNovaCandidatura,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                JobFlow
              </span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                Tech
              </span>
            </div>
            <p className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
              Gestão de candidaturas e processos seletivos
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800" aria-label="Navegação principal">
            <button
              type="button"
              onClick={() => onMudarAba('candidaturas')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all ${
                abaAtiva === 'candidaturas'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Briefcase className="h-4 w-4" />
              <span>Candidaturas</span>
              <span
                className={`ml-1 rounded-full px-1.5 py-0.2 text-xs font-semibold ${
                  abaAtiva === 'candidaturas'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
                    : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                {totalCandidaturas}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onMudarAba('perfil')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all ${
                abaAtiva === 'perfil'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Meu perfil</span>
            </button>
          </nav>

          {/* Action Button: Nova Candidatura */}
          {abaAtiva === 'candidaturas' && (
            <button
              type="button"
              onClick={onAbrirNovaCandidatura}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-xs hover:bg-blue-700 active:scale-98 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nova candidatura</span>
              <span className="sm:hidden">Nova</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
