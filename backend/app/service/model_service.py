import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

from app.schemas.game_schema import Game
from app.service.game_service import GameService


class ModelService:
    def __init__(
        self,
        model,
        df: pd.DataFrame,
        game_service: GameService,
    ) -> None:
        self.model = model
        self.df = df
        self.game_service = game_service

    def get_recommendation_ids(
        self,
        game_id: int,
        limit: int = 10,
    ) -> list[int]:
        matching_indexes = self.df.index[
            self.df["id"] == game_id
        ].tolist()

        if not matching_indexes:
            return []

        model_index = matching_indexes[0]

        similarity_scores = cosine_similarity(
            self.model[model_index].reshape(1, -1),
            self.model,
        )[0]

        ordered_indexes = similarity_scores.argsort()[::-1]

        # Remove o próprio jogo e limita a quantidade.
        recommendation_indexes = [
            index
            for index in ordered_indexes
            if int(self.df.iloc[index]["id"]) != game_id
        ][:limit]

        return (
            self.df
            .iloc[recommendation_indexes]["id"]
            .astype(int)
            .tolist()
        )

    async def recommend(
        self,
        game_id: int,
        limit: int = 10,
    ) -> list[Game]:
        recommendation_ids = self.get_recommendation_ids(
            game_id=game_id,
            limit=limit,
        )

        if not recommendation_ids:
            return []

        games: list[Game] = []

        for recommended_game_id in recommendation_ids:
            game = await self.game_service.get_game_by_id(
                recommended_game_id
            )

            if game is not None:
                games.append(game)

        return games