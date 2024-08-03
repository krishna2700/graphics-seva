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
  return axios.put(`${API_URL}/projects/${projectId}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// New API functions
export const requestDownload = async (imageUrl) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/download/request-download`,
    { imageUrl },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getDownloadRequestByImageUrl = async (imageUrl) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/download/requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { imageUrl }, // Ensure imageUrl is included in the params
  });
  return response.data; // Adjust this if the response structure is different
};

export const getDownloadRequests = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/download/requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateDownloadRequest = async (id, status) => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(
    `${API_URL}/download/requests/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// api/auth.js
export const getAdminDetails = async (adminId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/admins/${adminId}/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin details:", error);
    throw error; // Handle the error as needed
  }
};
