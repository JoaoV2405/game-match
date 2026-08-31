from contextlib import asynccontextmanager
from app.api.routers.games import router as games_router
from app.api.routers.health import router as health_router
from app.application.services import GameCatalogService
from app.core.config import get_settings
from app.infrastructure.database import Database
from app.infrastructure.persistence import SqlAlchemyGameRepositoryProvider
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    database = Database(settings.database_url)
    app.state.database = database
    app.state.game_catalog_service = GameCatalogService(
        SqlAlchemyGameRepositoryProvider(database.session_factory)
    )
    try:
        yield
    finally:
        await database.close()


def create_app() -> FastAPI:
    settings = get_settings()
    application = FastAPI(title="Game Matcher API", lifespan=lifespan)
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.frontend_urls,
        allow_origin_regex=r"^https://game-match-nu.*\.vercel\.app$|^http://localhost:\d+$",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    application.include_router(health_router)
    application.include_router(games_router)
    return application


app = create_app()
