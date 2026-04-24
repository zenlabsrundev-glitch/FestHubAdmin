import axios from "axios";

// Standardize the API Base URL with fallbacks
export const API_BASE_URL = 
  process.env.REACT_APP_API_URL || 
  process.env.NEXT_PUBLIC_API_URL || 
  "https://fest-ticket-hubbackend.vercel.app/api/v1";

// Create a pre-configured axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach the auth token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("eventhub.token.v1");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
