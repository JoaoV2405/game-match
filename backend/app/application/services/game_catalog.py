from collections.abc import Sequence

from app.application.dto import Game, GameRecommendation
from app.application.ports import GameRepositoryProvider
from app.domain.enums import GameCategory, GameSort


class GameCatalogService:
    """Application use cases for browsing and maintaining the game catalog."""

    def __init__(self, repositories: GameRepositoryProvider) -> None:
        self.repositories = repositories

    async def get_games_by_category(
        self, category: GameCategory, value: str, limit: int = 10, offset: int = 0
    ) -> list[Game]:
        if not value.strip():
            return []
        async with self.repositories.read() as repository:
            return await repository.get_games_by_category(
                category, value.strip(), offset, self._limit(limit)
            )

    async def insert_games(self, games: Sequence[Game]) -> None:
        async with self.repositories.write() as repository:
            await repository.insert_games(games)

    async def get_game_by_id(self, game_id: int) -> Game | None:
        async with self.repositories.read() as repository:
            return await repository.get_by_id(game_id)

    async def get_game_by_slug(self, slug: str) -> Game | None:
        async with self.repositories.read() as repository:
            return await repository.get_by_slug(slug)

    async def replace_recommendations(
        self, recommendations: Sequence[GameRecommendation]
    ) -> None:
        async with self.repositories.write() as repository:
            await repository.replace_recommendations(recommendations)

    async def get_recommendations(self, game_id: int, limit: int = 10) -> list[Game]:
        async with self.repositories.read() as repository:
            return await repository.get_recommendations(game_id, self._limit(limit))

    async def search_games(self, title: str, page: int = 1, limit: int = 20) -> dict:
        normalized_title = title.strip()
        if not normalized_title:
            return self._page([], page=1, limit=self._limit(limit), total=0)

        safe_limit = self._limit(limit)
        page = max(page, 1)
        async with self.repositories.read() as repository:
            games = await repository.search(
                normalized_title, safe_limit, (page - 1) * safe_limit
            )
        # Search currently has no separate total query; preserve its API semantics.
        return self._page(games, page=page, limit=safe_limit, total=len(games))

    async def get_most_popular_games(self, limit: int = 20) -> list[Game]:
        async with self.repositories.read() as repository:
            return await repository.get_most_popular(self._limit(limit))

    async def get_category_values(self, category: GameCategory) -> list[str]:
        async with self.repositories.read() as repository:
            return await repository.get_category_values(category.value)

    async def list_games(
        self,
        query: str | None = None,
        genres: list[str] | None = None,
        companies: list[str] | None = None,
        platforms: list[str] | None = None,
        sort: GameSort = GameSort.POPULAR,
        page: int = 1,
        limit: int = 20,
    ) -> dict:
        safe_limit = self._limit(limit)
        page = max(page, 1)
        async with self.repositories.read() as repository:
            games, total = await repository.list_games(
                query.strip() if query and query.strip() else None,
                self._normalize_values(genres),
                self._normalize_values(companies),
                self._normalize_values(platforms),
                sort,
                (page - 1) * safe_limit,
                safe_limit,
            )
        return self._page(games, page=page, limit=safe_limit, total=total)

    @staticmethod
    def _limit(limit: int) -> int:
        return max(1, min(limit, 100))

    @staticmethod
    def _normalize_values(values: list[str] | None) -> list[str] | None:
        if not values:
            return None
        normalized = [value.strip() for value in values if value.strip()]
        return normalized or None

    @staticmethod
    def _page(items: list[Game], page: int, limit: int, total: int) -> dict:
        return {
            "items": items,
            "pagination": {
                "page": page,
                "limit": limit,
                "total": total,
                "pages": (total + limit - 1) // limit,
            },
        }
