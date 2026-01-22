import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';

const ProfileSettings = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-900 font-['Manrope'] flex flex-col">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8 gap-4 md:gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <button className="w-7 h-7 md:w-9 md:h-9 bg-[#1F7F85] text-white rounded-full border-2 border-white flex items-center justify-center hover:scale-105 transition-transform shadow-md">
              <span className="material-symbols-outlined text-sm md:text-base">photo_camera</span>
            </button>
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight truncate">Profile Settings</h2>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                <span className="text-slate-500 font-medium text-sm md:text-base">Account Type:</span>
                <span className="px-2 py-0.5 md:px-3 md:py-0.5 rounded-full bg-[#1F7F85]/10 text-[#1F7F85] text-xs font-bold uppercase tracking-wider truncate">Technician</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-center">
            <button className="px-4 py-2 md:px-6 md:py-3 bg-white text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 hover:text-[#1F7F85] transition-all flex items-center gap-2 text-sm md:text-base whitespace-nowrap">
              <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
              Back to Home
            </button>
            <button className="px-4 py-2 md:px-8 md:py-3 bg-[#1F7F85] text-white font-bold rounded-xl hover:bg-[#0F4C5C] transition-all shadow-lg shadow-[#1F7F85]/20 flex items-center gap-2 text-sm md:text-base whitespace-nowrap">
              <span className="material-symbols-outlined text-sm">save</span>
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#1F7F85]/10 shadow-sm overflow-hidden mb-8 md:mb-12">
          <div className="p-4 md:p-8 border-b border-[#1F7F85]/5">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#1F7F85]/5 flex items-center justify-center text-[#1F7F85]">
                <span className="material-symbols-outlined text-base md:text-lg">person_outline</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 truncate">Personal Information</h3>
                <p className="text-xs text-slate-400 font-medium truncate">Your public profile identity and contact details</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 truncate">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full bg-slate-50 border-slate-200 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:ring-2 focus:ring-[#1F7F85] focus:border-transparent transition-all outline-none text-sm md:text-base"
                  required
                  type="text"
                  defaultValue="Alex"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase truncate">Last Name</label>
                <input
                  className="w-full bg-slate-50 border-slate-200 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:ring-2 focus:ring-[#1F7F85] focus:border-transparent transition-all outline-none text-sm md:text-base"
                  type="text"
                  defaultValue="Rivera"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 truncate">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full bg-slate-50 border-slate-200 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:ring-2 focus:ring-[#1F7F85] focus:border-transparent transition-all outline-none text-sm md:text-base"
                  required
                  type="email"
                  defaultValue="alex.pro@example.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 truncate">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full bg-slate-50 border-slate-200 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:ring-2 focus:ring-[#1F7F85] focus:border-transparent transition-all outline-none text-sm md:text-base"
                  required
                  type="tel"
                  defaultValue="+1 (555) 987-6543"
                />
              </div>
              <div className="md:col-span-2 space-y-1.5 pt-4">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 truncate">
                  Update Password
                </label>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
                  <input
                    className="flex-1 bg-slate-50 border-slate-200 rounded-xl px-3 py-2 md:px-4 md:py-3 focus:ring-2 focus:ring-[#1F7F85] focus:border-transparent transition-all outline-none text-sm md:text-base"
                    placeholder="Enter new password"
                    type="password"
                  />
                  <button className="px-4 py-2 md:px-6 md:py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-[#1F7F85] hover:text-white transition-all border border-slate-200 text-sm md:text-base whitespace-nowrap">
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;