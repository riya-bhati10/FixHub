import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Common/Navbar";
import axiosInstance from "../../Services/axiosInstance";

const BookServiceForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serviceType: "",
    issue: "",
    serviceDate: "",
    timeSlot: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/bookings", formData);
      navigate("/booking-success");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto bg-white p-6 mt-24 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">
          Book Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Issue</label>
            <textarea
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              required
              placeholder="Describe your issue"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Service Date</label>
            <input
              type="date"
              name="serviceDate"
              value={formData.serviceDate}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Time Slot</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select Time</option>
              <option value="9AM-12PM">9 AM - 12 PM</option>
              <option value="12PM-3PM">12 PM - 3 PM</option>
              <option value="3PM-6PM">3 PM - 6 PM</option>
              <option value="6PM-9PM">6 PM - 9 PM</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter your address"
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
          >
            Book Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookServiceForm;