import { FiPlus } from 'react-icons/fi';
import type { Game } from '../types';
import { platformIconMap } from '../utils/platformIcons';
import styles from './GameCard.module.css';

interface Props {
  game: Game;
}

export const GameCard = ({ game }: Props) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={game.background_image} alt={game.name} />
        <div className={styles.overlay}>
          <div className={styles.platforms}>
            {game.parent_platforms.slice(0, 5).map(({ platform }) => (
              <span key={`${game.id}-${platform.id}`}>
                {platformIconMap[platform.slug] ?? platform.name.slice(0, 2)}
              </span>
            ))}
          </div>
          {game.metacritic ? <div className={styles.rating}>{game.metacritic}</div> : null}
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{game.name}</h3>
        <div className={styles.meta}>
          <span className={styles.pill}>
            <FiPlus />
            {game.ratings_count.toLocaleString()}
          </span>
          <span>{new Date(game.released).getFullYear()}</span>
        </div>
      </div>
    </article>
  );
};
