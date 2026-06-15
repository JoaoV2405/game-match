import { SearchBar } from "./SearchBar";

export function Hero() {
  return (
    <section
      className="
        flex
        h-[33vh]
        items-center
        justify-center
        bg-gradient-to-r from-purple-500 to-purple-900 pt-10 pb-16 px-4
      "
    >
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-violet-100">
          Game Matcher
        </h1>

        <p className="max-w-2xl text-lg text-violet-100">
          Descubra jogos que realmente combinam com seu estilo.
          Menos tempo procurando, mais tempo jogando.
        </p>

        <SearchBar />
      </div>
    </section>
  );
}