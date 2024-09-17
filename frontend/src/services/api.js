import axios from "axios";

// Set base URL from environment variables
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3690/api";

// API call for login
export const loginApi = async (email, password) => {
  return await axios.post(`${API_URL}/auth/login`, { email, password });
};
