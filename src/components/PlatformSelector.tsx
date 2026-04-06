import type { Platform } from '../types';
import styles from './PlatformSelector.module.css';

interface Props {
  platforms: Platform[];
  selectedPlatform: number | null;
  onSelectPlatform: (platformId: number | null) => void;
}

export const PlatformSelector = ({
  platforms,
  selectedPlatform,
  onSelectPlatform,
}: Props) => {
  return (
    <select
      className={styles.select}
      value={selectedPlatform ?? ''}
      onChange={(event) =>
        onSelectPlatform(event.target.value ? Number(event.target.value) : null)
      }
    >
      <option value="">Platforms</option>
      {platforms.map((platform) => (
        <option key={platform.id} value={platform.id}>
          {platform.name}
        </option>
      ))}
    </select>
  );
};
