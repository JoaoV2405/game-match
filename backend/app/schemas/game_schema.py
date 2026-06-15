
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class GameRequestDTO:
    id: str
    name: str
    slug: str


@dataclass(slots=True)
class GameWebsite:
    game_id: int
    website_type: int
    url:str

@dataclass(slots=True)
class Game:
    id: int

    name: str

    slug: str

    summary: Optional[str] = None

    rating: Optional[float] = None

    rating_count: Optional[int] = None

    total_rating: Optional[float] = None

    total_rating_count: Optional[int] = None

    cover_url: Optional[str] = None

    video_id:Optional[str] = None

    websites:Optional[list[GameWebsite]] = field(default_factory=list)

    genres: list[str] = field(default_factory=list)

    companies: list[str] = field(default_factory=list)

    platforms: list[str] = field(default_factory=list)
