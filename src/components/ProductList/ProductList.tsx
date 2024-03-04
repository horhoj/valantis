import { useEffect } from 'react';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';
import { NUMBER_OF_PRODUCT_PER_PAGE } from '~/config/pagination.config';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { settingsSlice } from '~/store/settings.slice';
import { dataSlice } from '~/store/data.slice';

const getProductIdList = (productIdList: string[], currentPage: number) => {
  const start = (currentPage - 1) * NUMBER_OF_PRODUCT_PER_PAGE;
  const end = start + NUMBER_OF_PRODUCT_PER_PAGE - 1;
  return productIdList.slice(start, end);
};

export function ProductList() {
  const dispatch = useAppDispatch();
  const productIdList = useAppSelector(
    (state) => state.data.fetchProductIdListRequest.data,
  );

  const page = useAppSelector((state) => state.settings.page);

  useEffect(() => {
    if (productIdList !== null) {
      const currentProductIdList = getProductIdList(productIdList, 1);
      dispatch(
        dataSlice.thunks.fetchProductViewListThunk({
          productIdList: currentProductIdList,
        }),
      );
    }
  }, [productIdList]);

  const fetchProductViewListRequest = useAppSelector(
    (state) => state.data.fetchProductViewListRequest,
  );

  const handlePaginate = (page: number) => {
    if (productIdList !== null) {
      const currentProductIdList = getProductIdList(productIdList, page);
      dispatch(
        dataSlice.thunks.fetchProductViewListThunk({
          productIdList: currentProductIdList,
        }),
      );
    }
    dispatch(settingsSlice.actions.setPage(page));
  };

  if (productIdList?.length === 0) {
    return <div className={styles.msg}>ничего не найдено</div>;
  }

  return (
    productIdList &&
    productIdList.length > 0 && (
      <div className={styles.ProductList}>
        <Pagination
          count={productIdList.length}
          page={page}
          perPage={NUMBER_OF_PRODUCT_PER_PAGE}
          onPaginate={handlePaginate}
        />
        {fetchProductViewListRequest.isLoading &&
          fetchProductViewListRequest.data === null && (
            <div className={styles.msg}>Идет загрузка...</div>
          )}
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
