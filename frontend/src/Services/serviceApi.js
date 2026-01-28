import axiosInstance from "./axiosInstance";

/* ============ AUTH ============ */
export const authApi = {
  signup: (data) => axiosInstance.post("/auth/signup", data),
  login: (data) => axiosInstance.post("/auth/login", data),
};

/* ============ SERVICES / PETROL PUMPS ============ */
export const serviceApi = {
  getAll: () => axiosInstance.get("/services"),
  create: (data) => axiosInstance.post("/services", data),
  update: (id, data) => axiosInstance.put(`/services/${id}`, data),
  delete: (id) => axiosInstance.delete(`/services/${id}`),
};

/* ============ BOOKINGS ============ */
export const bookingApi = {
  create: (data) => axiosInstance.post("/bookings", data),
  technicianBookings: () => axiosInstance.get("/bookings/technician"),
  accept: (id) => axiosInstance.post(`/bookings/${id}/accept`),
  cancel: (id) => axiosInstance.post(`/bookings/${id}/cancel`),
};
