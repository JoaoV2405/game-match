from dataclasses import dataclass


@dataclass
class CreateGameDTO:
    id: str
    name: str
    slug: str


@dataclass
class GameDTO:
    id: str
    name: str
    slug: str
    description: str | None = None
