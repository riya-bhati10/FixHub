import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Common/Navbar';

const BookingSuccessConfirmation = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTrackBooking = () => {
    navigate('/my-booking');
  };

  const handleCancelBooking = () => {
    navigate('/cancel-booking');
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-[#1A2E35] font-['Manrope'] relative overflow-hidden">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {/* Material Icons Link */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Main Content */}
      <div className="relative z-10 pt-0">
        <main className="flex flex-col items-center justify-center px-4 py-8 md:py-12 min-h-[calc(100vh-96px)]">
          <div className="max-w-xl w-full flex flex-col items-center text-center">

            {/* Success Icon */}
            <div className="mb-8 relative">
              <div className="relative w-24 h-24 md:w-32 md:h-32 bg-[#1f7d84] text-white flex items-center justify-center shadow-xl shadow-[#1f7d84]/20">
                <span className="material-symbols-outlined text-5xl md:text-6xl">check_circle</span>
              </div>
            </div>

            {/* Headline */}
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0f191a] leading-tight tracking-tight">
                Booking Confirmed!
              </h1>
            </div>

            {/* Booking Summary Card */}
            <div className="w-full bg-white p-6 md:p-8 mb-10 shadow-xl shadow-[#1f7d84]/10 border border-[#AEE3E6]">
              <div className="flex flex-col gap-6">
                {/* Card Header */}


                {/* Booking Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {/* Service Type */}
                  <div className="space-y-2 bg-[#F7FBFC] p-4 border border-[#DCEBEC]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#1f7d84]">
                        home_repair_service
                      </span>
                      <p className="text-xs font-semibold text-[#1f7d84]/70 uppercase">
                        Service Type
                      </p>
                    </div>
                    <p className="text-[#0f191a] font-bold text-base md:text-lg">
                      AC Maintenance
                    </p>
                  </div>

                  {/* Status */}
                  <div className="space-y-2 bg-[#F7FBFC] p-4 border border-[#DCEBEC]">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500"></div>
                      <p className="text-xs font-semibold text-[#1f7d84]/70 uppercase">
                        Status
                      </p>
                    </div>
                    <p className="text-[#0f191a] font-bold text-base md:text-lg flex items-center gap-2">
                      <span className="text-green-500 font-bold">✓</span>
                      Confirmed
                    </p>
                  </div>

                  {/* Scheduled Date */}
                  <div className="space-y-2 bg-[#F7FBFC] p-4 border border-[#DCEBEC]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#1f7d84]">
                        calendar_today
                      </span>
                      <p className="text-xs font-semibold text-[#1f7d84]/70 uppercase">
                        Scheduled Date
                      </p>
                    </div>
                    <p className="text-[#0f191a] font-bold text-base md:text-lg">
                      October 24, 2023
                    </p>
                  </div>

                  {/* Arrival Window */}
                  <div className="space-y-2 bg-[#F7FBFC] p-4 border border-[#DCEBEC]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#1f7d84]">
                        schedule
                      </span>
                      <p className="text-xs font-semibold text-[#1f7d84]/70 uppercase">
                        Arrival Window
                      </p>
                    </div>
                    <p className="text-[#0f191a] font-bold text-base md:text-lg">
                      10:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>

                {/* Additional Info */}

              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              {/* Track Booking Button */}
              <button
                onClick={handleTrackBooking}
                className="flex-1 min-w-[200px] cursor-pointer items-center justify-center h-14 px-8 bg-[#1f7d84] text-white text-base font-bold shadow-lg shadow-[#1f7d84]/30 hover:bg-[#0F4C5C] transition-colors"
              >
                <span className="flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-xl">
                    location_on
                  </span>
                  Track My Booking
                </span>
              </button>

              {/* Cancel Booking Button */}
              <button
                onClick={handleCancelBooking}
                className="flex-1 min-w-[200px] cursor-pointer items-center justify-center h-14 px-8 bg-red-50 text-red-600 text-base font-bold shadow-lg shadow-red-500/10 border border-red-100 hover:bg-red-100 transition-colors"
              >
                <span className="flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-xl">
                    cancel
                  </span>
                  Cancel Booking
                </span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingSuccessConfirmation;