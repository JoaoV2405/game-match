import { Hero } from "@/app/components/hero/Hero";
import { PopularGamesSection } from "@/app/components/games/PopularGamesSection";
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-violet-100 to-violet-200">
      <Hero />
      <PopularGamesSection />
    </main>
  );
}