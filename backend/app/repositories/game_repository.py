import asyncio
import logging
from pathlib import Path
from repositories.queries import GAME_SELECT
from database.database import Database
from schemas.game_schema import Game, GameWebsite
from psycopg.rows import dict_row




class PostgresRepository:

    def __init__(self, db: Database):
        self.db = db
    async def setup(self):
        await self.db.setup_database()
    async def insert_games(
        self,
        games: list[Game],
    ):
        await self.db._init_pool()
        query = """
            INSERT INTO games (
                id,
                name,
                slug,
                summary,
                rating,
                rating_count,
                total_rating,
                total_rating_count,
                cover_url,
                genres,
                companies,
                platforms
            )
            VALUES (
                %s, %s, %s, %s,
                %s, %s, %s, %s,
                %s, %s, %s, %s
            )
            ON CONFLICT (id)
            DO NOTHING;
        """

        values = [
            (
                game.id,
                game.name,
                game.slug,
                game.summary,
                game.rating,
                game.rating_count,
                game.total_rating,
                game.total_rating_count,
                game.cover_url,
                game.genres,
                game.companies,
                game.platforms,
            )
            for game in games
        ]

        async with self.db.pool.connection() as conn:

            async with conn.cursor() as cur:

                await cur.executemany(
                    query,
                    values,
                )

            await conn.commit()
        await self.db.close()
    async def insert_video_games(
        self,
        games: list[Game],
    ):
        await self.db._init_pool()
        query = """
            INSERT INTO games (
                id,
                name,
                slug,
                summary,
                rating,
                rating_count,
                total_rating,
                total_rating_count,
                cover_url,
                genres,
                companies,
                platforms
            )
            VALUES (
                %s, %s, %s, %s,
                %s, %s, %s, %s,
                %s, %s, %s, %s
            )
            ON CONFLICT (id)
            DO NOTHING;
        """

        values = [
            (
                game.id,
                game.name,
                game.slug,
                game.summary,
                game.rating,
                game.rating_count,
                game.total_rating,
                game.total_rating_count,
                game.cover_url,
                game.genres,
                game.companies,
                game.platforms,
            )
            for game in games
        ]

        async with self.db.pool.connection() as conn:

            async with conn.cursor() as cur:

                await cur.executemany(
                    query,
                    values,
                )

            await conn.commit()
        await self.db.close()
   
    async def insert_websites(
        self,
        websites: list[GameWebsite],
    ):
        await self.db.connect()

        query = """
            INSERT INTO game_websites (
                game_id,
                website_type,
                url
            )
            VALUES (%s, %s, %s)
        """

        values = [
            (
                website.game_id,
                website.website_type,
                website.url,
            )
            for website in websites
        ]

        async with self.db.pool.connection() as conn:
            async with conn.cursor() as cur:
                await cur.executemany(query, values)

            await conn.commit()
    async def insert_videos(
        self,
        items: list[dict],
    ):
        values = [
            (item["video_id"], item["id"])
            for item in items
        ]
        await self.db.connect()

        query = """
                UPDATE games
                SET video_id = %s
                WHERE id = %s
            """

        

        async with self.db.pool.connection() as conn:
            async with conn.cursor() as cur:
                await cur.executemany(query, values)

            await conn.commit()

    async def get_game_by_id__(
    self,
    game_id: int,
) -> Game | None:

        query = """
            SELECT *
            FROM games
            WHERE id = %s
        """

        async with self.db.pool.connection() as conn:
            async with conn.cursor(row_factory=dict_row) as cur:
                await cur.execute(query, (game_id,))
                row = await cur.fetchone()

        return None if row is None else self._row_to_game(row)
    
    async def get_game_by_id(
    self,
    game_id: int,
) -> Game | None:
        logging.info("oi")
        query = (
            GAME_SELECT
            + """
            WHERE g.id = %s
            GROUP BY g.id
            """
        )
        async with self.db.pool.connection() as conn:
            print("oi")
            async with conn.cursor(row_factory=dict_row) as cur:
                await cur.execute(query, (game_id,))
                row = await cur.fetchone()
                print("oi") 
                print(row)

        return None if row is None else self._row_to_game(row)
    async def get_game_by_slug(
    self,
    slug: str,
) -> Game | None:

        query = (
    GAME_SELECT
    + """
    WHERE g.slug = %s
    GROUP BY g.id
    """
)

        async with self.db.pool.connection() as conn:
            async with conn.cursor(row_factory=dict_row) as cur:
                await cur.execute(query, (slug,))
                row = await cur.fetchone()

        return None if row is None else self._row_to_game(row)
    
    async def search_games(
    self,
    title: str,
    limit: int = 10,
) -> list[Game]:

        query = (
            GAME_SELECT
            +
            """
            WHERE similarity(name, %s) > 0.1
            ORDER BY similarity(name, %s) DESC
            LIMIT %s
            """)

        async with self.db.pool.connection() as conn:
            async with conn.cursor(row_factory=dict_row) as cur:
                await cur.execute(
                    query,
                    (f"%{title}%",f"%{title}%", limit),
                )

                rows = await cur.fetchall()

        return [
            self._row_to_game(row)
            for row in rows
        ]
    
    async def get_most_popular_games(
    self,
    limit: int = 20,
) -> list[Game]:

        query = """
            SELECT *
            FROM games
            WHERE total_rating_count > 1000
            ORDER BY total_rating DESC NULLS LAST
            LIMIT %s
        """

        async with self.db.pool.connection() as conn:
            async with conn.cursor(row_factory=dict_row) as cur:
                await cur.execute(query, (limit,))
                rows = await cur.fetchall()

        return [
            self._row_to_popular_game(row)
            for row in rows
        ]
    
    def _row_to_game(self, row: dict) -> Game:
        return Game(
            id=row["id"],
            name=row["name"],
            slug=row["slug"],
            summary=row["summary"],
            rating=row["rating"],
            rating_count=row["rating_count"],
            total_rating=row["total_rating"],
            total_rating_count=row["total_rating_count"],
            cover_url=row["cover_url"],
            genres=row["genres"] or [],
            companies=row["companies"] or [],
            platforms=row["platforms"] or [],
            video_id=row["video_id"] or None,
            websites=[
            GameWebsite(
                game_id=row["id"],
                website_type=w["website_type"],
                url=w["url"],
            )
            for w in (row["websites"] or [])
        ],
        )
    def _row_to_popular_game(self, row: dict) -> Game:
        return Game(
            id=row["id"],
            name=row["name"],
            slug=row["slug"],
            summary=row["summary"],
            rating=row["rating"],
            rating_count=row["rating_count"],
            total_rating=row["total_rating"],
            total_rating_count=row["total_rating_count"],
            cover_url=row["cover_url"],
            genres=row["genres"] or [],
            companies=row["companies"] or [],
            platforms=row["platforms"] or [],
            video_id=row["video_id"] or None,
        )