import styles from './App.module.scss';
import {
  fetchProductViewList,
  fetchUniqueFieldValueList,
  filterProducts,
} from '~/api/products.api';

export function App() {
  const handleTest = async () => {
    // const res = await filterProducts({ field: 'product', value: 'asdsa' });
    // const res = await fetchProducts();
    // const res2 = await fetchProductViews(res.slice(0, 10));
    // const res2 = await fetchProductViews(res);
    const res2 = await fetchUniqueFieldValueList('brand');
  };

  return (
    <div className={styles.App}>
      <button onClick={handleTest}>test</button>
    </div>
  );
}
