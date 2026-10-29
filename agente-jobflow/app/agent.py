# ruff: noqa
"""Ponto de entrada do agente ADK."""

from google.adk.agents import Agent
from google.adk.apps import App
from google.adk.models import Gemini
from google.genai import types

from app.config import ANALISES_DIR, MODEL, SKILL_DIR
from app.prompt import obter_instrucao
from app.tools import FerramentasDeArquivo, carregar_skill, criar_ferramentas_arquivo

# Instanciação das ferramentas e skill
skill, skill_toolset = carregar_skill()
file_toolset = criar_ferramentas_arquivo()

# Definição do root_agent
root_agent = Agent(
    name="agente_jobflow",
    model=Gemini(
        model=MODEL,
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction=obter_instrucao,
    tools=[skill_toolset, file_toolset],
)

# App exposto para o ADK Web
app = App(
    root_agent=root_agent,
    name="app",
)

__all__ = [
    "ANALISES_DIR",
    "FerramentasDeArquivo",
    "MODEL",
    "SKILL_DIR",
    "app",
    "file_toolset",
    "obter_instrucao",
    "root_agent",
    "skill",
]
