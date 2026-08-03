import type {
  GameCatalogFilterType,
  GameCatalogSort,
} from "@/app/services/games.service";
import {
  filterTypeOptions,
  genreOptions,
  sortOptions,
} from "../catalog";

interface CatalogFiltersProps {
  filterType: GameCatalogFilterType;
  selectedGenre: string;
  selectedSort: GameCatalogSort;
}

const selectClassName =
  "h-12 rounded-lg border border-cotton-candy/20 bg-midnight-violet px-4 text-white outline-none transition focus:border-brilliant-rose";

export function CatalogFilters({
  filterType,
  selectedGenre,
  selectedSort,
}: CatalogFiltersProps) {
  return (
    <form
      action="/game"
      className="
        grid
        gap-4
        border-white/10
        bg-white/[0.03]
        px-5
        py-5
        md:grid-cols-[1fr_1fr_1fr_auto]
      "
    >
      <label className="grid gap-2 text-sm font-semibold text-midnight-violet-100">
        Tipo de filtro
        <select
          name="type"
          defaultValue={filterType}
          className={selectClassName}
        >
          {filterTypeOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
              {option.disabled ? " (em breve)" : ""}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-semibold text-midnight-violet-100">
        Gênero
        <select
          name="value"
          defaultValue={selectedGenre}
          className={selectClassName}
        >
          {genreOptions.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.label}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-semibold text-midnight-violet-100">
        Ordenação
        <select
          name="sort"
          defaultValue={selectedSort}
          className={selectClassName}
        >
          {sortOptions.map((sort) => (
            <option key={sort.value} value={sort.value}>
              {sort.label}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-end">
        <button
          type="submit"
          className="h-12 w-full rounded-lg bg-cotton-candy-300 px-6 text-sm font-bold text-white transition hover:bg-cotton-candy-400 md:w-auto"
        >
          Aplicar
        </button>
      </div>
    </form>
  );
}
