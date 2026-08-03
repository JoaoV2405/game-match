import { GameGrid } from "@/app/components/games/GameGrid";
import type {
  GameCatalogFilterType,
  GameCatalogPagination as GameCatalogPaginationType,
  GameCatalogSort,
} from "@/app/services/games.service";
import type { Game } from "@/app/types/game";
import {
  getGenreLabel,
  getPaginationLabel,
  getTotalLabel,
} from "../catalog";
import { CatalogPagination } from "./CatalogPagination";

interface CatalogResultsProps {
  games: Game[];
  filterType: GameCatalogFilterType;
  selectedGenre: string;
  selectedSort: GameCatalogSort;
  pagination: GameCatalogPaginationType;
}

export function CatalogResults({
  games,
  filterType,
  selectedGenre,
  selectedSort,
  pagination,
}: CatalogResultsProps) {
  return (
    <section className="mx-auto w-full max-w-7xl rounded-lg px-6 pb-20 pt-5">
      <div className="mb-6 flex flex-col justify-between gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {getGenreLabel(selectedGenre)}
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            {getTotalLabel(pagination.total)} · página{" "}
            {getPaginationLabel(pagination)}
          </p>
        </div>
      </div>

      {games.length === 0 ? (
        <EmptyCatalogState />
      ) : (
        <GameGrid games={games} cardVariant="dark" />
      )}

      <CatalogPagination
        filterType={filterType}
        selectedGenre={selectedGenre}
        selectedSort={selectedSort}
        pagination={pagination}
      />
    </section>
  );
}

function EmptyCatalogState() {
  return (
    <div className="border-y border-dashed border-white/15 py-20 text-center">
      <h3 className="text-xl font-bold">Nenhum jogo encontrado</h3>
      <p className="mt-2 text-slate-300">
        Tente outro gênero ou ajuste a ordenação do catálogo.
      </p>
    </div>
  );
}
