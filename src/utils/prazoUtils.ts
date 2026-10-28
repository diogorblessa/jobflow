/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AvisoPrazoInfo } from '../types/index.ts';

/**
 * Retorna a data atual no formato YYYY-MM-DD considerando o fuso horário local.
 */
export function obterDataHojeISO(): string {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

/**
 * Converte data no formato YYYY-MM-DD para DD/MM/AAAA.
 */
export function formatarDataBR(dataISO?: string): string {
  if (!dataISO) return '';
  const partes = dataISO.split('-');
  if (partes.length !== 3) return dataISO;
  const [ano, mes, dia] = partes;
  return `${dia}/${mes}/${ano}`;
}

/**
 * Isola o cálculo das regras do aviso de prazo da próxima etapa:
 * - sem prazo: não exibir aviso (retorna null);
 * - prazo com mais de 3 dias: exibir a data de forma neutra, com os dias restantes;
 * - prazo em 3 dias ou menos, incluindo hoje: destaque de atenção (ex.: "Vence hoje", "Faltam 2 dias");
 * - prazo vencido: destaque de alerta (ex.: "Vencido há 1 dia").
 */
export function calcularAvisoPrazo(prazoISO?: string): AvisoPrazoInfo | null {
  if (!prazoISO || prazoISO.trim() === '') {
    return null;
  }

  const partes = prazoISO.split('-');
  if (partes.length !== 3) {
    return null;
  }

  const ano = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const dia = parseInt(partes[2], 10);

  if (isNaN(ano) || isNaN(mes) || isNaN(dia)) {
    return null;
  }

  const agora = new Date();
  const hojeMeiaNoite = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate()).getTime();
  const dataAlvoMeiaNoite = new Date(ano, mes, dia).getTime();

  const milissegundosPorDia = 1000 * 60 * 60 * 24;
  const diferencaDias = Math.round((dataAlvoMeiaNoite - hojeMeiaNoite) / milissegundosPorDia);

  const dataFormatada = formatarDataBR(prazoISO);

  // Prazo vencido: destaque de alerta
  if (diferencaDias < 0) {
    const diasVencidos = Math.abs(diferencaDias);
    return {
      tipo: 'alerta',
      diasRestantes: diferencaDias,
      dataFormatada,
      texto: diasVencidos === 1 ? 'Vencido há 1 dia' : `Vencido há ${diasVencidos} dias`,
    };
  }

  // Prazo em 3 dias ou menos, incluindo hoje: destaque de atenção
  if (diferencaDias <= 3) {
    let texto = '';
    if (diferencaDias === 0) {
      texto = 'Vence hoje';
    } else if (diferencaDias === 1) {
      texto = 'Falta 1 dia';
    } else {
      texto = `Faltam ${diferencaDias} dias`;
    }

    return {
      tipo: 'atencao',
      diasRestantes: diferencaDias,
      dataFormatada,
      texto,
    };
  }

  // Prazo com mais de 3 dias: exibir a data de forma neutra, com os dias restantes
  return {
    tipo: 'neutro',
    diasRestantes: diferencaDias,
    dataFormatada,
    texto: `Em ${diferencaDias} dias (${dataFormatada})`,
  };
}
