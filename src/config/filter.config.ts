import { FilterOptionTitles, FilterValues } from '~/types/products.types';

export const FILTER_DEFAULT_VALUES: FilterValues = {
  price: { field: 'price', value: 0 },
  brand: { field: 'brand', value: '' },
  product: { field: 'product', value: '' },
};

export const FILTER_OPTIONS: FilterOptionTitles = {
  brand: 'ПОИСК ПО БРЕНДУ',
  price: 'ПОИСК ПО ЦЕНЕ',
  product: 'ПОИСК ПО НАИМЕНОВАНИЮ',
};

export const DEFAULT_FILTER = FILTER_DEFAULT_VALUES.brand;
