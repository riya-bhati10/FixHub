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

    if (!serviceId || !technicianId || !issue || !serviceDate || !timeSlot) {
      return res.status(400).json({
        message: "All required booking fields must be provided",
      });
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
      customerId,
      technicianId,
      serviceId,
      issue,
      serviceDate,
      timeSlot,
      serviceLocation: finalServiceLocation,
      status: "pending",
      statusHistory: [
        {
          status: "pending",
          updatedAt: new Date(),
        },
      ],
    });

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
    res.status(500).json({ message: err.message });
  }
};

//  getBookings (for technician)
exports.getTechnicianBookings = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    const { status } = req.query;

    const filter = { technicianId };
    if (status && typeof status === 'string') {
      const allowedStatuses = ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'];
      if (allowedStatuses.includes(status)) {
        filter.status = status;
      }
    }

    const bookings = await Booking.find(filter)
      .populate("customerId", "fullname phone")
      .populate("serviceId", "serviceName serviceCharge")
      .sort({ createdAt: -1 });

    const formattedBookings = bookings.map((b) => ({
      bookingId: b._id,
      status: b.status,
      serviceDate: b.serviceDate,
      timeSlot: b.timeSlot,
      createdAt: b.createdAt,

      customer: {
        id: b.customerId?._id || null,
        name: b.customerId?.fullname ?
          b.customerId.fullname.firstname + " " + b.customerId.fullname.lastname : "N/A",
        phone: b.customerId?.phone || "N/A",
      },

      service: {
        id: b.serviceId?._id || null,
        name: b.serviceId?.serviceName || "N/A",
        charge: b.serviceId?.serviceCharge || 0,
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
      technicianId,
      status: "pending",
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found or already processed",
      });
    }

    booking.status = "accepted";
    booking.statusHistory.push({
      status: "accepted",
      updatedAt: new Date(),
    });

    await booking.save();

    res.json({
      message: "Booking accepted successfully",
      bookingId: booking._id,
      status: booking.status,
    });
    await Notification.create({
      userId: booking.customerId,
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
      (role === "customer" && booking.customerId.toString() !== userId) ||
      (role === "technician" && booking.technicianId.toString() !== userId)
    ) {
      return res.status(403).json({
        message: "Not authorized to cancel this booking",
      });
    }

    booking.status = "cancelled";
    booking.statusHistory.push({
      status: "cancelled",
      updatedAt: new Date(),
    });

    await booking.save();

    res.json({
      message: "Booking cancelled successfully",
      status: booking.status,
    });
    const otherUser =
      role === "customer" ? booking.technicianId : booking.customerId;

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
      accepted: ["in_progress"],
      in_progress: ["completed"],
    };

    const booking = await Booking.findOne({
      _id: bookingId,
      technicianId,
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
    booking.statusHistory.push({
      status,
      updatedAt: new Date(),
    });

    await booking.save();

    res.json({
      message: "Booking status updated successfully",
      bookingId: booking._id,
      status: booking.status,
    });
    await Notification.create({
      userId: booking.customerId,
      message: `Your booking is now ${status.replace("_", " ")}`,
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

    const filter = { customerId };
    if (status && typeof status === 'string') {
      const allowedStatuses = ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'];
      if (allowedStatuses.includes(status)) {
        filter.status = status;
      }
    }

    const bookings = await Booking.find(filter)
      .populate("technicianId", "fullname phone")
      .populate("serviceId", "serviceName serviceCharge")
      .sort({ createdAt: -1 });

    const formattedBookings = bookings.map((b) => ({
      bookingId: b._id,
      status: b.status,
      serviceDate: b.serviceDate,
      timeSlot: b.timeSlot,
      issue: b.issue,
      createdAt: b.createdAt,

      technician: {
        id: b.technicianId?._id || null,
        name: b.technicianId?.fullname ? 
          b.technicianId.fullname.firstname + " " + b.technicianId.fullname.lastname : "N/A",
        phone: b.technicianId?.phone || "N/A",
      },

      service: {
        id: b.serviceId?._id || null,
        name: b.serviceId?.serviceName || "N/A",
        charge: b.serviceId?.serviceCharge || 0,
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

