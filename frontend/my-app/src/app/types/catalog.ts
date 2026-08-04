import type { Game } from "./game";
import type { Pagination } from "./pagination";

export type GameCatalogFilterType = "genres" | "companies" | "platforms";

export type GameCatalogSort =
  | "popular"
  | "rating"
  | "rating_count"
  | "name_asc"
  | "name_desc";

export interface GameCatalogResponse {
  items: Game[];
  pagination: Pagination;
}

export interface GetCatalogGamesParams {
  filterType?: GameCatalogFilterType;
  value?: string;
  page?: number;
  limit?: number;
  sort?: GameCatalogSort;
}

export interface CatalogSearchParams {
  type?: string;
  value?: string;
  genres?: string;
  sort?: string;
  page?: string;
}

export interface CatalogState {
  filterType: GameCatalogFilterType;
  selectedGenre: string;
  selectedSort: GameCatalogSort;
  currentPage: number;
}
