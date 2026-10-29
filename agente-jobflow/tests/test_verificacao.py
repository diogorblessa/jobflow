import asyncio
import datetime
import os
import pytest

from app.agent import (
    ANALISES_DIR,
    MODEL,
    file_toolset,
    obter_instrucao,
    root_agent,
    skill,
)


def test_pasta_analises_criada():
    """Garante que a pasta analises/ existe."""
    assert os.path.isdir(ANALISES_DIR), f"Diretório {ANALISES_DIR} não existe."


def test_modelo_padrao_ou_env():
    """Garante que o modelo é lido da variável MODEL ou usa padrão."""
    assert MODEL in ("gemini-3.8-flash", os.getenv("MODEL")), f"Modelo inesperado: {MODEL}"
    assert root_agent.model.model == MODEL


def test_instrucao_contem_data_atual():
    """Garante que a instrução gerada dinamicamente contém a data de hoje."""
    hoje = datetime.date.today().isoformat()
    instrucao = obter_instrucao()
    assert hoje in instrucao, f"Data {hoje} não encontrada na instrução: {instrucao}"


def test_skill_carregada_com_sucesso():
    """Garante que a skill analise-vaga foi carregada e possui metadados corretos."""
    assert skill.name == "analise-vaga"
    assert "Analisa uma candidatura do JobFlow" in skill.description


@pytest.mark.asyncio
async def test_ferramentas_de_arquivo_apenas_read_e_write():
    """Garante que o FerramentasDeArquivo expõe estritamente ReadFile e WriteFile."""
    tools = await file_toolset.get_tools()
    nomes_tools = sorted([t.name for t in tools])
    assert nomes_tools == ["ReadFile", "WriteFile"], f"Ferramentas inesperadas: {nomes_tools}"
