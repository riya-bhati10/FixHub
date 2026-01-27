import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.png';
import Navbar from '../../components/common/Navbar';

const MyBooking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [animatingBookingId, setAnimatingBookingId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Tab items with icons
  const tabItems = [
    { id: 'all', label: 'All Booking', icon: 'list_alt' },
    { id: 'active', label: 'Active', icon: 'home_repair_service' },
    { id: 'completed', label: 'Completed', icon: 'task_alt' },
    { id: 'cancelled', label: 'Cancelled', icon: 'cancel' }
  ];

  // Stat cards data
  const statCards = [
    {
      icon: 'build',
      title: 'Total Repairs',
      value: '1,284',
      iconColor: 'text-[#1F7F85]',
      bgColor: 'bg-[#DCEBEC]',
      borderColor: 'border-[#1F7F85]/10',
      textColor: 'text-[#0F4C5C]',
      titleColor: 'text-[#1F7F85]/70'
    },
    {
      icon: 'home_repair_service',
      title: 'Active Repairs',
      value: '42',
      iconColor: 'text-[#1F7F85]',
      bgColor: 'bg-[#DCEBEC]',
      borderColor: 'border-[#1F7F85]/10',
      textColor: 'text-[#0F4C5C]',
      titleColor: 'text-[#1F7F85]/70'
    },
    {
      icon: 'pending_actions',
      title: 'Pending Repairs',
      value: '8',
      iconColor: 'text-orange-500',
      bgColor: 'bg-[#DCEBEC]',
      borderColor: 'border-[#1F7F85]/10',
      textColor: 'text-[#0F4C5C]',
      titleColor: 'text-[#1F7F85]/70'
    },
    {
      icon: 'payments',
      title: "Total Spent",
      value: '$2,450.00',
      iconColor: 'text-teal-100',
      bgColor: 'bg-[#1F7F85]',
      borderColor: '',
      textColor: 'text-white',
      titleColor: 'text-teal-100/80',
      isPrimary: true
    }
  ];

  // Booking cards data with icons
  const bookingCards = [
    {
      id: 'BK-9284',
      date: 'Oct 24, 2023',
      serviceName: 'iPhone Screen Repair',
      technician: 'Alex Chen',
      status: 'active',
      statusText: 'Active',
      statusColor: 'bg-blue-500',
      statusIcon: 'home_repair_service',
      serviceIcon: 'smartphone',
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      location: '123 Tech Avenue, San Francisco, CA',
      serviceCharge: '$120.00'
    },
    {
      id: 'BK-9285',
      date: 'Oct 25, 2023',
      serviceName: 'Laptop Keyboard Replacement',
      technician: null,
      status: 'active',
      statusText: 'Active',
      statusColor: 'bg-blue-500',
      statusIcon: 'home_repair_service',
      serviceIcon: 'laptop',
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      location: '456 Innovation Dr, Palo Alto, CA',
      serviceCharge: '$85.00'
    },
    {
      id: 'BK-9286',
      date: 'Oct 23, 2023',
      serviceName: 'TV LED Panel Repair',
      technician: 'Sarah Johnson',
      status: 'completed',
      statusText: 'Completed',
      statusColor: 'bg-emerald-500',
      statusIcon: 'task_alt',
      serviceIcon: 'tv',
      imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
      location: '789 Screen Blvd, San Jose, CA',
      serviceCharge: '$200.00'
    },
    {
      id: 'BK-9287',
      date: 'Oct 26, 2023',
      serviceName: 'PlayStation Controller Fix',
      technician: 'Marcus Rodriguez',
      status: 'completed',
      statusText: 'Completed',
      statusColor: 'bg-emerald-500',
      statusIcon: 'task_alt',
      serviceIcon: 'sports_esports',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      location: '321 Gamer Lane, Los Angeles, CA',
      serviceCharge: '$45.00'
    },
    {
      id: 'BK-9288',
      date: 'Oct 22, 2023',
      serviceName: 'MacBook Battery Replacement',
      technician: null,
      status: 'cancelled',
      statusText: 'Cancelled',
      statusColor: 'bg-red-500',
      statusIcon: 'cancel',
      serviceIcon: 'laptop_mac',
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      location: '555 Apple Way, Cupertino, CA',
      serviceCharge: '$150.00'
    }
  ];

  // Pagination buttons
  const paginationButtons = [1, 2, 3];

  // Filtered bookings based on search
  const filteredBookings = bookingCards.filter(booking =>
    booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status mapping for tabs
  const statusMap = {
    'all': 'all',
    'active': 'active',
    'completed': 'completed',
    'cancelled': 'cancelled'
  };

  // Further filter by active tab
  const tabFilteredBookings = filteredBookings.filter(booking => {
    if (activeTab === 'all') return true;
    return booking.status === statusMap[activeTab];
  });

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-900 overflow-x-hidden">
      {/* Tailwind Config and Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
          
          body {
            font-family: 'Manrope', sans-serif;
          }
          
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          @keyframes wave {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          .animate-wave {
            animation: wave 0.5s ease-in-out;
          }
        `}
      </style>

      <div className="flex flex-col min-h-screen">

        {/* Navbar */}
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* Sub-header */}
        <div className="bg-white border-b border-slate-200 sticky top-20 z-30">
          <div className="max-w-[1400px] mx-auto px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Repair Bookings Overview</h2>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-80">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                <input
                  className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85]"
                  placeholder="Search repairs..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#1F7F85] bg-[#DCEBEC] border border-[#1F7F85]/20 hover:bg-[#1F7F85] hover:text-white transition-all whitespace-nowrap">
                <span className="material-symbols-outlined text-lg">search</span>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto p-8 space-y-8">
          {/* MyBooking Heading */}
          <h1 className="text-2xl font-bold text-slate-900">My Repair Bookings</h1>
          {/* Stats Cards */}


          {/* Tabs with Icons */}
          <div className="bg-white border border-slate-200 overflow-hidden">
            <div className="px-8 flex items-center gap-8 border-b border-slate-100 overflow-x-auto scrollbar-hide">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id
                      ? 'text-[#1F7F85] border-b-2 border-[#1F7F85]'
                      : 'text-slate-500 hover:text-[#1F7F85] border-b-2 border-transparent hover:border-[#1F7F85]/30'
                    }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Booking Rows */}
          {tabFilteredBookings.length > 0 ? (
            <div className="bg-white border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Booking ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Technician</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {tabFilteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-slate-900">{booking.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#1F7F85]">{booking.serviceIcon}</span>
                            <div>
                              <div className="text-sm font-bold text-slate-900">{booking.serviceName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 flex items-center justify-center border ${booking.technician ? 'bg-[#DCEBEC] text-[#1F7F85] border-[#1F7F85]/20' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                              <span className="material-symbols-outlined text-sm">
                                {booking.technician ? 'engineering' : 'person_off'}
                              </span>
                            </div>
                            <div>
                              <div className={`text-sm font-medium ${booking.technician ? 'text-slate-700' : 'text-slate-400 italic'}`}>
                                {booking.technician || 'Unassigned'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{booking.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-bold ${booking.statusColor} text-white`}>
                            <span className="material-symbols-outlined text-xs">{booking.statusIcon}</span>
                            {booking.statusText}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {booking.status === 'completed' && (
                              <button
                                className="px-4 py-2 bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors flex items-center gap-2 text-sm"
                                onClick={() => navigate('/review')}
                              >
                                <span className="material-symbols-outlined text-sm">rate_review</span>
                                Review
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-slate-300">search_off</span>
              <p className="text-slate-500 mt-4 text-lg">No repairs found matching your search.</p>
              <p className="text-slate-400 mt-2">Try adjusting your search terms.</p>
            </div>
          )}

          {/* Show All Button */}
          <div className="flex justify-center pt-8">
            <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-[#1F7F85] hover:border-[#1F7F85] transition-all shadow-sm flex items-center gap-2">
              Show All
              <span className="material-symbols-outlined text-lg">expand_more</span>
            </button>
          </div>
        </main>

        {/* Modal */}
        {showModal && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F4C5C]/40 backdrop-blur-sm">
            <div className="bg-white shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col animate-wave">
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Booking Details</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">View complete information about your service</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-[#1F7F85] hover:border-[#1F7F85] transition-all"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 space-y-6">
                {/* Service Image & Status */}
                <div className="relative h-48 overflow-hidden group shadow-sm">
                  <img
                    src={selectedBooking.imageUrl}
                    alt="Service"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold shadow-sm ${selectedBooking.statusColor} text-white backdrop-blur-md bg-opacity-90`}>
                        <span className="material-symbols-outlined text-[16px]">{selectedBooking.statusIcon}</span>
                        {selectedBooking.statusText}
                      </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                    <h4 className="text-white font-bold text-lg flex items-center gap-2">
                       <span className="material-symbols-outlined text-[#AEE3E6]">{selectedBooking.serviceIcon}</span>
                       {selectedBooking.serviceName}
                    </h4>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                   {/* Booking ID */}
                   <div className="p-4 bg-slate-50 border border-slate-100 hover:border-[#1F7F85]/20 transition-colors">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">tag</span>
                        Booking ID
                      </p>
                      <p className="text-sm font-bold text-slate-900">{selectedBooking.id}</p>
                   </div>
                   {/* Date */}
                   <div className="p-4 bg-slate-50 border border-slate-100 hover:border-[#1F7F85]/20 transition-colors">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">event</span>
                        Date
                      </p>
                      <p className="text-sm font-bold text-slate-900">{selectedBooking.date}</p>
                   </div>
                </div>

                {/* Technician */}
                <div className="p-4 border border-slate-100 flex items-center gap-4 hover:border-[#1F7F85]/30 transition-colors bg-white shadow-sm">
                    <div className={`w-12 h-12 flex items-center justify-center border-2 ${selectedBooking.technician ? 'bg-[#DCEBEC] text-[#1F7F85] border-white shadow-md' : 'bg-slate-100 text-slate-400 border-slate-50'}`}>
                      <span className="material-symbols-outlined text-xl">
                        {selectedBooking.technician ? 'engineering' : 'person_off'}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Technician</p>
                      <p className={`text-sm font-bold ${selectedBooking.technician ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                        {selectedBooking.technician || 'Unassigned'}
                      </p>
                    </div>
                </div>

                {/* Location & Cost Details */}
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#1F7F85]/10 flex items-center justify-center text-[#1F7F85] shrink-0">
                            <span className="material-symbols-outlined text-lg">location_on</span>
                        </div>
                        <div>
                            <h5 className="text-sm font-bold text-slate-900">Service Location</h5>
                            <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">
                                {selectedBooking.location || "123, Tech Park, Silicon Valley, CA 94043"}
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-dashed border-slate-200 pt-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500 font-medium flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400 text-lg">payments</span>
                                Service Charge
                            </span>
                            <span className="text-xl font-black text-[#1F7F85]">{selectedBooking.serviceCharge || "$120.00"}</span>
                        </div>
                    </div>
                </div>

              </div>
              
              {/* Footer Actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                 <button 
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 font-bold text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-800 border border-transparent hover:border-slate-200 transition-all"
                 >
                    Close
                 </button>
                 {selectedBooking.status === 'completed' ? (
                    <button 
                        onClick={() => navigate('/review')}
                        className="flex-1 py-3 font-bold text-white bg-[#1F7F85] hover:bg-[#0F4C5C] shadow-lg shadow-[#1F7F85]/20 transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">rate_review</span>
                        Write Review
                    </button>
                 ) : (
                    <button className="flex-1 py-3 font-bold text-white bg-[#1F7F85] hover:bg-[#0F4C5C] shadow-lg shadow-[#1F7F85]/20 transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-lg">support_agent</span>
                        Contact Support
                    </button>
                 )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-auto p-8 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-xs font-medium">© 2023 ServicePortal Admin Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default MyBooking;