import axios from "axios";

// Create an axios instance for Directus
const directusApi = axios.create({
  baseURL: "http://localhost:8055", // Your Directus instance running on port 8055
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - useful for adding authentication tokens
directusApi.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - useful for handling errors globally
directusApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors (401, 403, 500, etc.)
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Unauthorized - clear user session and redirect to login
        localStorage.removeItem("auth_token");
        // Add your redirect logic here if needed
      }
    }

    return Promise.reject(error);
  }
);

export default directusApi;
