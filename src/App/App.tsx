import styles from './App.module.scss';
import { ProductList } from '~/components/ProductList';
import { FilterForm } from '~/components/FilterForm';

export function App() {
  return (
    <div className={styles.App}>
      <FilterForm />
      <ProductList />
    </div>
  );
}
