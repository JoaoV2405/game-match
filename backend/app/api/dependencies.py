from contextlib import asynccontextmanager
import os
from pathlib import Path
import pickle

from fastapi import FastAPI
import pandas as pd
from dotenv import load_dotenv

from app.service.model_service import ModelService
from app.database.database import Database
from app.service.game_service import GameService


BASE_DIR = Path(__file__).resolve().parent.parent.parent

for env_filename in (".env", ".env.local"):
    dotenv_path = BASE_DIR / env_filename
    if dotenv_path.is_file():
        load_dotenv(dotenv_path=dotenv_path)

model_path = BASE_DIR / "modelo" / "game_embeddings.pkl"

df_path = BASE_DIR / "modelo" / "games_clean_url.csv"

POSTGRES_URL = os.getenv("DATABASE_URL")

database = Database(POSTGRES_URL)
game_service = GameService(database.session_factory)


def get_dataframe() -> pd.DataFrame:
    return pd.read_csv(df_path)


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    await database.close()


def get_model():
    with open(model_path, "rb") as f:
        model = pickle.load(f)

    return model


def get_service() -> GameService:
    return game_service


def get_model_service() -> ModelService:
    model = get_model()
    df = get_dataframe()
    model_service = ModelService(df=df, model=model, game_service=game_service)

    return model_service
