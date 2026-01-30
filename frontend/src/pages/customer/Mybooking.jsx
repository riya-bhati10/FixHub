import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Common/Navbar';
import bookingService from '../../Services/bookingService';
import Loader from '../../Common/Loader';

const MyBooking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const customerNavLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/book-service', label: 'Book Service' },
    { path: '/my-booking', label: 'My Bookings' },
  ];

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getCustomerBookings();
      setBookings(response.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabItems = [
    { id: 'all', label: 'All Bookings', icon: 'list_alt', count: bookings.length },
    { id: 'active', label: 'Active', icon: 'home_repair_service', count: bookings.filter(b => b.status === 'accepted' || b.status === 'in_progress').length },
    { id: 'completed', label: 'Completed', icon: 'task_alt', count: bookings.filter(b => b.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', icon: 'cancel', count: bookings.filter(b => b.status === 'cancelled').length }
  ];

  const getStatusInfo = (status) => {
    const statusMap = {
      'pending': { text: 'Pending', color: 'bg-amber-500', textColor: 'text-amber-700', bgLight: 'bg-amber-50', icon: 'schedule' },
      'accepted': { text: 'Accepted', color: 'bg-blue-500', textColor: 'text-blue-700', bgLight: 'bg-blue-50', icon: 'check_circle' },
      'in_progress': { text: 'In Progress', color: 'bg-[#1F7F85]', textColor: 'text-[#1F7F85]', bgLight: 'bg-[#E0F2F1]', icon: 'settings' },
      'completed': { text: 'Completed', color: 'bg-emerald-500', textColor: 'text-emerald-700', bgLight: 'bg-emerald-50', icon: 'check_circle' },
      'cancelled': { text: 'Cancelled', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50', icon: 'cancel' }
    };
    return statusMap[status] || { text: status, color: 'bg-slate-500', textColor: 'text-slate-700', bgLight: 'bg-slate-50', icon: 'info' };
  };

  const getServiceIcon = (serviceName) => {
    const name = serviceName?.toLowerCase() || '';
    if (name.includes('phone') || name.includes('smartphone')) return 'smartphone';
    if (name.includes('laptop')) return 'laptop';
    if (name.includes('tv')) return 'tv';
    if (name.includes('camera')) return 'photo_camera';
    if (name.includes('refrigerator') || name.includes('fridge')) return 'kitchen';
    if (name.includes('washing')) return 'local_laundry_service';
    return 'build';
  };

  const tabFilteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'active' && (booking.status === 'accepted' || booking.status === 'in_progress')) ||
      booking.status === activeTab;
    
    const matchesSearch = !searchTerm || 
      booking.bookingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-800 font-['Manrope']">
      <Navbar 
        userType="customer"
        navLinks={customerNavLinks}
        showProfile={true}
        showNotifications={true}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] shadow-xl shadow-[#1F7F85]/20 p-8 md:p-10 mb-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 -mr-16 -mt-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 -ml-10 -mb-10 blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                My Bookings
              </h1>
              <p className="text-teal-100 text-lg font-medium">
                Track and manage all your service requests
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input
                className="w-full bg-white/95 backdrop-blur-sm border-0 pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-white/50 shadow-lg"
                placeholder="Search by ID or service..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow-sm border border-slate-200 mb-8 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[140px] py-5 px-6 text-sm font-bold transition-all relative group ${
                  activeTab === tab.id
                    ? 'text-[#1F7F85] bg-[#F7FBFC]'
                    : 'text-slate-500 hover:text-[#1F7F85] hover:bg-slate-50'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-2xl">{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-[#1F7F85] text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                </div>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C]"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Grid */}
        {tabFilteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tabFilteredBookings.map((booking) => {
              const statusInfo = getStatusInfo(booking.status);
              const serviceIcon = getServiceIcon(booking.service?.name);
              
              return (
                <div 
                  key={booking.bookingId} 
                  className="bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-[#1F7F85]/10 transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setShowModal(true);
                  }}
                >
                  {/* Card Header */}
                  <div className="relative h-28 bg-gradient-to-br from-[#1F7F85] to-[#0F4C5C] p-6">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -mr-8 -mt-8 blur-2xl"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
                          <span className="material-symbols-outlined text-white text-2xl">{serviceIcon}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{booking.service?.name || 'N/A'}</h3>
                          <p className="text-teal-100 text-xs font-medium">#{booking.bookingId?.slice(-8) || 'N/A'}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-bold ${statusInfo.color} text-white shadow-md flex items-center gap-1`}>
                        <span className="material-symbols-outlined text-sm">{statusInfo.icon}</span>
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    {/* Technician */}
                    <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100">
                      <div className={`w-12 h-12 flex items-center justify-center ${booking.technician?.name ? 'bg-[#DCEBEC] text-[#1F7F85]' : 'bg-slate-200 text-slate-400'}`}>
                        <span className="material-symbols-outlined text-xl">
                          {booking.technician?.name ? 'engineering' : 'person_off'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-400 uppercase">Technician</p>
                        <p className={`text-sm font-bold ${booking.technician?.name ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                          {booking.technician?.name || 'Not Assigned Yet'}
                        </p>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">event</span>
                          Date
                        </p>
                        <p className="text-sm font-bold text-slate-900">{new Date(booking.serviceDate).toLocaleDateString()}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-[#E0F2F1] to-[#DCEBEC] border border-[#1F7F85]/20">
                        <p className="text-xs font-bold text-[#0F4C5C] uppercase mb-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">payments</span>
                          Charge
                        </p>
                        <p className="text-lg font-black text-[#1F7F85]">${booking.service?.charge || 0}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex gap-3">
                      {booking.status === 'completed' ? (
                        <button
                          className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/review');
                          }}
                        >
                          <span className="material-symbols-outlined">rate_review</span>
                          Write Review
                        </button>
                      ) : (
                        <button
                          className="flex-1 py-3 bg-white border-2 border-slate-200 text-slate-600 font-bold hover:border-[#1F7F85] hover:text-[#1F7F85] hover:bg-[#F7FBFC] transition-all flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined">visibility</span>
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border-2 border-dashed border-slate-200">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-slate-300">search_off</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">No Bookings Found</h3>
              <p className="text-slate-500 text-lg mb-6">
                {searchTerm ? 'No bookings match your search.' : 'You haven\'t made any bookings yet.'}
              </p>
              <button 
                onClick={() => navigate('/book-service')}
                className="px-8 py-4 bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] text-white font-bold hover:shadow-xl hover:shadow-[#1F7F85]/30 transition-all inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Book New Service
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] p-6">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 -mr-12 -mt-12 blur-2xl"></div>
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Booking Details</h3>
                  <p className="text-teal-100 text-sm">Complete information about your service</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 space-y-6 bg-[#F7FBFC]">
              {/* Service Card */}
              <div className="bg-white p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1F7F85] to-[#0F4C5C] flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-white text-3xl">{getServiceIcon(selectedBooking.service?.name)}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-slate-900">{selectedBooking.service?.name || 'N/A'}</h4>
                    <p className="text-sm text-slate-500">Booking ID: #{selectedBooking.bookingId?.slice(-8) || 'N/A'}</p>
                  </div>
                  <span className={`px-3 py-1.5 text-xs font-bold ${getStatusInfo(selectedBooking.status).color} text-white`}>
                    {getStatusInfo(selectedBooking.status).text}
                  </span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">event</span>
                    Service Date
                  </p>
                  <p className="text-lg font-bold text-slate-900">{new Date(selectedBooking.serviceDate).toLocaleDateString()}</p>
                </div>
                <div className="bg-white p-5 border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    Time Slot
                  </p>
                  <p className="text-lg font-bold text-slate-900">{selectedBooking.timeSlot || 'N/A'}</p>
                </div>
              </div>

              {/* Technician */}
              <div className="bg-white p-6 border border-slate-200 shadow-sm">
                <p className="text-xs font-bold uppercase text-slate-400 mb-4">Assigned Technician</p>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 flex items-center justify-center ${selectedBooking.technician?.name ? 'bg-[#DCEBEC] text-[#1F7F85]' : 'bg-slate-200 text-slate-400'}`}>
                    <span className="material-symbols-outlined text-2xl">
                      {selectedBooking.technician?.name ? 'engineering' : 'person_off'}
                    </span>
                  </div>
                  <div>
                    <p className={`text-lg font-bold ${selectedBooking.technician?.name ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                      {selectedBooking.technician?.name || 'Not Assigned Yet'}
                    </p>
                    <p className="text-sm text-slate-500">Professional Technician</p>
                  </div>
                </div>
              </div>

              {/* Issue Description */}
              <div className="bg-white p-6 border border-slate-200 shadow-sm">
                <p className="text-xs font-bold uppercase text-slate-400 mb-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">description</span>
                  Issue Description
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedBooking.issue || 'No description provided'}
                </p>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-br from-[#E0F2F1] to-[#DCEBEC] p-6 border-2 border-[#1F7F85]/20">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-[#0F4C5C] uppercase mb-1">Service Charge</p>
                    <p className="text-3xl font-black text-[#1F7F85]">${selectedBooking.service?.charge || 0}</p>
                  </div>
                  <span className="material-symbols-outlined text-5xl text-[#1F7F85]/20">payments</span>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 bg-white flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 font-bold text-slate-600 hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 transition-all"
              >
                Close
              </button>
              {selectedBooking.status === 'completed' ? (
                <button 
                  onClick={() => navigate('/review')}
                  className="flex-1 py-3 font-bold text-white bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] hover:shadow-xl hover:shadow-[#1F7F85]/30 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">rate_review</span>
                  Write Review
                </button>
              ) : (
                <button className="flex-1 py-3 font-bold text-white bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] hover:shadow-xl hover:shadow-[#1F7F85]/30 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">support_agent</span>
                  Contact Support
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
