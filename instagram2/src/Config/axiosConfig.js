import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/', // Replace with your base API URL
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Replace with your token storage logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional for global error handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle the response error
    if (error.response?.status === 401) {
      console.error("Unauthorized - Redirecting to login");
      // Redirect to login or handle unauthorized error
    }
    return Promise.reject(error);
  }
);

export default apiClient;
