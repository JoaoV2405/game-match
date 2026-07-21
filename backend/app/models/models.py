from __future__ import annotations

from sqlalchemy import (
    BigInteger,
    Float,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class GameModel(Base):
    __tablename__ = "games"

    __table_args__ = (
        Index(
            "ix_games_name_trgm",
            "name",
            postgresql_using="gin",
            postgresql_ops={"name": "gin_trgm_ops"},
        ),
    )

    id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=False,
    )

    name: Mapped[str] = mapped_column(
        Text,
        nullable=False,
        index=True,
    )

    slug: Mapped[str] = mapped_column(
        Text,
        nullable=False,
        unique=True,
        index=True,
    )

    summary: Mapped[str | None] = mapped_column(Text)
    rating: Mapped[float | None] = mapped_column(Float)
    rating_count: Mapped[int | None] = mapped_column(Integer)
    total_rating: Mapped[float | None] = mapped_column(Float)
    total_rating_count: Mapped[int | None] = mapped_column(Integer)
    cover_url: Mapped[str | None] = mapped_column(Text)

    genres: Mapped[list[str]] = mapped_column(
        ARRAY(Text),
        nullable=False,
        default=list,
    )

    companies: Mapped[list[str]] = mapped_column(
        ARRAY(Text),
        nullable=False,
        default=list,
    )

    platforms: Mapped[list[str]] = mapped_column(
        ARRAY(Text),
        nullable=False,
        default=list,
    )

    video_id: Mapped[str | None] = mapped_column(String(20))

    websites: Mapped[list[GameWebsiteModel]] = relationship(
        back_populates="game",
        cascade="all, delete-orphan",
        passive_deletes=True,
        lazy="selectin",
    )


class GameWebsiteModel(Base):
    __tablename__ = "game_websites"

    __table_args__ = (
        UniqueConstraint(
            "game_id",
            "website_type",
            "url",
            name="uq_game_website",
        ),
    )

    id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True,
    )

    game_id: Mapped[int] = mapped_column(
        ForeignKey(
            "games.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    website_type: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    url: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    game: Mapped[GameModel] = relationship(
        back_populates="websites",
    )