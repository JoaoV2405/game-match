import csv
from ast import literal_eval
from pathlib import Path

from app.application.dto import Game, GameWebsite


def load_games_from_csv(csv_path: Path) -> list[Game]:
    games: list[Game] = []
    with csv_path.open("r", encoding="utf-8") as file:
        for row in csv.DictReader(file):
            games.append(Game(
                id=int(row["id"]), name=row["name"], slug=row["slug"], summary=row["summary"] or None,
                rating=float(row["rating"]) if row["rating"] else None,
                rating_count=int(row["rating_count"]) if row["rating_count"] else None,
                total_rating=float(row["total_rating"]) if row["total_rating"] else None,
                total_rating_count=int(row["total_rating_count"]) if row["total_rating_count"] else None,
                cover_url=row["cover_url"] or None,
                genres=literal_eval(row["genres"]) if row["genres"] else [],
                companies=literal_eval(row["companies"]) if row["companies"] else [],
                platforms=literal_eval(row["platforms"]) if row["platforms"] else [],
            ))
    return games


def load_websites_from_csv(csv_path: Path) -> list[GameWebsite]:
    with csv_path.open("r", encoding="utf-8") as file:
        return [
            GameWebsite(game_id=int(row["game_id"]), website_type=int(row["website_type"]), url=row["url"])
            for row in csv.DictReader(file)
        ]
