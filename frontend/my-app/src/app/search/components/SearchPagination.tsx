import { Pagination } from "@/app/components/results/Pagination";
import type { Pagination as PaginationData } from "@/app/types/pagination";
import { buildSearchHref } from "../search";

interface SearchPaginationProps {
  query: string;
  pageSize: number;
  pagination: PaginationData;
}

export function SearchPagination({
  query,
  pageSize,
  pagination,
}: SearchPaginationProps) {
  return (
    <Pagination
      pagination={pagination}
      buildHref={(page) =>
        buildSearchHref({
          query,
          page,
          limit: pageSize,
        })
      }
    />
  );
}
