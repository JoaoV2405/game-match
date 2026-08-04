import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface GenreCardData {
  name: string;
  href: string;
  gradient: string;
  description?: string;
}

interface GenreCardProps {
  genre: GenreCardData;
}

export function GenreCard({ genre }: GenreCardProps) {
  return (
    <Link
      href={genre.href}
      className={`
        group
        relative
        min-h-44
        overflow-hidden
        rounded-3xl
        bg-gradient-to-br
        p-6
        text-white
        transition
        duration-300
        hover:-translate-y-1
        ${genre.gradient}
      `}
    >
      <div
        className="
          absolute
          -right-10
          -top-10
          h-32
          w-32
          rounded-full
          bg-white/15
          transition
          duration-500
          group-hover:scale-150
        "
      />

      <div
        className="
          absolute
          -bottom-14
          -left-8
          h-32
          w-32
          rounded-full
          bg-black/10
        "
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex justify-end">
          <span
            className="
              rounded-full
              bg-white/20
              p-2
              backdrop-blur-sm
              transition
              group-hover:bg-white/30
            "
          >
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold">
            {genre.name}
          </h3>

          {genre.description && (
            <p className="mt-2 text-sm text-white/80">
              {genre.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
