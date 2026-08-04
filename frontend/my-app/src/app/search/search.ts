import type {
  GameSearchParams,
  SearchState,
} from "@/app/types/search";

export const searchPageSize = 18;

export function parseSearchParams(params: GameSearchParams): SearchState {
  return {
    query: params.q ?? params.query ?? "",
    currentPage: parsePage(params.page),
    pageSize: parseLimit(params.limit),
  };
}

export function buildSearchHref({
  query,
  page,
  limit = searchPageSize,
}: {
  query: string;
  page: number;
  limit?: number;
}) {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    limit: String(limit),
  });

  return `/search?${params.toString()}`;
}

function parsePage(value: string | undefined) {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

function parseLimit(value: string | undefined) {
  const limit = Number(value);

  if (!Number.isInteger(limit) || limit < 1) {
    return searchPageSize;
  }

  return limit;
}
