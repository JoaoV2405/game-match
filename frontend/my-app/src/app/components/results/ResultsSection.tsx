import type { ReactNode } from "react";
import type { Pagination } from "@/app/types/pagination";

interface ResultsSectionProps {
  title: string;
  pagination: Pagination;
  emptyTitle: string;
  emptyDescription: string;
  isEmpty: boolean;
  children: ReactNode;
  footer?: ReactNode;
}

export function ResultsSection({
  title,
  pagination,
  emptyTitle,
  emptyDescription,
  isEmpty,
  children,
  footer,
}: ResultsSectionProps) {
  return (
    <section className="mx-auto w-full max-w-7xl rounded-lg px-6 pb-20 pt-5">
      <div className="mb-6 flex flex-col justify-between gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {title}
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            {getTotalLabel(pagination.total)} · página {pagination.page} de{" "}
            {Math.max(pagination.pages, 1)}
          </p>
        </div>
      </div>

      {isEmpty ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
        />
      ) : (
        children
      )}

      {footer}
    </section>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-y border-dashed border-white/15 py-20 text-center">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-slate-300">{description}</p>
    </div>
  );
}

function getTotalLabel(total: number) {
  return total === 1 ? "1 jogo encontrado" : `${total} jogos encontrados`;
}
