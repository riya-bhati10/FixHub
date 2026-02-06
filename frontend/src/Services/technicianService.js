import axiosInstance from './axiosInstance';

const API_URL = '/technician';

const getTechnicianStats = async () => {
  const response = await axiosInstance.get(`${API_URL}/stats`);
  return response.data;
};

const getTechnicianSchedule = async () => {
  const response = await axiosInstance.get(`${API_URL}/schedule`);
  return response.data;
};

const getTechnicianBookingRequests = async () => {
  const response = await axiosInstance.get(`${API_URL}/booking-requests`);
  return response.data;
};

const getTechnicianBookingHistory = async () => {
  const response = await axiosInstance.get(`${API_URL}/booking-history`);
  return response.data;
};

const getTechnicianReviews = async () => {
  const response = await axiosInstance.get(`${API_URL}/reviews`);
  return response.data;
};

const acceptBookingRequest = async (bookingId) => {
  const response = await axiosInstance.patch(`${API_URL}/bookings/${bookingId}/accept`);
  return response.data;
};

const declineBookingRequest = async (bookingId) => {
  const response = await axiosInstance.patch(`${API_URL}/bookings/${bookingId}/decline`);
  return response.data;
};

const updateBookingStatus = async (bookingId, status) => {
  const response = await axiosInstance.patch(`${API_URL}/bookings/${bookingId}/status`, { status });
  return response.data;
};

const getMyServices = async () => {
  const response = await axiosInstance.get(`${API_URL}/my-services`);
  return response.data;
};

const createService = async (serviceData) => {
  const response = await axiosInstance.post(`${API_URL}/services`, serviceData);
  return response.data;
};

const updateService = async (serviceId, serviceData) => {
  const response = await axiosInstance.put(`${API_URL}/services/${serviceId}`, serviceData);
  return response.data;
};

const deleteService = async (serviceId) => {
  const response = await axiosInstance.delete(`${API_URL}/services/${serviceId}`);
  return response.data;
};

const updateServiceStatus = async (serviceId, status) => {
  const response = await axiosInstance.patch(`${API_URL}/services/${serviceId}/status`, { status });
  return response.data;
};

export default {
  getTechnicianStats,
  getTechnicianBookingRequests,
  getTechnicianBookingHistory,
  getTechnicianSchedule,
  getTechnicianReviews,
  acceptBookingRequest,
  declineBookingRequest,
  updateBookingStatus,
  getMyServices,
  createService,
  updateService,
  deleteService,
  updateServiceStatus
};