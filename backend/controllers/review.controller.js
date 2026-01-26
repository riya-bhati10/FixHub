const Review = require("../models/Review.model");
const Booking = require("../models/Booking.model");

exports.createReview = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const { bookingId, rating, review } = req.body;

    const booking = await Booking.findOne({
      _id: bookingId,
      customerId,
      status: "completed",
    });

    if (!booking) {
      return res.status(400).json({
        message: "You can review only your completed bookings",
      });
    }

    const existingReview = await Review.findOne({ bookingId });
    if (existingReview) {
      return res.status(400).json({
        message: "Review already submitted for this booking",
      });
    }

    const newReview = await Review.create({
      bookingId,
      customerId,
      technicianId: booking.technicianId,
      rating,
      review,
    });

    return res.status(201).json({
      message: "Review submitted successfully",
      review: newReview,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Review already exists for this booking",
      });
    }

    return res.status(500).json({ message: err.message });
  }
};
