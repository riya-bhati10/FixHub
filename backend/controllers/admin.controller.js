const User = require("../models/User.Model");
const Booking = require("../models/Booking.model");
const Service = require("../models/Service.model");
const Review = require("../models/Review.model");
const Notification = require("../models/Notification.model");

// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalTechnicians = await User.countDocuments({ role: "technician" });
    const blockedCustomers = await User.countDocuments({
      role: "customer",
      isBlocked: true,
    });
    const blockedTechnicians = await User.countDocuments({
      role: "technician",
      isBlocked: true,
    });

    // Calculate total earnings from completed bookings
    const admin = await User.findOne({ role: "admin" });
    const totalEarnings = admin?.totalEarnings || 0;

    const totalBlockedUsers = blockedCustomers + blockedTechnicians;

    res.json({
      success: true,
      stats: {
        totalCustomers,
        totalTechnicians,
        totalBlockedUsers,
        totalRevenue: Math.round(totalEarnings),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get blocked customers list with details
const getBlockedCustomers = async (req, res) => {
  try {
    const blockedCustomers = await User.find({
      role: "customer",
      isBlocked: true,
    })
      .select("fullname email createdAt updatedAt")
      .sort({ updatedAt: -1 });

    const formattedCustomers = blockedCustomers.map((customer) => ({
      id: customer._id,
      name: `${customer.fullname.firstname} ${customer.fullname.lastname}`,
      email: customer.email,
      blockedDate: customer.updatedAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      status: "Blocked",
    }));

    res.json({
      success: true,
      count: formattedCustomers.length,
      customers: formattedCustomers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get blocked technicians list with details  
const getBlockedTechnicians = async (req, res) => {
  try {
    const blockedTechnicians = await User.find({
      role: "technician",
      isBlocked: true,
    })
      .select("fullname email createdAt updatedAt")
      .sort({ updatedAt: -1 });

    const formattedTechnicians = blockedTechnicians.map((technician) => ({
      id: technician._id,
      name: `${technician.fullname.firstname} ${technician.fullname.lastname}`,
      email: technician.email,
      blockedDate: technician.updatedAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      status: "Blocked",
    }));

    res.json({
      success: true,
      count: formattedTechnicians.length,
      technicians: formattedTechnicians,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get All Technicians
const getAllTechnicians = async (req, res) => {
  try {
    const technicians = await User.find({ role: "technician" })
      .select("-password")
      .sort({ createdAt: -1 });
    res.json({ success: true, technicians });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" })
      .select("-password")
      .sort({ createdAt: -1 });
    res.json({ success: true, customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Block/Unblock User
const blockUnblockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body; // Admin ka reason

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const wasBlocked = user.isBlocked;
    user.isBlocked = !user.isBlocked;
    await user.save();

    // Send notification to user
    const message = user.isBlocked
      ? `Your account has been blocked. Reason: ${reason || "Policy violation"}`
      : "Your account has been unblocked. You can now access all services.";

    await Notification.create({
      userId: userId,
      message: message,
    });
    
    // Handle active bookings when user is blocked
    if (user.isBlocked) {
      let activeBookings = [];
      let notificationTarget = [];

      if (user.role === "technician") {
        // Technician blocked - cancel their bookings, notify customers
        activeBookings = await Booking.find({
          technicianId: userId,
          status: "pending",
        }).populate("customerId", "fullname");

        notificationTarget = activeBookings.map((booking) => ({
          userId: booking.customerId._id,
          message: `Your booking has been cancelled because the technician's account was blocked. You can book another technician.`,
        }));
      } else if (user.role === "customer") {
        // Customer blocked - cancel their bookings, notify technicians
        activeBookings = await Booking.find({
          customerId: userId,
          status: { $in: ["pending", "accepted"] },
        }).populate("technicianId", "fullname");

        notificationTarget = activeBookings.map((booking) => ({
          userId: booking.technicianId._id,
          message: `A booking has been cancelled because the customer's account was blocked.`,
        }));
      }

      // Cancel all active bookings
      if (activeBookings.length > 0) {
        await Booking.updateMany(
          {
            _id: { $in: activeBookings.map((b) => b._id) },
          },
          {
            status: "cancelled",
            $push: {
              statusHistory: {
                status: "cancelled",
                updatedAt: new Date(),
              },
            },
          },
        );

        // Send notifications
        for (const notification of notificationTarget) {
          await Notification.create(notification);
        }

        console.log(
          `Cancelled ${activeBookings.length} bookings for blocked ${user.role}`,
        );
      }
    }

    res.json({
      success: true,
      message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
      user: { ...user.toObject(), password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Technician Services
const getTechnicianServices = async (req, res) => {
  try {
    const { technicianId } = req.params;
    const services = await Service.find({ technicianId })
      .populate("technicianId", "fullname email phone")
      .sort({ createdAt: -1 });
    res.json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Service Reviews
const getServiceReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const bookings = await Booking.find({ serviceId });
    const bookingIds = bookings.map((b) => b._id);
    const reviews = await Review.find({ bookingId: { $in: bookingIds } })
      .populate("customerId", "fullname email")
      .populate("bookingId", "serviceId")
      .sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Booking History
const getUserBookingHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let bookings;
    if (user.role === "technician") {
      bookings = await Booking.find({ technicianId: userId })
        .populate("customerId", "fullname email phone")
        .populate("serviceId", "serviceName serviceCharge")
        .sort({ createdAt: -1 });
    } else {
      bookings = await Booking.find({ customerId: userId })
        .populate("technicianId", "fullname email phone")
        .populate("serviceId", "serviceName serviceCharge")
        .sort({ createdAt: -1 });
    }

    res.json({ success: true, bookings, userRole: user.role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getBlockedCustomers,
  getBlockedTechnicians,
  getAllTechnicians,
  getAllCustomers,
  blockUnblockUser,
  getTechnicianServices,
  getServiceReviews,
  getUserBookingHistory,
};
