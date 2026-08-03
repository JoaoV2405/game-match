from enum import StrEnum
from typing import Literal

from app.models.models import GameModel


class GameCategory(StrEnum):
    GENRE = "genres"
    COMPANY = "companies"
    PLATFORM = "platforms"

FilterType = Literal[
    "genres",
    "companies",
    "platforms",
]

def get_filter_conditions(
        query: str | None = None,
        genres: list[str] | None = None,
        companies: list[str] | None = None,
        platforms: list[str] | None = None,
    ):
    conditions = []

    if query:
        conditions.append(
            GameModel.name.ilike(f"%{query}%")
        )

    if genres:
        conditions.append(
            GameModel.genres.overlap(genres)
        )

    if companies:
        conditions.append(
            GameModel.companies.overlap(companies)
        )

    if platforms:
        conditions.append(
            GameModel.platforms.overlap(platforms)
        )
    return conditions
        
def get_order_by(
        sort: str = "popular",
    ):

    order_options = {
        "popular": (
            GameModel.total_rating_count.desc().nulls_last(),
            GameModel.total_rating.desc().nulls_last(),
        ),
        "rating": (
            GameModel.total_rating.desc().nulls_last(),
            GameModel.total_rating_count.desc().nulls_last(),
        ),
        "rating_count": (
            GameModel.total_rating_count.desc().nulls_last(),
        ),
        "name_asc": (
            GameModel.name.asc(),
        ),
        "name_desc": (
            GameModel.name.desc(),
        ),
    }

    order_by = order_options.get(
        sort,
        order_options["popular"],
    )

    return order_by