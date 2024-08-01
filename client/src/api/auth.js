import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });

  if (response.status === 200) {
    const { token, role } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);
    return { role };
  } else {
    throw new Error("Login failed");
  }
};

export const logout = async () => {
  await axios.post(`${API_URL}/auth/logout`);
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
};

export const createAdmin = async (adminData) => {
  const response = await axios.post(`${API_URL}/admins`, adminData);
  return response.data;
};

export const getAdmins = async () => {
  const response = await axios.get(`${API_URL}/admins`);
  return response.data;
};
