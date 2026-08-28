"""Recalculate and persist game recommendations from the current model."""

import asyncio
import os
from pathlib import Path
import pickle
import selectors

import pandas as pd
from dotenv import load_dotenv

from app.database.database import Database
from app.service.game_service import GameService
from app.service.model_service import ModelService


PROJECT_ROOT = Path(__file__).resolve().parent.parent
for env_filename in (".env", ".env.local"):
    dotenv_path = PROJECT_ROOT / env_filename
    if dotenv_path.is_file():
        load_dotenv(dotenv_path=dotenv_path)


async def main() -> None:
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL is required.")

    with (PROJECT_ROOT / "modelo" / "game_embeddings.pkl").open("rb") as file:
        model = pickle.load(file)

    dataframe = pd.read_csv(PROJECT_ROOT / "modelo" / "games_clean_url.csv")
    database = Database(database_url)
    service = ModelService(
        model=model,
        df=dataframe,
        game_service=GameService(database.session_factory),
    )

    try:
        total = await service.refresh_recommendations()
        print(f"{total} recommendations saved.")
    finally:
        await database.close()


if __name__ == "__main__":
    if os.name == "nt":
        asyncio.run(
            main(),
            loop_factory=lambda: asyncio.SelectorEventLoop(
                selectors.SelectSelector()
            ),
        )
    else:
        asyncio.run(main())
