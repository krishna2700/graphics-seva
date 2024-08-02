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

export const createProject = async (projectData) => {
  const response = await axios.post(`${API_URL}/projects`, projectData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await axios.get(`${API_URL}/projects/${id}`);
  return response.data;
};
export const updateProjectImages = (projectId, formData) => {
  return axios.put(
    `http://localhost:5000/api/projects/${projectId}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
