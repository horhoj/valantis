import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  RequestList,
  RequestStateProperty,
  makeRequestExtraReducer,
  makeRequestStateProperty,
} from './helpers';
import { RootState } from './types';
import {
  fetchProductIdList,
  fetchProductViewList,
  fetchUniqueFieldValueList,
  filterProductIdList,
} from '~/api/products.api';
import {
  FetchProductViewResponseItem,
  FetchProductsResponseItem,
  Filter,
  UniqueFieldValueItem,
} from '~/types/products.types';
import { FILTER_DEFAULT_VALUES } from '~/config/filter.config';

const SLICE_NAME = 'data';

interface IS {
  fetchBrandListRequest: RequestStateProperty<UniqueFieldValueItem<string>[]>;
  fetchProductIdListRequest: RequestStateProperty<FetchProductsResponseItem[]>;
  fetchProductViewListRequest: RequestStateProperty<
    FetchProductViewResponseItem[]
  >;
}

const initialState: IS = {
  fetchBrandListRequest: makeRequestStateProperty(),
  fetchProductIdListRequest: makeRequestStateProperty(),
  fetchProductViewListRequest: makeRequestStateProperty(),
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      fetchBrandListThunk,
      'fetchBrandListRequest',
    );
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      fetchProductIdListThunk,
      'fetchProductIdListRequest',
    );
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      fetchProductViewListThunk,
      'fetchProductViewListRequest',
    );
  },
});

const fetchBrandListThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchBrandListThunk`,
  async (_, store) => {
    try {
      const brandList = await fetchUniqueFieldValueList('brand');

      return store.fulfillWithValue(brandList);
    } catch (e: unknown) {
      if (e instanceof Error) {
        return store.rejectWithValue(e.message);
      }
      return 'unknown error';
    }
  },
);

const fetchProductIdListThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchProductIdListThunk`,
  async (filter: Filter, store) => {
    try {
      const currentFilter: Filter = { ...filter };
      if (currentFilter.field === 'product') {
        currentFilter.value = currentFilter.value.trim();
      }
      const defaultValue = FILTER_DEFAULT_VALUES[currentFilter.field];
      let res: FetchProductsResponseItem[] = [];
      if (currentFilter.value === defaultValue.value) {
        res = await fetchProductIdList();
      } else {
        res = await filterProductIdList(currentFilter);
      }

      return store.fulfillWithValue(res);
    } catch (e: unknown) {
      if (e instanceof Error) {
        return store.rejectWithValue(e.message);
      }
      return 'unknown error';
    }
  },
);

interface FetchProductViewListThunkPayload {
  productIdList: FetchProductsResponseItem[];
}

const fetchProductViewListThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchProductViewListThunk`,
  async ({ productIdList }: FetchProductViewListThunkPayload, store) => {
    try {
      const brandList = await fetchProductViewList(productIdList);

      return store.fulfillWithValue(brandList);
    } catch (e: unknown) {
      if (e instanceof Error) {
        return store.rejectWithValue(e.message);
      }
      return 'unknown error';
    }
  },
);

export const dataReducer = reducer;

export const dataSlice = {
  actions,
  thunks: {
    fetchBrandListThunk,
    fetchProductIdListThunk,
    fetchProductViewListThunk,
  },
} as const;

export const dataIsLoadingSelector = (state: RootState) =>
  state.data.fetchBrandListRequest.isLoading ||
  state.data.fetchBrandListRequest.isLoading ||
  state.data.fetchProductViewListRequest.isLoading;

export const dataIsErrorSelector = (state: RootState) =>
  state.data.fetchBrandListRequest.error ||
  state.data.fetchBrandListRequest.error ||
  state.data.fetchProductViewListRequest.error;
