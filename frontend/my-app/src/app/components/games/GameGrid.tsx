import { Game, GameDetail } from "@/app/types/game";
import { GameCard, GameCardVariant } from "./GameCard";
import Link from "next/link";
import { TagPill } from "@/app/game/components/TagPill";
import { LinkLoadingIndicator } from "../ui/LinkLoadingIndicator";

interface Props {
  games: GameDetail[] | Game[];
  cardVariant?: GameCardVariant;
}

export function GameGrid({ games, cardVariant = "light" }: Props) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-8
        md:grid-cols-2
        lg:grid-cols-3
        h-full

        
      "
    >
      {games.map((game) => (
        <div key={game.id}>
          <Link
            key={game.id}
            href={`/game/${game.id}/recommendations`}
          >
            <GameCard
              game={game}
              variant={cardVariant}
            >
              {game.genres.map((genre) => (
                <TagPill key={genre} label={genre} variant="genre" />
              ))}
            </GameCard>
            <LinkLoadingIndicator name="o jogo" />
            
          </Link>
        </div>
      ))}
    </div>
  );
}
