import styles from './ProductCard.module.scss';
import { DevView } from '~/ui/DevView';
import { FetchProductViewResponseItem } from '~/types/products.types';

interface ProductCardProps {
  productView: FetchProductViewResponseItem;
}
export function ProductCard({ productView }: ProductCardProps) {
  return (
    <div className={styles.ProductCard}>
      <div className={styles.paramWrapper}>
        <span className={styles.paramTitle}>Наименование:</span>
        <span className={styles.paramView}>{productView.product}</span>
      </div>
      <div className={styles.paramWrapper}>
        <span className={styles.paramTitle}>Брэнд:</span>
        <span className={styles.paramView}>
          {productView.brand ?? '<отсутствует>'}
        </span>
      </div>
      <div className={styles.paramWrapper}>
        <span className={styles.paramTitle}>Цена:</span>
        <span className={styles.paramView}>
          {productView.price.toLocaleString()}р.
        </span>
      </div>
      <div className={styles.paramWrapper}>
        <span className={styles.paramTitle}>ИД:</span>
        <span className={styles.paramView}>{productView.id}</span>
      </div>
    </div>
  );
}
