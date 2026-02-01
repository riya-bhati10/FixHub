const Booking = require("../models/Booking.model");
const Service = require("../models/Service.model");
const Notification = require("../models/Notification.model");


// create new booking (for customer)
exports.createBooking = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const {
      serviceId,
      technicianId,
      issue,
      serviceDate,
      timeSlot,
      serviceLocation, 
    } = req.body;

    console.log("Booking data:", req.body);
    console.log("Customer ID:", customerId);
    console.log("User object:", req.user);

    if (!serviceId || !technicianId || !issue || !serviceDate || !timeSlot) {
      return res.status(400).json({
        message: "All required booking fields must be provided",
      });
    }

    if (!customerId) {
      return res.status(400).json({ message: "Customer ID missing" });
    }

    let finalServiceLocation = serviceLocation;
    if (!serviceLocation) {
      const customer = await require("../models/User.model").findById(customerId);
      finalServiceLocation = customer?.location || "Address not provided";
    }
    
    const service = await Service.findOne({
      _id: serviceId,
      technicianId,
      isActive: true,
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found or not available",
      });
    }

    const booking = await Booking.create({
      customer: customerId,
      technician: technicianId,
      serviceType: service.serviceName || 'Other',
      description: issue,
      location: finalServiceLocation,
      preferredDate: serviceDate,
      preferredTime: timeSlot,
      estimatedPrice: service.serviceCharge,
      status: "pending"
    });

    console.log("Booking created successfully:", booking);

    res.status(201).json({
      message: "Booking created successfully",
      bookingId: booking._id,
      status: booking.status,
    });
    await Notification.create({
      userId: technicianId,
      message: "You have received a new booking request",
    });

  } catch (err) {
    console.error("Booking creation error:", err);
    console.error("Error details:", err.message);
    res.status(500).json({ message: err.message });
  }
};

//  getBookings (for technician)
exports.getTechnicianBookings = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    const { status } = req.query;

    const filter = { technician: technicianId };
    if (status && typeof status === 'string') {
      const allowedStatuses = ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'];
      if (allowedStatuses.includes(status)) {
        filter.status = status;
      }
    }

    const bookings = await Booking.find(filter)
      .populate("customer", "fullname phone")
      .sort({ createdAt: -1 });

    const formattedBookings = bookings.map((b) => ({
      bookingId: b._id,
      status: b.status,
      serviceDate: b.preferredDate,
      timeSlot: b.preferredTime,
      createdAt: b.createdAt,

      customer: {
        id: b.customer?._id || null,
        name: b.customer?.fullname ?
          b.customer.fullname.firstname + " " + b.customer.fullname.lastname : "N/A",
        phone: b.customer?.phone || "N/A",
      },

      service: {
        type: b.serviceType || "N/A",
        price: b.estimatedPrice || 0,
      },
    }));

    res.json({
      count: formattedBookings.length,
      bookings: formattedBookings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Accept booking (for technician)
exports.acceptBooking = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    const bookingId = req.params.id;

    const booking = await Booking.findOne({
      _id: bookingId,
      technician: technicianId,
      status: "pending",
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found or already processed",
      });
    }

    booking.status = "accepted";
    await booking.save();

    res.json({
      message: "Booking accepted successfully",
      bookingId: booking._id,
      status: booking.status,
    });
    await Notification.create({
      userId: booking.customer,
      message: "Your booking has been accepted",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject booking (for both technician and customer)
exports.cancelBooking = async (req, res) => {
  try {
    const userId = req.user.userId;
    const role = req.user.role;
    const bookingId = req.params.id;

    const booking = await Booking.findOne({
      _id: bookingId,
      status: "pending",
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found or cannot be cancelled",
      });
    }
    if (
      (role === "customer" && booking.customer.toString() !== userId) ||
      (role === "technician" && booking.technician.toString() !== userId)
    ) {
      return res.status(403).json({
        message: "Not authorized to cancel this booking",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      message: "Booking cancelled successfully",
      status: booking.status,
    });
    const otherUser =
      role === "customer" ? booking.technician : booking.customer;

    await Notification.create({
      userId: otherUser,
      message: "Booking has been cancelled",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// update booking status(technician)
exports.updateBookingStatus = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    const bookingId = req.params.id;
    const { status } = req.body;

    if (!status || typeof status !== 'string') {
      return res.status(400).json({
        message: "Status is required and must be a string",
      });
    }

    const allowedTransitions = {
      accepted: ["in-progress"],
      "in-progress": ["completed"],
    };

    const booking = await Booking.findOne({
      _id: bookingId,
      technician: technicianId,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found or access denied",
      });
    }

    const currentStatus = booking.status;

    if (
      !allowedTransitions[currentStatus] ||
      !allowedTransitions[currentStatus].includes(status)
    ) {
      return res.status(400).json({
        message: `Invalid status transition from ${currentStatus} to ${status}`,
      });
    }

    booking.status = status;
    await booking.save();

    res.json({
      message: "Booking status updated successfully",
      bookingId: booking._id,
      status: booking.status,
    });
    await Notification.create({
      userId: booking.customer,
      message: `Your booking is now ${status.replace(/-/g, " ")}`,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get bookings (for customer)
exports.getCustomerBookings = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const { status } = req.query;

    const filter = { customer: customerId };
    if (status && typeof status === 'string') {
      const allowedStatuses = ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'];
      if (allowedStatuses.includes(status)) {
        filter.status = status;
      }
    }

    const bookings = await Booking.find(filter)
      .populate("technician", "fullname phone")
      .sort({ createdAt: -1 });

    const formattedBookings = bookings.map((b) => ({
      bookingId: b._id,
      status: b.status,
      serviceDate: b.preferredDate,
      timeSlot: b.preferredTime,
      issue: b.description,
      createdAt: b.createdAt,

      technician: {
        id: b.technician?._id || null,
        name: b.technician?.fullname ? 
          b.technician.fullname.firstname + " " + b.technician.fullname.lastname : "N/A",
        phone: b.technician?.phone || "N/A",
      },

      service: {
        type: b.serviceType || "N/A",
        price: b.estimatedPrice || 0,
      },
    }));

    res.json({
      count: formattedBookings.length,
      bookings: formattedBookings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

