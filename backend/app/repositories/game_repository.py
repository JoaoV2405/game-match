from collections.abc import Sequence

from sqlalchemy import func, select
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.models import GameModel, GameWebsiteModel
from app.repositories.game_filters import FilterType, GameCategory, get_filter_conditions, get_order_by
from app.schemas.game_schema import Game as GameSchema


class GameRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def insert_games(
        self,
        games: Sequence[GameSchema],
    ) -> None:
        if not games:
            return

        game_values = [
            {
                "id": game.id,
                "name": game.name,
                "slug": game.slug,
                "summary": game.summary,
                "rating": game.rating,
                "rating_count": game.rating_count,
                "total_rating": game.total_rating,
                "total_rating_count": game.total_rating_count,
                "cover_url": game.cover_url,
                "genres": game.genres or [],
                "companies": game.companies or [],
                "platforms": game.platforms or [],
                "video_id": game.video_id,
            }
            for game in games
        ]

        insert_games_statement = (
            pg_insert(GameModel)
            .values(game_values)
            .on_conflict_do_nothing(index_elements=[GameModel.id])
        )

        await self.session.execute(insert_games_statement)

        website_values = [
            {
                "game_id": game.id,
                "website_type": website.website_type,
                "url": website.url,
            }
            for game in games
            for website in game.websites
        ]

        if website_values:
            insert_websites_statement = (
                pg_insert(GameWebsiteModel)
                .values(website_values)
                .on_conflict_do_nothing(
                    index_elements=[
                        GameWebsiteModel.game_id,
                        GameWebsiteModel.website_type,
                        GameWebsiteModel.url,
                    ]
                )
            )

            await self.session.execute(insert_websites_statement)

    async def get_by_id(
        self,
        game_id: int,
    ) -> GameModel | None:
        statement = (
            select(GameModel)
            .options(selectinload(GameModel.websites))
            .where(GameModel.id == game_id)
        )

        result = await self.session.execute(statement)
        return result.scalar_one_or_none()

    async def get_games_by_filter(
        self,
        filter_type: GameCategory,
        value: str,
        offset: int = 0,
        limit: int = 10,
    ) -> list[GameModel]:
        columns = {
            "genres": GameModel.genres,
            "companies": GameModel.companies,
            "platforms": GameModel.platforms,
        }

        column = columns[filter_type]

        query = (
            select(GameModel)
            .options(selectinload(GameModel.websites))
            .where(column.contains([value]))
            .order_by(
                GameModel.total_rating_count.desc().nulls_last(),
                GameModel.total_rating.desc().nulls_last(),
                GameModel.id,
            )
            .offset(offset)
            .limit(limit)
        )

        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def get_by_slug(
        self,
        slug: str,
    ) -> GameModel | None:
        statement = (
            select(GameModel)
            .options(selectinload(GameModel.websites))
            .where(GameModel.slug == slug)
        )

        result = await self.session.execute(statement)
        return result.scalar_one_or_none()

    async def search(
        self,
        title: str,
        limit: int = 10,
        threshold: float = 0.1,
    ) -> list[GameModel]:

        await self.session.execute(
            select(
                func.set_config(
                    "pg_trgm.similarity_threshold",
                    str(threshold),
                    True,
                )
            )
        )

        similarity_score = func.similarity(
            GameModel.name,
            title,
        )

        statement = (
            select(GameModel)
            .options(selectinload(GameModel.websites))
            .where(GameModel.name.op("%")(title))
            .order_by(similarity_score.desc())
            .limit(limit)
        )

        result = await self.session.execute(statement)
        return list(result.scalars().all())

    async def get_most_popular(
        self,
        limit: int = 20,
        minimum_rating_count: int = 2000,
    ) -> list[GameModel]:
        statement = (
            select(GameModel)
            .options(selectinload(GameModel.websites))
            .where(GameModel.total_rating_count > minimum_rating_count)
            .order_by(GameModel.total_rating.desc().nulls_last())
            .limit(limit)
        )

        result = await self.session.execute(statement)
        return list(result.scalars().all())
    async def get_filter_values(
        self,
        filter_type: FilterType 
    ) -> list[str]:
        columns = {
            "genres": GameModel.genres,
            "companies": GameModel.companies,
            "platforms": GameModel.platforms,
        }

        column = columns[filter_type]

        value = func.unnest(column).label("value")

        query = (
            select(value)
            .where(column.is_not(None))
            .distinct()
            .order_by(value)
        )

        result = await self.session.execute(query)

        return list(result.scalars().all())
    
    async def list_games(
        self,
        query: str | None = None,
        genres: list[str] | None = None,
        companies: list[str] | None = None,
        platforms: list[str] | None = None,
        sort: str = "popular",
        offset: int = 0,
        limit: int = 20,
    ) -> tuple[list[GameModel], int]:
        conditions = get_filter_conditions(query=query, genres=genres, companies=companies, platforms=platforms)

        order_by = get_order_by(sort=sort)
        games_query = (
            select(GameModel)
            .options(
                selectinload(GameModel.websites)
            )
            .where(*conditions)
            .order_by(
                *order_by,
                GameModel.id,
            )
            .offset(offset)
            .limit(limit)
        )

        count_query = (
            select(func.count(GameModel.id))
            .where(*conditions)
        )

        games_result = await self.session.execute(
            games_query
        )

        count_result = await self.session.execute(
            count_query
        )

        games = list(
            games_result.scalars().all()
        )

        total = count_result.scalar_one()

        return games, total