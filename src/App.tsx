import { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import type { GameQuery } from './types';

const DEFAULT_QUERY: GameQuery = {
  searchText: '',
  selectedGenre: null,
  selectedPlatform: null,
  sortOrder: '',
};

const STORAGE_KEY = 'gamehub-theme';

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>(DEFAULT_QUERY);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);

    if (savedTheme) {
      return savedTheme === 'dark';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', !isDarkMode);
    document.body.classList.toggle('theme-light', !isDarkMode);
    window.localStorage.setItem(STORAGE_KEY, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <HomePage
      gameQuery={gameQuery}
      isDarkMode={isDarkMode}
      onSearch={(searchText) => setGameQuery((prev) => ({ ...prev, searchText }))}
      onGenreSelect={(selectedGenre) =>
        setGameQuery((prev) => ({ ...prev, selectedGenre }))
      }
      onPlatformSelect={(selectedPlatform) =>
        setGameQuery((prev) => ({ ...prev, selectedPlatform }))
      }
      onSortSelect={(sortOrder) => setGameQuery((prev) => ({ ...prev, sortOrder }))}
      onThemeToggle={() => setIsDarkMode((prev) => !prev)}
    />
  );
}

export default App;
