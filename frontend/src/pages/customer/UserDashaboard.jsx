import React, { useState } from 'react';
import logo from '../../../public/logo.png';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [animatingBookingId, setAnimatingBookingId] = useState(null);

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'booking', label: 'My Booking', active: true },
    { id: 'new', label: 'Book Service' },
    { id: 'profile', label: 'Profile' }
  ];

  // Tab items with icons
  const tabItems = [
    { id: 'all', label: 'All Bookings', icon: 'list_alt' },
    { id: 'pending', label: 'Pending', icon: 'pending_actions' },
    { id: 'accepted', label: 'Accepted', icon: 'check_circle' },
    { id: 'ongoing', label: 'Ongoing', icon: 'home_repair_service' },
    { id: 'completed', label: 'Completed', icon: 'task_alt' }
  ];

  // Stat cards data
  const statCards = [
    {
      icon: 'book_online',
      title: 'Total Service',
      value: '1,284',
      iconColor: 'text-[#1F7F85]',
      bgColor: 'bg-[#DCEBEC]',
      borderColor: 'border-[#1F7F85]/10',
      textColor: 'text-[#0F4C5C]',
      titleColor: 'text-[#1F7F85]/70'
    },
    {
      icon: 'home_repair_service',
      title: 'Ongoing Services',
      value: '42',
      iconColor: 'text-[#1F7F85]',
      bgColor: 'bg-[#DCEBEC]',
      borderColor: 'border-[#1F7F85]/10',
      textColor: 'text-[#0F4C5C]',
      titleColor: 'text-[#1F7F85]/70'
    },
    {
      icon: 'pending_actions',
      title: 'Pending Services',
      value: '8',
      iconColor: 'text-orange-500',
      bgColor: 'bg-[#DCEBEC]',
      borderColor: 'border-[#1F7F85]/10',
      textColor: 'text-[#0F4C5C]',
      titleColor: 'text-[#1F7F85]/70'
    },
    {
      icon: 'payments',
      title: "Total Invesment",
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
      serviceName: 'Central AC Repair',
      technician: 'David Smith',
      status: 'ongoing',
      statusText: 'Ongoing',
      statusColor: 'bg-blue-500',
      statusIcon: 'home_repair_service',
      serviceIcon: 'ac_unit',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC73LYjJHG6QGMzBZ0T6BHaXM1jt-z-IUz-3ojbuE5XgytTVZX-JlXQcqFqcucKvX7ww3i2_I54rR0n7AP5OaR1HKOkS8MKy0t4wFW9Jt0o8KwikeKxfWO60BYK8W7988kxnv2CVfy18Y1HoFS1ic9ySx_9gkB9iKD1O2gUAPgz66zeSK5w2r0jHHECB5BQYZDqfVNK0xlVYTiycPae_B_ASKZNq9u8t3UNPuXgtslXMysIugmH9PCxUM7hTKIlXBtYsMta04oxrs4'
    },
    {
      id: 'BK-9285',
      date: 'Oct 25, 2023',
      serviceName: 'Kitchen Plumbing',
      technician: null,
      status: 'pending',
      statusText: 'Pending',
      statusColor: 'bg-amber-500',
      statusIcon: 'pending_actions',
      serviceIcon: 'plumbing',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpznWPC2cwO3H92IDa3H9eE8Molmg1OxInpgl05g38FYA0slFwdDQ3sKkLLIi8y86rd9KfeKDsIU8JeeLQm0GJ130SqXIAdf9-i-wzFh0ShL8I8VsbWAho1XGYIvtng1khjheWgyLlLy7lhmudkja9aTniqR_jNVlepKbusk9VO450WzY_VdojN6ZGcrNvXB_bb8Bh7bk32iWHgkNGGAmMhsF21Kw62krd7SeXgDZ0qlXyjwicA-6TnN1oVsgcMKZJ70cwa_9ctxw'
    },
    {
      id: 'BK-9286',
      date: 'Oct 23, 2023',
      serviceName: 'Deep House Cleaning',
      technician: 'Sarah Lee',
      status: 'completed',
      statusText: 'Completed',
      statusColor: 'bg-emerald-500',
      statusIcon: 'task_alt',
      serviceIcon: 'cleaning_services',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWDR0Ogo2ZEcjLeQw3Rw0ZjGNFWOWElwDxW_o7VWTfb_yKSn9N06MGavSUweUuz4p_Lx2RbOFMPdbJDrhZlF47EaX0HJtajAjY3nSQehpVG_5ZfR9uV20fmyNeiBikVwq3Bgbf0IiBqC1gfJscZAvPgeD5--IGDLZwQ8mhJMSe-qxKK093-XfY8gxvp5OYQ0gpM4Qm4wFO6U2JkVH1V2d7OD8B2sx-o0jVq6kM_EJKdgHgcAfiYxRvX7AuZ-5-lBZ6-gPIkD6SFtA'
    },
    {
      id: 'BK-9287',
      date: 'Oct 26, 2023',
      serviceName: 'Electrical Wiring',
      technician: 'Mike Johnson',
      status: 'accepted',
      statusText: 'Accepted',
      statusColor: 'bg-green-500',
      statusIcon: 'check_circle',
      serviceIcon: 'electrical_services',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC73LYjJHG6QGMzBZ0T6BHaXM1jt-z-IUz-3ojbuE5XgytTVZX-JlXQcqFqcucKvX7ww3i2_I54rR0n7AP5OaR1HKOkS8MKy0t4wFW9Jt0o8KwikeKxfWO60BYK8W7988kxnv2CVfy18Y1HoFS1ic9ySx_9gkB9iKD1O2gUAPgz66zeSK5w2r0jHHECB5BQYZDqfVNK0xlVYTiycPae_B_ASKZNq9u8t3UNPuXgtslXMysIugmH9PCxUM7hTKIlXBtYsMta04oxrs4'
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
    'pending': 'pending',
    'accepted': 'accepted',
    'ongoing': 'ongoing',
    'completed': 'completed'
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


        {/* Sub-header */}
        <div className="bg-white border-b border-slate-200 sticky top-20 z-30">
          <div className="max-w-[1400px] mx-auto px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Bookings Overview</h2>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-80">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                <input
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85]"
                  placeholder="Search bookings..."
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
          <h1 className="text-2xl font-bold text-slate-900">MyBooking</h1>
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

          {/* Booking Cards with Icons */}
          {tabFilteredBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {tabFilteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-[400px] h-auto min-h-[400px] flex flex-col ${animatingBookingId === booking.id ? 'animate-wave' : ''}`}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      alt="Service Image"
                      className="w-full h-full object-cover"
                      src={booking.imageUrl}
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 ${booking.statusColor} text-white text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1`}>
                      <span className="material-symbols-outlined text-xs">
                        {booking.statusIcon}
                      </span>
                      {booking.statusText}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="space-y-4 flex-1">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">
                            {booking.serviceIcon}
                          </span>
                          Service Name
                        </p>
                        <p className="text-lg font-bold text-slate-800 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#1F7F85]">
                            {booking.serviceIcon}
                          </span>
                          {booking.serviceName}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">
                            engineering
                          </span>
                          Technician
                        </p>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${booking.technician ? 'bg-[#DCEBEC] text-[#1F7F85] border-[#1F7F85]/20' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                            <span className="material-symbols-outlined text-lg">
                              {booking.technician ? 'engineering' : 'person_off'}
                            </span>
                          </div>
                          <div>
                            <span className={`text-sm font-bold ${booking.technician ? 'text-slate-700' : 'text-slate-400 italic'}`}>
                              {booking.technician || 'Unassigned'}
                            </span>
                            {booking.technician && (
                              <p className="text-[10px] text-slate-500">Available now</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      className="w-full py-3 mt-6 bg-[#1F7F85] text-white font-bold rounded-2xl hover:bg-[#0F4C5C] transition-colors shadow-md shadow-[#1F7F85]/20 flex items-center justify-center gap-2"
                      onClick={() => {
                        setAnimatingBookingId(booking.id);
                        setTimeout(() => {
                          setSelectedBooking(booking);
                          setShowModal(true);
                          setAnimatingBookingId(null);
                        }, 500);
                      }}
                    >
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-slate-300">search_off</span>
              <p className="text-slate-500 mt-4 text-lg">No bookings found matching your search.</p>
              <p className="text-slate-400 mt-2">Try adjusting your search terms.</p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between pt-8">
            <p className="text-xs text-slate-500 font-medium tracking-tight flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                list
              </span>
              Showing 3 of 1,284 bookings
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
                <h3 className="text-xl font-bold text-slate-900">Booking Details</h3>
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

export default CustomerDashboard;