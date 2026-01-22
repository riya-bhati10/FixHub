import React, { useState } from 'react';
import logo from '../../../public/logo.png';
import Navbar from '../../components/common/Navbar';

const MyBooking = () => {
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
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop'
    },
    {
      id: 'BK-9285',
      date: 'Oct 25, 2023',
      serviceName: 'Laptop Keyboard Replacement',
      technician: null,
      status: 'pending',
      statusText: 'Pending',
      statusColor: 'bg-amber-500',
      statusIcon: 'pending_actions',
      serviceIcon: 'laptop',
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop'
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
      imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop'
    },
    {
      id: 'BK-9287',
      date: 'Oct 26, 2023',
      serviceName: 'PlayStation Controller Fix',
      technician: 'Marcus Rodriguez',
      status: 'accepted',
      statusText: 'Accepted',
      statusColor: 'bg-green-500',
      statusIcon: 'check_circle',
      serviceIcon: 'sports_esports',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop'
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
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop'
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85]"
                  placeholder="Search repairs..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#1F7F85] bg-[#DCEBEC] border border-[#1F7F85]/20 rounded-xl hover:bg-[#1F7F85] hover:text-white transition-all whitespace-nowrap">
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
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
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
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
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
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${booking.technician ? 'bg-[#DCEBEC] text-[#1F7F85] border-[#1F7F85]/20' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
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
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${booking.statusColor} text-white`}>
                            <span className="material-symbols-outlined text-xs">{booking.statusIcon}</span>
                            {booking.statusText}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="px-4 py-2 bg-[#1F7F85] text-white font-bold rounded-lg hover:bg-[#0F4C5C] transition-colors flex items-center gap-2 text-sm"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowModal(true);
                            }}
                          >
                            <span className="material-symbols-outlined text-sm">visibility</span>
                            View
                          </button>
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

          {/* Pagination */}
          <div className="flex items-center justify-between pt-8">
            <p className="text-xs text-slate-500 font-medium tracking-tight flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                list
              </span>
              Showing 3 of 1,284 repairs
            </p>
            <div className="flex gap-2">
              <button
                className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors flex items-center gap-1"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
                Prev
              </button>

              {paginationButtons.map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-9 h-9 flex items-center justify-center text-xs font-bold rounded-lg transition-colors ${currentPage === num
                      ? 'bg-[#1F7F85] text-white shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50'
                    }`}
                >
                  {num}
                </button>
              ))}

              <button
                className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors flex items-center gap-1"
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </main>

        {/* Modal */}
        {showModal && selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">Repair Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <img
                src={selectedBooking.imageUrl}
                alt="Service Image"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1F7F85] mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">credit_card</span>
                      Booking ID
                    </p>
                    <p className="text-xl font-bold text-[#0F4C5C]">{selectedBooking.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1 justify-end">
                      <span className="material-symbols-outlined text-xs">calendar_today</span>
                      Date
                    </p>
                    <p className="text-sm font-bold text-slate-600">{selectedBooking.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">{selectedBooking.serviceIcon}</span>
                    Service Name
                  </p>
                  <p className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1F7F85]">{selectedBooking.serviceIcon}</span>
                    {selectedBooking.serviceName}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">engineering</span>
                    Technician
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${selectedBooking.technician ? 'bg-[#DCEBEC] text-[#1F7F85] border-[#1F7F85]/20' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                      <span className="material-symbols-outlined text-lg">
                        {selectedBooking.technician ? 'engineering' : 'person_off'}
                      </span>
                    </div>
                    <div>
                      <span className={`text-sm font-bold ${selectedBooking.technician ? 'text-slate-700' : 'text-slate-400 italic'}`}>
                        {selectedBooking.technician || 'Unassigned'}
                      </span>
                      {selectedBooking.technician && (
                        <p className="text-[10px] text-slate-500">Available now</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-sm">schedule</span>
                      <p className="text-xs text-slate-600">Estimated: 3 hours</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-sm">payments</span>
                      <p className="text-xs font-bold text-slate-700">$249.99</p>
                    </div>
                  </div>
                </div>
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