import axios from 'axios';
import { md5 } from 'js-md5';
import {
  BASE_URL,
  DEFAULT_HEADERS,
  REQUEST_ERROR_RETRY_COUNT,
  REQUEST_ERROR_RETRY_DELAY_MS,
} from '../config/api.config';
import { delay } from '~/utils/delay';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { ...DEFAULT_HEADERS },
});

const getXAuthHeader = () =>
  md5(`Valantis_${new Date().toISOString().split('T')[0].split('-').join('')}`);

axiosInstance.interceptors.request.use((config) => {
  config.headers['X-Auth'] = getXAuthHeader();

  return config;
});

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    await delay(REQUEST_ERROR_RETRY_DELAY_MS);
    const originalConfig = {
      ...error.config,
      _retry: error.config._retry !== undefined ? error.config._retry + 1 : 1,
    };

    if (originalConfig._retry <= REQUEST_ERROR_RETRY_COUNT) {
      console.log(`ВОЗНИКЛА ОШИБКА, НО МЫ ПОПРОБУЕМ ЕЩЕ РАЗ!!!`, error);
      return axiosInstance.request(originalConfig);
    }
    console.log(`СЕРВЕР СЛИШКОМ МНОГО РАЗ ОТВЕТИЛ С ОШИБКОЙ!!!`, error);
    throw error;
  },
);
