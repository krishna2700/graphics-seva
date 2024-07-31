import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });

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
  await axios.post(`${API_URL}/logout`);
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
};
