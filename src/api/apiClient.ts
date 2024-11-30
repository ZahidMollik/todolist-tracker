import axios from 'axios';
import { getToken } from '../app/(authenticate)/tokenStorage';

const apiClient = axios.create({
  baseURL: "http://10.0.2.2:8000/api",
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default apiClient;
