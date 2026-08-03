import { GenreCard, GenreCardData } from "./GenreCard";

const featuredGenres: GenreCardData[] = [
  {
    name: "Aventura",
    description: "Explore mundos e histórias inesquecíveis.",
    href: "/game?type=genres&value=Adventure",
    gradient: "from-cotton-candy-400 to-cotton-candy-500",
  },
  {
    name: "RPG",
    description: "Evolua personagens e construa sua jornada.",
    href: "/game?type=genres&value=Role-playing%20(RPG)",
    gradient: "from-brilliant-rose-500 to-indigo-500",
  },
  {
    name: "Shooter",
    description: "Ação rápida, precisão e muita adrenalina.",
    href: "/game?type=genres&value=Shooter",
    gradient: "from-cotton-candy-500 to-cotton-candy-500/45",
  },
  {
    name: "Estratégia",
    description: "Planeje cada movimento e conquiste objetivos.",
    href: "/game?type=genres&value=Strategy",
    gradient: "from-brilliant-rose-500 to-brilliant-rose-500",
  },
  {
    name: "Indie",
    description: "Descubra experiências criativas e originais.",
    href: "/game?type=genres&value=Indie",
    gradient: "from-brilliant-rose-700 to-indigo-300",
  },
];

export function GenresSection() {
  return (
    <section className="py-8 pb-20 md:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Explore por gênero
          </h2>

          <p className="mt-2 text-midnight-violet-100/80">
            Encontre jogos de acordo com o seu estilo.
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-5
          "
        >
          {featuredGenres.map((genre) => (
            <GenreCard
              key={genre.name}
              genre={genre}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
