import axiosInstance from './axiosInstance';

const API_URL = '/bookings';

const createBooking = async (bookingData) => {
  const response = await axiosInstance.post(API_URL, bookingData);
  return response.data;
};

const getCustomerBookings = async (status = null) => {
  const url = status ? `${API_URL}/customer?status=${status}` : `${API_URL}/customer`;
  const response = await axiosInstance.get(url);
  return response.data;
};

const cancelBooking = async (bookingId) => {
  const response = await axiosInstance.patch(`${API_URL}/${bookingId}/cancel`);
  return response.data;
};

export default {
  createBooking,
  getCustomerBookings,
  cancelBooking
};
