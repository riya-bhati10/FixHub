import axiosInstance from "./axiosInstance";

export const getDashboardStats = async () => {
  const response = await axiosInstance.get("/admin/dashboard/stats");
  return response.data.stats; // Backend returns { success, stats }
};

export const getAllTechnicians = async () => {
  const response = await axiosInstance.get("/admin/technicians");
  return response.data;
};

export const getAllCustomers = async () => {
  const response = await axiosInstance.get("/admin/customers");
  return response.data;
};

export const blockUnblockUser = async (userId, reason = "") => {
  const response = await axiosInstance.patch(`/admin/users/${userId}/block`, { reason });
  return response.data;
};

export const getCompletedBookings = async () => {
  const response = await axiosInstance.get("/admin/earnings");
  return response.data;
};

export const getChartData = async () => {
  const response = await axiosInstance.get("/admin/chart-data");
  return response.data;
};
