import Link from "next/link";
import Image from "next/image"
import { GameDetail } from "@/app/types/game";

export function RecommendationCard({ game }: { game: GameDetail }) {
  return (
    <Link
      href={`/game/${game.id}`}
      className="group flex flex-col rounded-xl overflow-hidden border border-violet-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
    >
      <div className="relative w-full h-32">
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_url}`}
          alt={game.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-[#2D1B69] group-hover:text-violet-600 transition-colors line-clamp-2">
          {game.name}
        </p>
      </div>
    </Link>
  );
}
