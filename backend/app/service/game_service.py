from collections.abc import Sequence

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
)

from app.repositories.game_filters import FilterType, GameCategory
from app.repositories.game_repository import GameRepository
from app.schemas.game_schema import Game, GameRecommendation


class GameService:
    def __init__(
        self,
        session_factory: async_sessionmaker[AsyncSession],
    ):
        self.session_factory = session_factory
    async def get_games_by_filter(
            self,
            filter_type: GameCategory,
            value: str,
            limit: int = 10,
            offset: int = 0,
        ) -> list[Game]:
            if not value:
                return []

            limit = max(1, min(limit, 100))

            async with self.session_factory() as session:
                repository = GameRepository(session)

                games = await repository.get_games_by_filter(
                    filter_type=filter_type,
                    value=value,
                    limit=limit,
                    offset=offset,
                )
                
                return [
                    Game.model_validate(game)
                    for game in games
                ]
    async def insert_games(
        self,
        games: Sequence[Game],
    ) -> None:
        async with self.session_factory() as session:
            async with session.begin():
                repository = GameRepository(session)
                await repository.insert_games(games)

    async def get_game_by_id(
        self,
        game_id: int,
    ) -> Game | None:
        async with self.session_factory() as session:
            repository = GameRepository(session)
            model = await repository.get_by_id(game_id)

            if model is None:
                return None

            return Game.model_validate(model)

    async def get_game_by_slug(
        self,
        slug: str,
    ) -> Game | None:
        async with self.session_factory() as session:
            repository = GameRepository(session)
            model = await repository.get_by_slug(slug)

            if model is None:
                return None

            return Game.model_validate(model)

    async def replace_recommendations(
        self,
        recommendations: Sequence[GameRecommendation],
    ) -> None:
        async with self.session_factory() as session:
            async with session.begin():
                repository = GameRepository(session)
                await repository.replace_recommendations(recommendations)

    async def get_recommendations(
        self,
        game_id: int,
        limit: int = 10,
    ) -> list[Game]:
        safe_limit = max(1, min(limit, 100))

        async with self.session_factory() as session:
            repository = GameRepository(session)
            models = await repository.get_recommendations(
                game_id=game_id,
                limit=safe_limit,
            )

            return [Game.model_validate(model) for model in models]

    async def search_games(
        self,
        title: str,
        page: int = 1,
        limit: int = 20,
    ) :
        normalized_title = title.strip()

        if not normalized_title:
            return []

        safe_limit = max(1, min(limit, 100))
        page = max(page, 1)

        offset = (page - 1) * safe_limit
        async with self.session_factory() as session:
            repository = GameRepository(session)

            models = await repository.search(
                title=normalized_title,
                limit=safe_limit,
                offset=offset,
            )
        return {
                    "items": [
                        Game.model_validate(model)
                        for model in models
                    ],
                    "pagination": {
                        "page": page,
                        "limit": limit,
                        "total": len(models),
                        "pages": (
                            (len(models) + limit - 1) // limit
                        )
                    },
                }
            # return [
            #     Game.model_validate(model)
            #     for model in models
            # ]

    async def get_most_popular_games(
        self,
        limit: int = 20,
    ) -> list[Game]:
        safe_limit = max(1, min(limit, 100))

        async with self.session_factory() as session:
            repository = GameRepository(session)

            models = await repository.get_most_popular(
                limit=safe_limit,
            )

            return [
                Game.model_validate(model)
                for model in models
            ]
    async def get_filter_values(
        self,
        filter_type: FilterType,
    ) -> list[str]:
        async with self.session_factory() as session:
            repository = GameRepository(session)

            return await repository.get_filter_values(
                filter_type
            )
    
    async def list_games(
        self,
        query: str | None = None,
        genres: list[str] | None = None,
        companies: list[str] | None = None,
        platforms: list[str] | None = None,
        sort: str = "popular",
        page: int = 1,
        limit: int = 20,
    ) -> dict:
        normalized_query = (
            query.strip()
            if query and query.strip()
            else None
        )

        normalized_genres = self._normalize_values(
            genres
        )

        normalized_companies = self._normalize_values(
            companies
        )

        normalized_platforms = self._normalize_values(
            platforms
        )

        page = max(page, 1)
        limit = max(1, min(limit, 100))

        offset = (page - 1) * limit

        async with self.session_factory() as session:
            repository = GameRepository(session)

            models, total = await repository.list_games(
                query=normalized_query,
                genres=normalized_genres,
                companies=normalized_companies,
                platforms=normalized_platforms,
                sort=sort,
                offset=offset,
                limit=limit,
            )

        return {
            "items": [
                Game.model_validate(model)
                for model in models
            ],
            "pagination": {
                "page": page,
                "limit": limit,
                "total": total,
                "pages": (
                    (total + limit - 1) // limit
                ),
            },
        }

    @staticmethod
    def _normalize_values(
        values: list[str] | None,
    ) -> list[str] | None:
        if not values:
            return None

        normalized = [
            value.strip()
            for value in values
            if value.strip()
        ]

        return normalized or None
