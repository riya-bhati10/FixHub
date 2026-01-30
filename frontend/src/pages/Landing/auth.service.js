import api from './api';

// Adjust the base path '/users' if your backend routes are different (e.g., '/auth')
const API_URL = '/auth'; 

const register = async (userData) => {
  const response = await api.post(`${API_URL}/signup`, userData);
  return response.data;
};

const login = async (email, password) => {
  const response = await api.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
  }
  return response.data;
};

const logout = async () => {
  try {
    await api.get(`${API_URL}/logout`);
  } catch (error) {
    console.error("Logout failed", error);
  }
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

export default {
  register,
  login,
  logout,
};