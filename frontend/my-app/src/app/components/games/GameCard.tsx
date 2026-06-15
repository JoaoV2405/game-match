import { MetaBlock } from "@/app/game/components/MetaBlock";
import { TagPill } from "@/app/game/components/TagPill";
import { Game } from "@/app/types/game";
import { FaStar } from "react-icons/fa";
import Image from "next/image"
import { ReactNode } from "react";


interface Props {
  game: Game;
  children?: ReactNode;
  
}

export function GameCard({ game, children }: Props) {
  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-md
        transition
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="relative h-140 w-full">
      <Image
        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_url}`}
        alt={`${game.name} cover`}
        fill
        className="object-cover object-top"
        sizes="(max-width: 1024px) 100vw, 33vw"
        style={{
      objectFit: "cover",
      transitionProperty: "opacity",
      transitionDuration: "500ms",
      transitionTimingFunction: "cubic-bezier(0.7, 0, 0.6, 1)",
      opacity: 1,
      animation: "materialize 1000ms cubic-bezier(0.7, 0, 0.6, 1)",
    }}
      />
      </div>
      <div className="space-y-2 p-4">
        <h3 className="text-lg font-bold">
          {game.name}
        </h3>

        <div className="flex items-center gap-2">
          <FaStar color="#b04bdb" size={16} />
          <span>{game.total_rating.toPrecision(4)}</span>
        </div>
        {children}
        
        {/* <span
          className="
            inline-block
            rounded-full
            bg-violet-100
            px-3
            py-1
            text-sm
            text-violet-700
          "
        >
          {game.genres}
        </span> */}
      </div>
    </article>
  );
}