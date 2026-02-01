const User = require("../models/User.Model");

const calculateAdminCommission = async (serviceCharge) => {
  try {
    const commissionRate = 0.1;
    const adminCommission = serviceCharge * commissionRate;

    return {
      adminCommission,
      technicianEarning: serviceCharge - adminCommission,
    };
  } catch (error) {
    console.error("Commission calculation error:", error);
    return null;
  }
};

module.exports = {
  calculateAdminCommission,
};
