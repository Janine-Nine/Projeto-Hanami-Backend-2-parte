import { api } from './api';

export async function login(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
}