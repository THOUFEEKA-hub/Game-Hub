import type { Game } from '../types';
import { GameCard } from './GameCard';
import styles from './GameGrid.module.css';
import { Skeleton } from './Skeleton';

interface Props {
  games: Game[];
  loading: boolean;
  error: string;
}

export const GameGrid = ({ games, loading, error }: Props) => {
  if (error) {
    return <div className={styles.message}>{error}</div>;
  }

  if (loading) {
    return (
      <section className={styles.grid}>
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </section>
    );
  }

  if (!games.length) {
    return (
      <div className={styles.message}>
        No games matched your filters. Try a different search or platform.
      </div>
    );
  }

  return (
    <section className={styles.grid}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </section>
  );
};
