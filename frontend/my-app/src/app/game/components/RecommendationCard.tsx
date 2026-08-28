import Image from "next/image"
import { GameDetail } from "@/app/types/game";

export function RecommendationCard({ game }: { game: GameDetail }) {
  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cotton-candy-200/30 hover:bg-white/[0.1] hover:shadow-xl"
    >
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_720p/${game.cover_url}`}
          alt={game.name}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-3">
        <p className="line-clamp-2 min-h-10 text-sm font-semibold text-white transition-colors group-hover:text-cotton-candy-100">
          {game.name}
        </p>
      </div>
      </div>

  );
}
