"use client";
import { getPopularGames } from "@/app/services/games/featured.service";
import { useEffect, useState } from "react";
import { Game } from "@/app/types/game";
import { GameCarouselSection } from "./GameCarouselSection";

export function PopularGamesSection() {
  const [games, setGames] = useState<Game[] | null>(null);

  useEffect(() => {
    async function loadGames() {
      try {
        const data = await getPopularGames();
        setGames(data);
      } catch (error) {
        console.error("Erro ao carregar jogos populares:", error);
        setGames([]);
      }
    }

    void loadGames();
  }, []);

  return (
    <GameCarouselSection
      title="Jogos Bem Avaliados"
      games={games}
      href="/game?sort=popular"
      loadingText="Carregando jogos populares..."
    />
  );
}
