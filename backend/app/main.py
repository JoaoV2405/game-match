import asyncio
import json
from pathlib import Path
import sys

from service.ingestion_service import load_games_from_csv, load_websites_from_csv
from database.database import Database
from repositories.game_repository import PostgresRepository

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
def load_json(
    file_path: Path
) -> list[dict]:

    with open(
        file_path,
        "r",
        encoding="utf-8"
    ) as f:

        return json.load(f)
    
async def run():
    # video = load_json(path)
    url = "postgresql://postgres:postgres@localhost:5432/games"
    db = Database(url)
    rep = PostgresRepository(db)
    # games = load_websites_from_csv(csv_path)
    await rep.setup()
    print(await rep.get_game_by_id(1020))
    # print(await rep.get_game_by_slug("killer7"))
    # print(await rep.get_most_popular_games())
    # print(await rep.search_games("minecaft"))
    
if __name__ == "__main__":
     asyncio.run(run())
