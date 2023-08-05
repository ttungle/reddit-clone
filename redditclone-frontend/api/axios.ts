import { AuthURLList } from '@/models';
import { getApiUrl } from '@/utils';
import axios, { AxiosRequestHeaders } from 'axios';

const axiosClient = axios.create({
  baseURL: getApiUrl('/api/v1'),
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    if (config?.url && (Object.values(AuthURLList) as string[]).includes(config.url)) {
      config.headers = {
        Authorization: localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : '',
      } as AxiosRequestHeaders;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
