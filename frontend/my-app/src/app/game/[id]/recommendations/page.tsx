
import { HeroSection } from "../../components/HeroSection";
import { InfoSection } from "../../components/InfoSection";
import { RecommendationsSection } from "../../components/RecommendationSection";
import {
  getGameDetail,
  getGameRecommendations,
} from "@/app/services/games/detail.service";
import { HomeButton } from "@/app/components/ui/HomeButton";
import { HeroLayout } from "@/app/components/layout/HeroLayout";


export default async function GameRecommendationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id
  const game = await getGameDetail(id)
  const recommendations = await getGameRecommendations(game.id)
  
  return (
    <main className="min-h-screen app-gradient font-sans antialiased">
      <div className="flex w-full justify-start px-3 pt-3 sm:px-6 sm:pt-6">
        <HomeButton />
      </div>
      <HeroLayout>
        <HeroSection game={game} />
      </HeroLayout>
      {recommendations.length !== 0 ? (
        <RecommendationsSection
          games={recommendations}
          currentTitle={game.name}
        />
      ) : null}
      <InfoSection game={game} />
    </main>
  );
}
