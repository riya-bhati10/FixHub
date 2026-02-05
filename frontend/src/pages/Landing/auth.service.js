import API from '../../config/api';

const register = async (userData) => {
  const response = await API.post('/auth/signup', userData);
  return response.data;
};

const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
  }
  return response.data;
};

const logout = async () => {
  try {
    await API.get('/auth/logout');
  } catch (error) {
    console.error("Logout failed", error);
  }
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

const getCurrentUser = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};