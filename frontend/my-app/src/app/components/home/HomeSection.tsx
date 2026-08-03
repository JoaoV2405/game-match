import { SearchBar } from "./SearchBar";

export function HomeSection() {
  return (
        <div
          className="
            relative
            z-10
            flex
            w-full
            max-w-4xl
            flex-col
            items-center
            gap-6
            px-6
            text-center
          "
        >
          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-sm
              font-medium
              text-cotton-candy-50
              shadow-lg
              shadow-ink-950/20
              backdrop-blur-md
            "
          >
            <span className="h-2 w-2 rounded-full bg-cotton-candy-200 shadow-[0_0_12px_rgba(195,180,232,0.9)]" />

            Encontre seu próximo jogo
          </span>

          <div className="relative">
            <h1
              className="
                text-5xl
                font-black
                tracking-tight
                text-white
                sm:text-6xl
                lg:text-7xl
              "
            >
              Game
              <span
                className="
                  ml-3
                  bg-gradient-to-r
                  from-cotton-candy-100
                  via-brilliant-rose-100
                  to-indigo-100
                  bg-clip-text
                  text-transparent
                "
              >
                Matcher
              </span>
            </h1>

            <div
              className="
                absolute
                -bottom-3
                left-1/2
                h-1
                w-36
                -translate-x-1/2
                rounded-full
                bg-gradient-to-r
                from-transparent
                via-cotton-candy-400
                to-transparent
                blur-[1px]
              "
            />
          </div>

          <p
            className="
              max-w-2xl
              text-base
              leading-relaxed
              text-midnight-violet-50/80
              sm:text-lg
            "
          >
            Descubra jogos que realmente combinam com seu estilo.
            Menos tempo procurando, mais tempo jogando.
          </p>

            <SearchBar />

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
              text-sm
              text-midnight-violet-50/60
            "
          >

          </div>
        </div>

);
}
