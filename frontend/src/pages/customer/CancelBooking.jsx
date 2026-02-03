import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../../Common/Navbar';
import { HandleMessageUIError, HandleMessageUISuccess } from '../../utils/toastConfig';

const CancelBooking = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const customerNavLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/book-service', label: 'Book Service' },
    { path: '/my-booking', label: 'My Bookings' },
  ];

  const handleConfirmCancel = () => {
    // Logic to cancel booking
    toast.success('Booking cancelled successfully', HandleMessageUISuccess());
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-[#1A2E35] font-['Manrope']">
      <Navbar 
        userType="customer"
        navLinks={customerNavLinks}
        showProfile={true}
        showNotifications={true}
      />
      
      <main className="max-w-xl mx-auto px-4 py-8 pt-24 flex flex-col justify-center min-h-[80vh]">
        <div className="bg-white p-8 md:p-12 border border-[#AEE3E6] shadow-xl shadow-[#1F7F85]/5 w-full relative overflow-hidden">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>

            <div className="text-center mb-10">
                <div className="relative w-32 h-32 mx-auto mb-8">
                    <div className="absolute inset-0 bg-red-50 animate-pulse"></div>
                    <div className="relative w-full h-full bg-white text-red-500 flex items-center justify-center border-4 border-red-50 shadow-sm">
                        <span className="material-symbols-outlined text-7xl">cancel</span>
                    </div>
                </div>
                
                <h1 className="text-3xl font-extrabold text-[#0F4C5C] mb-4">Cancel Booking?</h1>
                <p className="text-slate-500 text-lg">
                  Are you sure you want to cancel?
                </p>
                <p className="text-red-500 text-sm font-bold mt-2 uppercase tracking-wider">
                  This action cannot be undone
                </p>
            </div>
            
            <div className="flex flex-col gap-4">
                    <button 
                        type="button"
                        onClick={handleConfirmCancel}
                        className="w-full py-4 font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                        Yes, Cancel Booking
                    </button>

                    <button 
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-4 font-bold text-slate-500 hover:text-[#1F7F85] hover:bg-slate-50 transition-all uppercase tracking-wider text-sm"
                    >
                        No, Keep Booking
                    </button>
            </div>
        </div>
      </main>
    </div>
  );
};

export default CancelBooking;