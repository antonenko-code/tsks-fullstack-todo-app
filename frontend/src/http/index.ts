import axios from 'axios';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
})

$api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, {refreshToken});
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
