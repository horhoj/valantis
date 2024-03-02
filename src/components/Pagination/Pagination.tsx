import { useMemo } from 'react';
import styles from './Pagination.module.scss';
import { getUUID } from '~/utils/getUUID';

interface PaginationProps {
  count: number;
  page: number;
  perPage: number;
  onPaginate: (page: number) => void;
}

export function Pagination({
  count,
  onPaginate,
  page,
  perPage,
}: PaginationProps) {
  const lastPage = Math.ceil(count / perPage);

  const first = () => {
    if (page !== 1) {
      onPaginate(1);
    }
  };

  const last = () => {
    if (page !== lastPage) {
      onPaginate(lastPage);
    }
  };

  const prev = () => {
    if (page > 1) {
      onPaginate(page - 1);
    }
  };

  const next = () => {
    if (page < lastPage) {
      onPaginate(page + 1);
    }
  };

  return (
    <div className={styles.Pagination}>
      <button className={styles.button} onClick={first}>
        {'<<'}
      </button>
      <button className={styles.button} onClick={prev}>
        {'<'}
      </button>
      <div className={styles.page}>
        {page}-{lastPage}
      </div>
      <button className={styles.button} onClick={next}>
        {'>'}
      </button>
      <button className={styles.button} onClick={last}>
        {'>>'}
      </button>
    </div>
  );
}
