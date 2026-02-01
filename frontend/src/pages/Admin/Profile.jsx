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
    joinDate: 'Jan 2023'
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
    <div className="min-h-screen bg-slate-900 font-['Inter']">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-700 bg-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{adminData.firstName} {adminData.lastName}</h2>
                  <p className="text-slate-400">{adminData.role}</p>
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold text-white mb-1">Admin Profile</h1>
                <p className="text-slate-400 text-sm mb-3">Manage your account settings</p>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
                >
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Personal Information</h3>
                <div className="space-y-4">
                  <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                    <label className="block text-slate-400 text-sm font-medium mb-2">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={adminData.firstName}
                        onChange={(e) => setAdminData({ ...adminData, firstName: e.target.value })}
                        className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-white font-medium">{adminData.firstName}</p>
                    )}
                  </div>

                  <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                    <label className="block text-slate-400 text-sm font-medium mb-2">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={adminData.lastName}
                        onChange={(e) => setAdminData({ ...adminData, lastName: e.target.value })}
                        className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-white font-medium">{adminData.lastName}</p>
                    )}
                  </div>

                  <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                    <label className="block text-slate-400 text-sm font-medium mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={adminData.email}
                        onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                        className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-white font-medium">{adminData.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-6">Account Information</h3>
                <div className="space-y-4">
                  <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                    <label className="block text-slate-400 text-sm font-medium mb-2">Role</label>
                    <p className="text-white font-medium">{adminData.role}</p>
                  </div>

                  <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                    <label className="block text-slate-400 text-sm font-medium mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={adminData.phone}
                        onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })}
                        className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-white font-medium">{adminData.phone}</p>
                    )}
                  </div>

                  <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                    <label className="block text-slate-400 text-sm font-medium mb-2">Member Since</label>
                    <p className="text-white font-medium">{adminData.joinDate}</p>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-6 py-2 bg-slate-600 text-slate-300 rounded-lg hover:bg-slate-500 transition-all font-medium"
                      >
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