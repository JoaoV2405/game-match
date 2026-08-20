import { API_URL, PUBLIC_API_URL } from "@/app/services/api";
import type { GameDetail } from "@/app/types/game";
import type {
  GameSearchResponse,
  GetSearchGamesParams,
} from "@/app/types/search";

export async function searchGames(
  query: string,
  limit: number = 10,
): Promise<GameDetail[]> {
  if (!query.trim()) {
    return [];
  }

  const response = await fetch(
    `${PUBLIC_API_URL}/games/search?q=${encodeURIComponent(query)}&limit=${limit}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Failed to search games: ${response.status}`);
  }

  return response.json();
}

export async function searchGamesClient({
  query = "",
  page = 1,
  limit = 18,
}: GetSearchGamesParams = {}): Promise<GameSearchResponse> {
  if (!query.trim()) {
    return {
      items: [],
      pagination: {
        page,
        limit,
        total: 0,
        pages: 0,
      },
    };
  }

  const params = new URLSearchParams({
    q: query.trim(),
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(`${API_URL}/games?${params.toString()}`, {
     next: { revalidate: 3600 } ,

  });

  if (!response.ok) {
    throw new Error(`Failed to search games: ${response.status}`);
  }

  return response.json();
}
