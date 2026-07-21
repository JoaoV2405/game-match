"use client";
import { getPopularGames } from "@/app/services/games.service";
import { GameGrid } from "./GameGrid";
import { useEffect, useState } from "react";
import { Game } from "@/app/types/game";
export function PopularGamesSection() {
  
  const [games, setGames] = useState<Game[] | null>(null);
  
  useEffect(() => {
    async function loadGames() {
        try {
            const data = await getPopularGames();
            setGames(data);
        } catch (error) {
            console.error(error);
            setGames([]); 
        }
    }

    loadGames();
}, []);

  return (
    <section className="py-16  ">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-8 text-3xl font-bold inline-block px-3 py-1 rounded-full text-purple-700  ">
          Jogos Populares
        </h2>
        <div
      className="
    bg-white
    rounded-3xl
    p-8
    shadow-xl
    border border-violet-100
    
  
  "
    >
      {games !== null && (
        <GameGrid games={games} />
      )}
      </div>
      </div>
    </section>
  );
}