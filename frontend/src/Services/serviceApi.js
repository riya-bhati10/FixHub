import axiosInstance from "./axiosInstance";

/* ============ AUTH ============ */
export const authApi = {
  signup: (data) => axiosInstance.post("/auth/signup", data),
  login: (data) => axiosInstance.post("/auth/login", data),
};

/* ============ SERVICES ============ */
export const serviceApi = {
  getMyServices: () => axiosInstance.get("/services"), // Technician's own services (auth required)
  getAllServices: () => axiosInstance.get("/services/all"), // All services for customers (no auth)
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
