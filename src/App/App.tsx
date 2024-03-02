import styles from './App.module.scss';
import { FilterForm } from '~/components/FilterForm';

export function App() {
  return (
    <div className={styles.App}>
      <FilterForm />
    </div>
  );
}
