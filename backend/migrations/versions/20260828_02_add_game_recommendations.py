"""Add persisted game recommendations.

Revision ID: 20260828_02
Revises: 20260828_01
Create Date: 2026-08-28
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "20260828_02"
down_revision: Union[str, Sequence[str], None] = "20260828_01"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "game_recommendations",
        sa.Column("game_id", sa.BigInteger(), nullable=False),
        sa.Column("recommended_game_id", sa.BigInteger(), nullable=False),
        sa.Column("score", sa.Float(), nullable=False),
        sa.Column("rank", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["game_id"], ["games.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(
            ["recommended_game_id"], ["games.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("game_id", "recommended_game_id"),
        sa.UniqueConstraint("game_id", "rank", name="uq_game_recommendation_rank"),
    )


def downgrade() -> None:
    op.drop_table("game_recommendations")
