"""SQLAlchemy query fragments for the game catalog persistence adapter."""

from sqlalchemy import ColumnElement

from app.domain.enums import GameSort
from app.infrastructure.database.models import GameModel


def build_filter_conditions(
    query: str | None, genres: list[str] | None, companies: list[str] | None, platforms: list[str] | None
) -> list[ColumnElement[bool]]:
    conditions: list[ColumnElement[bool]] = []
    if query:
        conditions.append(GameModel.name.ilike(f"%{query}%"))
    if genres:
        conditions.append(GameModel.genres.overlap(genres))
    if companies:
        conditions.append(GameModel.companies.overlap(companies))
    if platforms:
        conditions.append(GameModel.platforms.overlap(platforms))
    return conditions


def get_order_by(sort: GameSort):
    options = {
        GameSort.POPULAR: (GameModel.total_rating_count.desc().nulls_last(), GameModel.total_rating.desc().nulls_last()),
        GameSort.RATING: (GameModel.total_rating.desc().nulls_last(), GameModel.total_rating_count.desc().nulls_last()),
        GameSort.RATING_COUNT: (GameModel.total_rating_count.desc().nulls_last(),),
        GameSort.NAME_ASC: (GameModel.name.asc(),),
        GameSort.NAME_DESC: (GameModel.name.desc(),),
    }
    return options[sort]
