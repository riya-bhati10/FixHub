import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Naavbar';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('customers');
  const navigate = useNavigate();

  const blockedCustomers = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', blockedDate: 'Oct 20, 2023' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah.wilson@example.com', blockedDate: 'Oct 18, 2023' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', blockedDate: 'Oct 15, 2023' }
  ];

  const blockedTechnicians = [
    { id: 1, name: 'Robert Brown', email: 'robert.brown@example.com', blockedDate: 'Oct 19, 2023' },
    { id: 2, name: 'Lisa Davis', email: 'lisa.davis@example.com', blockedDate: 'Oct 16, 2023' }
  ];

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-800 font-['Manrope']">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] shadow-xl shadow-[#1F7F85]/20 p-8 md:p-10 mb-10 flex flex-col md:flex-row justify-between items-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 -mr-16 -mt-16 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 -ml-10 -mb-10 blur-2xl"></div>
            
            <div className="relative z-10 text-center md:text-left space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Welcome back, Admin 👋
              </h1>
              <p className="text-teal-100 text-lg font-medium">
                Monitor and manage your FixHub platform.
              </p>
            </div>
            
            {/* Profile Avatar */}
            <div className="relative z-10 mt-6 md:mt-0 flex items-center gap-4">
              <button 
                onClick={() => navigate('/admin/profile')}
                className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/50 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <img 
                  src="/public/image.png" 
                  alt="Admin Profile" 
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Customers</p>
                <p className="text-3xl font-extrabold text-[#0F4C5C] mt-2">156</p>
              </div>
              <div className="p-3 bg-[#E0F2F1] text-[#1F7F85]">
                <span className="material-symbols-outlined text-2xl">people</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Technicians</p>
                <p className="text-3xl font-extrabold text-[#0F4C5C] mt-2">24</p>
              </div>
              <div className="p-3 bg-blue-50 text-blue-500">
                <span className="material-symbols-outlined text-2xl">engineering</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total BLOCK USERS</p>
                <p className="text-3xl font-extrabold text-[#0F4C5C] mt-2">1,284</p>
              </div>
              <div className="p-3 bg-red-50 text-red-500">
                <span className="material-symbols-outlined text-2xl">block</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Revenue</p>
                <p className="text-3xl font-extrabold text-[#0F4C5C] mt-2">$45,280</p>
              </div>
              <div className="p-3 bg-amber-50 text-amber-500">
                <span className="material-symbols-outlined text-2xl">payments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blocked Users Section */}
        <div className="bg-white shadow-xl shadow-[#1F7F85]/5 border border-[#AEE3E6]/50 overflow-hidden">
          <div className="px-8 py-6 border-b border-[#DCEBEC] bg-gradient-to-r from-white to-[#F7FBFC] text-center">
            <h2 className="text-xl font-bold text-[#0F4C5C] mb-4">Blocked Users</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setActiveTab('customers')}
                className={`px-4 py-2 font-bold rounded text-sm transition-all ${
                  activeTab === 'customers'
                    ? 'bg-[#1F7F85] text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                Blocked Customers
              </button>
              <button
                onClick={() => setActiveTab('technicians')}
                className={`px-4 py-2 font-bold rounded text-sm transition-all ${
                  activeTab === 'technicians'
                    ? 'bg-[#1F7F85] text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                Blocked Technicians
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {(activeTab === 'customers' ? blockedCustomers : blockedTechnicians).map((user) => (
                <div key={user.id} className="bg-white border border-slate-200 rounded p-3 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                      <span className="material-symbols-outlined text-red-600 text-lg">
                        {activeTab === 'customers' ? 'person' : 'engineering'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-slate-900 truncate">{user.name}</h3>
                      <p className="text-slate-500 text-xs truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Blocked:</span>
                      <span className="font-bold">{user.blockedDate}</span>
                    </div>
                    <div className="flex justify-center">
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
                        Blocked
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;