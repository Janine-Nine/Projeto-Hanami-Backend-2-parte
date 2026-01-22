import axios from 'axios';

const meta: any = import.meta as any;
const baseURL = (meta?.env?.VITE_API_URL as string) ?? 'http://localhost:3000';

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
