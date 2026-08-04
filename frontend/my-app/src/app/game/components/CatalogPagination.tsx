import { Pagination } from "@/app/components/results/Pagination";
import type {
  GameCatalogFilterType,
  GameCatalogSort,
} from "@/app/types/catalog";
import type { Pagination as PaginationData } from "@/app/types/pagination";
import { buildCatalogHref } from "../catalog";

interface CatalogPaginationProps {
  filterType: GameCatalogFilterType;
  selectedGenre: string;
  selectedSort: GameCatalogSort;
  pagination: PaginationData;
}

export function CatalogPagination({
  filterType,
  selectedGenre,
  selectedSort,
  pagination,
}: CatalogPaginationProps) {
  return (
    <Pagination
      pagination={pagination}
      buildHref={(page) =>
        buildCatalogHref({
          filterType,
          value: selectedGenre,
          sort: selectedSort,
          page,
        })
      }
    />
  );
}
