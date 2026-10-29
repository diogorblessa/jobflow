"""Configurações e caminhos do agente-jobflow."""

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BASE_DIR.parent
SKILL_DIR = BASE_DIR / "skills" / "analise-vaga"
ANALISES_DIR = PROJECT_DIR / "analises"

# Garante a existência do diretório de persistência de análises
os.makedirs(ANALISES_DIR, exist_ok=True)

MODEL = os.getenv("MODEL", "gemini-3.8-flash")
