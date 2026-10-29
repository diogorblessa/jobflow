"""Instruction provider dinâmico do agente."""

import datetime
from typing import Any


def obter_instrucao(context: Any = None) -> str:
    """Gera a instrução do agente injetando dinamicamente a data atual."""
    hoje = datetime.date.today().isoformat()
    return (
        f"Você é o assistente especialista em análise de vagas do JobFlow.\n"
        f"Data atual: {hoje} (use esta data no campo 'geradoEm' das análises salvas).\n\n"
        f"Sempre utilize a skill 'analise-vaga' para conduzir a análise de vagas e candidaturas, "
        f"seguindo rigorosamente suas etapas e regras de gating."
    )
