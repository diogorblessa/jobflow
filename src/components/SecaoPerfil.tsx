/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  User,
  Briefcase,
  Award,
  Sparkles,
  Plus,
  X,
  Save,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Perfil } from '../types/index.ts';

interface SecaoPerfilProps {
  perfil: Perfil;
  onSalvarPerfil: (perfil: Perfil) => Promise<void>;
}

const SUGESTOES_HABILIDADES = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'JavaScript',
  'Python',
  'AWS',
  'Docker',
  'GraphQL',
  'PostgreSQL',
  'Tailwind CSS',
  'Git & GitHub',
  'Arquitetura de Software',
  'CI/CD',
  'TDD / Testes',
];

export const SecaoPerfil: React.FC<SecaoPerfilProps> = ({
  perfil,
  onSalvarPerfil,
}) => {
  const [nome, setNome] = useState(perfil.nome || '');
  const [cargoDesejado, setCargoDesejado] = useState(perfil.cargoDesejado || '');
  const [resumoProfissional, setResumoProfissional] = useState(perfil.resumoProfissional || '');
  const [anosExperiencia, setAnosExperiencia] = useState<number | string>(perfil.anosExperiencia ?? '');
  const [habilidades, setHabilidades] = useState<string[]>(perfil.habilidades || []);
  const [novaHabilidade, setNovaHabilidade] = useState('');

  const [salvando, setSalvando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState(false);

  useEffect(() => {
    setNome(perfil.nome || '');
    setCargoDesejado(perfil.cargoDesejado || '');
    setResumoProfissional(perfil.resumoProfissional || '');
    setAnosExperiencia(perfil.anosExperiencia ?? '');
    setHabilidades(perfil.habilidades || []);
  }, [perfil]);

  const handleAdicionarHabilidade = (habilidadeParaAdicionar?: string) => {
    const valor = (habilidadeParaAdicionar || novaHabilidade).trim();
    if (!valor) return;
    if (habilidades.some((h) => h.toLowerCase() === valor.toLowerCase())) {
      setNovaHabilidade('');
      return;
    }
    setHabilidades([...habilidades, valor]);
    setNovaHabilidade('');
  };

  const handleRemoverHabilidade = (indexRemover: number) => {
    setHabilidades(habilidades.filter((_, idx) => idx !== indexRemover));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdicionarHabilidade();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setMensagemSucesso(false);

    try {
      await onSalvarPerfil({
        nome: nome.trim(),
        cargoDesejado: cargoDesejado.trim(),
        resumoProfissional: resumoProfissional.trim(),
        anosExperiencia: anosExperiencia === '' ? '' : Number(anosExperiencia),
        habilidades,
      });

      setMensagemSucesso(true);
      setTimeout(() => {
        setMensagemSucesso(false);
      }, 4000);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Cabeçalho da Seção */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
              Meu Perfil Profissional
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Mantenha suas informações profissionais e stack técnica atualizadas para guiar sua busca por vagas.
            </p>
          </div>

          {mensagemSucesso && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800 transition-all animate-fadeIn">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Perfil salvo com sucesso no navegador!</span>
            </div>
          )}
        </div>
      </div>

      {/* Formulário do Perfil */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-3 dark:border-slate-800">
            <User className="h-5 w-5 text-blue-600" />
            <span>Dados Principais</span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="perfil-nome" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Nome completo
              </label>
              <input
                id="perfil-nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: Mariana Silva"
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm transition-colors focus:border-blue-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="perfil-cargo" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Cargo desejado
              </label>
              <div className="relative mt-1.5">
                <input
                  id="perfil-cargo"
                  type="text"
                  value={cargoDesejado}
                  onChange={(e) => setCargoDesejado(e.target.value)}
                  placeholder="Ex.: Senior Full Stack Engineer / Tech Lead"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm transition-colors focus:border-blue-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="perfil-experiencia" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Anos de experiência na área
              </label>
              <div className="relative mt-1.5">
                <input
                  id="perfil-experiencia"
                  type="number"
                  min="0"
                  max="50"
                  step="0.5"
                  value={anosExperiencia}
                  onChange={(e) => setAnosExperiencia(e.target.value)}
                  placeholder="Ex.: 6"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm transition-colors focus:border-blue-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="perfil-resumo" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Resumo profissional (Pitch & Apresentação)
              </label>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Síntese do seu perfil para rápido acesso durante candidaturas.
              </p>
            </div>
          </div>

          <div>
            <textarea
              id="perfil-resumo"
              rows={4}
              value={resumoProfissional}
              onChange={(e) => setResumoProfissional(e.target.value)}
              placeholder="Descreva suas principais conquistas, tecnologias de domínio, foco em negócios e momentos de impacto..."
              className="mt-1 w-full rounded-xl border border-slate-300 p-3 text-sm transition-colors focus:border-blue-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Habilidades / Tags */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <Award className="h-5 w-5 text-purple-600" />
              <span>Habilidades Técnicas & Competências</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {habilidades.length} {habilidades.length === 1 ? 'habilidade' : 'habilidades'}
            </span>
          </div>

          {/* Campo para adicionar nova habilidade */}
          <div>
            <label htmlFor="nova-habilidade" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Adicionar nova habilidade
            </label>
            <div className="mt-1.5 flex gap-2">
              <input
                id="nova-habilidade"
                type="text"
                value={novaHabilidade}
                onChange={(e) => setNovaHabilidade(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite a tecnologia ou soft skill e aperte Enter (ex: React, Golang, Kubernetes)"
                className="flex-1 rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm transition-colors focus:border-blue-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => handleAdicionarHabilidade()}
                className="flex items-center gap-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>Adicionar</span>
              </button>
            </div>
          </div>

          {/* Lista de tags cadastradas */}
          <div>
            <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Habilidades no seu perfil (clique no "x" para remover individualmente):
            </span>
            {habilidades.length === 0 ? (
              <p className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-xs text-slate-400 dark:border-slate-700">
                Nenhuma habilidade cadastrada ainda. Adicione acima ou clique nas sugestões abaixo.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {habilidades.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="group inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-900 dark:border-purple-800 dark:bg-purple-950/60 dark:text-purple-200"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoverHabilidade(index)}
                      className="rounded-full p-0.5 text-purple-400 hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-white transition-colors"
                      title={`Remover ${tag}`}
                      aria-label={`Remover ${tag}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sugestões rápidas de tech stack */}
          <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Sugestões rápidas para adicionar com um clique:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SUGESTOES_HABILIDADES.filter(
                (sug) => !habilidades.some((h) => h.toLowerCase() === sug.toLowerCase())
              ).map((sugestao) => (
                <button
                  key={sugestao}
                  type="button"
                  onClick={() => handleAdicionarHabilidade(sugestao)}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750 transition-colors"
                >
                  + {sugestao}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Botão de Salvar Perfil */}
        <div className="flex items-center justify-end gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Os dados serão salvos no armazenamento local do seu navegador.
          </p>
          <button
            type="submit"
            disabled={salvando}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 active:scale-98 disabled:opacity-50 transition-all"
          >
            <Save className="h-4 w-4" />
            <span>{salvando ? 'Salvando...' : 'Salvar perfil'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
