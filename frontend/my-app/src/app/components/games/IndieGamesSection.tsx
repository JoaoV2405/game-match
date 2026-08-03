"use client";

import { useEffect, useState } from "react";
import { GameCarouselSection } from "./GameCarouselSection";
import { getIndieGames } from "@/app/services/games.service";
import { Game } from "@/app/types/game";


export function IndieGamesSection() {
  const [games, setGames] = useState<Game[] | null>(null);

  useEffect(() => {
    async function loadGames() {
      try {
        const data = await getIndieGames();
        setGames(data);
      } catch (error) {
        console.error("Erro ao carregar jogos indies:", error);
        setGames([]);
      }
    }

    void loadGames();
  }, []);

  return (
    <GameCarouselSection
      title="Melhores indies"
      games={games}
      href="/game?type=genres&value=Indie&sort=rating"
      loadingText="Carregando jogos indies..."
      variant="indie"
    />
  );
}
