"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useDebounce } from 'use-debounce';
import Image from "next/image"
import Link from "next/link";
import router from "next/router";



interface Game {
  id: number;
  name: string;
  cover_url: string;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);

  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  function handleSearch() { 
    if (!query.trim()) return; 
    
    router.push(`/search?q=${encodeURIComponent(query)}&limit=10`); 
  
  }

  useEffect(() => {
    const controller = new AbortController();
    async function search() {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/games/search?q=${encodeURIComponent(
            debouncedQuery
          )}&limit=5`,{signal: controller.signal}
        );

        const data = await response.json();

        setResults(data);
      } finally {
        setLoading(false);
      }
    }

    search();

    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div className="relative w-full max-w-2xl">
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
            focus:ring-violet-300
          "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { handleSearch(); setQuery(""); } }}
        />
      </div>

      {results.length > 0 && (
        <div
          className="
            absolute
            z-50
            mt-2
            w-full
            rounded-2xl
            bg-white
            shadow-xl
            border
          "
        >
          {results.map((game) => (
        <Link
          key={game.id}
          href={`/game/${game.id}`}
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