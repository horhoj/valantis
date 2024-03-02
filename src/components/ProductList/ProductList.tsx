import { useEffect } from 'react';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';
import { NUMBER_OF_PRODUCT_PER_PAGE } from '~/config/pagination.config';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { settingsSlice } from '~/store/settings.slice';
import { dataSlice } from '~/store/data.slice';

export function ProductList() {
  const dispatch = useAppDispatch();
  const productIdList = useAppSelector(
    (state) => state.data.fetchProductIdListRequest.data,
  );

  const page = useAppSelector((state) => state.settings.page);

  useEffect(() => {
    if (productIdList !== null) {
      const start = (page - 1) * NUMBER_OF_PRODUCT_PER_PAGE;
      const end = start + NUMBER_OF_PRODUCT_PER_PAGE - 1;
      const currentProductIdList = productIdList.slice(start, end);

      dispatch(
        dataSlice.thunks.fetchProductViewListThunk({
          productIdList: currentProductIdList,
        }),
      );
    }
  }, [page, productIdList]);

  const fetchProductViewListRequest = useAppSelector(
    (state) => state.data.fetchProductViewListRequest,
  );

  const handlePaginate = (page: number) => {
    dispatch(settingsSlice.actions.setPage(page));
  };

  return (
    productIdList && (
      <div className={styles.ProductList}>
        <Pagination
          count={productIdList.length}
          page={page}
          perPage={NUMBER_OF_PRODUCT_PER_PAGE}
          onPaginate={handlePaginate}
        />
        {fetchProductViewListRequest.data && (
          <div className={styles.productCardListWrapper}>
            {fetchProductViewListRequest.data.map((el) => (
              <ProductCard productView={el} key={el.id} />
            ))}
          </div>
        )}
        <Pagination
          count={productIdList.length}
          page={page}
          perPage={NUMBER_OF_PRODUCT_PER_PAGE}
          onPaginate={handlePaginate}
        />
      </div>
    )
  );
}