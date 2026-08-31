import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

from app.application.dto import GameRecommendation
from app.application.services.game_catalog import GameCatalogService


class RecommendationService:
    """Generates recommendations from the precomputed embedding matrix."""

    def __init__(self, model: object, dataframe: pd.DataFrame, catalog: GameCatalogService) -> None:
        self.model = model
        self.dataframe = dataframe
        self.catalog = catalog

    def calculate_recommendations(
        self, game_id: int, limit: int = 10
    ) -> list[GameRecommendation]:
        matches = self.dataframe.index[self.dataframe["id"] == game_id].tolist()
        if not matches:
            return []

        model_index = matches[0]
        scores = cosine_similarity(self.model[model_index].reshape(1, -1), self.model)[0]
        recommendation_indexes = [
            index
            for index in scores.argsort()[::-1]
            if int(self.dataframe.iloc[index]["id"]) != game_id
        ][:limit]
        return [
            GameRecommendation(
                game_id=game_id,
                recommended_game_id=int(self.dataframe.iloc[index]["id"]),
                score=float(scores[index]),
                rank=rank,
            )
            for rank, index in enumerate(recommendation_indexes, start=1)
        ]

    async def refresh_recommendations(self, limit: int = 10) -> int:
        recommendations = [
            recommendation
            for game_id in self.dataframe["id"].astype(int)
            for recommendation in self.calculate_recommendations(game_id, limit)
        ]
        await self.catalog.replace_recommendations(recommendations)
        return len(recommendations)
