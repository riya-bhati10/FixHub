const Review = require("../models/Review.model");
const Booking = require("../models/Booking.model");
const Service = require("../models/Service.model");
const Notification = require("../models/Notification.model");


// add new review (customer)
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
    
     await Notification.create({
       userId: booking.technicianId,
       message: "You received a new review for your service",
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

// View all review (customer, technician)

exports.getTechnicianReviews = async (req, res) => {
  try {
    const { technicianId } = req.params;
    const { serviceName } = req.query;

    let reviews = await Review.find({ technicianId })
      .populate({
        path: "bookingId",
        populate: {
          path: "serviceId",
          select: "serviceName",
        },
      })
      .populate("customerId", "fullname")
      .sort({ createdAt: -1 });

    if (serviceName) {
      reviews = reviews.filter(
        (r) => r.bookingId?.serviceId?.serviceName === serviceName,
      );
    }

const formattedReviews = reviews.map((r) => ({
  rating: r.rating,
  review: r.review,
  customerName: r.customerId?.fullname
    ? r.customerId.fullname.firstname +
      " " +
      (r.customerId.fullname.lastname || "")
    : "N/A",
  serviceName: r.bookingId?.serviceId?.serviceName || "N/A",
  createdAt: r.createdAt,
}));


    res.json({
      count: formattedReviews.length,
      reviews: formattedReviews,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
