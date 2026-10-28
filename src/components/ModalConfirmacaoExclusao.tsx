/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Candidatura } from '../types/index.ts';

interface ModalConfirmacaoExclusaoProps {
  candidatura: Candidatura | null;
  aberto: boolean;
  onFechar: () => void;
  onConfirmar: () => void;
}

export const ModalConfirmacaoExclusao: React.FC<ModalConfirmacaoExclusaoProps> = ({
  candidatura,
  aberto,
  onFechar,
  onConfirmar,
}) => {
  if (!aberto || !candidatura) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-excluir-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onFechar}
        aria-hidden="true"
      />

      {/* Conteúdo do Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 dark:border dark:border-slate-800">
        <button
          type="button"
          onClick={onFechar}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <div className="flex-1">
            <h3 id="modal-excluir-titulo" className="text-lg font-bold text-slate-900 dark:text-white">
              Confirmar exclusão
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Tem certeza de que deseja excluir a candidatura de{' '}
              <strong className="text-slate-900 dark:text-white">{candidatura.titulo}</strong> na empresa{' '}
              <strong className="text-slate-900 dark:text-white">{candidatura.empresa}</strong>?
            </p>
            <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
              Esta ação não pode ser desfeita e removerá o histórico dessa vaga do seu JobFlow.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onFechar}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-rose-700 active:scale-98 transition-all"
          >
            <Trash2 className="h-4 w-4" />
            <span>Sim, excluir candidatura</span>
          </button>
        </div>
      </div>
    </div>
  );
};
