import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
const AdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Data for charts
  const monthlyBookings = [
    { month: 'JAN', value: 185, height: '70.07%' },
    { month: 'FEB', value: 210, height: '79.54%' },
    { month: 'MAR', value: 198, height: '75.00%' },
    { month: 'APR', value: 240, height: '90.91%' },
    { month: 'MAY', value: 225, height: '85.22%' },
    { month: 'JUN', value: 264, height: '100%' },
  ];

  const weeklyServices = [
    { day: 'MON', value: 24, height: '50.00%' },
    { day: 'TUE', value: 32, height: '66.66%' },
    { day: 'WED', value: 42, height: '87.50%' },
    { day: 'THU', value: 48, height: '100%' },
    { day: 'FRI', value: 35, height: '72.91%' },
    { day: 'SAT', value: 18, height: '37.50%' },
    { day: 'SUN', value: 10, height: '20.83%' },
  ];

  const pendingByDept = [
    { dept: 'HVAC', value: 12, height: '54.54%' },
    { dept: 'PLUMB', value: 6, height: '27.27%' },
    { dept: 'ELEC', value: 22, height: '100%' },
    { dept: 'CLEAN', value: 9, height: '40.90%' },
    { dept: 'LANDS', value: 4, height: '18.18%' },
  ];

  const monthlyRevenue = [
    { month: 'JAN', value: '$14.2k', height: '57.95%' },
    { month: 'FEB', value: '$16.5k', height: '67.34%' },
    { month: 'MAR', value: '$12.8k', height: '52.24%' },
    { month: 'APR', value: '$21.4k', height: '87.34%' },
    { month: 'MAY', value: '$18.1k', height: '73.87%' },
    { month: 'JUN', value: '$24.5k', height: '100%' },
  ];

  return (
    <div className="bg-[#F7FBFC] text-slate-900 min-h-screen">
      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        body {
          font-family: 'Manrope', sans-serif;
        }
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        .bar-hover:hover {
          filter: brightness(1.1);
        }
      `}</style>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="flex flex-col min-h-screen">
        {/* Main Content - Starting directly without header */}
        <main className="flex-1 w-full max-w-[1440px] mx-auto p-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col gap-1 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="size-12 bg-[#1F7F85]/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#1F7F85]">book_online</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+12.4%</span>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Bookings</p>
              <p className="text-3xl font-black text-[#1A2E35]">1,284</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col gap-1 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="size-12 bg-[#1F7F85]/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#1F7F85]">home_repair_service</span>
                </div>
                <span className="text-[11px] font-bold text-[#1F7F85] bg-[#1F7F85]/5 px-2 py-1 rounded-lg">Live</span>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Ongoing Services</p>
              <p className="text-3xl font-black text-[#1A2E35]">42</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col gap-1 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="size-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-500">pending_actions</span>
                </div>
                <div className="size-2 bg-orange-500 rounded-full animate-pulse mt-2"></div>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Pending Assignments</p>
              <p className="text-3xl font-black text-[#1A2E35]">08</p>
            </div>

            <div className="bg-[#1F7F85] p-6 rounded-2xl border border-[#1F7F85]/20 flex flex-col gap-1 shadow-xl shadow-[#1F7F85]/10">
              <div className="flex justify-between items-start mb-2">
                <div className="size-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#AEE3E6]">payments</span>
                </div>
                <span className="text-[11px] font-bold text-[#AEE3E6] bg-white/10 px-2 py-1 rounded-lg">+8.2%</span>
              </div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Total Revenue</p>
              <p className="text-3xl font-black text-white">$24,450.00</p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Monthly Bookings Chart */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-lg font-bold text-[#1A2E35]">Total Bookings (Monthly)</h3>
                <span className="text-xs font-bold text-slate-400">Unit: Services</span>
              </div>
              <div className="h-64 flex items-end justify-between gap-4 px-2">
                {monthlyBookings.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 w-full group">
                    <div
                      className="w-full bg-[#1F7F85] rounded-t-lg transition-all duration-300 bar-hover relative"
                      style={{ height: item.height }}
                    >
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] font-extrabold text-[#1A2E35]">
                        {item.value}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Services Chart */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-lg font-bold text-[#1A2E35]">Ongoing Services (Weekly)</h3>
                <span className="text-xs font-bold text-slate-400">Unit: Active Jobs</span>
              </div>
              <div className="h-64 flex items-end justify-between gap-4 px-2">
                {weeklyServices.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 w-full group">
                    <div
                      className="w-full bg-[#1F7F85] rounded-t-lg transition-all duration-300 bar-hover relative"
                      style={{ height: item.height }}
                    >
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] font-extrabold text-[#1A2E35]">
                        {item.value}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Assignments Chart */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-lg font-bold text-[#1A2E35]">Pending Assignments</h3>
                <span className="text-xs font-bold text-slate-400">By Department</span>
              </div>
              <div className="h-64 flex items-end justify-between gap-6 px-4">
                {pendingByDept.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 w-full group">
                    <div
                      className="w-full bg-[#1F7F85] rounded-t-lg transition-all duration-300 bar-hover relative"
                      style={{ height: item.height }}
                    >
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] font-extrabold text-[#1A2E35]">
                        {item.value}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 text-center">{item.dept}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Revenue Chart */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-lg font-bold text-[#1A2E35]">Total Revenue (Monthly)</h3>
                <span className="text-xs font-bold text-slate-400">Unit: $1k USD</span>
              </div>
              <div className="h-64 flex items-end justify-between gap-4 px-2">
                {monthlyRevenue.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 w-full group">
                    <div
                      className="w-full bg-[#1F7F85] rounded-t-lg transition-all duration-300 bar-hover relative"
                      style={{ height: item.height }}
                    >
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] font-extrabold text-[#1A2E35]">
                        {item.value}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto p-8 border-t border-slate-200 text-center bg-white/50">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-xs font-medium">© 2024 ServicePortal Executive Analytics. High-Security Environment.</p>
            <div className="flex gap-6 text-[11px] font-bold text-[#1F7F85]/60 uppercase tracking-widest">
              <a className="hover:text-[#1F7F85] transition-colors" href="#">Privacy Policy</a>
              <a className="hover:text-[#1F7F85] transition-colors" href="#">Audit Logs</a>
              <a className="hover:text-[#1F7F85] transition-colors" href="#">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;