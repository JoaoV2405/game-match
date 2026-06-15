
import { HeroSection } from "../../components/HeroSection";
import { InfoSection } from "../../components/InfoSection";
import { RecommendationsSection } from "../../components/RecommendationSection";
import { getGameDetail, getGameRecommendations } from "../../../services/games.service";
import { GameDetail } from "../../../types/game";
import { HomeButton } from "@/app/components/HomeButton";


// async function getGame(id: string): Promise<GameDetail> {
 
//   return {
//     id,
//     title: "Hollow Knight",
//     coverArt: "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg",
//     youtubeTrailerId: "UAO2urG23S4",
//     description:
//       "Hollow Knight is a classically styled action-adventure set in a vast, ruined underground kingdom. Forge your own path through a vast underground realm of fungal wastes, poisoned cities, and ancient temples. Battle tainted creatures, uncover forgotten knowledge, and explore a handcrafted world of astonishing scope and beauty.",
//     genres: ["Metroidvania", "Action", "Platformer"],
//     themes: ["Dark Fantasy", "Exploration", "Insects"],
//     platforms: ["PC", "PlayStation 4", "Nintendo Switch"],
//     availableOn: ["steam", "nintendo", "playstation"],
//     recommendations: [
//       {
//         id: "2",
//         title: "Ori and the Will of the Wisps",
//         coverArt: "https://cdn.cloudflare.steamstatic.com/steam/apps/1057090/header.jpg",
//         youtubeTrailerId: "",
//         description: "",
//         genres: [],
//         themes: [],
//         platforms: [],
//         availableOn: [],
//         recommendations: [],
//       },
//       {
//         id: "3",
//         title: "Celeste",
//         coverArt: "https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg",
//         youtubeTrailerId: "",
//         description: "",
//         genres: [],
//         themes: [],
//         platforms: [],
//         availableOn: [],
//         recommendations: [],
//       },
//       {
//         id: "4",
//         title: "Blasphemous",
//         coverArt: "https://cdn.cloudflare.steamstatic.com/steam/apps/774361/header.jpg",
//         youtubeTrailerId: "",
//         description: "",
//         genres: [],
//         themes: [],
//         platforms: [],
//         availableOn: [],
//         recommendations: [],
//       },
//     ],
//   };
// }




export default async function GameRecommendationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id
  const game = await getGameDetail(id)
  console.log(game)
  const recommendations = await getGameRecommendations(game.id)
  
  return (
    <div className="min-h-screen font-sans antialiased" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
      <HeroSection game={game}>
        <HomeButton></HomeButton>
      </HeroSection>
      {recommendations.length !== 0 ? (
  <RecommendationsSection
    games={recommendations}
    currentTitle={game.name}
  />
) : null}
      <InfoSection game={game} />
    </div>
  );
}
