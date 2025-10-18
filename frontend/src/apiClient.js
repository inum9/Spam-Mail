// src/services/apiClient.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  res => res,
  err => Promise.reject(new Error(err?.response?.data?.message || 'Request failed')),
);

export default api;
