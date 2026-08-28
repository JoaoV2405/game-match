import { GenreCard, GenreCardData } from "./GenreCard";
import { LinkLoadingIndicator } from "./ui/LinkLoadingIndicator";
import Link from "next/link";

const featuredGenres: GenreCardData[] = [
  {
    name: "Aventura",
    description: "Explore mundos e histórias inesquecíveis.",
    href: "/game?type=genres&value=Adventure",
    gradient: "from-[#fa0532] via-[#fa0532] to-[#fa0532]",
  },
  {
    name: "RPG",
    description: "Evolua personagens e construa sua jornada.",
    href: "/game?type=genres&value=Role-playing%20(RPG)",
    gradient: "from-[#00B4D8] via-[#0077B6] to-[#023E8A]",
  },
  {
    name: "Shooter",
    description: "Ação rápida, precisão e muita adrenalina.",
    href: "/game?type=genres&value=Shooter",
    gradient: "from-[#22C55E] via-[#22C55E] to-[#22C55E]",
  },
  {
    name: "Estratégia",
    description: "Planeje cada movimento e conquiste objetivos.",
    href: "/game?type=genres&value=Strategy",
    gradient: "from-[#F2CB40] via-[#F2CB40] to-[#F2CB40]",
  },
  {
    name: "Indie",
    description: "Descubra experiências criativas e originais.",
    href: "/game?type=genres&value=Indie",
    gradient: "from-[#F61067] via-[#F61067] to-[#F61067]",
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
            <Link
              key={genre.name}
              href={genre.href}
            >
            <GenreCard
              key={genre.name}
              genre={genre}
            />
            <LinkLoadingIndicator name="o gênero"/>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
