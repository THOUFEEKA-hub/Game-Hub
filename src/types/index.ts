export interface GameQuery {
  searchText: string;
  selectedGenre: number | null;
  selectedPlatform: number | null;
  sortOrder: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  image_background?: string;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface GamePlatform {
  platform: Platform;
}

export interface Game {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  metacritic: number | null;
  rating: number;
  ratings_count: number;
  released: string;
  parent_platforms: GamePlatform[];
}

export interface FetchResponse<T> {
  results: T[];
}
