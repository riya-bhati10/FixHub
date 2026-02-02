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

    // Get completed bookings count
    const totalCompletedServices = await Booking.countDocuments({ status: "completed" });

    // Calculate total earnings from completed bookings
    const completedBookings = await Booking.find({ status: "completed" });
    const totalRevenue = completedBookings.reduce((sum, booking) => sum + (booking.estimatedPrice * 0.1 || 0), 0);

    const totalBlockedUsers = blockedCustomers + blockedTechnicians;

    res.json({
      success: true,
      stats: {
        totalCustomers,
        totalTechnicians,
        totalCompletedServices,
        totalBlockedUsers,
        totalRevenue: Math.round(totalRevenue),
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
    
    // Add booking stats for each technician
    const techniciansWithStats = await Promise.all(
      technicians.map(async (tech) => {
        const totalServices = await Booking.countDocuments({ 
          technician: tech._id,
          status: "completed" 
        });
        
        const completedBookings = await Booking.find({ 
          technician: tech._id,
          status: "completed" 
        });
        
        const totalEarnings = completedBookings.reduce(
          (sum, booking) => sum + (booking.estimatedPrice * 0.9 || 0),
          0
        );
        
        return {
          ...tech.toObject(),
          totalServices,
          totalEarnings
        };
      })
    );
    
    res.json({ success: true, technicians: techniciansWithStats });
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
    
    // Add booking stats for each customer
    const customersWithStats = await Promise.all(
      customers.map(async (customer) => {
        const totalBookings = await Booking.countDocuments({ 
          customer: customer._id 
        });
        
        return {
          ...customer.toObject(),
          totalBookings
        };
      })
    );
    
    res.json({ success: true, customers: customersWithStats });
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
      title: user.isBlocked ? "Account Blocked" : "Account Unblocked",
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
          title: "Booking Cancelled",
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
          title: "Booking Cancelled",
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

// Get completed bookings for earnings page
const getCompletedBookings = async (req, res) => {
  try {
    const completedBookings = await Booking.find({ status: "completed" })
      .populate("technician", "fullname")
      .populate("customer", "fullname")
      .sort({ updatedAt: -1 });

    const formattedBookings = completedBookings.map((booking) => ({
      _id: booking._id,
      technicianName: booking.technician?.fullname
        ? `${booking.technician.fullname.firstname} ${booking.technician.fullname.lastname}`
        : "N/A",
      customerName: booking.customer?.fullname
        ? `${booking.customer.fullname.firstname} ${booking.customer.fullname.lastname}`
        : "N/A",
      serviceName: booking.serviceType || "N/A",
      serviceCharge: booking.estimatedPrice || 0,
      technicianIncome: (booking.estimatedPrice || 0) * 0.9,
      adminCommission: (booking.estimatedPrice || 0) * 0.1,
      completedDate: booking.updatedAt,
    }));

    const totalAdminEarnings = formattedBookings.reduce(
      (sum, booking) => sum + booking.adminCommission,
      0
    );

    res.json({
      success: true,
      completedServices: formattedBookings,
      totalCompletedServices: formattedBookings.length,
      totalAdminEarnings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get chart data for dashboard
const getChartData = async (req, res) => {
  try {
    // Get last 7 days data
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const services = await Booking.countDocuments({
        status: "completed",
        updatedAt: { $gte: date, $lt: nextDate }
      });

      const bookings = await Booking.find({
        status: "completed",
        updatedAt: { $gte: date, $lt: nextDate }
      });

      const revenue = bookings.reduce((sum, b) => sum + (b.estimatedPrice * 0.1 || 0), 0);

      last7Days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        services,
        revenue: Math.round(revenue)
      });
    }

    // Get last 6 months user growth
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      
      const endDate = new Date(date);
      endDate.setMonth(endDate.getMonth() + 1);

      const users = await User.countDocuments({
        createdAt: { $lt: endDate }
      });

      last6Months.push({ month, users });
    }

    res.json({
      success: true,
      weeklyData: last7Days,
      monthlyData: last6Months
    });
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
  getCompletedBookings,
  getChartData,
};