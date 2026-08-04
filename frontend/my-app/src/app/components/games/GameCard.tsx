import { Game, GameDetail } from "@/app/types/game";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { ReactNode } from "react";

export type GameCardVariant = "light" | "dark";

const cardStyles: Record<
  GameCardVariant,
  {
    article: string;
    image: string;
    title: string;
    rating: string;
    star: string;
  }
> = {
  light: {
    article: "bg-white text-slate-950 shadow-md hover:shadow-xl",
    image: "",
    title: "text-ink-900",
    rating: "text-slate-700",
    star: "#d98abe",
  },
  dark: {
    article:
      "border border-midnight-violet-50/10 bg-cotton-candy-50/[0.06] text-white shadow-[0_20px_50px_rgba(31,34,48,0.35)] backdrop-blur-sm hover:border-cotton-candy-200/45 hover:bg-cotton-candy-50/[0.1] hover:shadow-brilliant-rose-700/25",
    image: "border-b border-white/10",
    title: "text-midnight-violet-50 transition group-hover:text-cotton-candy-100",
    rating: "text-slate-300",
    star: "#d98abe",
  },
};

interface Props {
  game: GameDetail | Game;
  children?: ReactNode;
  variant?: GameCardVariant;
}

export function GameCard({ game, children, variant = "light" }: Props) {
  const styles = cardStyles[variant];

  return (
    <article
      className={`
        group
        h-full
        overflow-hidden
        rounded-2xl
        transition
        hover:-translate-y-1
        ${styles.article}
      `}
    >
      <div className={`relative h-90 w-full ${styles.image}`}>
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_url}`}
          alt={`${game.name} cover`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 80vw, 33vw"
          style={{
            objectFit: "cover",
            transitionProperty: "opacity",
            transitionDuration: "500ms",
            transitionTimingFunction: "cubic-bezier(0.7, 0, 0.6, 1)",
            opacity: 1,
            animation: "materialize 1000ms cubic-bezier(0.7, 0, 0.6, 1)",
          }}
        />
      </div>

      <div className="space-y-2 p-4">
        <h3 className={`text-lg font-bold ${styles.title}`}>
          {game.name}
        </h3>

        <div className={`flex items-center gap-2 ${styles.rating}`}>
          <FaStar color={styles.star} size={16} />
          <span>{game.total_rating.toPrecision(4)}</span>
        </div>

        {children}
      </div>
    </article>
  );
}
