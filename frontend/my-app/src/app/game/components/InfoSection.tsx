import { MetaBlock } from "@/app/game/components/MetaBlock";
import { GameDetail } from "@/app/types/game";


export function InfoSection({ game }: { game: GameDetail }) {
  return (
    <section className="w-full pb-20 pt-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-7 w-1 rounded-full bg-cotton-candy-200" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-white">Sobre o jogo</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
          <div className="lg:col-span-4 flex flex-col gap-8">
            

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-lg shadow-black/10 backdrop-blur-sm">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-cotton-candy-100 mb-3">
                Descrição
              </h2>
              <p className="text-base leading-relaxed text-midnight-violet-50/85">
                {game.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <MetaBlock label="Gêneros" tags={game.genres} variant="genre" />
              <MetaBlock
                label="Plataformas"
                tags={game.platforms}
                variant="platform"
              />
              <MetaBlock
                label="Estúdios"
                tags={game.companies}
                variant="company"
              />
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
