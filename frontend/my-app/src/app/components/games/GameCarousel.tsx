"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


import Link from "next/link";
import { Game } from "@/app/types/game";
import { GameCard } from "./GameCard";
import { TagPill } from "@/app/game/components/TagPill";
import { LinkLoadingIndicator } from "../ui/LinkLoadingIndicator";

interface GameCarouselProps {
  games: Game[];
}

export function GameCarousel({ games }: GameCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollCarousel(direction: "left" | "right") {
    const container = carouselRef.current;

    if (!container) {
      return;
    }

    const scrollDistance = container.clientWidth * 0.8;

    container.scrollBy({
      left:
        direction === "left"
          ? -scrollDistance
          : scrollDistance,
      behavior: "smooth",
    });
  }

  if (games.length === 0) {
    return (
      <div className="flex min-h-64 items-center justify-center text-gray-500">
        Nenhum jogo encontrado.
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollCarousel("left")}
        aria-label="Voltar jogos"
        className="
          absolute
          left-2
          top-1/2
          z-10
          hidden
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-white
          p-3
          text-ink-900
          shadow-lg
          transition
          hover:scale-105
          hover:bg-cotton-candy-50
          md:flex
        "
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div
        ref={carouselRef}
        className="
          flex
          snap-x
          snap-mandatory
          gap-6
          overflow-x-auto
          px-1
          pb-5
          pt-2
          scrollbar-hide
          md:px-12
        "
      >
        {games.map((game) => (
          <div
            key={game.id}
            className="
              w-[82%]
              shrink-0
              snap-start
              sm:w-[46%]
              lg:w-[31%]
            "
          >
            <Link
              href={`/game/${game.id}/recommendations`}
              className="block h-full"
            >
              <GameCard game={game}>
                {game.genres.map((genre) => (
                  <TagPill
                    key={`${game.id}-${genre}`}
                    label={genre}
                    variant="genre"
                  />
                ))}
              </GameCard>
              <LinkLoadingIndicator />
            </Link>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollCarousel("right")}
        aria-label="Avançar jogos"
        className="
          absolute
          right-2
          top-1/2
          z-10
          hidden
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-white
          p-3
          text-ink-900
          shadow-lg
          transition
          hover:scale-105
          hover:bg-cotton-candy-50
          md:flex
        "
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
