import { ReactNode } from "react";
import YoutubePlayer from "./YoutubePlayer";
import Image from "next/image"
import { GameDetail } from "@/app/types/game";
import { PlatformBox } from "./PlatformBox";


type HeroSectionProps = {
  game: GameDetail;
  children?: ReactNode;
};

export function HeroSection({ game, children }: HeroSectionProps ) {
  return (
      <section className="w-full bg-gradient-to-r from-purple-500 to-purple-900 pt-10 pb-16 px-4">
    {children}

    <div className="max-w-7xl mx-auto">

      {/* Linha 1 */}
      <h1 className="text-4xl font-extrabold text-white mb-8">
        {game.name}
      </h1>

      {/* Linha 2 */}
      <div className="grid grid-cols-4 lg:grid-cols-4 gap-6">

        {/* Cover */}
        <div>
          <span className="block text-xs font-semibold uppercase tracking-widest text-violet-300 mb-2">
            Cover Art
          </span>

          <div
            className="relative h-90 rounded-xl overflow-hidden shadow-2xl border border-violet-700/30"
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

        {/* Trailer */}
        <div className="col-span-2">
          <span className="block text-xs font-semibold uppercase tracking-widest text-violet-300 mb-2">
            Trailer
          </span>

          <YoutubePlayer videoId={game.video_id ?? ""} />
        
        </div>
        <div className="mt-7">
            <PlatformBox platforms={game.websites} />
        </div>

      </div>

    </div>
  </section>
  );
}
