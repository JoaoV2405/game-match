import { SearchBar } from "./SearchBar";

export function Hero() {
  return (
    <section
      className="
        flex
        h-[80%]
        items-center
        justify-center
        bg-[linear-gradient(135deg,#1e1b4b_0%,#2d1b69_50%,#1e1b4b_100%)] pt-10 pb-16 px-4 
      "
    >
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <div className="flex flex-row">
        <h1 className="text-5xl font-extrabold text-white">
          Game
        </h1>
        <h1 className="text-5xl font-extrabold text-[#a78bfa]">
           Matcher
        </h1>
        </div>

        <p className="max-w-2xl text-lg text-violet-100">
          Descubra jogos que realmente combinam com seu estilo.
          Menos tempo procurando, mais tempo jogando.
        </p>

        <SearchBar />
      </div>
    </section>
  );
}