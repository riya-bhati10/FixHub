const Booking = require("../models/booking.model");
const Service = require("../models/service.model");
const Notification = require("../models/notification.model");
const Earning = require("../models/earning.model");


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

    // Check if customer is blocked
    const customer = await require("../models/user.model").findById(customerId);
    if (customer.isBlocked) {
      return res.status(403).json({ message: "Account suspended. Cannot create booking." });
    }

    // Check if technician is blocked
    const technician = await require("../models/user.model").findById(technicianId);
    if (technician.isBlocked) {
      return res.status(400).json({ message: "Service provider not available." });
    }

    let finalServiceLocation = serviceLocation;
    if (!serviceLocation) {
      const customer = await require("../models/user.model").findById(customerId);
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
      title: 'New Booking Request',
      message: `You have received a new booking request for ${service.serviceName || 'service'}`,
      type: 'booking_request',
      recipient: 'technician',
      data: {
        bookingId: booking._id,
        serviceType: service.serviceName,
        serviceDate: serviceDate,
        timeSlot: timeSlot
      }
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
      _id: b._id,
      bookingId: b._id,
      status: b.status,
      serviceDate: b.preferredDate,
      timeSlot: b.preferredTime,
      location: b.location || "Address not provided",
      createdAt: b.createdAt,

      customer: {
        _id: b.customer?._id || null,
        id: b.customer?._id || null,
        name: b.customer?.fullname ?
          b.customer.fullname.firstname + " " + b.customer.fullname.lastname : "N/A",
        phone: b.customer?.phone || "N/A",
      },

      service: {
        name: b.serviceType || "N/A",
        type: b.serviceType || "N/A",
        charge: b.estimatedPrice || 0,
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
      title: 'Booking Accepted',
      message: "Your booking has been accepted by the technician",
      type: 'booking_accepted',
      recipient: 'customer',
      data: { bookingId: booking._id }
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

    // Allow cancellation for pending bookings only
    const booking = await Booking.findOne({
      _id: bookingId,
      status: "pending",
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found or cannot be cancelled",
      });
    }

    // Check authorization - both customer and technician can cancel pending bookings
    if (
      (role === "customer" && booking.customer.toString() !== userId.toString()) ||
      (role === "technician" && booking.technician.toString() !== userId.toString())
    ) {
      return res.status(403).json({
        message: "Not authorized to cancel this booking",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      message: "Booking declined successfully",
      status: booking.status,
    });
    
    const otherUser = role === "customer" ? booking.technician : booking.customer;
    const notifRecipient = role === "customer" ? 'technician' : 'customer';

    await Notification.create({
      userId: otherUser,
      title: 'Booking Cancelled',
      message: `A booking has been cancelled by ${role}`,
      type: 'booking_cancelled',
      recipient: notifRecipient,
      data: { bookingId: booking._id }
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
      "in-progress": ["pending-completion"],
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

    // If moving to pending-completion, generate OTP
    if (status === "pending-completion") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      booking.completionOTP = otp;
      booking.otpGeneratedAt = new Date();
      booking.status = status;
      await booking.save();

      console.log('=== OTP GENERATION ===');
      console.log('Booking ID:', booking._id);
      console.log('OTP Generated:', otp);
      console.log('Customer ID:', booking.customer);
      console.log('Customer ID Type:', typeof booking.customer);

      try {
        // Send OTP to customer
        const notification = await Notification.create({
          userId: booking.customer,
          title: 'Service Completion OTP',
          message: `Your service completion OTP is: ${otp}. Share this with the technician to complete the service.`,
          type: 'otp',
          recipient: 'customer',
          data: { bookingId: booking._id, otp }
        });

        console.log('=== NOTIFICATION CREATED ===');
        console.log('Notification ID:', notification._id);
        console.log('Notification:', JSON.stringify(notification, null, 2));
      } catch (notifError) {
        console.error('=== NOTIFICATION ERROR ===');
        console.error('Error creating notification:', notifError);
        console.error('Error details:', notifError.message);
      }

      return res.json({
        message: "OTP sent to customer. Please enter the OTP to complete the service.",
        bookingId: booking._id,
        status: booking.status,
        requiresOTP: true
      });
    }

    booking.status = status;
    await booking.save();

    res.json({
      message: "Booking status updated successfully",
      bookingId: booking._id,
      status: booking.status,
    });
    
    const statusMessages = {
      'in-progress': 'Your booking is now in progress',
    };
    
    await Notification.create({
      userId: booking.customer,
      title: 'Booking Status Updated',
      message: statusMessages[status] || `Your booking status: ${status}`,
      type: 'system',
      recipient: 'customer',
      data: { bookingId: booking._id, status }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Resend OTP
exports.resendCompletionOTP = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    const bookingId = req.params.id;

    const booking = await Booking.findOne({
      _id: bookingId,
      technician: technicianId,
      status: "pending-completion"
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found or not in pending-completion status",
      });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    booking.completionOTP = otp;
    booking.otpGeneratedAt = new Date();
    await booking.save();

    console.log('=== RESEND OTP ===');
    console.log('New OTP Generated:', otp);
    console.log('Customer ID:', booking.customer);

    try {
      // Send new OTP to customer
      const notification = await Notification.create({
        userId: booking.customer,
        title: 'Service Completion OTP (Resent)',
        message: `Your new service completion OTP is: ${otp}. Share this with the technician to complete the service.`,
        type: 'otp',
        recipient: 'customer',
        data: { bookingId: booking._id, otp }
      });

      console.log('Resend Notification Created:', notification._id);
    } catch (notifError) {
      console.error('Error creating resend notification:', notifError);
    }

    res.json({
      message: "New OTP sent to customer successfully",
      bookingId: booking._id,
    });
  } catch (err) {
    console.error('Resend OTP error:', err);
    res.status(500).json({ message: err.message });
  }
};
exports.verifyCompletionOTP = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    const bookingId = req.params.id;
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    const booking = await Booking.findOne({
      _id: bookingId,
      technician: technicianId,
      status: "pending-completion"
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found or not in pending-completion status",
      });
    }

    // Check if OTP is expired (valid for 1 minute)
    const otpAge = Date.now() - new Date(booking.otpGeneratedAt).getTime();
    if (otpAge > 1 * 60 * 1000) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // Verify OTP
    if (booking.completionOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Mark as completed
    booking.status = "completed";
    booking.completedAt = new Date();
    booking.completionOTP = undefined;
    booking.otpGeneratedAt = undefined;
    await booking.save();

    // Create earning record
    const earning = await Earning.create({
      technician: technicianId,
      booking: bookingId,
      totalAmount: booking.estimatedPrice,
      adminCut: booking.estimatedPrice * 0.1,
      technicianAmount: booking.estimatedPrice * 0.9,
      status: 'pending'
    });

    // Update technician total earnings
    await require("../models/user.model").findByIdAndUpdate(
      technicianId,
      { $inc: { totalEarnings: earning.technicianAmount } }
    );

    console.log(`Earning created: $${earning.technicianAmount} for technician ${technicianId}`);

    // Notify customer
    await Notification.create({
      userId: booking.customer,
      title: 'Service Completed',
      message: 'Your service has been completed successfully',
      type: 'booking_completed',
      recipient: 'customer',
      data: { bookingId: booking._id }
    });

    res.json({
      message: "Service completed successfully",
      bookingId: booking._id,
      status: booking.status,
      earning: earning.technicianAmount
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
      _id: b._id,
      bookingId: b._id,
      status: b.status,
      serviceDate: b.preferredDate,
      timeSlot: b.preferredTime,
      issue: b.description,
      createdAt: b.createdAt,

      technician: {
        _id: b.technician?._id || null,
        id: b.technician?._id || null,
        name: b.technician?.fullname ? 
          b.technician.fullname.firstname + " " + b.technician.fullname.lastname : "N/A",
        phone: b.technician?.phone || "N/A",
      },

      service: {
        name: b.serviceType || "N/A",
        type: b.serviceType || "N/A",
        charge: b.estimatedPrice || 0,
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

