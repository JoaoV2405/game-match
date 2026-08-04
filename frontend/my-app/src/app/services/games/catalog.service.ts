import { API_URL } from "@/app/services/api";
import type {
  GameCatalogFilterType,
  GameCatalogResponse,
  GetCatalogGamesParams,
} from "@/app/types/catalog";
import type { Game } from "@/app/types/game";

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

  const response = await fetch(`${API_URL}/games?${params.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Não foi possível carregar o catálogo de jogos");
  }

  return response.json();
}

export async function getGamesGenre(
  type: string,
  value: string,
): Promise<Game[]> {
  const catalog = await getCatalogGames({
    filterType: type as GameCatalogFilterType,
    value,
    limit: 30,
  });

  return catalog.items;
}
