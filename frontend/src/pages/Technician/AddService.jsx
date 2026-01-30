import React, { useState } from "react";
import api from '../Landing/api';

const AddService = ({ onClose, onServiceAdded }) => {
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceCharge: "",
    experience: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

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
    { label: "Less than 1 year", value: 0 },
    { label: "1-3 years", value: 2 },
    { label: "3-5 years", value: 4 },
    { label: "5-10 years", value: 7 },
    { label: "More than 10 years", value: 10 }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const serviceData = {
        serviceName: formData.serviceName,
        description: formData.description,
        serviceCharge: parseFloat(formData.serviceCharge),
        experience: parseInt(formData.experience)
      };
      
      console.log('Sending service data:', serviceData);
      const response = await api.post('/services', serviceData);
      console.log('Service created:', response.data);
      
      alert("Service Added Successfully ✅");
      
      if (onServiceAdded) {
        onServiceAdded();
      }
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error adding service:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Failed to add service. Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
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
            name="serviceName"
            value={formData.serviceName}
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
            Service Charge ($) *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fixhub-textMuted">
              $
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
          <p className="text-xs text-fixhub-textMuted mt-1">Enter your service charge in USD</p>
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
              <option key={index} value={exp.value}>{exp.label}</option>
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
            disabled={loading}
            className="flex-1 bg-fixhub-primary hover:bg-fixhub-dark text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Service'}
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