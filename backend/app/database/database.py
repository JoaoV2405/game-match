from sqlalchemy import text
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from app.database.base import Base

from app.models.models import GameModel, GameWebsiteModel  # noqa: F401


class Database:
    def __init__(self, postgres_url: str):
        self.engine: AsyncEngine = create_async_engine(
            postgres_url,
            pool_pre_ping=True,
            pool_size=10,
            max_overflow=20,
            echo=False,
        )

        self.session_factory = async_sessionmaker(
            bind=self.engine,
            class_=AsyncSession,
            expire_on_commit=False,
            autoflush=False,
        )

    async def setup_database(self) -> None:
        async with self.engine.begin() as connection:
            await connection.execute(
                text("CREATE EXTENSION IF NOT EXISTS pg_trgm")
            )

            await connection.run_sync(Base.metadata.create_all)

    async def close(self) -> None:
        await self.engine.dispose()