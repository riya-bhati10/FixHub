const Review = require("../models/review.model");
const Booking = require("../models/booking.model");
const Service = require("../models/service.model");
const Notification = require("../models/notification.model");


// add new review (customer)
exports.createReview = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const { bookingId, rating, review, comment } = req.body;
    const reviewText = review || comment; // Accept both field names

    console.log('Review request - customerId:', customerId);
    console.log('Review request - bookingId:', bookingId);

    const booking = await Booking.findOne({
      _id: bookingId,
      customer: customerId,
      status: "completed",
    });

    console.log('Found booking:', booking);

    if (!booking) {
      const anyBooking = await Booking.findOne({ _id: bookingId });
      console.log('Booking with any status:', anyBooking);
      
      return res.status(400).json({
        message: "You can review only your completed bookings",
      });
    }

    // Check for duplicate review
    const existingReview = await Review.findOne({
      bookingId,
      customerId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this service",
        isDuplicate: true
      });
    }

    const newReview = await Review.create({
      bookingId,
      customerId,
      technicianId: booking.technician,
      rating,
      review: reviewText,
    });
    
     await Notification.create({
       userId: booking.technician,
       title: 'New Review Received',
       message: "You received a new review for your service",
     });

    return res.status(201).json({
      message: "Review submitted successfully",
      review: newReview,
    });
  } catch (err) {
    console.error('Review creation error:', err);
    return res.status(500).json({ message: err.message });
  }
};

// View all review (customer, technician)

exports.getTechnicianReviews = async (req, res) => {
  try {
    const { technicianId } = req.params;
    console.log('Fetching reviews for technician:', technicianId);

    const reviews = await Review.find({ technicianId })
      .populate("customerId", "fullname")
      .populate("bookingId", "serviceType")
      .sort({ createdAt: -1 });

    console.log('Found reviews:', reviews.length);

    const formattedReviews = reviews.map((r) => ({
      rating: r.rating,
      review: r.review,
      customerName: r.customerId?.fullname
        ? r.customerId.fullname.firstname +
          " " +
          (r.customerId.fullname.lastname || "")
        : "N/A",
      serviceName: r.bookingId?.serviceType || "N/A",
      createdAt: r.createdAt,
    }));

    res.json({
      count: formattedReviews.length,
      reviews: formattedReviews,
    });
  } catch (err) {
    console.error('Error fetching technician reviews:', err);
    res.status(500).json({ message: err.message });
  }
};
