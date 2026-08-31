import asyncio
import os
from pathlib import Path
import pickle
import selectors

import pandas as pd
from dotenv import load_dotenv

from app.application.services import GameCatalogService, RecommendationService
from app.core.config import get_settings
from app.infrastructure.database import Database
from app.infrastructure.persistence import SqlAlchemyGameRepositoryProvider


PROJECT_ROOT = Path(__file__).resolve().parent.parent
for env_filename in (".env", ".env.local"):
    dotenv_path = PROJECT_ROOT / env_filename
    if dotenv_path.is_file():
        load_dotenv(dotenv_path=dotenv_path)


async def main() -> None:
    settings = get_settings()

    with settings.embeddings_path.open("rb") as file:
        model = pickle.load(file)

    dataframe = pd.read_csv(settings.games_dataset_path)
    database = Database(settings.database_url)
    catalog = GameCatalogService(SqlAlchemyGameRepositoryProvider(database.session_factory))
    service = RecommendationService(
        model=model,
        dataframe=dataframe,
        catalog=catalog,
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
