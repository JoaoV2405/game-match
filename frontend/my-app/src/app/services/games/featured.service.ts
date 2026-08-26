import { PUBLIC_API_URL } from "@/app/services/api";
import type { Game } from "@/app/types/game";

export async function getIndieGames(): Promise<Game[]> {
  const response = await fetch(
    `${PUBLIC_API_URL}/games/filter?type=genres&value=Indie&limit=10&offset=0`,{
      next: {
      revalidate: 300,
    }
    }
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar jogos indies");
  }

  return response.json();
}

export async function getPopularGames(): Promise<Game[]> {
  const response = await fetch(`${PUBLIC_API_URL}/games/popular`, {
     next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar jogos");
  }

  return response.json();
}
