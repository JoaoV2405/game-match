from pathlib import Path
from typing import List
from ast import literal_eval
import csv

from schemas.game_schema import Game, GameWebsite


def load_games_from_csv(csv_path: Path) -> List[Game]:
    games: List[Game] = []

    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)

        for row in reader:
            games.append(
                Game(
                    id=int(row["id"]),
                    name=row["name"],
                    slug=row["slug"],
                    summary=row["summary"] or None,
                    rating=float(row["rating"]) if row["rating"] else None,
                    rating_count=int(row["rating_count"]) if row["rating_count"] else None,
                    total_rating=float(row["total_rating"]) if row["total_rating"] else None,
                    total_rating_count=int(row["total_rating_count"])
                    if row["total_rating_count"]
                    else None,
                    cover_url=row["cover_url"] or None,
                    genres=literal_eval(row["genres"])
                    if row["genres"]
                    else [],
                    companies=literal_eval(row["companies"])
                    if row["companies"]
                    else [],
                    platforms=literal_eval(row["platforms"])
                    if row["platforms"]
                    else [],
                )
            )

    return games



def load_websites_from_csv(csv_path: Path) -> List[GameWebsite]:
    websites: List[GameWebsite] = []

    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)

        for row in reader:
            websites.append(
                GameWebsite(
                    game_id=int(row["game_id"]),
                    website_type=int(row["website_type"]),
                    url=row["url"],
                )
            )

    return websites