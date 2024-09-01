// src/api/api.js

import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update this URL based on your backend setup

// Existing functions
export const getProjects = (token) =>
  axios.get(`${API_URL}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getAlbums = (token) =>
  axios.get(`${API_URL}/albums`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getRequests = (token) =>
  axios.get(`${API_URL}/requests`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createAlbum = (data, token) =>
  axios.post(`${API_URL}/albums`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createProject = (data, token) =>
  axios.post(`${API_URL}/projects`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createRequest = (data, token) =>
  axios.post(`${API_URL}/requests`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getUsers = (token) =>
  axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const loginUser = (data) => axios.post(`${API_URL}/login`, data);
export const logoutUser = () => axios.post(`${API_URL}/logout`);

// New functions
export const createUser = (data, token) =>
  axios.post(`${API_URL}/users`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createAdmin = (data, token) =>
  axios.post(`${API_URL}/admins`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
