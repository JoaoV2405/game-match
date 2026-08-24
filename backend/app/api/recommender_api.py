import os

from fastapi import FastAPI
from .dependencies import lifespan
from .games import router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Game Matcher API",
    lifespan=lifespan,
)
FRONTEND_URL = os.getenv("FRONTEND_URL") 

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
