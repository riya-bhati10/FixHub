import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
const AdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-[#F7FBFC] text-slate-900 min-h-screen">
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
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Pending Services</p>
              <p className="text-3xl font-black text-[#1A2E35]">42</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col gap-1 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="size-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-500">pending_actions</span>
                </div>
                <div className="size-2 bg-orange-500 rounded-full animate-pulse mt-2"></div>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Cancelled Services</p>
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