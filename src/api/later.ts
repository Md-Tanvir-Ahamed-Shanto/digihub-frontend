import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const cache = new Map(); // Simple in-memory cache
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cacheTimestamps = new Map();

function getCacheKey(config) {
  return `${config.method}-${config.url}-${JSON.stringify(config.params || {})}-${JSON.stringify(config.data || {})}`;
}

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;

  // Cache check
  const key = getCacheKey(config);
  const now = Date.now();

  if (cache.has(key)) {
    const age = now - cacheTimestamps.get(key);
    if (age < CACHE_TTL) {
      // Return cached response as a fulfilled promise
      return Promise.reject({ __fromCache: true, data: cache.get(key) });
    } else {
      // Cache expired
      cache.delete(key);
      cacheTimestamps.delete(key);
    }
  }

  return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const key = getCacheKey(response.config);
    cache.set(key, response);
    cacheTimestamps.set(key, Date.now());
    return response;
  },
  (error) => {
    if (error.__fromCache) {
      return Promise.resolve(error.data); // Return cached data
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/client-login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
