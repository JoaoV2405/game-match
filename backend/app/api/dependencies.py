from fastapi import Request

from app.application.services import GameCatalogService


def get_game_catalog_service(request: Request) -> GameCatalogService:
    return request.app.state.game_catalog_service
