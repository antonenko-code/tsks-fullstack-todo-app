import axios from 'axios';

export const API_URL = 'http://localhost:8080';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  return config;
})

$api.interceptors.response.use(config => {
  return config;
}, async (error) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const originalRequest = error.config;

  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;

    try {
      if (refreshToken) {
        const response = await axios.post(`${API_URL}/refresh`, {refreshToken});
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        return $api.request(originalRequest);
      }

    } catch (e) {
    }
  }

  throw error;
})

export default $api;
