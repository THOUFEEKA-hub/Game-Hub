import { useEffect, useState } from 'react';
import { getGames } from '../services/game-service';
import type { Game, GameQuery } from '../types';

export const useGames = (gameQuery: GameQuery) => {
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchGames = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getGames(gameQuery, {
          signal: controller.signal,
        });

        setData(response.results);
      } catch {
        if (controller.signal.aborted) {
          return;
        }

        setError('Unable to load games right now. Please try again.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchGames();

    return () => controller.abort();
  }, [gameQuery]);

  return { data, loading, error };
};
