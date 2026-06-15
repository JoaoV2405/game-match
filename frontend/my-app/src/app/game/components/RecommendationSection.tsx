
import { GameDetail } from "@/app/types/game";
import {RecommendationCard} from "./RecommendationCard";

export function RecommendationsSection({ games, currentTitle }: { games: GameDetail[]; currentTitle: string }) {
  if (games.length === 0) return null;
  return (
    <section className="w-full bg-[#EDE9FE] pt-10 pb-6 px-4 min-h-[25vh]">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-2xl font-extrabold text-[#2D1B69] mb-6">
          Jogos parecidos com <span className="text-violet-600">{currentTitle}</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {games.map((g) => (
            <RecommendationCard key={g.id} game={g} />
          ))}
        </div>
      </div>
    </section>
  );
}