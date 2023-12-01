import axios, { AxiosRequestHeaders } from 'axios';

import { store } from './helper';
import { apiURL } from '@/utils/config';
import { checkForTokens, clearTokens } from '@/redux/auth/authSlice';
import { addLocalStorage, getUserLocalStorage, logoutLocalStorage } from '@/utils/storage';

const axiosApi = axios.create({ baseURL: apiURL });

axiosApi.interceptors.request.use((config) => {
  const tokens = getUserLocalStorage();

  if (tokens?.access) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${tokens.access}`,
    } as AxiosRequestHeaders;
  }
  return config;
});

axiosApi.interceptors.response.use(
  async (config) => config,
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error?.response?.status;
    const { access, refresh } = store.getState().auth;

    if (access && statusCode == 401 && originalRequest) {
      originalRequest._isReady = true;
      try {
        const resp = await axiosApi.post('/accounts/refresh/', { refresh });
        // is OK status
        if (resp.status === 200) {
          const newTokens = resp.data;
          axiosApi.defaults.headers.Authorization = `Bearer ${newTokens.access}`;
          const usersLocal = {
            user: store.getState()?.auth?.user,
            token: {
              access: resp.data.access,
              refresh,
            },
          };
          store.dispatch(
            checkForTokens({
              access: newTokens.access,
            }),
          );
          addLocalStorage({
            access: usersLocal.token.access,
            refresh: usersLocal.token.refresh,
          });
          return axiosApi(originalRequest);
        }
      } catch {
        logoutLocalStorage();
        store.dispatch(clearTokens());
      }
    }

    return Promise.reject(error);
  },
);

export default axiosApi;
