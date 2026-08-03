
import { GameDetail } from "@/app/types/game";
import {RecommendationCard} from "./RecommendationCard";

export function RecommendationsSection({ games, currentTitle }: { games: GameDetail[]; currentTitle: string }) {
  if (games.length === 0) return null;
  return (
    <section className="w-full py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-7 w-1 rounded-full bg-cotton-candy-200" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-white">
            Jogos parecidos com <span className="text-cotton-candy-100">{currentTitle}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {games.map((g) => (
            <RecommendationCard key={g.id} game={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
