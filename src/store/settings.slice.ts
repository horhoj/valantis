import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { number } from 'yup';
import { DEFAULT_FILTER } from '~/config/filter.config';
import { Filter } from '~/types/products.types';

const SLICE_NAME = 'settingsSlice';

interface IS {
  filter: Filter;
  page: number;
}

const initialState: IS = {
  filter: DEFAULT_FILTER,
  page: 1,
};

const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const settingsReducer = reducer;

export const settingsSlice = { actions } as const;
