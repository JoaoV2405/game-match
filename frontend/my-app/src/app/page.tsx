import { HomeHero } from "@/app/components/home/HomeHero";
import { PopularGamesSection } from "@/app/components/games/PopularGamesSection";
import { IndieGamesSection } from "./components/games/IndieGamesSection";
import { GenresSection } from "./components/GenresSection";
export default function HomePage() {
  return (
    <main className="min-h-screen home-background">
      <HomeHero />
      <PopularGamesSection />
      <IndieGamesSection></IndieGamesSection>
      <GenresSection></GenresSection>
    </main>
  );
}
