import {MetaBlock} from "@/app/game/components/MetaBlock";
import { GameDetail } from "@/app/types/game";
import { PlatformBox } from "./PlatformBox";
export function InfoSection({ game }: { game: GameDetail }) {
  return (
    <section className="w-full bg-violet-100 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

          {/* Left: metadata + description (span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <MetaBlock label="Gêneros"    tags={game.genres}    variant="genre"    />
              <MetaBlock label="Plataformas" tags={game.platforms} variant="platform" />
              <MetaBlock label="Estúdios" tags={game.companies} variant="company" />
            </div>
            <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-3">
                Descrição
              </h2>
              <p className="text-[#1E1B2E] text-base leading-relaxed">{game.summary}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <PlatformBox platforms={game.websites} />
          </div>

        </div>
      </div>
    </section>
  );
}