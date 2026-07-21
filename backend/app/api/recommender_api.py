from fastapi import FastAPI
from .dependencies import lifespan
from .games import router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Game Matcher API",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
