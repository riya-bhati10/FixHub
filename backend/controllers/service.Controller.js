const Service = require("../models/Service.model");

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

// Update Service 

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

// Delete Service
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

// get all service for customer view 
exports.getAllServices = async (req, res) => {
  try {
    const { serviceName } = req.query;

    const filter = {
      isActive: true,
    };

    if (serviceName) {
      filter.serviceName = { $regex: serviceName, $options: "i" };
    }

  const services = await Service.find(filter).populate(
    "technicianId",
    "fullname phone",
  );

  const formattedServices = services.map((service) => ({
    serviceId: service._id,
    serviceName: service.serviceName,
    serviceCharge: service.serviceCharge,
    experience: service.experience,
    rating: service.averageRating,

    technician: {
      id: service.technicianId._id,
      name:
        service.technicianId.fullname.firstname +
        " " +
        service.technicianId.fullname.lastname,
      phone: service.technicianId.phone,
    },
  }));

  res.json({
    count: formattedServices.length,
    services: formattedServices,
  }); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
