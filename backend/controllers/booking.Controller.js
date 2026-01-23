const Booking = require("../models/Booking.model");
const Service = require("../models/Service.model");

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
      serviceLocation,
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//  getBookings (for technician

exports.getTechnicianBookings = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    const { status } = req.query;

    const filter = { technicianId };
    if (status) filter.status = status;

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
        id: b.customerId._id,
        name:
          b.customerId.fullname.firstname +
          " " +
          b.customerId.fullname.lastname,
        phone: b.customerId.phone,
      },

      service: {
        id: b.serviceId._id,
        name: b.serviceId.serviceName,
        charge: b.serviceId.serviceCharge,
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
