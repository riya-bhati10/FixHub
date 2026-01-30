
exports.checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("Role check - User:", req.user);
    console.log("Role check - Allowed roles:", allowedRoles);
    console.log("Role check - User role:", req.user?.role);
   
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        message: "Unauthorized: user data not found",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied: You do not have permissions. Required: ${allowedRoles.join(', ')}, Got: ${req.user.role}`,
      });
    }

    console.log("Role check passed!");
    next();
  };
};
