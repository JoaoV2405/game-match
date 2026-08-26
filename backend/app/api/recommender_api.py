import os

from fastapi import FastAPI
from .dependencies import lifespan
from .games import router
from .health import health_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Game Matcher API",
    lifespan=lifespan,
)
FRONTEND_URLS = os.getenv("FRONTEND_URLS", "").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URLS
    ],
    allow_origin_regex=(
        r"^https://game-match-nu.*\.vercel\.app$"
        r"|^http://localhost:\d+$"
    ),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(router)
