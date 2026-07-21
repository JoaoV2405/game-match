import { Hero } from "@/app/components/hero/Hero";
import { PopularGamesSection } from "@/app/components/games/PopularGamesSection";
export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#e5e5f7]">
      <Hero />
      <PopularGamesSection />
    </main>
  );
}