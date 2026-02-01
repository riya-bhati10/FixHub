import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Naavbar';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@fixhub.com',
    phone: '+1 (555) 123-4567',
    role: 'Super Admin',
    joinDate: 'Jan 2023',
    lastLogin: 'Oct 24, 2023 - 10:30 AM'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form logic here
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-800 font-['Manrope']">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="bg-white shadow-xl shadow-[#1F7F85]/5 border border-[#AEE3E6]/50 overflow-hidden">
          {/* Header Section */}
          <div className="px-8 py-6 border-b border-[#DCEBEC] bg-gradient-to-r from-white to-[#F7FBFC]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#1F7F85]/10 text-[#1F7F85] flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-2xl">account_circle</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0F4C5C]">{adminData.firstName} {adminData.lastName}</h2>
                  <p className="text-slate-500 text-sm">{adminData.role}</p>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#0F4C5C]">Admin Profile</h1>
                <p className="text-slate-500 text-sm mt-1">Manage your account settings and preferences</p>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-3 px-4 py-2 bg-[#1F7F85] text-white font-bold hover:bg-[#0F4C5C] transition-all rounded text-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">{isEditing ? 'close' : 'edit'}</span>
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#0F4C5C] mb-4">Personal Information</h3>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-slate-400 text-sm">person</span>
                    <p className="text-xs font-bold text-slate-500 uppercase">First Name</p>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={adminData.firstName}
                      onChange={(e) => setAdminData({ ...adminData, firstName: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded text-sm font-semibold"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-slate-900">{adminData.firstName}</p>
                  )}
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-slate-400 text-sm">person</span>
                    <p className="text-xs font-bold text-slate-500 uppercase">Last Name</p>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={adminData.lastName}
                      onChange={(e) => setAdminData({ ...adminData, lastName: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded text-sm font-semibold"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-slate-900">{adminData.lastName}</p>
                  )}
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-slate-400 text-sm">mail</span>
                    <p className="text-xs font-bold text-slate-500 uppercase">Email</p>
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      value={adminData.email}
                      onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded text-sm font-semibold"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-slate-900">{adminData.email}</p>
                  )}
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#0F4C5C] mb-4">Account Information</h3>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-slate-400 text-sm">security</span>
                    <p className="text-xs font-bold text-slate-500 uppercase">Role</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{adminData.role}</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-slate-400 text-sm">call</span>
                    <p className="text-xs font-bold text-slate-500 uppercase">Phone</p>
                  </div>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={adminData.phone}
                      onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded text-sm font-semibold"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-slate-900">{adminData.phone}</p>
                  )}
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-slate-400 text-sm">calendar_month</span>
                    <p className="text-xs font-bold text-slate-500 uppercase">Member Since</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 mb-3">{adminData.joinDate}</p>
                  <div className="border-t border-slate-200 mb-3"></div>
                  {isEditing && (
                    <div className="flex gap-3">
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-[#1F7F85] text-white font-bold hover:bg-[#0F4C5C] transition-all rounded text-sm flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">save</span>
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-6 py-2 bg-slate-200 text-slate-700 font-bold hover:bg-slate-300 transition-all rounded text-sm flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminProfile;