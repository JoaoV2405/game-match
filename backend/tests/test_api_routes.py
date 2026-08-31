from unittest import TestCase
from unittest.mock import AsyncMock

from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.api.dependencies import get_game_catalog_service
from app.api.routers.games import router as games_router
from app.api.routers.health import router as health_router
from app.application.dto import Game


class GameRoutesTests(TestCase):
    def setUp(self) -> None:
        self.service = AsyncMock()
        self.app = FastAPI()
        self.app.include_router(health_router)
        self.app.include_router(games_router)
        self.app.dependency_overrides[get_game_catalog_service] = lambda: self.service
        self.client = TestClient(self.app)

    def tearDown(self) -> None:
        self.client.close()

    def test_health_endpoint_returns_ok(self) -> None:
        response = self.client.get("/health")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})

    def test_list_games_passes_parsed_filters_to_service(self) -> None:
        self.service.list_games.return_value = {
            "items": [Game(id=1, name="Mario", slug="mario")],
            "pagination": {"page": 2, "limit": 10, "total": 11, "pages": 2},
        }

        response = self.client.get(
            "/games",
            params=[
                ("q", "mario"),
                ("genres", "Platform"),
                ("genres", "Adventure"),
                ("companies", "Nintendo"),
                ("sort", "rating"),
                ("page", "2"),
                ("limit", "10"),
            ],
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["items"][0]["slug"], "mario")
        self.service.list_games.assert_awaited_once_with(
            "mario",
            ["Platform", "Adventure"],
            ["Nintendo"],
            None,
            "rating",
            2,
            10,
        )

    def test_get_game_by_id_returns_not_found_when_service_has_no_game(self) -> None:
        self.service.get_game_by_id.return_value = None

        response = self.client.get("/games/id/404")

        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json(), {"detail": "Game not found"})

    def test_invalid_pagination_is_rejected_before_calling_service(self) -> None:
        response = self.client.get("/games?limit=101")

        self.assertEqual(response.status_code, 422)
        self.service.list_games.assert_not_called()
