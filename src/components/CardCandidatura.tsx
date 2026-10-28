/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  ExternalLink,
  FileText,
  Clock,
  AlertTriangle,
  AlertCircle,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Globe,
  Info,
} from 'lucide-react';
import { Candidatura } from '../types/index.ts';
import { calcularAvisoPrazo, formatarDataBR } from '../utils/prazoUtils.ts';
import {
  ESTILOS_ETAPAS,
  ESTILOS_MODELO,
  ESTILOS_AVISO_PRAZO,
} from '../utils/etapaStyles.ts';

interface CardCandidaturaProps {
  candidatura: Candidatura;
  onEditar: (candidatura: Candidatura) => void;
  onSolicitarExclusao: (candidatura: Candidatura) => void;
}

export const CardCandidatura: React.FC<CardCandidaturaProps> = ({
  candidatura,
  onEditar,
  onSolicitarExclusao,
}) => {
  const [expandido, setExpandido] = useState(false);

  const estiloEtapa = ESTILOS_ETAPAS[candidatura.etapa] || ESTILOS_ETAPAS.Aplicado;
  const avisoPrazo = calcularAvisoPrazo(candidatura.prazoProximaEtapa);

  const temDetalhesExtras = Boolean(
    candidatura.descricao ||
    candidatura.faixaSalarial ||
    candidatura.observacoes ||
    candidatura.link
  );

  return (
    <article
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Barra superior de status da etapa */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${estiloEtapa.headerBarBg}`}
        aria-hidden="true"
      />

      <div>
        {/* Cabeçalho do Cartão: Empresa, Título e Ações */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{candidatura.empresa}</span>
            </div>
            <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white leading-snug break-words">
              {candidatura.titulo}
            </h3>
          </div>

          {/* Botões de Ação: Editar e Excluir */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => onEditar(candidatura)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400 transition-colors"
              title="Editar candidatura"
              aria-label={`Editar candidatura na empresa ${candidatura.empresa}`}
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onSolicitarExclusao(candidatura)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition-colors"
              title="Excluir candidatura"
              aria-label={`Excluir candidatura na empresa ${candidatura.empresa}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Badges Principais: Etapa e Modelo de Contratação */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {/* Badge de Etapa com cor exclusiva */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${estiloEtapa.badgeBg} ${estiloEtapa.badgeText} ${estiloEtapa.badgeBorder}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${estiloEtapa.dotColor}`} />
            {candidatura.etapa}
          </span>

          {/* Badge de Modelo de Contratação (se preenchido) */}
          {candidatura.modeloContratacao && (
            <span
              className={`inline-flex items-center gap-1 rounded-lg border px-2 py-0.5 text-xs font-medium ${
                ESTILOS_MODELO[candidatura.modeloContratacao].bg
              } ${ESTILOS_MODELO[candidatura.modeloContratacao].text} ${
                ESTILOS_MODELO[candidatura.modeloContratacao].border
              }`}
            >
              {candidatura.modeloContratacao === 'Internacional' && (
                <Globe className="h-3 w-3" />
              )}
              {candidatura.modeloContratacao}
            </span>
          )}

          {/* Link externo da vaga (se preenchido) com target="_blank" e rel="noopener noreferrer" */}
          {candidatura.link && (
            <a
              href={candidatura.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
              title="Abrir página oficial da vaga"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Ver anúncio da vaga</span>
            </a>
          )}
        </div>

        {/* Metadados: Data de Candidatura e Versão do Currículo */}
        <div className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>Candidatura enviada em:</span>
            <strong className="text-slate-800 dark:text-slate-200">
              {formatarDataBR(candidatura.dataCandidatura)}
            </strong>
          </div>

          {candidatura.versaoCurriculo && (
            <div className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>Versão do currículo:</span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-700 dark:bg-slate-800 dark:text-slate-300 truncate max-w-[220px]">
                {candidatura.versaoCurriculo}
              </span>
            </div>
          )}
        </div>

        {/* Regras do aviso de prazo:
            - sem prazo: não exibir aviso;
            - prazo com mais de 3 dias: exibir a data de forma neutra, com os dias restantes;
            - prazo em 3 dias ou menos, incluindo hoje: destaque de atenção (ex.: "Vence hoje", "Faltam 2 dias");
            - prazo vencido: destaque de alerta (ex.: "Vencido há 1 dia").
        */}
        {avisoPrazo && (
          <div className="mt-3">
            <div
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs ${
                ESTILOS_AVISO_PRAZO[avisoPrazo.tipo].bg
              } ${ESTILOS_AVISO_PRAZO[avisoPrazo.tipo].text} ${
                ESTILOS_AVISO_PRAZO[avisoPrazo.tipo].border
              }`}
            >
              {avisoPrazo.tipo === 'alerta' ? (
                <AlertCircle className={`h-4 w-4 shrink-0 ${ESTILOS_AVISO_PRAZO[avisoPrazo.tipo].iconClass}`} />
              ) : avisoPrazo.tipo === 'atencao' ? (
                <AlertTriangle className={`h-4 w-4 shrink-0 ${ESTILOS_AVISO_PRAZO[avisoPrazo.tipo].iconClass}`} />
              ) : (
                <Clock className={`h-4 w-4 shrink-0 ${ESTILOS_AVISO_PRAZO[avisoPrazo.tipo].iconClass}`} />
              )}
              <div className="flex flex-1 items-center justify-between gap-1">
                <span>
                  <strong>Prazo da etapa:</strong> {avisoPrazo.texto}
                </span>
                <span className="text-[11px] opacity-80">
                  ({avisoPrazo.dataFormatada})
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Seção Expandida: Descrição longa, Faixa Salarial e Observações */}
        {expandido && temDetalhesExtras && (
          <div className="mt-4 space-y-3 border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
            {candidatura.faixaSalarial && (
              <div className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Faixa salarial informada: </span>
                  <span>{candidatura.faixaSalarial}</span>
                </div>
              </div>
            )}

            {candidatura.observacoes && (
              <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                  <Info className="h-3.5 w-3.5 text-blue-500" />
                  <span>Observações & Anotações:</span>
                </div>
                <p className="mt-1 whitespace-pre-wrap break-words text-slate-600 dark:text-slate-300">
                  {candidatura.observacoes}
                </p>
              </div>
            )}

            {candidatura.descricao && (
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Descrição da vaga:</span>
                <div className="mt-1 max-h-48 overflow-y-auto rounded-xl bg-slate-50 p-2.5 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                  <p className="whitespace-pre-wrap break-words leading-relaxed">
                    {candidatura.descricao}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botão de Expandir / Recolher Detalhes */}
      {temDetalhesExtras && (
        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={() => setExpandido(!expandido)}
            className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <span>{expandido ? 'Recolher detalhes' : 'Ver mais detalhes'}</span>
            {expandido ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      )}
    </article>
  );
};
