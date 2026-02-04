const User = require("../models/user.model");
const Booking = require("../models/booking.model");
const Service = require("../models/service.model");
const Earning = require("../models/earning.model");

exports.getTechnicianProfile = async (req, res) => {
  try {
    const technician = await User.findById(req.user.userId).select('-password');
    if (!technician || technician.role !== 'technician') {
      return res.status(404).json({ message: "Technician not found" });
    }
    res.json(technician);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTechnicianStats = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    console.log('Getting stats for technician:', technicianId);
    
    // Get technician data with earnings
    const technician = await User.findById(technicianId).select('totalEarnings');
    
    const totalJobs = await Booking.countDocuments({ technician: technicianId });
    const completedJobs = await Booking.countDocuments({ 
      technician: technicianId, 
      status: 'completed' 
    });
    const pendingJobs = await Booking.countDocuments({ 
      technician: technicianId, 
      status: { $in: ['pending', 'accepted', 'in-progress'] }
    });
    
    // Get average rating from completed bookings
    const completedBookings = await Booking.find({ 
      technician: technicianId, 
      status: 'completed',
      rating: { $exists: true }
    }).select('rating');
    
    let averageRating = 0;
    if (completedBookings.length > 0) {
      const totalRating = completedBookings.reduce((sum, booking) => sum + booking.rating, 0);
      averageRating = (totalRating / completedBookings.length).toFixed(1);
    }

    const stats = {
      totalJobs,
      completedJobs,
      pendingJobs,
      totalEarnings: technician?.totalEarnings || 0,
      averageRating: parseFloat(averageRating)
    };
    
    console.log('Stats result:', stats);
    res.json(stats);
  } catch (error) {
    console.error('Error in getTechnicianStats:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getBookingRequests = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    console.log('Getting booking requests for technician:', technicianId);
    
    const bookingRequests = await Booking.find({ 
      technician: technicianId, 
      status: 'pending' 
    })
    .populate('customer', 'fullname phone email')
    .sort({ createdAt: -1 });

    console.log('Found booking requests:', bookingRequests.length);
    res.json(bookingRequests);
  } catch (error) {
    console.error('Error in getBookingRequests:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getBookingHistory = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    
    const bookingHistory = await Booking.find({ 
      technician: technicianId,
      status: { $in: ['completed', 'cancelled'] }
    })
    .populate('customer', 'fullname phone email')
    .sort({ updatedAt: -1 });

    res.json(bookingHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTechnicianSchedule = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    
    const schedule = await Booking.find({ 
      technician: technicianId,
      status: { $in: ['accepted', 'in-progress'] }
    })
    .populate('customer', 'fullname phone email')
    .sort({ preferredDate: 1 });

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    
    const reviews = await Booking.find({ 
      technician: technicianId,
      status: 'completed',
      rating: { $exists: true },
      review: { $exists: true }
    })
    .populate('customer', 'fullname')
    .select('rating review createdAt customer serviceType')
    .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.acceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const technicianId = req.user.userId;
    
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, technician: technicianId, status: 'pending' },
      { status: 'accepted', acceptedAt: new Date() },
      { new: true }
    ).populate('customer', 'fullname phone email');

    if (!booking) {
      return res.status(404).json({ message: "Booking not found or already processed" });
    }

    res.json({ message: "Booking accepted successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.declineBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const technicianId = req.user.userId;
    
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, technician: technicianId, status: 'pending' },
      { status: 'declined', declinedAt: new Date() },
      { new: true }
    ).populate('customer', 'fullname phone email');

    if (!booking) {
      return res.status(404).json({ message: "Booking not found or already processed" });
    }

    res.json({ message: "Booking declined successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyServices = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    console.log('Fetching services for technician:', technicianId);
    
    const services = await Service.find({ technicianId: technicianId })
      .sort({ createdAt: -1 });

    console.log('Found services:', services.length);
    console.log('Services data:', services);
    res.json(services);
  } catch (error) {
    console.error('Error fetching technician services:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    console.log('Creating service for technician:', technicianId);
    console.log('Request body:', req.body);
    
    // Validate required fields
    const { serviceName, serviceCharge, experience, description } = req.body;
    if (!serviceName || !serviceCharge) {
      return res.status(400).json({ message: 'Service name and charge are required' });
    }
    
    const serviceData = { 
      technicianId,
      serviceName,
      serviceCharge: Number(serviceCharge),
      experience: experience || "Less than 1 year",
      description: description || "",
      isActive: true
    };
    console.log('Service data to save:', serviceData);
    
    const service = new Service(serviceData);
    const savedService = await service.save();
    console.log('Service saved successfully:', savedService);

    res.status(201).json(savedService);
  } catch (error) {
    console.error('Error creating service:', error);
    console.error('Error details:', error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error: ' + error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const technicianId = req.user.userId;
    
    const service = await Service.findOneAndUpdate(
      { _id: serviceId, technicianId: technicianId },
      req.body,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const technicianId = req.user.userId;
    
    const service = await Service.findOneAndDelete({
      _id: serviceId,
      technicianId: technicianId
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateServiceStatus = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { status } = req.body;
    const technicianId = req.user.userId;
    
    const isActive = status === 'active';
    
    const service = await Service.findOneAndUpdate(
      { _id: serviceId, technicianId: technicianId },
      { isActive },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    console.error('Error updating service status:', error);
    res.status(500).json({ message: error.message });
  }
};

// TEMPORARY: Migrate earnings for current technician
exports.migrateMyEarnings = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    
    // Get all completed bookings that don't have earnings yet
    const completedBookings = await Booking.find({
      technician: technicianId,
      status: 'completed'
    });

    let totalEarnings = 0;
    let createdCount = 0;

    for (const booking of completedBookings) {
      // Check if earning already exists
      const existingEarning = await Earning.findOne({ booking: booking._id });
      
      if (!existingEarning) {
        // Create earning record
        const earning = await Earning.create({
          technician: technicianId,
          booking: booking._id,
          totalAmount: booking.estimatedPrice,
          adminCut: booking.estimatedPrice * 0.1,
          technicianAmount: booking.estimatedPrice * 0.9,
          status: 'pending'
        });
        
        totalEarnings += earning.technicianAmount;
        createdCount++;
      }
    }

    // Update technician's totalEarnings
    if (createdCount > 0) {
      await User.findByIdAndUpdate(
        technicianId,
        { $inc: { totalEarnings } }
      );
    }

    res.json({
      message: 'Earnings migrated successfully',
      completedBookings: completedBookings.length,
      newEarningsCreated: createdCount,
      totalEarnings: totalEarnings.toFixed(2)
    });
  } catch (error) {
    console.error('Error migrating earnings:', error);
    res.status(500).json({ message: error.message });
  }
};