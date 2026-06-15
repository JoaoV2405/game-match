
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
  summary: string | null;

  rating: number | null;
  rating_count: number | null;

  total_rating: number | null;
  total_rating_count: number | null;

  cover_url: string | null;
  video_id: string | null;

  websites: GameWebsiteDto[];

  genres: string[];
  companies: string[];
  platforms: string[];
}