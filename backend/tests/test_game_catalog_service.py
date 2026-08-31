from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from unittest import IsolatedAsyncioTestCase

from app.application.dto import Game, GameRecommendation
from app.application.services import GameCatalogService
from app.domain.enums import GameCategory, GameSort


def make_game(game_id: int = 1) -> Game:
    return Game(id=game_id, name=f"Game {game_id}", slug=f"game-{game_id}")


class FakeGameRepository:
    def __init__(self) -> None:
        self.category_call: tuple | None = None
        self.list_call: tuple | None = None
        self.search_call: tuple | None = None
        self.inserted_games: list[Game] | None = None
        self.replaced_recommendations: list[GameRecommendation] | None = None

    async def get_games_by_category(
        self, category: GameCategory, value: str, offset: int, limit: int
    ) -> list[Game]:
        self.category_call = (category, value, offset, limit)
        return [make_game()]

    async def insert_games(self, games: list[Game]) -> None:
        self.inserted_games = games

    async def get_by_id(self, game_id: int) -> Game | None:
        return make_game(game_id)

    async def get_by_slug(self, slug: str) -> Game | None:
        return make_game()

    async def replace_recommendations(
        self, recommendations: list[GameRecommendation]
    ) -> None:
        self.replaced_recommendations = recommendations

    async def get_recommendations(self, game_id: int, limit: int) -> list[Game]:
        return [make_game(game_id + 1)]

    async def search(self, title: str, limit: int, offset: int) -> list[Game]:
        self.search_call = (title, limit, offset)
        return [make_game(1), make_game(2)]

    async def get_most_popular(self, limit: int) -> list[Game]:
        return [make_game()]

    async def get_category_values(self, category: str) -> list[str]:
        return ["Action", "Adventure"]

    async def list_games(
        self,
        query: str | None,
        genres: list[str] | None,
        companies: list[str] | None,
        platforms: list[str] | None,
        sort: GameSort,
        offset: int,
        limit: int,
    ) -> tuple[list[Game], int]:
        self.list_call = (query, genres, companies, platforms, sort, offset, limit)
        return [make_game(1), make_game(2)], 101


class FakeRepositoryProvider:
    def __init__(self, repository: FakeGameRepository) -> None:
        self.repository = repository
        self.read_count = 0
        self.write_count = 0

    @asynccontextmanager
    async def read(self) -> AsyncIterator[FakeGameRepository]:
        self.read_count += 1
        yield self.repository

    @asynccontextmanager
    async def write(self) -> AsyncIterator[FakeGameRepository]:
        self.write_count += 1
        yield self.repository


class GameCatalogServiceTests(IsolatedAsyncioTestCase):
    def setUp(self) -> None:
        self.repository = FakeGameRepository()
        self.provider = FakeRepositoryProvider(self.repository)
        self.service = GameCatalogService(self.provider)

    async def test_list_games_normalizes_filters_and_builds_pagination(self) -> None:
        result = await self.service.list_games(
            query="  mario  ",
            genres=[" Action ", "", "Adventure"],
            companies=[" Nintendo "],
            platforms=["  "],
            sort=GameSort.RATING,
            page=0,
            limit=999,
        )

        self.assertEqual(
            self.repository.list_call,
            (
                "mario",
                ["Action", "Adventure"],
                ["Nintendo"],
                None,
                GameSort.RATING,
                0,
                100,
            ),
        )
        self.assertEqual(result["pagination"], {"page": 1, "limit": 100, "total": 101, "pages": 2})
        self.assertEqual([game.id for game in result["items"]], [1, 2])

    async def test_search_games_trims_query_and_calculates_offset(self) -> None:
        result = await self.service.search_games("  zelda ", page=3, limit=5)

        self.assertEqual(self.repository.search_call, ("zelda", 5, 10))
        self.assertEqual(result["pagination"], {"page": 3, "limit": 5, "total": 2, "pages": 1})

    async def test_blank_search_returns_empty_page_without_querying_repository(self) -> None:
        result = await self.service.search_games("   ", page=4, limit=0)

        self.assertEqual(result, {"items": [], "pagination": {"page": 1, "limit": 1, "total": 0, "pages": 0}})
        self.assertEqual(self.provider.read_count, 0)

    async def test_category_lookup_ignores_blank_value_and_clamps_limit(self) -> None:
        self.assertEqual(
            await self.service.get_games_by_category(GameCategory.GENRE, "   "), []
        )
        self.assertEqual(self.provider.read_count, 0)

        await self.service.get_games_by_category(
            GameCategory.GENRE, " Action ", limit=500, offset=2
        )
        self.assertEqual(
            self.repository.category_call, (GameCategory.GENRE, "Action", 2, 100)
        )

    async def test_write_use_cases_use_write_repository_context(self) -> None:
        games = [make_game()]
        recommendations = [
            GameRecommendation(game_id=1, recommended_game_id=2, score=0.9, rank=1)
        ]

        await self.service.insert_games(games)
        await self.service.replace_recommendations(recommendations)

        self.assertEqual(self.provider.write_count, 2)
        self.assertEqual(self.repository.inserted_games, games)
        self.assertEqual(self.repository.replaced_recommendations, recommendations)
