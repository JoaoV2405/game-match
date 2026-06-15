
from psycopg_pool import AsyncConnectionPool

class Database:
    def __init__(self, postgres_url: str):
        self.url = postgres_url
        self.pool = AsyncConnectionPool(
            conninfo=postgres_url,
            open=False,
        )
    async def _init_pool(self):
        """Lazily initializes the connection pool if it doesn't exist."""
        if self.pool.closed:
            await self.pool.open()

    async def connect(self):
        await self.pool.open()

    async def close(self):
        await self.pool.close()
        
    async def setup_database(self):
        await self._init_pool()
        async with self.pool.connection() as conn:
            async with conn.cursor() as cur:
                await cur.execute("""
                    CREATE TABLE IF NOT EXISTS games (
                        id BIGINT PRIMARY KEY,
                        name TEXT NOT NULL,
                        slug TEXT NOT NULL,
                        summary TEXT,
                        rating DOUBLE PRECISION,
                        rating_count INTEGER,
                        total_rating DOUBLE PRECISION,
                        total_rating_count INTEGER,
                        cover_url TEXT,
                        genres TEXT[],
                        companies TEXT[],
                        platforms TEXT[],
                        video_id VARCHAR(20)
                    )
                """)

                await cur.execute("""
                    CREATE TABLE IF NOT EXISTS game_websites (
                        id BIGSERIAL PRIMARY KEY,
                        game_id BIGINT NOT NULL,
                        website_type INTEGER NOT NULL,
                        url TEXT NOT NULL,
                        FOREIGN KEY (game_id)
                            REFERENCES games(id)
                            ON DELETE CASCADE
                    )
                """)

        await conn.commit()

