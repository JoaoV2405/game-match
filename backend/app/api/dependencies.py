from contextlib import asynccontextmanager
import os
from pathlib import Path
import pickle

from fastapi import FastAPI
import pandas as pd

from app.service.model_service import ModelService
from app.database.database import Database
from app.repositories.game_repository import PostgresRepository


BASE_DIR = Path(__file__).resolve().parent.parent.parent

model_path = BASE_DIR / "modelo" / "game_embeddings.pkl"

df_path = BASE_DIR / "modelo" / "games_clean_url.csv"

POSTGRES_URL = os.getenv("DATABASE_URL")
db = Database(POSTGRES_URL)

repository = PostgresRepository(db)


def get_repository() -> PostgresRepository:
    return repository

def get_dataframe() -> pd.DataFrame:
    return pd.read_csv(df_path)
@asynccontextmanager
async def lifespan(app: FastAPI):
    
    await db.connect()

    yield

    await db.close()



app = FastAPI(lifespan=lifespan)


def get_model():
    with open(model_path, "rb") as f:
        model = pickle.load(f)

    return model

def get_model_service() -> ModelService:
    model = get_model()
    repo = get_repository()
    df = get_dataframe()
    model_service = ModelService(df=df, model=model, repository=repo)

    return model_service