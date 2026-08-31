import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv


PROJECT_ROOT = Path(__file__).resolve().parents[2]


@dataclass(frozen=True)
class Settings:
    database_url: str
    frontend_urls: list[str]
    embeddings_path: Path
    games_dataset_path: Path


def get_settings() -> Settings:
    """Load local environment files once and expose typed application settings."""
    for filename in (".env", ".env.local"):
        path = PROJECT_ROOT / filename
        if path.is_file():
            load_dotenv(path)
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL is required.")

    frontend_urls = [
        url.strip()
        for url in os.getenv("FRONTEND_URLS", "").split(",")
        if url.strip()
    ]

    return Settings(
        database_url=database_url,
        frontend_urls=frontend_urls,
        embeddings_path=PROJECT_ROOT / "modelo" / "game_embeddings.pkl",
        games_dataset_path=PROJECT_ROOT / "modelo" / "games_clean_url.csv",
    )
