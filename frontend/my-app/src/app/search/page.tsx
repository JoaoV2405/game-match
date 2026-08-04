import { HomeButton } from "@/app/components/ui/HomeButton";
import { searchGamesClient } from "@/app/services/games/search.service";
import type { GameSearchParams } from "@/app/types/search";
import { SearchResults } from "./components/SearchResults";
import { parseSearchParams } from "./search";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<GameSearchParams>;
}) {
  const params = await searchParams;
  const searchState = parseSearchParams(params);
  const { query, currentPage, pageSize } = searchState;

  const result = await searchGamesClient({
    query,
    page: currentPage,
    limit: pageSize,
  });

  return (
    <main className="min-h-screen app-gradient text-white">
      <div className="flex w-full justify-start px-3 pt-3 sm:px-6 sm:pt-6">
        <HomeButton variant="dark" />
      </div>

      <section className="mx-auto w-full max-w-7xl px-6 pb-8 pt-8 md:pt-12">
        <h1 className="text-4xl font-extrabold tracking-normal md:text-5xl">
          Busca de Jogos
        </h1>
      </section>

      <SearchResults
        games={result.items}
        query={query}
        pageSize={pageSize}
        pagination={result.pagination}
      />
    </main>
  );
}
