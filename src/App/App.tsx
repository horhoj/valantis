import styles from './App.module.scss';
import { SpinnerContainer } from './SpinnerContainer';
import { ErrorContainer } from './ErrorContainer';
import { ProductList } from '~/components/ProductList';
import { FilterForm } from '~/components/FilterForm';
import { Loader } from '~/components/Loader';

export function App() {
  return (
    <>
      <SpinnerContainer />
      <ErrorContainer />
      <Loader>
        <div className={styles.App}>
          <FilterForm />
          <ProductList />
        </div>
      </Loader>
    </>
  );
}
