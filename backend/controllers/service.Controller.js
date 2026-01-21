const Service = require("../models/Service.model");

exports.createService = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    const { serviceName, description, serviceCharge, experience } = req.body;

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
