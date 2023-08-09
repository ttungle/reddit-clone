import { getUser } from './../stores/auth-store/index';
import { getApiUrl } from '@/utils';
import axios, { AxiosRequestHeaders } from 'axios';
import { authApi } from '.';

const axiosClient = axios.create({
  baseURL: getApiUrl('/api/v1'),
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('access_token');

    if (token && config?.url && !config.url.includes('/auth/')) {
      config.headers = {
        Authorization: localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : '',
        'Content-Type': 'application/json',
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
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    return refreshToken(error);
  }
);

const refreshToken = async (error: any) => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    return Promise.reject(error);
  }

  try {
    const user = getUser();
    const data: any = await authApi.refreshToken({ refreshToken, user });
    localStorage.setItem('access_token', data?.accessToken);
    localStorage.setItem('refresh_token', data?.refreshToken);

    if (error.config?.url && !error.config.url.includes('/auth/')) {
      error.config.headers = {
        Authorization: data?.accessToken ? `Bearer ${data?.accessToken}` : '',
      } as AxiosRequestHeaders;
    }
    return axios(error.config);
  } catch (err) {
    console.error(err);
    return;
  }
};

export default axiosClient;
