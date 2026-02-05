import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../Common/Navbar';

const BookingSuccessConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.booking;

  const customerNavLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/book-service', label: 'Book Service' },
    { path: '/my-booking', label: 'My Bookings' },
  ];

  const handleTrackBooking = () => {
    navigate('/my-booking');
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] font-['Manrope']">
      <Navbar 
        userType="customer"
        navLinks={customerNavLinks}
        showProfile={true}
        showNotifications={true}
      />

      <main className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 pt-20 sm:pt-24">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#1F7F85] text-white flex items-center justify-center rounded-full shadow-xl shadow-[#1F7F85]/20">
              <span className="material-symbols-outlined text-3xl sm:text-4xl lg:text-5xl">check_circle</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F4C5C] mb-2 sm:mb-3">
            Booking Confirmed!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8">
            Your service has been successfully booked
          </p>

          {/* Booking Summary Card */}
          <div className="w-full bg-white p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-lg border border-slate-200 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Service Type */}
              <div className="bg-[#F7FBFC] p-3 sm:p-4 border border-[#DCEBEC] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#1F7F85] text-lg sm:text-xl">home_repair_service</span>
                  <p className="text-[10px] sm:text-xs font-bold text-[#1F7F85]/70 uppercase">Service</p>
                </div>
                <p className="text-sm sm:text-base lg:text-lg font-bold text-[#0F4C5C]">
                  {bookingData?.service?.name || 'Service Booked'}
                </p>
              </div>

              {/* Status */}
              <div className="bg-[#F7FBFC] p-3 sm:p-4 border border-[#DCEBEC] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  <p className="text-[10px] sm:text-xs font-bold text-[#1F7F85]/70 uppercase">Status</p>
                </div>
                <p className="text-sm sm:text-base lg:text-lg font-bold text-[#0F4C5C] flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Confirmed
                </p>
              </div>

              {/* Scheduled Date */}
              <div className="bg-[#F7FBFC] p-3 sm:p-4 border border-[#DCEBEC] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#1F7F85] text-lg sm:text-xl">calendar_today</span>
                  <p className="text-[10px] sm:text-xs font-bold text-[#1F7F85]/70 uppercase">Date</p>
                </div>
                <p className="text-sm sm:text-base lg:text-lg font-bold text-[#0F4C5C]">
                  {bookingData?.serviceDate ? new Date(bookingData.serviceDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'To be confirmed'}
                </p>
              </div>

              {/* Time Slot */}
              <div className="bg-[#F7FBFC] p-3 sm:p-4 border border-[#DCEBEC] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#1F7F85] text-lg sm:text-xl">schedule</span>
                  <p className="text-[10px] sm:text-xs font-bold text-[#1F7F85]/70 uppercase">Time</p>
                </div>
                <p className="text-sm sm:text-base lg:text-lg font-bold text-[#0F4C5C]">
                  {bookingData?.timeSlot || 'To be confirmed'}
                </p>
              </div>
            </div>

            {bookingData?.bookingId && (
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200">
                <p className="text-xs sm:text-sm text-slate-500">Booking ID</p>
                <p className="text-sm sm:text-base font-bold text-[#1F7F85] mt-1">{bookingData.bookingId}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md">
            <button
              onClick={handleTrackBooking}
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-[#1F7F85] text-white text-sm sm:text-base font-bold rounded-lg shadow-lg hover:bg-[#0F4C5C] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">location_on</span>
              <span>View My Bookings</span>
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-white text-slate-600 text-sm sm:text-base font-bold rounded-lg border-2 border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">home</span>
              <span>Go to Dashboard</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingSuccessConfirmation;