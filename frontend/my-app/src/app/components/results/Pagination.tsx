import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Pagination as PaginationData } from "@/app/types/pagination";

interface PaginationProps {
  pagination: PaginationData;
  buildHref: (page: number) => string;
  previousLabel?: string;
  nextLabel?: string;
}

export function Pagination({
  pagination,
  buildHref,
  previousLabel = "Página anterior",
  nextLabel = "Próxima página",
}: PaginationProps) {
  const hasPreviousPage = pagination.page > 1;
  const hasNextPage = pagination.page < pagination.pages;

  return (
    <nav className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
      <PaginationLink
        href={hasPreviousPage ? buildHref(pagination.page - 1) : "#"}
        disabled={!hasPreviousPage}
      >
        <ChevronLeft className="h-4 w-4" />
        {previousLabel}
      </PaginationLink>

      <span className="text-sm font-semibold text-slate-300">
        {pagination.page} / {Math.max(pagination.pages, 1)}
      </span>

      <PaginationLink
        href={hasNextPage ? buildHref(pagination.page + 1) : "#"}
        disabled={!hasNextPage}
      >
        {nextLabel}
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
