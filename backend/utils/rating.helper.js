const mongoose = require("mongoose");
const Review = require("../models/review.model");

exports.getTechnicianRating = async (technicianId) => {
  const result = await Review.aggregate([
    {
      $match: {
        technicianId: new mongoose.Types.ObjectId(technicianId),
      },
    },
    {
      $group: {
        _id: "$technicianId",
        avgRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  if (result.length === 0) {
    return { avgRating: 0, totalReviews: 0 };
  }

  return {
    avgRating: Number(result[0].avgRating.toFixed(1)),
    totalReviews: result[0].totalReviews,
  };
};
