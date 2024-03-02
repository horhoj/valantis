import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  RequestList,
  RequestStateProperty,
  makeRequestExtraReducer,
  makeRequestStateProperty,
} from './helpers';
import { fetchUniqueFieldValueList } from '~/api/products.api';
import { UniqueFieldValueItem } from '~/types/products.types';

const SLICE_NAME = 'data';

interface IS {
  fetchBrandList: RequestStateProperty<UniqueFieldValueItem<string>[]>;
}

const initialState: IS = {
  fetchBrandList: makeRequestStateProperty(),
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      fetchBrandListThunk,
      'fetchBrandList',
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

export const dataReducer = reducer;

export const dataSlice = { actions, thunks: { fetchBrandListThunk } } as const;
