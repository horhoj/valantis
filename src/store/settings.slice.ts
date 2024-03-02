import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_FILTER } from '~/config/filter.config';
import { Filter } from '~/types/products.types';

const SLICE_NAME = 'settingsSlice';

interface IS {
  filter: Filter;
}

const initialState: IS = {
  filter: DEFAULT_FILTER,
};

const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
  },
});

export const settingsReducer = reducer;

export const settingsSlice = { actions } as const;
