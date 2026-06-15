import { Game, GameDetail } from "@/app/types/game"

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function searchGames(
  query: string,
  limit: number = 10
): Promise<GameDetail[]> {
  if (!query.trim()) {
    return [];
  }

  const response = await fetch(
    `${API_URL}/games/search?q=${encodeURIComponent(query)}&limit=${limit}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to search games: ${response.status}`
    );
  }

  return response.json();
}

export async function getPopularGames(): Promise<Game[]> {
  const response = await fetch(`${API_URL}/games/popular`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar jogos");
  }

  return response.json();
}
export async function getGameDetail(id:string): Promise<GameDetail> {
  const response = await fetch(`${API_URL}/games/id/${id}`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar jogos");
  }

  return response.json();
}
export async function getGameRecommendations(id:number): Promise<GameDetail[]> {
  console.log(`${API_URL}/games/recommend/${id}`)
  const response = await fetch(`${API_URL}/games/recommend/${id}`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar jogos");
  }

  return response.json();
}


// export function getMockGames(): Game[] {
//   return [
//     {
//       id: 1,
//       title: "Game One",
//       imageUrl: "https://picsum.photos/300/400?random=1",
//       rating: 4.5,
//       genre: "Action",
//     },
//     {
//       id: 2,
//       title: "Game Two",
//       imageUrl: "https://picsum.photos/300/400?random=2",
//       rating: 4.2,
//       genre: "Adventure",
//     },
//     {
//       id: 3,
//       title: "Game Three",
//       imageUrl: "https://picsum.photos/300/400?random=3",
//       rating: 4.8,
//       genre: "RPG",
//     },
//     {
//       id: 4,
//       title: "Game Four",
//       imageUrl: "https://picsum.photos/300/400?random=4",
//       rating: 3.9,
//       genre: "Strategy",
//     },
//     {
//       id: 5,
//       title: "Game Five",
//       imageUrl: "https://picsum.photos/300/400?random=5",
//       rating: 4.1,
//       genre: "Sports",
//     },
//     {
//       id: 6,
//       title: "Game Six",
//       imageUrl: "https://picsum.photos/300/400?random=6",
//       rating: 4.7,
//       genre: "Shooter",
//     },
//     {
//       id: 7,
//       title: "Game One",
//       imageUrl: "https://picsum.photos/300/400?random=1",
//       rating: 4.5,
//       genre: "Action",
//     },
//     {
//       id: 8,
//       title: "Game Two",
//       imageUrl: "https://picsum.photos/300/400?random=2",
//       rating: 4.2,
//       genre: "Adventure",
//     },
//     {
//       id: 9,
//       title: "Game Three",
//       imageUrl: "https://picsum.photos/300/400?random=3",
//       rating: 4.8,
//       genre: "RPG",
//     },
//     {
//       id: 10,
//       title: "Game Four",
//       imageUrl: "https://picsum.photos/300/400?random=4",
//       rating: 3.9,
//       genre: "Strategy",
//     },
//     {
//       id: 11,
//       title: "Game Five",
//       imageUrl: "https://picsum.photos/300/400?random=5",
//       rating: 4.1,
//       genre: "Sports",
//     },
//     {
//       id: 12,
//       title: "Game Six",
//       imageUrl: "https://picsum.photos/300/400?random=6",
//       rating: 4.7,
//       genre: "Shooter",
//     },
//   ];
// }

// function getMockGame(id: string): GameDetail {
//   return {
//     id,
//     title: "Hollow Knight",
//     imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg",
//     youtubeTrailerId: "UAO2urG23S4",
//     description:
//       "Hollow Knight is a classically styled action-adventure set in a vast, ruined underground kingdom. Forge your own path through a vast underground realm of fungal wastes, poisoned cities, and ancient temples. Battle tainted creatures, uncover forgotten knowledge, and explore a handcrafted world of astonishing scope and beauty. Features tight, responsive controls. Master a varied set of abilities as you explore huge worlds and fight a cast of threatening monsters and bosses.",
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