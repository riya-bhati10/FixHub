import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Common/Navbar';
import bookingService from '../../Services/bookingService';
import Loader from '../../Common/Loader';
import { useUser } from '../../context/UserContext';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [activeBookings, setActiveBookings] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, cancelled: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    console.log('Dashboard - Current user:', user);
  }, [user]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getCustomerBookings();
      const bookings = response.bookings || [];
      
      setActiveBookings(bookings.filter(b => b.status === 'accepted' || b.status === 'in_progress').slice(0, 2));
      
      setStats({
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        completed: bookings.filter(b => b.status === 'completed').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const customerNavLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/book-service', label: 'Book Service' },
    { path: '/my-booking', label: 'My Bookings' },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'in_progress':
      case 'accepted':
        return 'bg-[#E0F2F1] text-[#1F7F85] border border-[#1F7F85]/20';
      case 'pending':
        return 'bg-amber-50 text-amber-600 border border-amber-200';
      default:
        return 'bg-slate-100 text-slate-600 border border-slate-200';
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-800 font-['Manrope']">
      <Navbar 
        userType="customer"
        navLinks={customerNavLinks}
        showProfile={true}
        showNotifications={true}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] shadow-xl shadow-[#1F7F85]/20 p-8 md:p-10 mb-10 flex flex-col md:flex-row justify-between items-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 -mr-16 -mt-16 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 -ml-10 -mb-10 blur-2xl"></div>
            
            <div className="relative z-10 text-center md:text-left space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Welcome back, {user?.fullname?.firstname || 'User'} 👋
              </h1>
              <p className="text-teal-100 text-lg font-medium">
                Here's what's happening with your repairs today.
              </p>
            </div>
            <button 
              onClick={() => navigate('/book-service')}
              className="relative z-10 mt-6 md:mt-0 px-8 py-4 bg-white text-[#0F4C5C] font-bold hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-3 group"
            >
              <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">add_circle</span>
              Book Service
            </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Bookings</p>
                <p className="text-3xl font-extrabold text-[#0F4C5C] mt-2">{stats.total}</p>
              </div>
              <div className="p-3 bg-[#E0F2F1] text-[#1F7F85]">
                <span className="material-symbols-outlined text-2xl">list_alt</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pending</p>
                <p className="text-3xl font-extrabold text-[#0F4C5C] mt-2">{stats.pending}</p>
              </div>
              <div className="p-3 bg-amber-50 text-amber-500">
                <span className="material-symbols-outlined text-2xl">pending_actions</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Completed</p>
                <p className="text-3xl font-extrabold text-[#0F4C5C] mt-2">{stats.completed}</p>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-500">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Canceled</p>
                <p className="text-3xl font-extrabold text-[#0F4C5C] mt-2">{stats.cancelled}</p>
              </div>
              <div className="p-3 bg-red-50 text-red-500">
                <span className="material-symbols-outlined text-2xl">cancel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Bookings Section */}
        <div className="bg-white shadow-xl shadow-[#1F7F85]/5 border border-[#AEE3E6]/50 overflow-hidden">
          <div className="px-8 py-6 border-b border-[#DCEBEC] flex justify-between items-center bg-gradient-to-r from-white to-[#F7FBFC]">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-[#E0F2F1] text-[#1F7F85]">
                    <span className="material-symbols-outlined">calendar_month</span>
                </div>
                <h2 className="text-xl font-bold text-[#0F4C5C]">Active Bookings</h2>
            </div>
            <button className="text-[#1F7F85] hover:text-[#0F4C5C] text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#DCEBEC]">
              <thead className="bg-[#F7FBFC]">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-bold text-[#5F7D83] uppercase tracking-wider">Service</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-[#5F7D83] uppercase tracking-wider">Date & ID</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-[#5F7D83] uppercase tracking-wider">Technician</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-[#5F7D83] uppercase tracking-wider">Status</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-[#5F7D83] uppercase tracking-wider">Service Charge</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#DCEBEC]">
                {activeBookings.length > 0 ? activeBookings.map((booking) => (
                  <tr key={booking.bookingId} className="hover:bg-[#F7FBFC] transition-colors group">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 overflow-hidden shadow-sm border border-[#DCEBEC] group-hover:border-[#1F7F85]/30 transition-colors bg-[#E0F2F1] flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#1F7F85]">build</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-[#1A2E35]">{booking.service.name}</div>
                          <div className="text-xs text-[#5F7D83] mt-0.5 flex items-center gap-1">
                             <span className="w-1.5 h-1.5 bg-emerald-400"></span>
                             Active
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-sm font-bold text-[#1A2E35]">{new Date(booking.serviceDate).toLocaleDateString()}</div>
                      <div className="text-xs font-medium text-[#1F7F85] bg-[#E0F2F1] px-2 py-0.5 inline-block mt-1">{booking.bookingId.slice(-6)}</div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-9 w-9 relative bg-[#1F7F85] flex items-center justify-center text-white font-bold">
                          {booking.technician.name.charAt(0)}
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white"></div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-bold text-[#1A2E35]">{booking.technician.name}</div>
                          <div className="text-xs text-[#5F7D83]">Technician</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold items-center gap-1.5 ${getStatusStyles(booking.status)}`}>
                        <span className="w-1.5 h-1.5 bg-current opacity-60"></span>
                        {booking.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-sm font-black text-[#0F4C5C]">${booking.service.charge}</div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-10 text-center text-slate-500">
                      No active bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;