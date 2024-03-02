import {
  CommonResponse,
  FetchProductViewResponseItem,
  FetchProductsResponseItem,
  Filter,
  FilterProductsResponseItem,
  GetFilterValue,
  UniqueFieldValueItem,
} from '../types/products.types';
import { axiosInstance } from './apiTransport';
import { getUUID } from '~/utils/getUUID';

export const filterProductIdList = async (filter: Filter) => {
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

export const fetchProductIdList = async () => {
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

  const result: FetchProductViewResponseItem[] = [];
  const valueSet = new Set<FetchProductViewResponseItem['id']>();
  res.data.result.forEach((el) => {
    if (!valueSet.has(el.id)) {
      valueSet.add(el.id);
      result.push(el);
    }
  });

  return result;
};

export const fetchUniqueFieldValueList = async <T extends Filter['field']>(
  field: T,
): Promise<UniqueFieldValueItem<GetFilterValue<T>>[]> => {
  const res = await axiosInstance.request<CommonResponse<GetFilterValue<T>[]>>({
    method: 'post',
    data: { action: 'get_fields', params: { field } },
  });

  const valueSet = new Set<GetFilterValue<T>>();
  res.data.result.forEach((brand) => {
    if (brand !== null && !valueSet.has(brand)) {
      valueSet.add(brand);
    }
  });

  const valueList: UniqueFieldValueItem<GetFilterValue<T>>[] = [];
  valueSet.forEach((el) => {
    valueList.push({ id: getUUID(), value: el });
  });
  valueList.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }

    return 0;
  });

  return valueList;
};
