from pydantic import BaseModel, ConfigDict, Field


class GameWebsite(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    game_id: int
    website_type: int
    url: str


class Game(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    summary: str | None = None
    rating: float | None = None
    rating_count: int | None = None
    total_rating: float | None = None
    total_rating_count: int | None = None
    cover_url: str | None = None
    genres: list[str] = Field(default_factory=list)
    companies: list[str] = Field(default_factory=list)
    platforms: list[str] = Field(default_factory=list)
    websites: list[GameWebsite] = Field(default_factory=list)
    video_id: str | None = None


class GameRecommendation(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    game_id: int
    recommended_game_id: int
    score: float
    rank: int


class GameCategoryGroup(BaseModel):
    category: str
    games: list[Game] = Field(default_factory=list)
