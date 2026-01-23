import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

const BookServiceForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    issue: "",
    serviceDate: "",
    timeSlot: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    navigate("/booking-success");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      <Navbar />

      <div className="max-w-lg mx-auto mt-24 px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-teal-600">
              Book Your Service
            </h2>
            <p className="text-gray-500 mt-1">
              Fill details to schedule your repair
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Issue */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Describe Issue
              </label>
              <textarea
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                rows="4"
                placeholder="Eg: Screen not working, noise issue..."
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Date
              </label>
              <input
                type="date"
                name="serviceDate"
                value={formData.serviceDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
                required
              />
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Time Slot
              </label>
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
                required
              >
                <option value="">Select time</option>
                <option value="9AM-12PM">9 AM – 12 PM</option>
                <option value="12PM-3PM">12 PM – 3 PM</option>
                <option value="3PM-6PM">3 PM – 6 PM</option>
                <option value="6PM-9PM">6 PM – 9 PM</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House no, Street, City"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookServiceForm;
