import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const activeBookings = [
    {
      id: 'BK-9284',
      service: 'iPhone Screen Repair',
      date: 'Oct 24, 2023',
      status: 'In Progress',
      technician: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop',
      fees: '$120.00'
    },
    {
      id: 'BK-9287',
      service: 'PlayStation Controller Fix',
      date: 'Oct 26, 2023',
      status: 'Pending',
      technician: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop',
      fees: '$45.00'
    }
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen font-['Manrope']">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <main className="max-w-[1400px] mx-auto p-6 md:p-10 space-y-8">
        {/* Header Section with Gradient & Pattern */}
        <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#1F7F85]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="px-3 py-1 rounded-full bg-[#1F7F85]/10 text-[#1F7F85] text-xs font-bold uppercase tracking-wider">
                  Customer Portal
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] inline-block">User</div>
              </h1>
              <p className="text-slate-500 mt-3 text-lg max-w-xl">
                Track your ongoing repairs, view history, or schedule a new service appointment in just a few clicks.
              </p>
            </div>
            <button 
              onClick={() => navigate('/booking-from')}
              className="group relative px-8 py-4 bg-[#1F7F85] text-white font-bold rounded-2xl hover:bg-[#16666B] transition-all shadow-xl shadow-[#1F7F85]/20 hover:shadow-[#1F7F85]/30 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="relative flex items-center gap-3">
                <i className="material-symbols-outlined">add_circle</i>
                <div>Book Service</div>
              </div>
            </button>
          </div>
        </div>

        {/* Active Bookings Section */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1F7F85]/10 rounded-2xl flex items-center justify-center text-[#1F7F85]">
                
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Active Bookings</h2>
                <p className="text-sm text-slate-500 font-medium">Track status of your current repairs</p>
              </div>
            </div>
            <button className="text-sm font-bold text-slate-500 hover:text-[#1F7F85] transition-colors flex items-center gap-1">
              View All History
            
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Service Details</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Date & ID</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Technician</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Service Fees</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeBookings.map((booking) => (
                  <tr key={booking.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={booking.image} 
                          alt={booking.service}
                          className="w-12 h-12 rounded-2xl object-cover group-hover:shadow-md transition-all"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-base">{booking.service}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <div className="font-bold text-slate-700">{booking.date}</div>
                        <div className="text-xs font-mono text-slate-400 mt-1">{booking.id}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <img 
                          src={booking.avatar} 
                          alt={booking.technician}
                          className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div className="text-sm font-semibold text-slate-700">{booking.technician}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusStyles(booking.status)}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                        {booking.status}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-extrabold text-[#0F4C5C]">{booking.fees}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;