from fastapi import APIRouter, Depends, HTTPException, Query

from .dependencies import get_model, get_model_service, get_repository
from app.repositories.game_repository import PostgresRepository


router = APIRouter(prefix="/games", tags=["games"])

@router.get("/id/{game_id}")
async def get_game_by_id(
    game_id: int,
    repo: PostgresRepository = Depends(get_repository),
):
    game = await repo.get_game_by_id(game_id)
    if game is None:
        raise HTTPException(
            status_code=404,
            detail="Game not found",
        )

    return game

@router.get("/slug/{slug}")
async def get_game_by_slug(
    slug: str,
    repo: PostgresRepository = Depends(get_repository),
):
    game = await repo.get_game_by_slug(slug)

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
    repo: PostgresRepository = Depends(get_repository),
):
    return await repo.search_games(
        title=q,
        limit=limit,
    )

@router.get("/popular")
async def get_popular_games(
    limit: int = Query(20, ge=1, le=100),
    repo: PostgresRepository = Depends(get_repository),
):
    return await repo.get_most_popular_games(limit)


@router.get("/recommend/{game_id}")
async def recommend(
    game_id: int,
    service = Depends(get_model_service),
):
    games = await service.recommend(game_id)

    return games
