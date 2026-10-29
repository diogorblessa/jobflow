"""Definição e carregamento das ferramentas do agente."""

from google.adk.environment import LocalEnvironment
from google.adk.skills import Skill, load_skill_from_dir
from google.adk.tools.environment import EnvironmentToolset
from google.adk.tools.skill_toolset import SkillToolset

from app.config import ANALISES_DIR, SKILL_DIR


class FerramentasDeArquivo(EnvironmentToolset):
    """Toolset de ambiente restrito estritamente a ReadFile e WriteFile."""

    async def get_tools(self, readonly_context=None):
        tools = await super().get_tools(readonly_context)
        return [t for t in tools if t.name in ("ReadFile", "WriteFile")]


def carregar_skill() -> tuple[Skill, SkillToolset]:
    """Carrega a skill analise-vaga e instancia seu SkillToolset."""
    skill = load_skill_from_dir(str(SKILL_DIR))
    return skill, SkillToolset(skills=[skill])


def criar_ferramentas_arquivo() -> FerramentasDeArquivo:
    """Instancia o toolset de arquivos apontando para o diretório de análises."""
    return FerramentasDeArquivo(
        environment=LocalEnvironment(working_dir=str(ANALISES_DIR))
    )
