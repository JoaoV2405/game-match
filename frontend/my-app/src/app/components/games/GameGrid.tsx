import { Game, GameDetail } from "@/app/types/game";
import { GameCard } from "./GameCard";
import Link from "next/link";
import { MetaBlock } from "@/app/game/components/MetaBlock";
import { TagPill } from "@/app/game/components/TagPill";

interface Props {
  games: GameDetail[] | Game[];
}

export function GameGrid({ games }: Props) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-8
        md:grid-cols-2
        lg:grid-cols-3
      "
    >
      {games.map((game) => (
        <Link
          key={game.id}
          href={`/game/${game.id}/recommendations`}
        >
        <GameCard
          key={game.id}
          game={game}
        >
        {game.genres.map((game) => (
          <TagPill key={game} label={game} variant={"genre"} />
        ))}
        </GameCard>

        </Link>
        
      ))}
    </div>
  );
}