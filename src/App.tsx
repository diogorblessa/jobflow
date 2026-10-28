/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { ListaCandidaturas } from './components/ListaCandidaturas.tsx';
import { SecaoPerfil } from './components/SecaoPerfil.tsx';
import { FormularioCandidaturaModal } from './components/FormularioCandidaturaModal.tsx';
import { ModalConfirmacaoExclusao } from './components/ModalConfirmacaoExclusao.tsx';
import { Candidatura, Perfil } from './types/index.ts';
import { storageService } from './services/storageService.ts';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState<'candidaturas' | 'perfil'>('candidaturas');
  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
  const [perfil, setPerfil] = useState<Perfil>({
    nome: '',
    cargoDesejado: '',
    resumoProfissional: '',
    habilidades: [],
    anosExperiencia: '',
  });
  const [carregando, setCarregando] = useState(true);

  // Controle dos modais
  const [modalFormAberto, setModalFormAberto] = useState(false);
  const [candidaturaEmEdicao, setCandidaturaEmEdicao] = useState<Candidatura | null>(null);

  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false);
  const [candidaturaParaExcluir, setCandidaturaParaExcluir] = useState<Candidatura | null>(null);

  // Toast Feedback
  const [toastMensagem, setToastMensagem] = useState<{ texto: string; tipo: 'sucesso' | 'erro' } | null>(null);

  const exibirToast = useCallback((texto: string, tipo: 'sucesso' | 'erro' = 'sucesso') => {
    setToastMensagem({ texto, tipo });
    setTimeout(() => {
      setToastMensagem(null);
    }, 3500);
  }, []);

  // Carrega os dados iniciais do serviço de armazenamento
  const carregarDados = useCallback(async () => {
    setCarregando(true);
    try {
      const [lista, dadosPerfil] = await Promise.all([
        storageService.listarCandidaturas(),
        storageService.obterPerfil(),
      ]);
      setCandidaturas(lista);
      setPerfil(dadosPerfil);
    } catch (e) {
      console.error('Erro ao carregar dados do JobFlow', e);
      exibirToast('Erro ao carregar dados salvos.', 'erro');
    } finally {
      setCarregando(false);
    }
  }, [exibirToast]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  // Abertura para criação
  const handleAbrirNovaCandidatura = () => {
    setCandidaturaEmEdicao(null);
    setModalFormAberto(true);
  };

  // Abertura para edição
  const handleAbrirEdicao = (candidatura: Candidatura) => {
    setCandidaturaEmEdicao(candidatura);
    setModalFormAberto(true);
  };

  // Salvar candidatura (criação ou atualização)
  const handleSalvarCandidatura = async (
    dados: Omit<Candidatura, 'id' | 'criadoEm' | 'atualizadoEm'>
  ) => {
    try {
      if (candidaturaEmEdicao) {
        const atualizada = await storageService.atualizarCandidatura(
          candidaturaEmEdicao.id,
          dados
        );
        setCandidaturas((prev) =>
          prev.map((c) => (c.id === atualizada.id ? atualizada : c))
        );
        exibirToast(`Candidatura na ${atualizada.empresa} atualizada com sucesso!`);
      } else {
        const nova = await storageService.criarCandidatura(dados);
        setCandidaturas((prev) => [nova, ...prev]);
        exibirToast(`Candidatura na ${nova.empresa} cadastrada com sucesso!`);
      }
      setModalFormAberto(false);
      setCandidaturaEmEdicao(null);
    } catch (e) {
      console.error('Erro ao salvar candidatura', e);
      exibirToast('Não foi possível salvar a candidatura.', 'erro');
    }
  };

  // Solicitar exclusão (abre o modal de confirmação)
  const handleSolicitarExclusao = (candidatura: Candidatura) => {
    setCandidaturaParaExcluir(candidatura);
    setModalExclusaoAberto(true);
  };

  // Confirmar exclusão efetiva
  const handleConfirmarExclusao = async () => {
    if (!candidaturaParaExcluir) return;
    try {
      await storageService.excluirCandidatura(candidaturaParaExcluir.id);
      setCandidaturas((prev) => prev.filter((c) => c.id !== candidaturaParaExcluir.id));
      exibirToast(`Candidatura na ${candidaturaParaExcluir.empresa} excluída.`);
    } catch (e) {
      console.error('Erro ao excluir candidatura', e);
      exibirToast('Erro ao excluir a candidatura.', 'erro');
    } finally {
      setModalExclusaoAberto(false);
      setCandidaturaParaExcluir(null);
    }
  };

  // Salvar perfil
  const handleSalvarPerfil = async (novoPerfil: Perfil) => {
    const salvo = await storageService.salvarPerfil(novoPerfil);
    setPerfil(salvo);
    exibirToast('Perfil profissional salvo com sucesso no navegador!');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 flex flex-col justify-between">
      <div>
        {/* Barra de Navegação */}
        <Navbar
          abaAtiva={abaAtiva}
          onMudarAba={setAbaAtiva}
          totalCandidaturas={candidaturas.length}
          onAbrirNovaCandidatura={handleAbrirNovaCandidatura}
        />

        {/* Notificação Toast Flutuante */}
        {toastMensagem && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl dark:bg-white dark:text-slate-900 animate-slideUp">
            {toastMensagem.tipo === 'sucesso' ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 dark:text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-400 dark:text-rose-600 shrink-0" />
            )}
            <span>{toastMensagem.texto}</span>
          </div>
        )}

        {/* Conteúdo Principal */}
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {carregando ? (
            <div className="flex h-64 items-center justify-center">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                <span className="text-sm">Carregando suas candidaturas...</span>
              </div>
            </div>
          ) : (
            <>
              {abaAtiva === 'candidaturas' && (
                <ListaCandidaturas
                  candidaturas={candidaturas}
                  onNovaCandidatura={handleAbrirNovaCandidatura}
                  onEditarCandidatura={handleAbrirEdicao}
                  onSolicitarExclusao={handleSolicitarExclusao}
                />
              )}

              {abaAtiva === 'perfil' && (
                <SecaoPerfil
                  perfil={perfil}
                  onSalvarPerfil={handleSalvarPerfil}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Rodapé Simples e Limpo */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <div className="mx-auto max-w-7xl px-4">
          <p>
            <strong>JobFlow</strong> • Gestor de candidaturas para profissionais de tecnologia. Seus dados são salvos com segurança no seu navegador.
          </p>
        </div>
      </footer>

      {/* Modal de Formulário (Criar / Editar) */}
      <FormularioCandidaturaModal
        aberto={modalFormAberto}
        candidaturaEdicao={candidaturaEmEdicao}
        onFechar={() => {
          setModalFormAberto(false);
          setCandidaturaEmEdicao(null);
        }}
        onSalvar={handleSalvarCandidatura}
      />

      {/* Modal de Confirmação de Exclusão */}
      <ModalConfirmacaoExclusao
        aberto={modalExclusaoAberto}
        candidatura={candidaturaParaExcluir}
        onFechar={() => {
          setModalExclusaoAberto(false);
          setCandidaturaParaExcluir(null);
        }}
        onConfirmar={handleConfirmarExclusao}
      />
    </div>
  );
}
