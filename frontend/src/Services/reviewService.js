import api from '../pages/Landing/api';

export const reviewService = {
  // Create a new review
  createReview: async (reviewData) => {
    try {
      const response = await api.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get reviews for a technician
  getTechnicianReviews: async (technicianId, serviceName = null) => {
    try {
      const params = serviceName ? { serviceName } : {};
      const response = await api.get(`/reviews/technician/${technicianId}`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Check if customer can review a booking
  canReviewBooking: async (bookingId) => {
    try {
      const response = await api.get(`/bookings/${bookingId}`);
      const booking = response.data.booking;
      return booking.status === 'completed';
    } catch (error) {
      return false;
    }
  }
};