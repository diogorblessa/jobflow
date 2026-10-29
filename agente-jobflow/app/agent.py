# ruff: noqa
# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import datetime
import os
from pathlib import Path

from google.adk.agents import Agent
from google.adk.apps import App
from google.adk.environment import LocalEnvironment
from google.adk.models import Gemini
from google.adk.skills import load_skill_from_dir
from google.adk.tools.environment import EnvironmentToolset
from google.adk.tools.skill_toolset import SkillToolset
from google.genai import types

BASE_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BASE_DIR.parent
SKILL_DIR = BASE_DIR / "skills" / "analise-vaga"
ANALISES_DIR = PROJECT_DIR / "analises"

os.makedirs(ANALISES_DIR, exist_ok=True)

MODEL = os.getenv("MODEL", "gemini-3.8-flash")


class FerramentasDeArquivo(EnvironmentToolset):
    async def get_tools(self, readonly_context=None):
        tools = await super().get_tools(readonly_context)
        return [t for t in tools if t.name in ("ReadFile", "WriteFile")]


def obter_instrucao(context=None) -> str:
    hoje = datetime.date.today().isoformat()
    return (
        f"Você é o assistente especialista em análise de vagas do JobFlow.\n"
        f"Data atual: {hoje} (use esta data no campo 'geradoEm' das análises salvas).\n\n"
        f"Sempre utilize a skill 'analise-vaga' para conduzir a análise de vagas e candidaturas, "
        f"seguindo rigorosamente suas etapas e regras de gating."
    )


skill = load_skill_from_dir(str(SKILL_DIR))
skill_toolset = SkillToolset(skills=[skill])
file_toolset = FerramentasDeArquivo(
    environment=LocalEnvironment(working_dir=str(ANALISES_DIR))
)

root_agent = Agent(
    name="agente_jobflow",
    model=Gemini(
        model=MODEL,
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction=obter_instrucao,
    tools=[skill_toolset, file_toolset],
)

app = App(
    root_agent=root_agent,
    name="app",
)
