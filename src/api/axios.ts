import axios from 'axios';

// Create a custom Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api', // Use your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Request Interceptor ---
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage for every request
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Response Interceptor ---
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the error response is 401 (Unauthorized), it means the token is expired or invalid
    if (error.response?.status === 401) {
      console.warn('API call returned 401 Unauthorized. Token likely expired. Forcing logout.');
      // Clear token from localStorage
      localStorage.removeItem('accessToken');
      // Redirect to login page
      window.location.href = '/client-login'; // Or your preferred generic login route
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;