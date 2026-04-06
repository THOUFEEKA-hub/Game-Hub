import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiSearch } from 'react-icons/fi';
import styles from './SearchInput.module.css';

const searchSchema = z.object({
  search: z
    .string()
    .trim()
    .refine((value) => value.length === 0 || value.length >= 2, {
      message: 'Use at least 2 characters to search.',
    }),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface Props {
  value: string;
  onSearch: (value: string) => void;
}

export const SearchInput = ({ value, onSearch }: Props) => {
  const [inputValue, setInputValue] = useState(value);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { search: value },
    mode: 'onSubmit',
  });

  const { ref, ...searchField } = register('search');

  const submitSearch = handleSubmit(({ search }) => {
    onSearch(search.trim());
  });

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={submitSearch}>
        <FiSearch className={styles.icon} />
        <input
          {...searchField}
          ref={ref}
          className={styles.input}
          type="search"
          placeholder="Search games..."
          value={inputValue}
          onChange={(event) => {
            const nextValue = event.target.value;
            setInputValue(nextValue);
            setValue('search', nextValue, { shouldValidate: false });

            if (!nextValue.trim()) {
              onSearch('');
            }
          }}
        />
      </form>
      {errors.search ? <p className={styles.error}>{errors.search.message}</p> : null}
    </div>
  );
};
