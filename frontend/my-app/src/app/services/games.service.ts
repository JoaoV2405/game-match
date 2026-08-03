import { Game, GameDetail } from "@/app/types/game"

const PUBLIC_API_URL = "http://localhost:8000"
const API_URL = "http://localhost:8000"
// const API_URL = "http://backend:8000"

export type GameCatalogFilterType = "genres" | "companies" | "platforms";
export type GameCatalogSort =
  | "popular"
  | "rating"
  | "rating_count"
  | "name_asc"
  | "name_desc";

export interface GameCatalogPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface GameCatalogResponse {
  items: Game[];
  pagination: GameCatalogPagination;
}

interface GetCatalogGamesParams {
  filterType?: GameCatalogFilterType;
  value?: string;
  page?: number;
  limit?: number;
  sort?: GameCatalogSort;
}


export async function searchGames(
  query: string,
  limit: number = 10
): Promise<GameDetail[]> {
  if (!query.trim()) {
    return [];
  }
  console.log(query)

  const response = await fetch(
    `${PUBLIC_API_URL}/games/search?q=${encodeURIComponent(query)}&limit=${limit}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Failed to search games: ${response.status}`);
  }

  return response.json();
}
export async function getIndieGames(): Promise<Game[]> {
  const response = await fetch(
    `${PUBLIC_API_URL}/games/filter?type=genres&value=Indie&limit=10&offset=0`,
      { cache: "no-store" }

  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar jogos indies");
  }

  return response.json();
}
export async function getCatalogGames({
  filterType = "genres",
  value,
  page = 1,
  limit = 18,
  sort = "popular",
}: GetCatalogGamesParams = {}): Promise<GameCatalogResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
  });

  if (value?.trim()) {
    params.append(filterType, value.trim());
  }

  const response = await fetch(
    `${API_URL}/games?${params.toString()}`,
    { next: { revalidate: 3600 } },
  );

  if (!response.ok) {
    throw new Error("NÃ£o foi possÃ­vel carregar o catÃ¡logo de jogos");
  }

  return response.json();
}

export async function getGamesGenre(type:string, value:string): Promise<Game[]> {
  const catalog = await getCatalogGames({
    filterType: type as GameCatalogFilterType,
    value,
    limit: 30,
  });

  return catalog.items;
}

export async function getGamesByFilter(type:string, value:string): Promise<Game[]> {
  const response = await fetch(
    `${API_URL}/games/filter?type=${type}&value=${value}&limit=30&offset=0`,
      {next: { revalidate: 3600 }},

  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar jogos");
  }

  return response.json();
}

export async function searchGamesClient(
  query: string,
  limit: number = 10
): Promise<GameDetail[]> {
  if (!query.trim()) {
    return [];
  }
  const response = await fetch(
    `${API_URL}/games/search?q=${encodeURIComponent(query)}&limit=${limit}`,
     {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to search games: ${response.status}`);
  }

  return response.json();
}

export async function getPopularGames(): Promise<Game[]> {
  const response = await fetch(
    `${PUBLIC_API_URL}/games/popular`,
    {
      cache: "no-store",
    }
  );
  console.log(response)
  if (!response.ok) {
    throw new Error("Erro ao buscar jogos");
  }

  return response.json();
}

export async function getGameDetail(id: string): Promise<GameDetail> {
  const response = await fetch(`${API_URL}/games/id/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar jogos");
  }

  return response.json();
}

export async function getGameRecommendations(id: number): Promise<GameDetail[]> {
  const response = await fetch(`${API_URL}/games/recommend/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar jogos");
  }

  return response.json();
}
