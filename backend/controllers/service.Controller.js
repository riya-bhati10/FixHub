const Service = require("../models/Service.model");
const { getTechnicianRating } = require("../utils/rating.helper");


// create service (technician)
exports.createService = async (req, res) => {
  try {
    const technicianId = req.user.userId;
    const { serviceName, description, serviceCharge, experience } = req.body;
    console.log("Received data:", req.body);
    console.log("Technician ID:", technicianId);
    console.log("User object:", req.user);
    console.log("User ID type:", typeof technicianId);

    if (!serviceName || !serviceCharge) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!technicianId) {
      console.log("ERROR: Technician ID is missing!");
      return res.status(400).json({ message: "Technician ID missing" });
    }

    console.log("About to create service with data:", {
      technicianId,
      serviceName,
      description,
      serviceCharge,
      experience,
    });

    const service = await Service.create({
      technicianId,
      serviceName,
      description,
      serviceCharge,
      experience,
    });

    console.log("Service created successfully:", service);

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (err) {
    console.error("Service creation error:", err);
    console.error("Error details:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Update Service (technician)
exports.updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const technicianId = req.user._id;

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
    const technicianId = req.user._id;

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
    const technicianId = req.user._id;

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


// View all services (customer)
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({
      isActive: true,
    }).populate({
      path: "technicianId", 
      match: { isBlocked: false },
      select: "fullname phone location isBlocked"
    });

    console.log('Total services found:', services.length);
    console.log('Service names in DB:', services.map(s => s.serviceName));

    // Filter out services with blocked technicians
    const activeServices = services.filter(s => s.technicianId && !s.technicianId.isBlocked);
    console.log('Active services after filtering:', activeServices.length);

    const formattedServices = activeServices.map(service => ({
      id: service._id,
      title: service.serviceName,
      description: service.description,
      price: service.serviceCharge,
      experience: service.experience,
      completedJobs: service.completedJobs,
      technician: {
        id: service.technicianId._id,
        name: service.technicianId.fullname.firstname + " " + service.technicianId.fullname.lastname,
        phone: service.technicianId.phone,
        location: service.technicianId.location
      }
    }));

    res.json({
      count: formattedServices.length,
      services: formattedServices,
    });
  } catch (err) {
    console.error('Get all services error:', err);
    res.status(500).json({ message: err.message });
  }
};

// View technicians by service (customer)
exports.getTechniciansByService = async (req, res) => {
  try {
    const { serviceName } = req.params;
    console.log('Searching for service:', serviceName);

    const services = await Service.find({
      serviceName: new RegExp(serviceName, 'i'), // Case insensitive search
      isActive: true,
    }).populate({
      path: "technicianId", 
      match: { isBlocked: false },
      select: "fullname phone location isBlocked"
    });

    console.log('Found services for technician search:', services.length);

    // Filter out services with blocked technicians
    const activeServices = services.filter(s => s.technicianId && !s.technicianId.isBlocked);

    const technicians = await Promise.all(
      activeServices.map(async (service) => {
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
    console.error('Get technicians by service error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get services by category (customer)
exports.getServicesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    // Enhanced category mapping
    const categoryMap = {
      'smartphone': ['smartphone', 'mobile', 'phone', 'iphone', 'android', 'cell phone', 'mobile phone', 'smart phone'],
      'laptop': ['laptop', 'computer', 'pc', 'macbook', 'notebook', 'desktop'],
      'tv': ['tv', 'television', 'smart tv', 'led', 'lcd', 'oled', 'plasma'],
      'ac': ['ac', 'air conditioner', 'air conditioning', 'hvac', 'cooling', 'aircon'],
      'fridge': ['fridge', 'refrigerator', 'freezer', 'icebox'],
      'washing-machine': ['washing machine', 'washer', 'laundry', 'washing', 'machine'],
      'microwave': ['microwave', 'oven', 'micro wave'],
      'home-audio': ['home audio', 'speaker', 'sound system', 'audio', 'music system', 'stereo'],
      'camera': ['camera', 'dslr', 'photography', 'photo', 'cam'],
      'gaming': ['gaming', 'console', 'playstation', 'xbox', 'nintendo', 'game', 'ps4', 'ps5']
    };

    const searchTerms = categoryMap[categoryId] || [categoryId.replace(/-/g, ' ')];
    const regexPattern = searchTerms.map(term => `(${term})`).join('|');

    let services = await Service.find({
      serviceName: new RegExp(regexPattern, 'i'),
      isActive: true,
    }).populate({
      path: "technicianId", 
      select: "fullname phone location isBlocked"
    });

    // If no services found, try broader search
    if (services.length === 0) {
      const broadSearchTerm = categoryId.replace(/-/g, ' ');
      services = await Service.find({
        $or: [
          { serviceName: new RegExp(broadSearchTerm, 'i') },
          { description: new RegExp(broadSearchTerm, 'i') }
        ],
        isActive: true,
      }).populate({
        path: "technicianId", 
        select: "fullname phone location isBlocked"
      });
    }

    // Filter services with valid technicians
    const activeServices = services.filter(s => s.technicianId);

    const formattedServices = await Promise.all(
      activeServices.map(async (service) => {
        const ratingData = await getTechnicianRating(service.technicianId._id);
        
        return {
          _id: service._id,
          serviceType: service.serviceName,
          description: service.description,
          price: service.serviceCharge,
          experience: service.experience,
          technician: {
            _id: service.technicianId._id,
            name: service.technicianId.fullname.firstname + " " + service.technicianId.fullname.lastname,
            phone: service.technicianId.phone,
            location: service.technicianId.location,
            rating: ratingData.avgRating
          }
        };
      })
    );
    
    res.json(formattedServices);
  } catch (err) {
    console.error('Category search error:', err);
    res.status(500).json({ message: err.message });
  }
};
