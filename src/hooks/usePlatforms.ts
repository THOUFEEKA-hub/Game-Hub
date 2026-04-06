import { useEffect, useState } from 'react';
import { getPlatforms } from '../services/game-service';
import type { Platform } from '../types';

export const usePlatforms = () => {
  const [data, setData] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchPlatforms = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getPlatforms({ signal: controller.signal });
        setData(response.results);
      } catch {
        if (controller.signal.aborted) {
          return;
        }

        setError('Unable to load platforms right now.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchPlatforms();

    return () => controller.abort();
  }, []);

  return { data, loading, error };
};
