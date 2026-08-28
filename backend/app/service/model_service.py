import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

from app.schemas.game_schema import GameRecommendation
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

    def calculate_recommendations(
        self,
        game_id: int,
        limit: int = 10,
    ) -> list[GameRecommendation]:
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
        print(f"Recommendations for game_id {game_id}")
        return [
            GameRecommendation(
                game_id=game_id,
                recommended_game_id=int(self.df.iloc[index]["id"]),
                score=float(similarity_scores[index]),
                rank=rank,
            )
            for rank, index in enumerate(recommendation_indexes, start=1)
        ]

    async def refresh_recommendations(
        self,
        limit: int = 10,
    ) -> int:
        recommendations = [
            recommendation
            for game_id in self.df["id"].astype(int)
            for recommendation in self.calculate_recommendations(
                game_id=game_id,
                limit=limit,
            )
        ]
        print(f"Total recommendations generated: {len(recommendations)}")
        await self.game_service.replace_recommendations(recommendations)
        return len(recommendations)
