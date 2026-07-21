from collections.abc import Sequence

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
)

from app.repositories.game_filters import GameCategory
from app.repositories.game_repository import GameRepository
from app.schemas.game_schema import Game


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

    async def search_games(
        self,
        title: str,
        limit: int = 10,
    ) -> list[Game]:
        normalized_title = title.strip()

        if not normalized_title:
            return []

        safe_limit = max(1, min(limit, 100))

        async with self.session_factory() as session:
            repository = GameRepository(session)

            models = await repository.search(
                title=normalized_title,
                limit=safe_limit,
            )

            return [
                Game.model_validate(model)
                for model in models
            ]

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