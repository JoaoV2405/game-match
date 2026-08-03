import { ReactNode } from "react";
import YoutubePlayer from "./YoutubePlayer";
import Image from "next/image"
import { GameDetail } from "@/app/types/game";
import { PlatformBox } from "./PlatformBox";


type HeroSectionProps = {
  game: GameDetail;
  children?: ReactNode;
};

export function HeroSection({ game }: HeroSectionProps ) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-2 pt-8 sm:px-6">
      <div className="mb-8 flex items-center gap-3">
        <span className="h-9 w-1 rounded-full bg-cotton-candy-200" aria-hidden="true" />
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          {game.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div className="mx-auto w-full max-w-xs md:mx-0">
          <span className="block text-xs font-semibold uppercase tracking-widest text-cotton-candy-100 mb-2">
            Cover Art
          </span>

          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30"
            style={{ aspectRatio: "3/4" }}
          >
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_url}`}
              alt={`${game.name} cover`}
              fill
              className="object-cover object-top "
            />
          </div>
        
        </div>

        <div className="md:col-span-2">
          <span className="block text-xs font-semibold uppercase tracking-widest text-cotton-candy-100 mb-2">
            Trailer
          </span>

          <YoutubePlayer
            videoId={game.video_id ?? ""}
            className="border border-white/10 shadow-2xl shadow-black/20"
          />
        
        </div>
        <div className="md:col-span-3 lg:col-span-1 lg:mt-7">
            <PlatformBox platforms={game.websites} />
        </div>

      </div>

    </div>
  );
}
