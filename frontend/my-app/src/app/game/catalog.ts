import type {
  CatalogSearchParams,
  CatalogState,
  GameCatalogFilterType,
  GameCatalogSort,
} from "@/app/types/catalog";
import type { Pagination } from "@/app/types/pagination";

export const catalogPageSize = 18;

export const genreOptions = [
  { label: "Todos os gêneros", value: "" },
  { label: "Aventura", value: "Adventure" },
  { label: "RPG", value: "Role-playing (RPG)" },
  { label: "Shooter", value: "Shooter" },
  { label: "Estratégia", value: "Strategy" },
  { label: "Indie", value: "Indie" },
  { label: "Plataforma", value: "Platform" },
  { label: "Puzzle", value: "Puzzle" },
  { label: "Simulador", value: "Simulator" },
];

export const filterTypeOptions: Array<{
  label: string;
  value: GameCatalogFilterType;
  disabled?: boolean;
}> = [
  { label: "Gênero", value: "genres" },
  { label: "Plataforma", value: "platforms", disabled: true },
  { label: "Empresa", value: "companies", disabled: true },
];

export const sortOptions: Array<{ label: string; value: GameCatalogSort }> = [
  { label: "Mais populares", value: "popular" },
  { label: "Melhor avaliação", value: "rating" },
  { label: "Mais avaliados", value: "rating_count" },
  { label: "Nome A-Z", value: "name_asc" },
  { label: "Nome Z-A", value: "name_desc" },
];

export function parseCatalogParams(params: CatalogSearchParams): CatalogState {
  return {
    filterType: "genres",
    selectedGenre: params.value ?? params.genres ?? "",
    selectedSort: isCatalogSort(params.sort) ? params.sort : "popular",
    currentPage: parsePage(params.page),
  };
}

export function getGenreLabel(value: string) {
  return genreOptions.find((genre) => genre.value === value)?.label ?? value;
}

export function getPaginationLabel(pagination: Pagination) {
  return `${pagination.page} / ${Math.max(pagination.pages, 1)}`;
}

export function buildCatalogHref({
  filterType,
  value,
  sort,
  page,
}: {
  filterType: GameCatalogFilterType;
  value: string;
  sort: GameCatalogSort;
  page: number;
}) {
  const params = new URLSearchParams({
    type: filterType,
    sort,
    page: String(page),
  });

  if (value) {
    params.set("value", value);
  }

  return `/game?${params.toString()}`;
}

function isCatalogSort(value: string | undefined): value is GameCatalogSort {
  return (
    value === "popular" ||
    value === "rating" ||
    value === "rating_count" ||
    value === "name_asc" ||
    value === "name_desc"
  );
}

function parsePage(value: string | undefined) {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}
