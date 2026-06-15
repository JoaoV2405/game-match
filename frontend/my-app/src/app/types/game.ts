
export interface Game {
  id: number;
  name: string;
  cover_url: string;
  total_rating: number;
  genres: string[];
}

export interface GameWebsiteDto {
  game_id: number;
  website_type: number;
  url: string;
}

export interface GameDetail {
  id: number;
  name: string;
  slug: string;
  summary: string;

  rating: number;
  rating_count: number;

  total_rating: number ;
  total_rating_count: number;

  cover_url: string;
  video_id: string | null;

  websites: GameWebsiteDto[];

  genres: string[];
  companies: string[];
  platforms: string[];
}