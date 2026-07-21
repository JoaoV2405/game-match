import { Game, GameDetail } from "@/app/types/game"

const PUBLIC_API_URL = "http://localhost:8000"
const API_URL = "http://backend:8000"


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
export async function searchGamesClient(
  query: string,
  limit: number = 10
): Promise<GameDetail[]> {
  if (!query.trim()) {
    return [];
  }
  console.log(query)

  const response = await fetch(
    `${API_URL}/games/search?q=${encodeURIComponent(query)}&limit=${limit}`,
    { cache: "no-store" }
  );

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