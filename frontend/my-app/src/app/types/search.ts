import type { Game } from "./game";
import type { Pagination } from "./pagination";

export interface GameSearchResponse {
  items: Game[];
  pagination: Pagination;
}

export interface GetSearchGamesParams {
  query?: string;
  page?: number;
  limit?: number;
}

export interface GameSearchParams {
  q?: string;
  query?: string;
  page?: string;
  limit?: string;
}

export interface SearchState {
  query: string;
  currentPage: number;
  pageSize: number;
}
