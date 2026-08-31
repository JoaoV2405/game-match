from enum import StrEnum
from typing import Literal


class GameSort(StrEnum):
    POPULAR = "popular"
    RATING = "rating"
    RATING_COUNT = "rating_count"
    NAME_ASC = "name_asc"
    NAME_DESC = "name_desc"


class GameCategory(StrEnum):
    GENRE = "genres"
    COMPANY = "companies"
    PLATFORM = "platforms"


GameCategoryValue = Literal["genres", "companies", "platforms"]
