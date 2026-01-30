import axiosInstance from '../../Services/axiosInstance';

const API_URL = '/auth'; 

const register = async (userData) => {
  const response = await axiosInstance.post(`${API_URL}/signup`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
  }
  return response.data;
};

const login = async (email, password) => {
  const response = await axiosInstance.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
  }
  return response.data;
};

const logout = async () => {
  try {
    await axiosInstance.get(`${API_URL}/logout`);
  } catch (error) {
    console.error("Logout failed", error);
  }
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

const getCurrentUser = async () => {
  const response = await axiosInstance.get(`${API_URL}/me`);
  return response.data;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};