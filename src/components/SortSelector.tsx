import styles from './SortSelector.module.css';

const sortOptions = [
  { value: '', label: 'Order by: Relevance' },
  { value: '-added', label: 'Date added' },
  { value: 'name', label: 'Name' },
  { value: '-released', label: 'Release date' },
  { value: '-popularity', label: 'Popularity' },
  { value: '-rating', label: 'Average rating' },
];

interface Props {
  selectedSortOrder: string;
  onSelectSortOrder: (sortOrder: string) => void;
}

export const SortSelector = ({
  selectedSortOrder,
  onSelectSortOrder,
}: Props) => {
  return (
    <select
      className={styles.select}
      value={selectedSortOrder}
      onChange={(event) => onSelectSortOrder(event.target.value)}
    >
      {sortOptions.map((option) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
