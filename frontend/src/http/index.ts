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

export default $api;
