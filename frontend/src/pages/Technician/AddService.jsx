import React, { useState } from "react";
import technicianService from '../../Services/technicianService';

const AddService = ({ onClose, onServiceAdded }) => {
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceCharge: "",
    experience: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!formData.serviceName || !formData.serviceCharge || !formData.experience) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      console.log('Submitting service data:', formData);
      
      const serviceData = {
        serviceName: formData.serviceName.trim(),
        serviceCharge: parseFloat(formData.serviceCharge),
        experience: parseInt(formData.experience),
        description: formData.description.trim() || ""
      };

      console.log('Processed service data:', serviceData);
      const result = await technicianService.createService(serviceData);
      console.log('Service created successfully:', result);
      
      alert('Service added successfully!');
      
      if (onServiceAdded) {
        onServiceAdded();
      }
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error creating service:', error);
      console.error('Error response:', error.response);
      setError(error.response?.data?.message || error.message || 'Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg border border-fixhub-borderSoft">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-fixhub-textDark">Add Your Service</h2>
        <p className="text-fixhub-textMuted text-sm mt-1">Fill in your service details</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-fixhub-danger bg-opacity-10 border border-fixhub-danger rounded-lg">
          <p className="text-fixhub-danger text-sm">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full border border-fixhub-borderSoft rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fixhub-primary bg-white text-fixhub-textDark"
          >
            <option value="">Select your service</option>
            {serviceTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Service Charge and Experience in same row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-fixhub-textDark mb-1">
              Service Charge (₹) *
            </label>
            <input
              type="number"
              name="serviceCharge"
              value={formData.serviceCharge}
              onChange={handleChange}
              required
              min="0"
              className="w-full border border-fixhub-borderSoft rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fixhub-primary text-fixhub-textDark"
              placeholder="500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-fixhub-textDark mb-1">
              Experience *
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full border border-fixhub-borderSoft rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fixhub-primary bg-white text-fixhub-textDark"
            >
              <option value="">Select experience</option>
              {experienceOptions.map((exp, index) => (
                <option key={index} value={exp.value}>{exp.label}</option>
              ))}
            </select>
          </div>
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
            rows="2"
            className="w-full border border-fixhub-borderSoft rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fixhub-primary text-fixhub-textDark"
            placeholder="Briefly describe the service you offer..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-fixhub-primary hover:bg-fixhub-dark text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Service'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 border border-fixhub-borderSoft hover:bg-fixhub-borderSoft text-fixhub-textDark font-medium py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;