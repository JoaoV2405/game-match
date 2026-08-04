import { GameGrid } from "@/app/components/games/GameGrid";
import { ResultsSection } from "@/app/components/results/ResultsSection";
import type {
  GameCatalogFilterType,
  GameCatalogSort,
} from "@/app/types/catalog";
import type { Game } from "@/app/types/game";
import type { Pagination } from "@/app/types/pagination";
import { getGenreLabel } from "../catalog";
import { CatalogPagination } from "./CatalogPagination";

interface CatalogResultsProps {
  games: Game[];
  filterType: GameCatalogFilterType;
  selectedGenre: string;
  selectedSort: GameCatalogSort;
  pagination: Pagination;
}

export function CatalogResults({
  games,
  filterType,
  selectedGenre,
  selectedSort,
  pagination,
}: CatalogResultsProps) {
  return (
    <ResultsSection
      title={getGenreLabel(selectedGenre)}
      pagination={pagination}
      isEmpty={games.length === 0}
      emptyTitle="Nenhum jogo encontrado"
      emptyDescription="Tente outro gênero ou ajuste a ordenação do catálogo."
      footer={
        <CatalogPagination
          filterType={filterType}
          selectedGenre={selectedGenre}
          selectedSort={selectedSort}
          pagination={pagination}
        />
      }
    >
      <GameGrid games={games} cardVariant="dark" />
    </ResultsSection>
  );
}
