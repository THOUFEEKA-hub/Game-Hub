import type { AxiosRequestConfig } from 'axios';
import { fallbackGames, fallbackGenres, fallbackPlatforms } from '../data/fallbackData';
import type { FetchResponse, Game, GameQuery, Genre, Platform } from '../types';
import apiClient from './api-client';

const shouldUseFallback = () => !import.meta.env.VITE_RAWG_API_KEY;

const fallbackGenreMap: Record<number, number[]> = {
  3498: [4, 2],
  3328: [5, 3],
  4200: [7, 83],
  5286: [4, 3],
  5679: [5, 3],
  28: [4, 3],
};

const filterGames = (games: Game[], query: GameQuery) => {
  let filteredGames = [...games];

  if (query.searchText.trim()) {
    const normalizedSearch = query.searchText.trim().toLowerCase();
    filteredGames = filteredGames.filter((game) =>
      game.name.toLowerCase().includes(normalizedSearch),
    );
  }

  if (query.selectedGenre) {
    filteredGames = filteredGames.filter((game) =>
      fallbackGenreMap[game.id]?.includes(query.selectedGenre as number),
    );
  }

  if (query.selectedPlatform) {
    filteredGames = filteredGames.filter((game) =>
      game.parent_platforms.some(
        ({ platform }) => platform.id === query.selectedPlatform,
      ),
    );
  }

  switch (query.sortOrder) {
    case '-released':
      filteredGames.sort((a, b) => b.released.localeCompare(a.released));
      break;
    case 'name':
      filteredGames.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case '-added':
    case '-popularity':
      filteredGames.sort((a, b) => b.ratings_count - a.ratings_count);
      break;
    case '-rating':
      filteredGames.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return filteredGames;
};

export const getGames = async (
  query: GameQuery,
  config?: AxiosRequestConfig,
): Promise<FetchResponse<Game>> => {
  if (shouldUseFallback()) {
    return Promise.resolve({ results: filterGames(fallbackGames, query) });
  }

  const response = await apiClient.get<FetchResponse<Game>>('/games', {
    ...config,
    params: {
      search: query.searchText || undefined,
      genres: query.selectedGenre || undefined,
      parent_platforms: query.selectedPlatform || undefined,
      ordering: query.sortOrder || undefined,
      page_size: 18,
      ...config?.params,
    },
  });

  return response.data;
};

export const getGenres = async (
  config?: AxiosRequestConfig,
): Promise<FetchResponse<Genre>> => {
  if (shouldUseFallback()) {
    return Promise.resolve({ results: fallbackGenres });
  }

  const response = await apiClient.get<FetchResponse<Genre>>('/genres', config);
  return response.data;
};

export const getPlatforms = async (
  config?: AxiosRequestConfig,
): Promise<FetchResponse<Platform>> => {
  if (shouldUseFallback()) {
    return Promise.resolve({ results: fallbackPlatforms });
  }

  const response = await apiClient.get<FetchResponse<Platform>>('/platforms/lists/parents', config);
  return response.data;
};
