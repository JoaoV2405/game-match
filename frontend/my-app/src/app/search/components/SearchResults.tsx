import { GameGrid } from "@/app/components/games/GameGrid";
import { ResultsSection } from "@/app/components/results/ResultsSection";
import type { Game } from "@/app/types/game";
import type { Pagination } from "@/app/types/pagination";
import { SearchPagination } from "./SearchPagination";

interface SearchResultsProps {
  games: Game[];
  query: string;
  pageSize: number;
  pagination: Pagination;
}

export function SearchResults({
  games,
  query,
  pageSize,
  pagination,
}: SearchResultsProps) {
  const title = query ? `Resultados para ${query}` : "Busca de jogos";

  return (
    <ResultsSection
      title={title}
      pagination={pagination}
      isEmpty={games.length === 0}
      emptyTitle="Nenhum jogo encontrado"
      emptyDescription="Tente outro jogo ou confira se o título está correto."
      footer={
        <SearchPagination
          query={query}
          pageSize={pageSize}
          pagination={pagination}
        />
      }
    >
      <GameGrid games={games} cardVariant="dark" />
    </ResultsSection>
  );
}
