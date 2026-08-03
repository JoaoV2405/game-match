import { HomeButton } from "@/app/components/ui/HomeButton";
import { getCatalogGames } from "@/app/services/games.service";
import { CatalogFilters } from "./components/CatalogFilters";
import { CatalogResults } from "./components/CatalogResults";
import {
  catalogPageSize,
  parseCatalogParams,
  type CatalogSearchParams,
} from "./catalog";

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}) {
  const params = await searchParams;
  const catalogState = parseCatalogParams(params);
  const {
    filterType,
    selectedGenre,
    selectedSort,
    currentPage,
  } = catalogState;

  const catalog = await getCatalogGames({
    filterType,
    value: selectedGenre,
    page: currentPage,
    limit: catalogPageSize,
    sort: selectedSort,
  });

  return (
    <main className="min-h-screen app-gradient text-white">
      <div className="flex w-full justify-start px-3 pt-3 sm:px-6 sm:pt-6">
        <HomeButton variant="dark" />
      </div>

      <section className="mx-auto w-full max-w-7xl px-6 pb-8 pt-8 md:pt-12">
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-extrabold tracking-normal md:text-5xl">
            Catálogo de Jogos
          </h1>

          <CatalogFilters
            filterType={filterType}
            selectedGenre={selectedGenre}
            selectedSort={selectedSort}
          />
        </div>
      </section>

      <CatalogResults
        games={catalog.items}
        filterType={filterType}
        selectedGenre={selectedGenre}
        selectedSort={selectedSort}
        pagination={catalog.pagination}
      />
    </main>
  );
}
