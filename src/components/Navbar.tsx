import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/gamehub-logo.svg';
import { SearchInput } from './SearchInput';
import styles from './Navbar.module.css';

interface Props {
  searchText: string;
  isDarkMode: boolean;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onSearch: (value: string) => void;
  onThemeToggle: () => void;
}

export const Navbar = ({
  searchText,
  isDarkMode,
  isMenuOpen,
  onMenuToggle,
  onSearch,
  onThemeToggle,
}: Props) => {
  return (
    <header className={`${styles.navbar} ${isMenuOpen ? styles.navbarMenuOpen : ''}`}>
      <button
        className={styles.menuToggle}
        type="button"
        onClick={onMenuToggle}
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      <div className={styles.brand}>
        <img className={styles.brandMark} src={logo} alt="GameHub logo" />
        <div className={styles.brandText}>
          <span className={styles.brandTitle}>GameHub</span>
          <span className={styles.brandSubtitle}>Discover your next obsession</span>
        </div>
      </div>

      <div className={styles.searchSlot}>
        <SearchInput value={searchText} onSearch={onSearch} />
      </div>

      <button
        className={styles.themeToggle}
        type="button"
        onClick={onThemeToggle}
        aria-label="Toggle dark mode"
      >
        <div
          className={`${styles.toggleTrack} ${isDarkMode ? styles.toggleTrackActive : ''}`}
        >
          <span
            className={`${styles.toggleThumb} ${isDarkMode ? styles.toggleThumbActive : ''}`}
          />
        </div>
        <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
      </button>
    </header>
  );
};
