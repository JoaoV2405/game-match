import { getPopularGames } from "@/app/services/games.service";
import { GameGrid } from "./GameGrid";

export async function PopularGamesSection() {
  const games = await getPopularGames();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-8 text-3xl font-bold inline-block px-3 py-1 rounded-full text-purple-700  ">
          Bem Avaliados
        </h2>
        <div
      className="
    bg-white
    rounded-3xl
    p-8
    shadow-xl
    border border-violet-100
  "
    >
        <GameGrid games={games} />
      </div>
      </div>
    </section>
  );
}