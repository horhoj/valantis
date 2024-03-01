import { axiosInstance } from './apiTransport';
import {
  CommonResponse,
  FetchProductViewResponseItem,
  FetchProductsResponseItem,
  Filter,
  FilterProductsResponseItem,
  GetFilterValue,
  UniqueFieldValueItem,
} from './products.types';
import { getUUID } from '~/utils/getUUID';

export const filterProducts = async (filter: Filter) => {
  const data = {
    action: 'filter',
    params: { [filter.field]: filter.value },
  };

  const res = await axiosInstance.request<
    CommonResponse<FilterProductsResponseItem[]>
  >({
    method: 'post',
    data,
  });

  return res.data.result;
};

export const fetchProducts = async () => {
  const data = {
    action: 'get_ids',
  };

  const res = await axiosInstance.request<
    CommonResponse<FetchProductsResponseItem[]>
  >({
    method: 'post',
    data,
  });

  return res.data.result;
};

export const fetchProductViewList = async (productIdList: string[]) => {
  const res = await axiosInstance.request<
    CommonResponse<FetchProductViewResponseItem[]>
  >({
    method: 'post',
    data: {
      action: 'get_items',
      params: { ids: productIdList },
    },
  });

  return res.data.result;
};

export const fetchUniqueFieldValueList = async <T extends Filter['field']>(
  field: T,
): Promise<UniqueFieldValueItem<GetFilterValue<T>>[]> => {
  const res = await axiosInstance.request<CommonResponse<GetFilterValue<T>[]>>({
    method: 'post',
    data: { action: 'get_fields', params: { field } },
  });

  const brandSet = new Set<GetFilterValue<T>>();
  res.data.result.forEach((brand) => {
    if (brand !== null && !brandSet.has(brand)) {
      brandSet.add(brand);
    }
  });

  const brandList: UniqueFieldValueItem<GetFilterValue<T>>[] = [];
  brandSet.forEach((el) => {
    brandList.push({ id: getUUID(), value: el });
  });
  brandList.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }

    return 0;
  });

  return brandList;
};
