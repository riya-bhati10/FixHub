const Booking = require("../models/booking.model");
const Notification = require("../models/notification.model");

// Auto-cancel pending bookings when technician is blocked
const cancelPendingBookingsForBlockedTechnician = async (technicianId) => {
  try {
    // Find all pending bookings for this technician
    const pendingBookings = await Booking.find({
      technician: technicianId,
      status: "pending"
    }).populate("customer", "fullname");

    // Cancel each pending booking
    for (const booking of pendingBookings) {
      booking.status = "cancelled";
      booking.cancellationReason = "Technician account blocked by admin";
      await booking.save();

      // Send notification to customer
      await Notification.create({
        userId: booking.customer._id,
        title: "Booking Cancelled",
        message: "Your booking has been cancelled because the technician's account was blocked. Please book another service.",
        type: "booking_cancelled"
      });
    }

    console.log(`Cancelled ${pendingBookings.length} pending bookings for blocked technician ${technicianId}`);
    return pendingBookings.length;
  } catch (error) {
    console.error("Error cancelling bookings for blocked technician:", error);
    throw error;
  }
};

module.exports = {
  cancelPendingBookingsForBlockedTechnician
};