import { useEffect, useState } from 'react';
import { getGenres } from '../services/game-service';
import type { Genre } from '../types';

export const useGenres = () => {
  const [data, setData] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchGenres = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getGenres({ signal: controller.signal });
        setData(response.results);
      } catch {
        if (controller.signal.aborted) {
          return;
        }

        setError('Unable to load genres right now.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchGenres();

    return () => controller.abort();
  }, []);

  return { data, loading, error };
};
