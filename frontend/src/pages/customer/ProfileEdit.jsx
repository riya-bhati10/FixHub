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
            <div className="relative">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
                <img 
                  alt="User avatar" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW_CoE3MDQNai64Md2J18GZejqdNTCKoxop2s5LcQzNlotgxSn5h08d0a9QrRT3YINiPyR9aGrOC6FRJFvoyAGeNQ5Ld54xXfQs-p-L057k-5tA7nYWTOBzr9kmoG4AZXMu_m2yVuXakqfNbCtdqlF983WZw5jexJyDEZk3yNVvc7CSY2BKhBjattRVs3ARuhD8XBtYhEX__y2HDE_0p3FA7NxMo-SjAwJiKJiJrDc6UmH8WR2OkPIqj-i_uotIM4FbKMxvQfLERY" 
                />
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 md:w-9 md:h-9 bg-[#1F7F85] text-white rounded-full border-2 border-white flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                <span className="material-symbols-outlined text-sm md:text-base">photo_camera</span>
              </button>
            </div>
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
                <p className="text-[10px] text-slate-400 mt-1">
                  Leave blank if you don't want to change your current password.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8 bg-slate-50/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#1F7F85]/5 flex items-center justify-center text-[#1F7F85]">
                  <span className="material-symbols-outlined text-base md:text-lg">engineering</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 truncate">Professional Details</h3>
                  <p className="text-xs text-slate-400 font-medium truncate">Specify your skills and work availability</p>
                </div>
              </div>
              <div className="bg-[#1F7F85]/10 px-3 py-1.5 md:px-4 md:py-2 rounded-xl w-fit">
                <span className="text-[10px] md:text-[11px] font-bold text-[#1F7F85] uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1F7F85]"></span>
                  Technician Role
                </span>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white p-4 md:p-5 rounded-xl border border-[#1F7F85]/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-base md:text-lg">event_available</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 truncate">Availability Status</p>
                    <p className="text-xs text-slate-500 truncate">Enable this to appear in customer search results</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" defaultChecked />
                  <div className="w-12 h-6 md:w-14 md:h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] md:after:top-[4px] after:start-[2px] md:after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 md:after:h-5 md:after:w-[22px] after:transition-all peer-checked:bg-[#1F7F85]"></div>
                  <span className="ms-3 text-xs font-bold text-[#1F7F85] uppercase">Available</span>
                </label>
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 truncate">
                  Expertise & Skills
                </label>
                <div className="flex flex-wrap gap-2 p-3 md:p-4 bg-white rounded-xl border border-[#1F7F85]/10 min-h-[100px] md:min-h-[120px] content-start shadow-sm">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 md:px-4 md:py-2 bg-[#AEE3E6]/20 text-[#0F4C5C] rounded-xl text-xs font-bold border border-[#1F7F85]/5 truncate">
                    Electrical Repairs 
                    <button className="material-symbols-outlined text-xs md:text-sm hover:text-red-500 ml-0.5 md:ml-1">close</button>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 md:px-4 md:py-2 bg-[#AEE3E6]/20 text-[#0F4C5C] rounded-xl text-xs font-bold border border-[#1F7F85]/5 truncate">
                    HVAC Service 
                    <button className="material-symbols-outlined text-xs md:text-sm hover:text-red-500 ml-0.5 md:ml-1">close</button>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 md:px-4 md:py-2 bg-[#AEE3E6]/20 text-[#0F4C5C] rounded-xl text-xs font-bold border border-[#1F7F85]/5 truncate">
                    Plumbing 
                    <button className="material-symbols-outlined text-xs md:text-sm hover:text-red500 ml-0.5 md:ml-1">close</button>
                  </span>
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 border-2 border-dashed border-[#1F7F85]/30 text-[#1F7F85] rounded-xl text-xs font-bold hover:bg-[#1F7F85] hover:text-white transition-all whitespace-nowrap">
                    <span className="material-symbols-outlined text-xs md:text-sm">add</span> 
                    Add Skill
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-4 md:py-6 lg:py-8 px-4 md:px-6 border-t border-[#1F7F85]/10 text-slate-400 text-xs font-medium bg-white mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            <span className="font-bold text-slate-500 whitespace-nowrap">© 2024 Service Hub Pro</span>
            <span className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></span>
            <a className="hover:text-[#1F7F85] transition-colors whitespace-nowrap" href="#">User Agreement</a>
            <a className="hover:text-[#1F7F85] transition-colors whitespace-nowrap" href="#">Privacy Policy</a>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-6 mt-2 md:mt-0">
            <div className="flex items-center gap-1.5 md:gap-2 text-[#1F7F85]/70">
              <span className="material-symbols-outlined text-xs md:text-sm">verified_user</span>
              <span className="font-bold whitespace-nowrap">Secure Connection</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="material-symbols-outlined text-slate-400 text-xs md:text-sm">language</span>
              <span className="whitespace-nowrap">English (US)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfileSettings;