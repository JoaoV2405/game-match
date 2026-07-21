from pathlib import Path
import pickle
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

from app.repositories.game_repository import PostgresRepository

class ModelService:
    def __init__(self, model, df, repository:PostgresRepository) -> None:
        self.model = model
        self.df = df
        self.repository = repository
    def get_recommendations(self, game_id:int) -> list[int] | None:
        idx = self.df[
            self.df["id"]
            ==
            game_id
        ].index
        print(idx)
        print(game_id)
        if len(idx) == 0:
            return None

        idx = idx[0]

        scores = cosine_similarity(
            self.model[idx].reshape(1, -1),
            self.model
        )[0]

        top_idx = scores.argsort()[::-1][1:11]
        print(top_idx)
        return self.df.iloc[top_idx]["id"].astype(int).tolist()
        
    async def recommend(self, game_id: int):
        recommendation_ids = self.get_recommendations(game_id)
        if recommendation_ids:
            games = [
            await self.repository.get_game_by_id(game_id)
            for game_id in recommendation_ids
            ]

        return games


