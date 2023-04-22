import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './helpers';

export default class CustomAxiosInstance {
  instance: AxiosInstance;

  constructor(axiosConfig: AxiosRequestConfig) {
    this.instance = axios.create(axiosConfig);
    this.setInterceptor();
  }

  setInterceptor() {
    this.instance.interceptors.request.use(
      async (config) => {
        let handleConfig = { ...config };

        // 處理 token
        handleConfig.headers.Authorization = getToken();

        return handleConfig;
      },
      (axiosError: AxiosError) => {
        return axiosError;
      }
    );
  }
}
