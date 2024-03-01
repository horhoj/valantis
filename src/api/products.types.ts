interface FilterItem<F, V> {
  field: F;
  value: V;
}

export type Filter =
  | FilterItem<'brand', string>
  | FilterItem<'product', string>
  | FilterItem<'price', number>;

export type GetFilterValue<T extends Filter['field']> = Extract<
  Filter,
  { field: T }
>['value'];

export interface CommonResponse<T> {
  result: T;
}

export type FilterProductsResponseItem = string;

export type FetchProductsResponseItem = string;

export interface FetchProductViewResponseItem {
  brand: string;
  id: string;
  price: number;
  product: string;
}

export type ProductIdItem = string;

export interface UniqueFieldValueItem<T> {
  id: string;
  value: T;
}
