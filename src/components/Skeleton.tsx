import styles from './Skeleton.module.css';

export const Skeleton = () => {
  return (
    <article className={styles.card} aria-hidden="true">
      <div className={styles.image} />
      <div className={styles.body}>
        <div className={`${styles.line} ${styles.lineShort}`} />
        <div className={`${styles.line} ${styles.lineMedium}`} />
        <div className={`${styles.line} ${styles.lineLong}`} />
        <div className={styles.chipRow}>
          <div className={styles.chip} />
          <div className={styles.chip} />
        </div>
      </div>
    </article>
  );
};
