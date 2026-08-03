import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type {
  GameCatalogFilterType,
  GameCatalogPagination as GameCatalogPaginationType,
  GameCatalogSort,
} from "@/app/services/games.service";
import {
  buildCatalogHref,
  getPaginationLabel,
} from "../catalog";

interface CatalogPaginationProps {
  filterType: GameCatalogFilterType;
  selectedGenre: string;
  selectedSort: GameCatalogSort;
  pagination: GameCatalogPaginationType;
}

export function CatalogPagination({
  filterType,
  selectedGenre,
  selectedSort,
  pagination,
}: CatalogPaginationProps) {
  const hasPreviousPage = pagination.page > 1;
  const hasNextPage = pagination.page < pagination.pages;

  return (
    <nav className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
      <PaginationLink
        href={
          hasPreviousPage
            ? buildCatalogHref({
                filterType,
                value: selectedGenre,
                sort: selectedSort,
                page: pagination.page - 1,
              })
            : "#"
        }
        disabled={!hasPreviousPage}
      >
        <ChevronLeft className="h-4 w-4" />
        Página anterior
      </PaginationLink>

      <span className="text-sm font-semibold text-slate-300">
        {getPaginationLabel(pagination)}
      </span>

      <PaginationLink
        href={
          hasNextPage
            ? buildCatalogHref({
                filterType,
                value: selectedGenre,
                sort: selectedSort,
                page: pagination.page + 1,
              })
            : "#"
        }
        disabled={!hasNextPage}
      >
        Próxima página
        <ChevronRight className="h-4 w-4" />
      </PaginationLink>
    </nav>
  );
}

function PaginationLink({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-disabled={disabled}
      className={`
        inline-flex
        h-11
        items-center
        gap-2
        rounded-lg
        border
        border-white/10
        px-4
        text-sm
        font-semibold
        transition
        ${
          disabled
            ? "pointer-events-none text-white/35"
            : "text-white hover:bg-white/10"
        }
      `}
    >
      {children}
    </Link>
  );
}
