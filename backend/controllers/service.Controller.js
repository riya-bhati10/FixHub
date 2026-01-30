const Service = require("../models/Service.model");
const { getTechnicianRating } = require("../utils/rating.helper");


// create service (technician)
exports.createService = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    const { serviceName, description, serviceCharge, experience } = req.body;
    console.log("Received data:", req.body);

    if (!serviceName || !serviceCharge) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const service = await Service.create({
      technicianId,
      serviceName,
      description,
      serviceCharge,
      experience,
    });

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Service (technician)
exports.updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const technicianId = req.user.userId;

    const service = await Service.findOne({
      _id: serviceId,
      technicianId,
      isActive: true,
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found or access denied",
      });
    }

    const { serviceName, description, serviceCharge, experience } = req.body;

    if (serviceName) service.serviceName = serviceName;
    if (description) service.description = description;
    if (serviceCharge) service.serviceCharge = serviceCharge;
    if (experience !== undefined) service.experience = experience;

    await service.save();

    res.json({
      message: "Service updated successfully",
      service,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Service (technician)
exports.deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const technicianId = req.user.userId;

    const service = await Service.findOne({
      _id: serviceId,
      technicianId,
      isActive: true,
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found or access denied",
      });
    }

    service.isActive = false;
    await service.save();

    res.json({
      message: "Service deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View services (technician)
exports.getMyServices = async (req, res) => {
  try {
    const technicianId = req.user.userId;

    const services = await Service.find({
      technicianId,
      isActive: true,
    });
    res.json({
      count: services.length,
      services,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// view service categories (customer)
exports.getServiceCategories = async (req, res) => {
  try {
    const categories = await Service.distinct("serviceName", {
      isActive: true,
    });

    res.json({
      count: categories.length,
      categories,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// View technicians by service (customer)
exports.getTechniciansByService = async (req, res) => {
  try {
    const { serviceName } = req.params;

    const services = await Service.find({
      serviceName,
      isActive: true,
    }).populate("technicianId", "fullname");

    const technicians = await Promise.all(
      services.map(async (service) => {
        const ratingData = await getTechnicianRating(service.technicianId._id);

        return {
          serviceId: service._id,
          technicianId: service.technicianId._id,
          name:
            service.technicianId.fullname.firstname +
            " " +
            service.technicianId.fullname.lastname,
          serviceCharge: service.serviceCharge,
          avgRating: ratingData.avgRating,
          totalReviews: ratingData.totalReviews,
        };
      }),
    );

    res.json({
      count: technicians.length,
      technicians,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
