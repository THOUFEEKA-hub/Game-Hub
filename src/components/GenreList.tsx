import type { ReactNode } from 'react';
import { useState } from 'react';
import { FiChevronDown, FiClock, FiCompass, FiGrid, FiHome, FiStar } from 'react-icons/fi';
import type { Genre } from '../types';
import styles from './GenreList.module.css';

interface Props {
  genres: Genre[];
  loading: boolean;
  error: string;
  selectedGenre: number | null;
  onSelectGenre: (genreId: number | null) => void;
  onNavigate?: () => void;
}

export const GenreList = ({
  genres,
  loading,
  error,
  selectedGenre,
  onSelectGenre,
  onNavigate,
}: Props) => {
  const [openSection, setOpenSection] = useState<'home' | 'genres' | 'releases'>(
    'genres',
  );

  const homeItems = ['Discover', 'Top games', 'Recommended', 'Popular now'];
  const releaseItems = ['Last 30 days', 'This week', 'Next week', 'Release calendar'];

  const toggleSection = (section: 'home' | 'genres' | 'releases') => {
    setOpenSection((current) => (current === section ? current : section));
  };

  const renderSectionHeader = (
    section: 'home' | 'genres' | 'releases',
    label: string,
    icon: ReactNode,
  ) => (
    <button
      className={styles.sectionToggle}
      type="button"
      onClick={() => toggleSection(section)}
      aria-expanded={openSection === section}
    >
      <span className={styles.sectionLabel}>
        <span className={styles.sectionIcon}>{icon}</span>
        {label}
      </span>
      <FiChevronDown
        className={`${styles.chevron} ${openSection === section ? styles.chevronOpen : ''}`}
      />
    </button>
  );

  if (loading) {
    return (
      <aside className={styles.panel}>
        <h2 className={styles.title}>Browse</h2>
        <p className={styles.status}>Loading genres...</p>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className={styles.panel}>
        <h2 className={styles.title}>Browse</h2>
        <p className={styles.status}>{error}</p>
      </aside>
    );
  }

  return (
    <aside className={styles.panel}>
      <h2 className={styles.title}>Browse</h2>

      <section className={styles.section}>
        {renderSectionHeader('home', 'Home', <FiHome />)}
        <div
          className={`${styles.sectionBody} ${openSection === 'home' ? styles.sectionBodyOpen : ''}`}
        >
          <div className={styles.simpleList}>
            {homeItems.map((item) => (
              <button
                key={item}
                className={styles.simpleItem}
                type="button"
                onClick={onNavigate}
              >
                <span className={styles.simpleItemIcon}>
                  <FiCompass />
                </span>
                <span className={styles.name}>{item}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        {renderSectionHeader('genres', 'Genres', <FiGrid />)}
        <div
          className={`${styles.sectionBody} ${openSection === 'genres' ? styles.sectionBodyOpen : ''}`}
        >
          <div className={styles.list}>
            <button
              className={`${styles.item} ${selectedGenre === null ? styles.active : ''}`}
              type="button"
              onClick={() => {
                onSelectGenre(null);
                onNavigate?.();
              }}
            >
              <img
                className={styles.thumb}
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=300&q=80"
                alt="All genres"
              />
              <span className={styles.name}>All games</span>
            </button>

            {genres.map((genre) => (
              <button
                key={genre.id}
                className={`${styles.item} ${selectedGenre === genre.id ? styles.active : ''}`}
                type="button"
                onClick={() => {
                  onSelectGenre(genre.id);
                  onNavigate?.();
                }}
              >
                <img
                  className={styles.thumb}
                  src={genre.image_background}
                  alt={genre.name}
                />
                <span className={styles.name}>{genre.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        {renderSectionHeader('releases', 'New Releases', <FiClock />)}
        <div
          className={`${styles.sectionBody} ${openSection === 'releases' ? styles.sectionBodyOpen : ''}`}
        >
          <div className={styles.simpleList}>
            {releaseItems.map((item) => (
              <button
                key={item}
                className={styles.simpleItem}
                type="button"
                onClick={onNavigate}
              >
                <span className={styles.simpleItemIcon}>
                  <FiStar />
                </span>
                <span className={styles.name}>{item}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

    </aside>
  );
};
