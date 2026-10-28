/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import {
  Candidatura,
  ETAPAS,
  Etapa,
  MODELOS_CONTRATACAO,
  ModeloContratacao,
} from '../types/index.ts';
import { obterDataHojeISO } from '../utils/prazoUtils.ts';

interface FormularioCandidaturaModalProps {
  aberto: boolean;
  candidaturaEdicao: Candidatura | null;
  onFechar: () => void;
  onSalvar: (dados: Omit<Candidatura, 'id' | 'criadoEm' | 'atualizadoEm'>) => void;
}

export const FormularioCandidaturaModal: React.FC<FormularioCandidaturaModalProps> = ({
  aberto,
  candidaturaEdicao,
  onFechar,
  onSalvar,
}) => {
  const [empresa, setEmpresa] = useState('');
  const [titulo, setTitulo] = useState('');
  const [link, setLink] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataCandidatura, setDataCandidatura] = useState('');
  const [etapa, setEtapa] = useState<Etapa>('Aplicado');
  const [prazoProximaEtapa, setPrazoProximaEtapa] = useState('');
  const [versaoCurriculo, setVersaoCurriculo] = useState('');
  const [modeloContratacao, setModeloContratacao] = useState<ModeloContratacao | ''>('');
  const [faixaSalarial, setFaixaSalarial] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [erros, setErros] = useState<{ [campo: string]: string }>({});

  useEffect(() => {
    if (candidaturaEdicao) {
      setEmpresa(candidaturaEdicao.empresa || '');
      setTitulo(candidaturaEdicao.titulo || '');
      setLink(candidaturaEdicao.link || '');
      setDescricao(candidaturaEdicao.descricao || '');
      setDataCandidatura(candidaturaEdicao.dataCandidatura || obterDataHojeISO());
      setEtapa(candidaturaEdicao.etapa || 'Aplicado');
      setPrazoProximaEtapa(candidaturaEdicao.prazoProximaEtapa || '');
      setVersaoCurriculo(candidaturaEdicao.versaoCurriculo || '');
      setModeloContratacao(candidaturaEdicao.modeloContratacao || '');
      setFaixaSalarial(candidaturaEdicao.faixaSalarial || '');
      setObservacoes(candidaturaEdicao.observacoes || '');
    } else {
      // Valores padrão para nova candidatura
      setEmpresa('');
      setTitulo('');
      setLink('');
      setDescricao('');
      setDataCandidatura(obterDataHojeISO()); // Padrão hoje
      setEtapa('Aplicado');
      setPrazoProximaEtapa('');
      setVersaoCurriculo('');
      setModeloContratacao('');
      setFaixaSalarial('');
      setObservacoes('');
    }
    setErros({});
  }, [candidaturaEdicao, aberto]);

  if (!aberto) return null;

  const validar = () => {
    const novosErros: { [campo: string]: string } = {};
    if (!empresa.trim()) {
      novosErros.empresa = 'O nome da empresa é obrigatório.';
    }
    if (!titulo.trim()) {
      novosErros.titulo = 'O título da vaga é obrigatório.';
    }
    if (!etapa) {
      novosErros.etapa = 'Selecione a etapa atual.';
    }
    if (!dataCandidatura.trim()) {
      novosErros.dataCandidatura = 'A data da candidatura é obrigatória.';
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;

    onSalvar({
      empresa: empresa.trim(),
      titulo: titulo.trim(),
      link: link.trim() || undefined,
      descricao: descricao.trim() || undefined,
      dataCandidatura,
      etapa,
      prazoProximaEtapa: prazoProximaEtapa ? prazoProximaEtapa : undefined,
      versaoCurriculo: versaoCurriculo.trim() || undefined,
      modeloContratacao: modeloContratacao ? (modeloContratacao as ModeloContratacao) : undefined,
      faixaSalarial: faixaSalarial.trim() || undefined,
      observacoes: observacoes.trim() || undefined,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-candidatura-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onFechar}
        aria-hidden="true"
      />

      {/* Conteúdo do Modal */}
      <div className="relative my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div>
            <h2 id="modal-candidatura-titulo" className="text-lg font-bold text-slate-900 dark:text-white">
              {candidaturaEdicao ? 'Editar Candidatura' : 'Cadastrar Nova Candidatura'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Campos marcados com <span className="text-rose-500 font-semibold">*</span> são obrigatórios.
            </p>
          </div>
          <button
            type="button"
            onClick={onFechar}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            aria-label="Fechar formulário"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto px-6 py-5 space-y-4">
          {/* Linha 1: Empresa e Título da vaga */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="empresa" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Empresa <span className="text-rose-500">*</span>
              </label>
              <input
                id="empresa"
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Ex.: Nubank, Google, Startup X"
                className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm transition-colors dark:bg-slate-800 dark:text-white ${
                  erros.empresa ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {erros.empresa && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                  <AlertCircle className="h-3 w-3" /> {erros.empresa}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="titulo" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Título da vaga <span className="text-rose-500">*</span>
              </label>
              <input
                id="titulo"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex.: Desenvolvedor Frontend React Pleno"
                className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm transition-colors dark:bg-slate-800 dark:text-white ${
                  erros.titulo ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {erros.titulo && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                  <AlertCircle className="h-3 w-3" /> {erros.titulo}
                </p>
              )}
            </div>
          </div>

          {/* Linha 2: Etapa Atual e Data da Candidatura */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="etapa" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Etapa atual <span className="text-rose-500">*</span>
              </label>
              <select
                id="etapa"
                value={etapa}
                onChange={(e) => setEtapa(e.target.value as Etapa)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {ETAPAS.map((et) => (
                  <option key={et} value={et}>
                    {et}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dataCandidatura" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Data da candidatura <span className="text-rose-500">*</span>
              </label>
              <input
                id="dataCandidatura"
                type="date"
                value={dataCandidatura}
                onChange={(e) => setDataCandidatura(e.target.value)}
                className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm transition-colors dark:bg-slate-800 dark:text-white ${
                  erros.dataCandidatura ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {erros.dataCandidatura && (
                <p className="mt-1 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400">
                  <AlertCircle className="h-3 w-3" /> {erros.dataCandidatura}
                </p>
              )}
            </div>
          </div>

          {/* Linha 3: Prazo da Próxima Etapa (opcional) e Modelo de Contratação (opcional) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="prazoProximaEtapa" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Prazo da próxima etapa <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <input
                id="prazoProximaEtapa"
                type="date"
                value={prazoProximaEtapa}
                onChange={(e) => setPrazoProximaEtapa(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                Gera aviso automático de proximidade ou vencimento.
              </p>
            </div>

            <div>
              <label htmlFor="modeloContratacao" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Modelo de contratação <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <select
                id="modeloContratacao"
                value={modeloContratacao}
                onChange={(e) => setModeloContratacao(e.target.value as ModeloContratacao | '')}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="">Não informado</option>
                {MODELOS_CONTRATACAO.map((mod) => (
                  <option key={mod} value={mod}>
                    {mod}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Linha 4: Versão do Currículo (opcional) e Faixa Salarial (opcional) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="versaoCurriculo" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Versão do currículo enviada <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <input
                id="versaoCurriculo"
                type="text"
                value={versaoCurriculo}
                onChange={(e) => setVersaoCurriculo(e.target.value)}
                placeholder="Ex.: CV-Frontend-React-2026.pdf"
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="faixaSalarial" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Faixa salarial <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <input
                id="faixaSalarial"
                type="text"
                value={faixaSalarial}
                onChange={(e) => setFaixaSalarial(e.target.value)}
                placeholder="Ex.: R$ 14.000 CLT ou $5,000 USD"
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Link da vaga (opcional) */}
          <div>
            <label htmlFor="link" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Link da vaga <span className="text-slate-400 font-normal">(opcional)</span>
            </label>
            <input
              id="link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Observações (opcional) */}
          <div>
            <label htmlFor="observacoes" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Observações & anotações de entrevistas <span className="text-slate-400 font-normal">(opcional)</span>
            </label>
            <textarea
              id="observacoes"
              rows={2}
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Ex.: Nome da recrutadora, tópicos abordados, perguntas para a próxima fase..."
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Descrição da vaga (opcional, texto longo preservando quebras) */}
          <div>
            <label htmlFor="descricao" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Descrição completa da vaga <span className="text-slate-400 font-normal">(opcional, texto longo)</span>
            </label>
            <textarea
              id="descricao"
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Cole aqui os requisitos, stack técnica e responsabilidades da vaga..."
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Rodapé e Ações */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onFechar}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-xs hover:bg-blue-700 active:scale-98 transition-all"
            >
              <Save className="h-4 w-4" />
              <span>{candidaturaEdicao ? 'Salvar alterações' : 'Cadastrar candidatura'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
