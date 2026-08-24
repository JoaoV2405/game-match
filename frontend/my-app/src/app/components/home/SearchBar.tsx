"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";
import Image from "next/image";
import Link from "next/link";
import { API_URL } from "@/app/services/api";

interface Game {
  id: number;
  name: string;
  cover_url: string;
}

type SearchSuggestionResponse = Game[] | { items: Game[] };

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [results, setResults] = useState<Game[]>([]);

  const searchBarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  function handleSearch() {
    if (!query.trim()) return;

    router.push(
      `/search?q=${encodeURIComponent(query)}&limit=18`
    );

    setResults([]);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(target)
      ) {
        setResults([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function search() {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/games/search?q=${encodeURIComponent(
            debouncedQuery
          )}&limit=5`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar jogos");
        }

        const data: SearchSuggestionResponse = await response.json();
        setResults(Array.isArray(data) ? data : data.items);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(error);
          setResults([]);
        }
      }
    }

    search();

    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div
      ref={searchBarRef}
      className="relative z-50 w-full max-w-2xl"
    >
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Procure seu próximo jogo..."
          className="
            w-full
            rounded-full
            bg-white
            px-12
            py-4
            text-lg
            shadow-lg
            outline-none
            transition
            focus:ring-4
            focus:ring-cotton-candy-300
          "
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
              setQuery("");
            }
          }}
        />
      </div>

      {results.length > 0 && (
        <div
          className="
            absolute
            z-[100]
            mt-2
            w-full
            overflow-hidden
            rounded-2xl
            border
            bg-white
            shadow-xl
          "
        >
          {results.map((game) => (
            <Link
              key={game.id}
              href={`/game/${game.id}/recommendations`}
              onClick={() => setResults([])}
              className="
                flex
                items-center
                gap-3
                p-3
                transition-colors
                hover:bg-slate-50
              "
            >
              <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.cover_url}`}
                  alt={game.name}
                  fill
                  className="object-cover"
                />
              </div>

              <span className="font-medium text-slate-800">
                {game.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
