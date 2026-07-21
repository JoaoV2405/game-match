import { searchGames, searchGamesClient } from "@/app/services/games.service";
import { GameGrid } from "../components/games/GameGrid";
import { ArrowLeft, Star, Calendar, Building, Search} from 'lucide-react';
import Link from "next/link";
import { HeroSection } from "../game/components/HeroSection";
import { HomeButton } from "../components/HomeButton";
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const game_recommendations = await searchGamesClient(
    q ?? "",
    10
  );
    
  return(
        <div className="results-view animate-in bg-violet-100">
            <div className="bg-[linear-gradient(135deg,#1e1b4b_0%,#2d1b69_50%,#1e1b4b_100%)] pt-2">
            <HomeButton></HomeButton>
            </div>
                    
            <section className="py-8 px-4 bg-bg-body min-h-[50vh]">
                <div className="container mx-auto max-w-7xl">
                    {game_recommendations.length === 0 ? (
                        <div className="text-center py-20 bg-white border border-dashed border-border rounded-xl">
                            <h3 className="text-xl font-bold mb-2">No Recommendations Found</h3>
                            <p className="text-text-secondary mb-6">Try a different Game or method.</p>
                            <button className="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg font-medium transition-all inline-flex items-center gap-2">
                                <Search size={18} /> Search Another Game
                            </button>
                        </div>
                    ) : (
                        
                        <div className="grid grid-cols-1 gap-5  bg-white
    rounded-3xl
    p-8
    shadow-xl
    border border-violet-100">
                            <div className="text-3xl font-extrabold text-text-primary mb-5 flex text-violet-700/60">Resultados encontrados para {q}</div>
                    

                          <GameGrid games={game_recommendations} />
                        </div>
                        )}
                </div>
            </section>
        </div>
    );
}

