from fastapi import APIRouter, Depends, HTTPException, Query

from app.repositories.game_filters import GameCategory
from app.service.game_service import GameService
from app.service.model_service import ModelService

from .dependencies import get_model_service, get_service


router = APIRouter(prefix="/games", tags=["games"])


@router.get("/id/{game_id}")
async def get_game_by_id(
    game_id: int,
    service: GameService = Depends(get_service),
):
    game = await service.get_game_by_id(game_id)
    if game is None:
        raise HTTPException(
            status_code=404,
            detail="Game not found",
        )

    return game


@router.get("/slug/{slug}")
async def get_game_by_slug(
    slug: str,
    service: GameService = Depends(get_service),
):
    game = await service.get_game_by_slug(slug)

    if game is None:
        raise HTTPException(
            status_code=404,
            detail="Game not found",
        )

    return game


@router.get("/search")
async def search_games(
    q: str = Query(..., min_length=1),
    limit: int = Query(10, ge=1, le=50),
    service: GameService = Depends(get_service),
):
    return await service.search_games(
        title=q,
        limit=limit,
    )


@router.get("/popular")
async def get_popular_games(
    limit: int = Query(20, ge=1, le=100),
    service: GameService = Depends(get_service),
):
    return await service.get_most_popular_games(limit)


@router.get("/recommend/{game_id}")
async def recommend(
    game_id: int,
    service: ModelService = Depends(get_model_service),
):
    games = await service.recommend(game_id)

    return games


@router.get("/filter")
async def filter_games(
    filter_type: GameCategory = Query(
        ...,
        alias="type",
    ),
    value: str = Query(
        ...,
        min_length=1,
    ),
    limit: int = Query(
        10,
        ge=1,
        le=100,
    ),
    offset: int = Query(
        0,
        ge=0,
    ),
    service: GameService = Depends(get_service),
):
    return await service.get_games_by_filter(
        filter_type=filter_type,
        value=value,
        limit=limit,
        offset=offset,
    )
