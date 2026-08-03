import Link from "next/link";
import Image from "next/image"
import { GameDetail } from "@/app/types/game";

export function RecommendationCard({ game }: { game: GameDetail }) {
  return (
    <Link
      href={`/game/${game.id}/recommendations`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cotton-candy-200/30 hover:bg-white/[0.1] hover:shadow-xl"
    >
      <div className="relative w-full h-30 ">
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_url}`}
          alt={game.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>
      <div className="p-3">
        <p className="line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-cotton-candy-100">
          {game.name}
        </p>
      </div>
    </Link>
  );
}
