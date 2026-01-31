import axiosInstance from './axiosInstance';

const API_URL = '/user';

const getUserProfile = async () => {
  const response = await axiosInstance.get(`${API_URL}/profile`);
  return response.data;
};

const updateUserProfile = async (userData) => {
  const response = await axiosInstance.put(`${API_URL}/profile`, userData);
  return response.data;
};

export default {
  getUserProfile,
  updateUserProfile
};