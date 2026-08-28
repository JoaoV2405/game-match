"""Initial schema baseline.

Revision ID: 20260828_01
Revises:
Create Date: 2026-08-28
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = "20260828_01"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("CREATE EXTENSION IF NOT EXISTS pg_trgm")

    op.create_table(
        "games",
        sa.Column("id", sa.BigInteger(), autoincrement=False, nullable=False),
        sa.Column("name", sa.Text(), nullable=False),
        sa.Column("slug", sa.Text(), nullable=False),
        sa.Column("summary", sa.Text(), nullable=True),
        sa.Column("rating", sa.Float(), nullable=True),
        sa.Column("rating_count", sa.Integer(), nullable=True),
        sa.Column("total_rating", sa.Float(), nullable=True),
        sa.Column("total_rating_count", sa.Integer(), nullable=True),
        sa.Column("cover_url", sa.Text(), nullable=True),
        sa.Column("genres", postgresql.ARRAY(sa.Text()), nullable=False),
        sa.Column("companies", postgresql.ARRAY(sa.Text()), nullable=False),
        sa.Column("platforms", postgresql.ARRAY(sa.Text()), nullable=False),
        sa.Column("video_id", sa.String(length=20), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("slug"),
    )
    op.create_index("ix_games_name", "games", ["name"], unique=False)
    op.create_index("ix_games_slug", "games", ["slug"], unique=False)
    op.create_index(
        "ix_games_name_trgm",
        "games",
        ["name"],
        unique=False,
        postgresql_using="gin",
        postgresql_ops={"name": "gin_trgm_ops"},
    )

    op.create_table(
        "game_websites",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("game_id", sa.BigInteger(), nullable=False),
        sa.Column("website_type", sa.Integer(), nullable=False),
        sa.Column("url", sa.Text(), nullable=False),
        sa.ForeignKeyConstraint(["game_id"], ["games.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("game_id", "website_type", "url", name="uq_game_website"),
    )
    op.create_index(
        "ix_game_websites_game_id", "game_websites", ["game_id"], unique=False
    )


def downgrade() -> None:
    op.drop_index("ix_game_websites_game_id", table_name="game_websites")
    op.drop_table("game_websites")
    op.drop_index("ix_games_name_trgm", table_name="games")
    op.drop_index("ix_games_slug", table_name="games")
    op.drop_index("ix_games_name", table_name="games")
    op.drop_table("games")
