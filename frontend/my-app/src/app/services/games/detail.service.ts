import { API_URL } from "@/app/services/api";
import type { GameDetail } from "@/app/types/game";

export async function getGameDetail(id: string): Promise<GameDetail> {
  const response = await fetch(`${API_URL}/games/id/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar jogo");
  }

  return response.json();
}

export async function getGameRecommendations(
  id: number,
): Promise<GameDetail[]> {
  const response = await fetch(`${API_URL}/games/recommend/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar recomendações");
  }

  return response.json();
}
