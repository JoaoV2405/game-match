import { API_URL } from "@/app/services/api";
import type { Game } from "@/app/types/game";

export async function getGamesByFilter(
  type: string,
  value: string,
): Promise<Game[]> {
  const response = await fetch(
    `${API_URL}/games/filter?type=${type}&value=${value}&limit=30&offset=0`,
    { next: { revalidate: 3600 } },
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar jogos");
  }

  return response.json();
}
