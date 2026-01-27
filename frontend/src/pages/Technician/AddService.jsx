import React, { useState } from "react";

const AddService = ({ onClose }) => {
  const [formData, setFormData] = useState({
    serviceType: "",
    serviceCharge: "",
    experience: "",
    description: "",
  });

  const serviceTypes = [
    "Smartphone Repair",
    "Laptop Repair",
    "TV Repair",
    "AC Service",
    "Refrigerator Repair",
    "Washing Machine Repair",
    "Microwave Repair",
    "Home Audio Repair",
    "Camera Repair",
    "Gaming Console Repair",
    "Other"
  ];

  const experienceOptions = [
    "Less than 1 year",
    "1-3 years",
    "3-5 years",
    "5-10 years",
    "More than 10 years"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Service Added Successfully ✅");
    if (onClose) onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md border border-fixhub-borderSoft">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-fixhub-textDark">Add Your Service</h2>
        <p className="text-fixhub-textMuted text-sm mt-1">Fill in your service details</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium text-fixhub-textDark mb-1">
            Service Type *
          </label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className="w-full border border-fixhub-borderSoft rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fixhub-primary bg-white text-fixhub-textDark"
          >
            <option value="">Select your service</option>
            {serviceTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Service Charge */}
        <div>
          <label className="block text-sm font-medium text-fixhub-textDark mb-1">
            Service Charge (₹) *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fixhub-textMuted">
              ₹
            </span>
            <input
              type="number"
              name="serviceCharge"
              value={formData.serviceCharge}
              onChange={handleChange}
              required
              min="0"
              className="w-full border border-fixhub-borderSoft rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-fixhub-primary text-fixhub-textDark"
              placeholder="Enter amount"
            />
          </div>
          <p className="text-xs text-fixhub-textMuted mt-1">Enter your service charge in Indian Rupees</p>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-fixhub-textDark mb-1">
            Experience *
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full border border-fixhub-borderSoft rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fixhub-primary bg-white text-fixhub-textDark"
          >
            <option value="">Select your experience</option>
            {experienceOptions.map((exp, index) => (
              <option key={index} value={exp}>{exp}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-fixhub-textDark mb-1">
            Service Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-fixhub-borderSoft rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fixhub-primary text-fixhub-textDark"
            placeholder="Briefly describe the service you offer (e.g., 'Screen replacement for all major smartphone brands')."
          />
        </div>

      

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-fixhub-primary hover:bg-fixhub-dark text-white font-medium py-3 rounded-lg transition-colors"
          >
            Add Service
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-fixhub-borderSoft hover:bg-gray-50 text-fixhub-textDark font-medium py-3 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;