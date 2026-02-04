import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../../Common/Navbar';
import api from '../Landing/api';
import { HandleMessageUIError, HandleMessageUISuccess } from '../../utils/toastConfig';

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  const [formData, setFormData] = useState({
    serviceType: service?.serviceType || '',
    description: '',
    location: '',
    preferredDate: '',
    preferredTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState('');

  const customerNavLinks = [
    { label: 'Dashboard', path: '/customer/dashboard' },
    { label: 'Book Service', path: '/customer/book-service' },
    { label: 'My Bookings', path: '/customer/my-bookings' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getCurrentLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setFormData({ ...formData, location: data.display_name });
          } catch (error) {
            console.error('Error getting address:', error);
            setFormData({ ...formData, location: `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}` });
          } finally {
            setLoadingLocation(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast.error('Unable to get your location. Please enter manually.', HandleMessageUIError());
          setLoadingLocation(false);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser', HandleMessageUIError());
      setLoadingLocation(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const bookingData = {
        serviceId: service._id,
        technicianId: service.technician._id,
        issue: formData.description,
        serviceDate: formData.preferredDate,
        timeSlot: formData.preferredTime,
        serviceLocation: formData.location
      };

      await api.post('/bookings', bookingData);
      toast.success('Booking created successfully!', HandleMessageUISuccess());
      navigate('/customer/booking-success');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F7FBFC] flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">No service selected</p>
          <button
            onClick={() => navigate('/customer/book-service')}
            className="px-4 py-2 bg-[#1F7F85] text-white rounded-lg"
          >
            Go to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FBFC]">
      <Navbar
        userType="customer"
        navLinks={customerNavLinks}
        showProfile
        showNotifications
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#1F7F85] hover:text-[#0F4C5C] mb-4 text-sm"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F4C5C] mb-2">
            Book Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Fill in the details to book your service
          </p>
        </div>

        {/* Technician Info Card */}
        <div className="bg-white rounded-xl border-2 border-[#DCEBEC] p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1F7F85] flex items-center justify-center text-white font-bold text-2xl">
              {service.technician?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F4C5C]">
                {service.technician?.name}
              </h3>
              <p className="text-sm text-slate-600 capitalize">
                {service.serviceType}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="material-symbols-outlined text-sm text-amber-500 fill-current">
                  star
                </span>
                <span className="text-sm font-semibold text-amber-700">
                  {service.technician?.rating || 4.5}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border-2 border-[#DCEBEC] p-4 sm:p-6 lg:p-8"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Service Type - Read Only */}
            <div>
              <label className="block text-sm font-semibold text-[#0F4C5C] mb-2">
                Service Type
              </label>
              <input
                type="text"
                name="serviceType"
                value={service?.serviceType || service?.serviceName || ''}
                disabled
                className="w-full px-4 py-3 text-sm border-2 border-[#DCEBEC] rounded-lg bg-[#E0F2F1] cursor-not-allowed text-[#0F4C5C] font-medium"
              />
              <p className="text-xs text-slate-500 mt-1">
                Service selected by you
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-[#0F4C5C] mb-2">
                Issue Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Describe the issue in detail..."
                className="w-full px-4 py-3 text-sm border-2 border-[#DCEBEC] rounded-lg focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none resize-none"
              />
            </div>

            {/* Location with Geolocation */}
            <div>
              <label className="block text-sm font-semibold text-[#0F4C5C] mb-2">
                Service Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Enter your address"
                  className="w-full px-4 py-3 text-sm border-2 border-[#DCEBEC] rounded-lg focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none pr-12"
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={loadingLocation}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#1F7F85] hover:bg-[#E0F2F1] rounded-lg transition-colors disabled:opacity-50"
                  title="Use current location"
                >
                  {loadingLocation ? (
                    <span className="material-symbols-outlined animate-spin">
                      progress_activity
                    </span>
                  ) : (
                    <span className="material-symbols-outlined">
                      my_location
                    </span>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Click the location icon to use your current location
              </p>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F4C5C] mb-2">
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 text-sm border-2 border-[#DCEBEC] rounded-lg focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F4C5C] mb-2">
                  Preferred Time <span className="text-red-500">*</span>
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm border-2 border-[#DCEBEC] rounded-lg focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none"
                >
                  <option value="">Select time slot</option>
                  <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
                  <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                  <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                  <option value="12:00-13:00">12:00 PM - 01:00 PM</option>
                  <option value="12:00-13:00">02:00 PM - 03:00 PM</option>
                  <option value="14:00-15:00">02:00 PM - 03:00 PM</option>
                  <option value="15:00-16:00">03:00 PM - 04:00 PM</option>
                  <option value="16:00-17:00">04:00 PM - 05:00 PM</option>
                  <option value="17:00-18:00">05:00 PM - 06:00 PM</option>
                  <option value="18:00-19:00">06:00 PM - 07:00 PM</option>
                </select>
              </div>
            </div>

            {/* Estimated Price - Read Only */}
            <div>
              <label className="block text-sm font-semibold text-[#0F4C5C] mb-2">
                Service Charge
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F4C5C] font-bold text-lg">
                  $
                </span>
                <input
                  type="text"
                  value={service?.price || 0}
                  disabled
                  className="w-full pl-10 pr-4 py-3 text-lg font-bold text-[#0F4C5C] border-2 border-[#DCEBEC] rounded-lg bg-[#E0F2F1] cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Price set by technician
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-3 border-2 border-[#DCEBEC] text-[#0F4C5C] font-bold rounded-lg hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-[#1F7F85] text-white font-bold rounded-lg hover:bg-[#0F4C5C] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">
                    progress_activity
                  </span>
                  Processing...
                </>
              ) : (
                <>
                  Confirm Booking
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
