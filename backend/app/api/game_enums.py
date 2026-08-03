from enum import StrEnum


class GameSort(StrEnum):
    POPULAR = "popular"
    RATING = "rating"
    RATING_COUNT = "rating_count"
    NAME_ASC = "name_asc"
    NAME_DESC = "name_desc"