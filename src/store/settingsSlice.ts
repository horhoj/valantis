import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filter } from '~/api/products.types';

const SLICE_NAME = 'settingsSlice';

interface IS {
  filter: Filter;
}

const initialState: IS = {
  filter: { field: 'brand', value: '' },
};

const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    // setFilter: (state action: PayloadAction<{Filter}>) => {
    // },
  },
});

export const settingsReducer = reducer;

export const settingsSlice = { actions } as const;
