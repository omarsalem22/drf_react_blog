import axios from "axios";

// Base URL for the API
const baseUrl = "http://127.0.0.1:8000/api/";

// Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000, // Set timeout to 5 seconds
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add JWT token to request headers using an interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); // Get JWT token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle errors and responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the successful response here if needed
    return response;  // Simply return the response if it's successful
  },
  async function (error) {
    const original = error.config;
    
    // Handle network errors (e.g., server is unreachable)
    if (typeof error.response === "undefined") {
      alert("Network error! Please check your internet connection.");
      return Promise.reject(error);  // Reject the promise with the error
    }

    // Handle Unauthorized (401) errors
    if (error.response.status === 401) {
      // Optionally, try to refresh the token here if using a refresh token
      // Or clear the JWT and prompt the user to log in again
      localStorage.removeItem("access_token");  // Remove expired token
      alert("Session expired. Please log in again.");
      
      // Optionally, redirect the user to the login page
      window.location.href = "/login";  // Redirect to login page, if needed

      return Promise.reject(error);  // Reject the promise and stop further processing
    }

    // Handle other status codes (e.g., 404, 500, etc.)
    if (error.response) {
      // Log specific errors for debugging
      console.error("Error response data:", error.response.data);
      console.error("Error status code:", error.response.status);

      // Display a generic error message based on the status code
      switch (error.response.status) {
        case 400:
          alert("Bad request. Please check the input data.");
          break;
        case 404:
          alert("Requested resource not found.");
          break;
        case 500:
          alert("Internal server error. Please try again later.");
          break;
        default:
          alert("An error occurred. Please try again.");
          break;
      }
    }

    // Reject the error to continue the promise chain and catch it in the component
    return Promise.reject(error);
  }
);
export default axiosInstance;
