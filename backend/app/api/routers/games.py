from fastapi import APIRouter, Depends, HTTPException, Query

from app.api.dependencies import get_game_catalog_service
from app.application.services import GameCatalogService
from app.domain.enums import GameCategory, GameSort


router = APIRouter(prefix="/games", tags=["games"])


@router.get("/id/{game_id}")
async def get_game_by_id(game_id: int, service: GameCatalogService = Depends(get_game_catalog_service)):
    game = await service.get_game_by_id(game_id)
    if game is None:
        raise HTTPException(status_code=404, detail="Game not found")
    return game


@router.get("/search")
async def search_games(q: str = Query(..., min_length=1), limit: int = Query(10, ge=1, le=50), page: int = Query(1, ge=1), service: GameCatalogService = Depends(get_game_catalog_service)):
    return await service.search_games(q, page, limit)


@router.get("/popular")
async def get_popular_games(limit: int = Query(20, ge=1, le=100), service: GameCatalogService = Depends(get_game_catalog_service)):
    return await service.get_most_popular_games(limit)


@router.get("/recommend/{game_id}")
async def get_recommendations(game_id: int, limit: int = Query(10, ge=1, le=100), service: GameCatalogService = Depends(get_game_catalog_service)):
    return await service.get_recommendations(game_id, limit)


@router.get("/filter")
async def filter_games(filter_type: GameCategory = Query(..., alias="type"), value: str = Query(..., min_length=1), limit: int = Query(10, ge=1, le=100), offset: int = Query(0, ge=0), service: GameCatalogService = Depends(get_game_catalog_service)):
    return await service.get_games_by_category(filter_type, value, limit, offset)


@router.get("/filters/{filter_type}")
async def get_filter_values(filter_type: GameCategory, service: GameCatalogService = Depends(get_game_catalog_service)):
    return {"type": filter_type, "values": await service.get_category_values(filter_type)}


@router.get("")
async def list_games(q: str | None = Query(None, min_length=1), genres: list[str] | None = Query(None), companies: list[str] | None = Query(None), platforms: list[str] | None = Query(None), sort: GameSort = Query(GameSort.POPULAR), page: int = Query(1, ge=1), limit: int = Query(20, ge=1, le=100), service: GameCatalogService = Depends(get_game_catalog_service)):
    return await service.list_games(q, genres, companies, platforms, sort, page, limit)
