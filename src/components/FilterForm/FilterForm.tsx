import { useFormik } from 'formik';
import { useEffect } from 'react';
import styles from './FilterForm.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { settingsSlice } from '~/store/settings.slice';
import { Filter, FilterValues } from '~/types/products.types';
import { FILTER_DEFAULT_VALUES, FILTER_OPTIONS } from '~/config/filter.config';
import { dataSlice } from '~/store/data.slice';

export function FilterForm() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.settings.filter);

  useEffect(() => {
    dispatch(dataSlice.thunks.fetchBrandListThunk());
  }, []);

  useEffect(() => {
    dispatch(dataSlice.thunks.fetchProductIdListThunk(filter));
  }, [filter]);

  const fetchBrandListRequest = useAppSelector(
    (state) => state.data.fetchBrandListRequest,
  );

  const formik = useFormik<Filter>({
    initialValues: filter,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(settingsSlice.actions.setFilter(values));
    },
  });

  const handleReset = () => {
    const defaultValue = FILTER_DEFAULT_VALUES[formik.values.field];
    formik.setValues(defaultValue);
    dispatch(settingsSlice.actions.setFilter(defaultValue));
  };

  const handleChangeFilterType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const defaultValue =
      FILTER_DEFAULT_VALUES[e.target.value as keyof FilterValues];
    formik.setValues(defaultValue);
  };

  return (
    fetchBrandListRequest.data && (
      <form
        className={styles.FilterForm}
        noValidate
        autoComplete={'off'}
        onSubmit={formik.handleSubmit}
      >
        <div className={styles.formField}>
          <label>тип фильтра</label>
          <select
            onChange={handleChangeFilterType}
            defaultValue={formik.values.field}
          >
            {Object.keys(FILTER_OPTIONS).map((key) => (
              <option key={key} value={key}>
                {FILTER_OPTIONS[key as unknown as keyof typeof FILTER_OPTIONS]}
              </option>
            ))}
          </select>
        </div>

        {formik.values.field === 'brand' && (
          <div className={styles.formField}>
            <label>Брэнд</label>
            <select {...formik.getFieldProps('value')}>
              <option value={''}></option>
              {fetchBrandListRequest.data.map((brand) => (
                <option value={brand.value} key={brand.id}>
                  {brand.value}
                </option>
              ))}
            </select>
          </div>
        )}

        {formik.values.field === 'product' && (
          <div className={styles.formField}>
            <label>Наименование</label>
            <input {...formik.getFieldProps('value')} />
          </div>
        )}

        {formik.values.field === 'price' && (
          <div className={styles.formField}>
            <label>Цена</label>
            <input {...formik.getFieldProps('value')} type={'number'} />
          </div>
        )}
        <div className={styles.buttonsWrapper}>
          <button
            type={'submit'}
            disabled={!formik.dirty}
            className={styles.button}
          >
            применить
          </button>
          <button
            type={'button'}
            onClick={handleReset}
            className={styles.button}
          >
            сбросить
          </button>
        </div>
      </form>
    )
  );
}
