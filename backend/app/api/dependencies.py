from contextlib import asynccontextmanager

from fastapi import FastAPI

from database.database import Database
from repositories.game_repository import PostgresRepository


POSTGRES_URL = (
    "postgresql://postgres:postgres@localhost:5432/games"
)

db = Database(POSTGRES_URL)

repository = PostgresRepository(db)


def get_repository() -> PostgresRepository:
    return repository

@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect()

    yield

    await db.close()