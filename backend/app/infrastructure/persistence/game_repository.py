from collections.abc import AsyncIterator, Sequence
from contextlib import asynccontextmanager

from sqlalchemy import delete, func, select
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker
from sqlalchemy.orm import selectinload

from app.application.dto import Game, GameRecommendation
from app.domain.enums import GameCategory, GameCategoryValue, GameSort
from app.infrastructure.database.models import GameModel, GameRecommendationModel, GameWebsiteModel
from app.infrastructure.persistence.game_queries import build_filter_conditions, get_order_by


class SqlAlchemyGameRepositoryProvider:
    """Creates repositories and defines transaction boundaries for each use case."""

    def __init__(self, session_factory: async_sessionmaker[AsyncSession]) -> None:
        self.session_factory = session_factory

    @asynccontextmanager
    async def read(self) -> AsyncIterator[SqlAlchemyGameRepository]:
        async with self.session_factory() as session:
            yield SqlAlchemyGameRepository(session)

    @asynccontextmanager
    async def write(self) -> AsyncIterator[SqlAlchemyGameRepository]:
        async with self.session_factory() as session:
            async with session.begin():
                yield SqlAlchemyGameRepository(session)


class SqlAlchemyGameRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def insert_games(self, games: Sequence[Game]) -> None:
        if not games:
            return
        game_values = [
            {key: getattr(game, key) for key in ("id", "name", "slug", "summary", "rating", "rating_count", "total_rating", "total_rating_count", "cover_url", "video_id")}
            | {"genres": game.genres or [], "companies": game.companies or [], "platforms": game.platforms or []}
            for game in games
        ]
        await self.session.execute(pg_insert(GameModel).values(game_values).on_conflict_do_nothing(index_elements=[GameModel.id]))

        website_values = [
            {"game_id": game.id, "website_type": website.website_type, "url": website.url}
            for game in games for website in game.websites
        ]
        if website_values:
            statement = pg_insert(GameWebsiteModel).values(website_values).on_conflict_do_nothing(
                index_elements=[GameWebsiteModel.game_id, GameWebsiteModel.website_type, GameWebsiteModel.url]
            )
            await self.session.execute(statement)

    async def get_by_id(self, game_id: int) -> Game | None:
        result = await self.session.execute(self._game_query().where(GameModel.id == game_id))
        model = result.scalar_one_or_none()
        return self._to_dto(model) if model else None

    async def get_by_slug(self, slug: str) -> Game | None:
        result = await self.session.execute(self._game_query().where(GameModel.slug == slug))
        model = result.scalar_one_or_none()
        return self._to_dto(model) if model else None

    async def replace_recommendations(self, recommendations: Sequence[GameRecommendation]) -> None:
        await self.session.execute(delete(GameRecommendationModel))
        for start in range(0, len(recommendations), 1_000):
            batch = recommendations[start : start + 1_000]
            values = [item.model_dump() for item in batch]
            if values:
                await self.session.execute(pg_insert(GameRecommendationModel).values(values))

    async def get_recommendations(self, game_id: int, limit: int) -> list[Game]:
        statement = self._game_query().join(
            GameRecommendationModel,
            GameRecommendationModel.recommended_game_id == GameModel.id,
        ).where(GameRecommendationModel.game_id == game_id).order_by(GameRecommendationModel.rank).limit(limit)
        return await self._many(statement)

    async def get_games_by_category(self, category: GameCategory, value: str, offset: int, limit: int) -> list[Game]:
        column = self._category_column(category.value)
        statement = self._game_query().where(column.contains([value])).order_by(
            GameModel.total_rating_count.desc().nulls_last(), GameModel.total_rating.desc().nulls_last(), GameModel.id
        ).offset(offset).limit(limit)
        return await self._many(statement)

    async def search(self, title: str, limit: int, offset: int) -> list[Game]:
        await self.session.execute(select(func.set_config("pg_trgm.similarity_threshold", "0.1", True)))
        score = func.similarity(GameModel.name, title)
        statement = self._game_query().where(GameModel.name.op("%")(title)).order_by(score.desc()).offset(offset).limit(limit)
        return await self._many(statement)

    async def get_most_popular(self, limit: int) -> list[Game]:
        statement = self._game_query().where(GameModel.total_rating_count > 2000).order_by(
            GameModel.total_rating.desc().nulls_last()
        ).limit(limit)
        return await self._many(statement)

    async def get_category_values(self, category: GameCategoryValue) -> list[str]:
        column = self._category_column(category)
        value = func.unnest(column).label("value")
        result = await self.session.execute(select(value).where(column.is_not(None)).distinct().order_by(value))
        return list(result.scalars().all())

    async def list_games(
        self, query: str | None, genres: list[str] | None, companies: list[str] | None,
        platforms: list[str] | None, sort: GameSort, offset: int, limit: int,
    ) -> tuple[list[Game], int]:
        conditions = build_filter_conditions(query, genres, companies, platforms)
        games_result = await self.session.execute(
            self._game_query().where(*conditions).order_by(*get_order_by(sort), GameModel.id).offset(offset).limit(limit)
        )
        count_result = await self.session.execute(select(func.count(GameModel.id)).where(*conditions))
        return [self._to_dto(model) for model in games_result.scalars().all()], count_result.scalar_one()

    @staticmethod
    def _game_query():
        return select(GameModel).options(selectinload(GameModel.websites))

    @staticmethod
    def _category_column(category: GameCategoryValue):
        return {"genres": GameModel.genres, "companies": GameModel.companies, "platforms": GameModel.platforms}[category]

    @staticmethod
    def _to_dto(model: GameModel) -> Game:
        return Game.model_validate(model)

    async def _many(self, statement) -> list[Game]:
        result = await self.session.execute(statement)
        return [self._to_dto(model) for model in result.scalars().all()]
