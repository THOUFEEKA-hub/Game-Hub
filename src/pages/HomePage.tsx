import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { GenreList } from '../components/GenreList';
import { GameGrid } from '../components/GameGrid';
import { Navbar } from '../components/Navbar';
import { PlatformSelector } from '../components/PlatformSelector';
import { SortSelector } from '../components/SortSelector';
import { useGames } from '../hooks/useGames';
import { useGenres } from '../hooks/useGenres';
import { usePlatforms } from '../hooks/usePlatforms';
import type { GameQuery } from '../types';
import styles from './HomePage.module.css';

interface Props {
  gameQuery: GameQuery;
  isDarkMode: boolean;
  onSearch: (searchText: string) => void;
  onGenreSelect: (genreId: number | null) => void;
  onPlatformSelect: (platformId: number | null) => void;
  onSortSelect: (sortOrder: string) => void;
  onThemeToggle: () => void;
}

export const HomePage = ({
  gameQuery,
  isDarkMode,
  onSearch,
  onGenreSelect,
  onPlatformSelect,
  onSortSelect,
  onThemeToggle,
}: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarWrapperRef = useRef<HTMLDivElement | null>(null);
  const {
    data: genres,
    loading: genresLoading,
    error: genresError,
  } = useGenres();
  const { data: platforms, loading: platformsLoading } = usePlatforms();
  const { data: games, loading: gamesLoading, error: gamesError } = useGames(gameQuery);

  const activeGenreName =
    genres.find((genre) => genre.id === gameQuery.selectedGenre)?.name ?? 'Games';

  useEffect(() => {
    const syncSidebarWithViewport = () => {
      if (window.innerWidth > 1200) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    syncSidebarWithViewport();
    window.addEventListener('resize', syncSidebarWithViewport);

    return () => window.removeEventListener('resize', syncSidebarWithViewport);
  }, []);

  useEffect(() => {
    const updateNavbarHeight = () => {
      const nextHeight = navbarWrapperRef.current?.offsetHeight ?? 0;
      setNavbarHeight(nextHeight);
    };

    updateNavbarHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateNavbarHeight();
    });

    if (navbarWrapperRef.current) {
      resizeObserver.observe(navbarWrapperRef.current);
    }

    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  const pageStyle = {
    '--navbar-offset': `${Math.max(navbarHeight + 16, 120)}px`,
    '--drawer-gap': '16px',
  } as CSSProperties;

  return (
    <main className={styles.page} style={pageStyle}>
      <div ref={navbarWrapperRef}>
        <Navbar
          searchText={gameQuery.searchText}
          isDarkMode={isDarkMode}
          isMenuOpen={isSidebarOpen}
          onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
          onSearch={onSearch}
          onThemeToggle={onThemeToggle}
        />
      </div>

      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.overlayVisible : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div className={styles.layout}>
        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
          <GenreList
            genres={genres}
            loading={genresLoading}
            error={genresError}
            selectedGenre={gameQuery.selectedGenre}
            onSelectGenre={onGenreSelect}
            onNavigate={() => {
              if (window.innerWidth <= 1200) {
                setIsSidebarOpen(false);
              }
            }}
          />
        </div>

        <section className={styles.content}>
          <div className={styles.hero}>
            <p className={styles.eyebrow}>Trending collections</p>
            <h1 className={styles.title}>{activeGenreName}</h1>
            <p className={styles.description}>
              Browse a cinematic catalogue of top-rated titles with a layout inspired by
              RAWG. Connect your API key to swap the curated fallback content with live
              game data and artwork.
            </p>
          </div>

          <div className={styles.toolbar}>
            <PlatformSelector
              platforms={platforms}
              selectedPlatform={gameQuery.selectedPlatform}
              onSelectPlatform={onPlatformSelect}
            />
            <SortSelector
              selectedSortOrder={gameQuery.sortOrder}
              onSelectSortOrder={onSortSelect}
            />
          </div>

          {!platformsLoading && !import.meta.env.VITE_RAWG_API_KEY ? (
            <p className={styles.note}>
              Add `VITE_RAWG_API_KEY` to your environment to load live RAWG data and game
              imagery. The current screen uses a curated fallback dataset so the UI works
              immediately.
            </p>
          ) : null}

          <GameGrid games={games} loading={gamesLoading} error={gamesError} />
        </section>
      </div>
    </main>
  );
};
