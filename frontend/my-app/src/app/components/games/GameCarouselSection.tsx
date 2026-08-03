import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GameCarousel } from "./GameCarousel";
import { Game } from "@/app/types/game";

type GameCarouselSectionVariant = "default" | "indie"| "genres";

interface GameCarouselSectionProps {
  title: string;
  games: Game[] | null;
  href: string;
  loadingText?: string;
  variant?: GameCarouselSectionVariant;
}

const sectionStyles: Record<
  GameCarouselSectionVariant,
  {
    section: string;
    accent: string;
    title: string;
    link: string;
    loading: string;
  }
> = {
  default: {
    section: "py-10",
    accent: "bg-cotton-candy-200",
    title: "text-midnight-violet-50",
    link: "text-cotton-candy-100 hover:bg-white/10 hover:text-white",
    loading: "text-gray-400",
  },
  indie: {
    section:"py-10",
    accent: "bg-indigo-300",
    title: "text-brilliant-rose-50",
    link: "text-indigo-100 hover:bg-indigo-300/10 hover:text-brilliant-rose-50",
    loading: "text-indigo-100/70",
  },
  genres: {
    section:
      "py-12 bg-gradient-to-r from-ink-950/45 via-transparent to-indigo-900/40",
    accent: "bg-indigo-300",
    title: "text-brilliant-rose-50",
    link: "text-indigo-100 hover:bg-indigo-300/10 hover:text-brilliant-rose-50",
    loading: "text-indigo-100/70",
  },
};

export function GameCarouselSection({
  title,
  games,
  href,
  loadingText = "Carregando jogos...",
  variant = "default",
}: GameCarouselSectionProps) {
  const styles = sectionStyles[variant];

  return (
    <section className={styles.section}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2
            className={`flex items-center gap-3 text-2xl font-bold md:text-3xl ${styles.title}`}
          >
            <span className={`h-7 w-1 rounded-full ${styles.accent}`} />
            {title}
          </h2>

          <Link
            href={href}
            className={`
              inline-flex
              shrink-0
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-sm
              font-semibold
              transition
              ${styles.link}
            `}
          >
            Ver mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {games === null ? (
          <div className="flex min-h-64 items-center justify-center">
            <span className={styles.loading}>{loadingText}</span>
          </div>
        ) : (
          <GameCarousel games={games} />
        )}
      </div>
    </section>
  );
}
