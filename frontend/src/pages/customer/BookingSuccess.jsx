import React, { useState, useEffect } from 'react';

const BookingSuccessConfirmation = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  const handleTrackBooking = () => {
    // Handle track booking action
    alert('Redirecting to booking tracking...');
  };

  const handleBackToHome = () => {
    // Handle back to home action
    window.location.href = '/dashboard';
  };

  // Animation effects
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Rising icons data - bigger and white
  const risingIcons = [
    { 
      icon: 'check_circle', 
      color: '#FFFFFF', 
      size: 'text-4xl md:text-5xl', 
      delay: '0s', 
      startBottom: '10%', 
      endTop: '-10%',
      right: '5%',
      duration: '15s'
    },
    { 
      icon: 'verified', 
      color: '#FFFFFF', 
      size: 'text-3xl md:text-4xl', 
      delay: '2s', 
      startBottom: '15%', 
      endTop: '-15%',
      right: '8%',
      duration: '18s'
    },
    { 
      icon: 'star', 
      color: '#FFFFFF', 
      size: 'text-4xl md:text-5xl', 
      delay: '4s', 
      startBottom: '5%', 
      endTop: '-20%',
      right: '12%',
      duration: '20s'
    },
    { 
      icon: 'celebration', 
      color: '#FFFFFF', 
      size: 'text-3xl md:text-4xl', 
      delay: '1s', 
      startBottom: '20%', 
      endTop: '-5%',
      right: '3%',
      duration: '16s'
    },
    { 
      icon: 'confirmation_number', 
      color: '#FFFFFF', 
      size: 'text-4xl md:text-5xl', 
      delay: '3s', 
      startBottom: '25%', 
      endTop: '-25%',
      right: '15%',
      duration: '22s'
    },
    { 
      icon: 'done_all', 
      color: '#FFFFFF', 
      size: 'text-3xl md:text-4xl', 
      delay: '5s', 
      startBottom: '8%', 
      endTop: '-30%',
      right: '18%',
      duration: '25s'
    },
    { 
      icon: 'thumb_up', 
      color: '#FFFFFF', 
      size: 'text-4xl md:text-5xl', 
      delay: '1.5s', 
      startBottom: '30%', 
      endTop: '-8%',
      right: '10%',
      duration: '19s'
    },
    { 
      icon: 'rocket_launch', 
      color: '#FFFFFF', 
      size: 'text-3xl md:text-4xl', 
      delay: '3.5s', 
      startBottom: '12%', 
      endTop: '-12%',
      right: '6%',
      duration: '17s'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FBFC] via-white to-[#E8F3F4] text-[#1A2E35] font-['Plus_Jakarta_Sans'] relative overflow-hidden">
      {/* Material Icons Link */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      
      {/* Right Side Animated Rising Icons - Bigger and White */}
      <div className="absolute right-0 top-0 h-full w-1/3 md:w-1/4 pointer-events-none overflow-hidden">
        {risingIcons.map((item, index) => (
          <div
            key={index}
            className="absolute animate-rise opacity-0"
            style={{
              bottom: item.startBottom,
              right: item.right,
              animationDelay: item.delay,
              animationDuration: item.duration,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              animationFillMode: 'forwards'
            }}
          >
            <span
              className={`material-symbols-outlined ${item.size} drop-shadow-lg`}
              style={{ 
                color: item.color,
                textShadow: '0 4px 20px rgba(31, 125, 132, 0.4)',
                filter: 'drop-shadow(0 4px 8px rgba(31, 125, 132, 0.3))'
              }}
            >
              {item.icon}
            </span>
          </div>
        ))}
        
        {/* Background gradient for right side */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#1f7d84]/5 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <main className="flex flex-col items-center justify-center px-4 py-8 md:py-12 min-h-[calc(100vh-80px)]">
          <div className="max-w-2xl w-full flex flex-col items-center text-center">
            
            {/* Success Icon with Animation */}
            <div className="mb-8 relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-[#1f7d84]/20 to-[#AEE3E6]/20 blur-3xl rounded-full ${isAnimating ? 'animate-pulse' : ''}`}></div>
              <div className={`relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#1f7d84] to-[#0F4C5C] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#1f7d84]/40 ${isAnimating ? 'animate-bounce' : ''}`}>
                <span className="material-symbols-outlined text-5xl md:text-6xl">check_circle</span>
              </div>
              
              {/* Animated Checkmark Circle */}
              <div className="absolute inset-0 border-4 border-[#1f7d84] border-t-transparent rounded-full animate-spin-slow opacity-50"></div>
            </div>

            {/* Headline with Fade-in Animation */}
            <div className="mb-4 animate-fade-in-up">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0f191a] leading-tight tracking-tight">
                Booking Confirmed!
              </h1>
            </div>

            {/* Subtitle with Delay Animation */}
            <div className="mb-8 md:mb-10 animate-fade-in-up animation-delay-300">
              <p className="text-[#568c8f] text-lg md:text-xl font-medium">
                A confirmation email has been sent to your registered address.
              </p>
            </div>

            {/* Booking Summary Card with Slide-in Animation */}
            <div className="w-full bg-white rounded-2xl p-6 md:p-8 mb-10 shadow-xl shadow-[#1f7d84]/10 border border-[#AEE3E6] animate-slide-in-up">
              <div className="flex flex-col gap-6">
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-[#1f7d84]/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1f7d84]">
                      receipt_long
                    </span>
                    <span className="text-[#1f7d84] text-sm font-bold uppercase tracking-widest">
                      Booking Summary
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#0f191a] font-bold text-lg md:text-xl">
                      #BK-88293
                    </span>
                    <span className="material-symbols-outlined text-[#1f7d84] animate-pulse">
                      content_copy
                    </span>
                  </div>
                </div>

                {/* Booking Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {/* Service Type */}
                  <div className="space-y-2 bg-gradient-to-r from-[#F7FBFC] to-white p-4 rounded-xl border border-[#DCEBEC] hover:border-[#1f7d84] transition-all hover:scale-[1.02]">
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
                  <div className="space-y-2 bg-gradient-to-r from-[#F7FBFC] to-white p-4 rounded-xl border border-[#DCEBEC] hover:border-[#1f7d84] transition-all hover:scale-[1.02]">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
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
                  <div className="space-y-2 bg-gradient-to-r from-[#F7FBFC] to-white p-4 rounded-xl border border-[#DCEBEC] hover:border-[#1f7d84] transition-all hover:scale-[1.02]">
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
                  <div className="space-y-2 bg-gradient-to-r from-[#F7FBFC] to-white p-4 rounded-xl border border-[#DCEBEC] hover:border-[#1f7d84] transition-all hover:scale-[1.02]">
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
                <div className="mt-4 p-4 bg-gradient-to-r from-[#F7FBFC] to-[#DCEBEC] rounded-xl border border-[#AEE3E6]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#1f7d84] animate-bounce">
                      notifications_active
                    </span>
                    <p className="text-sm text-[#568c8f]">
                      <span className="font-bold text-[#1A2E35]">Reminder:</span> You'll receive a notification 30 minutes before the technician arrives.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons with Hover Animations */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate-fade-in-up animation-delay-500">
              {/* Track Booking Button */}
              <button 
                onClick={handleTrackBooking}
                className="group flex-1 min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-gradient-to-r from-[#1f7d84] to-[#0F4C5C] text-white text-base font-bold transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-[#1f7d84]/30 hover:shadow-xl hover:shadow-[#1f7d84]/40"
              >
                <span className="flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-xl group-hover:animate-pulse">
                    location_on
                  </span>
                  Track My Booking
                  <span className="material-symbols-outlined text-lg opacity-0 group-hover:opacity-100 transition-opacity animate-bounce">
                    arrow_forward
                  </span>
                </span>
              </button>

              {/* Back to Home Button */}
              <button 
                onClick={handleBackToHome}
                className="group flex-1 min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-gradient-to-r from-[#AEE3E6] to-[#DCEBEC] text-[#1f7d84] text-base font-bold transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-[#1f7d84]/10 hover:shadow-xl hover:shadow-[#1f7d84]/20 border border-[#1f7d84]/20"
              >
                <span className="flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-xl group-hover:animate-bounce">
                    home
                  </span>
                  Back to Home
                  <span className="material-symbols-outlined text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_right_alt
                  </span>
                </span>
              </button>
            </div>

            {/* Support Info with Icon */}
            <div className="mt-10 md:mt-12 text-center animate-fade-in-up animation-delay-700">
              <div className="flex items-center justify-center gap-3 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-[#AEE3E6]">
                <span className="material-symbols-outlined text-[#1f7d84] animate-pulse">
                  support_agent
                </span>
                <p className="text-sm md:text-base text-[#568c8f]">
                  Need help?{' '}
                  <a 
                    href="#" 
                    className="text-[#1f7d84] font-bold hover:underline hover:text-[#0F4C5C] transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Contact support functionality');
                    }}
                  >
                    Contact Support
                  </a>{' '}
                  or call <span className="font-bold text-[#1A2E35]">1-800-PRO-SERVICE</span>
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 md:px-10 text-center border-t border-[#1f7d84]/10 bg-white/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[#1f7d84] text-sm">
              copyright
            </span>
            <p className="text-xs text-[#568c8f]">
              2023 ServicePro Solutions Inc. All rights reserved.
            </p>
            <span className="hidden md:inline text-[#568c8f]">•</span>
            <p className="text-xs text-[#568c8f]">
              <span className="material-symbols-outlined text-xs align-middle">
                verified_user
              </span>
              Secure & Encrypted
            </p>
          </div>
        </footer>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        /* Rising Animation - Bottom to Top */
        @keyframes rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
            transform: translateY(-25vh) scale(1.1);
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) scale(1.2);
            opacity: 0;
          }
        }
        
        /* Bubble Effect Animation */
        @keyframes bubble {
          0% {
            transform: scale(0.8) translateY(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: scale(1) translateY(-10px);
          }
          40% {
            transform: scale(1.05) translateY(-20px);
          }
          60% {
            transform: scale(1.1) translateY(-30px);
          }
          80% {
            transform: scale(1.05) translateY(-40px);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) translateY(-50px);
            opacity: 0;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-rise {
          animation: rise linear infinite;
        }
        
        .animate-bubble {
          animation: bubble ease-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-in-up {
          animation: slideInUp 0.8s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        
        .animation-delay-700 {
          animation-delay: 700ms;
        }
        
        /* Glow Effect for White Icons */
        .material-symbols-outlined {
          filter: drop-shadow(0 2px 4px rgba(255, 255, 255, 0.3));
        }
      `}</style>
    </div>
  );
};

export default BookingSuccessConfirmation;