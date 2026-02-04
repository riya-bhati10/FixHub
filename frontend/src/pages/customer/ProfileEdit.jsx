import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../../Common/Navbar';
import api from '../Landing/api';
import { HandleMessageUIError, HandleMessageUISuccess } from '../../utils/toastConfig';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');

  const customerNavLinks = [
    { path: '/customer/dashboard', label: 'Dashboard' },
    { path: '/customer/book-service', label: 'Book Service' },
    { path: '/customer/my-bookings', label: 'My Bookings' },
  ];

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/auth/me');
      const userData = response.data.user;
      setUser(userData);
      setFirstName(userData.fullname.firstname);
      setLastName(userData.fullname.lastname || '');
      setPhoneNumber(userData.phone);
      setLocation(userData.location || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
      const localUser = localStorage.getItem('user');
      if (localUser) {
        const userData = JSON.parse(localUser);
        setUser(userData);
        setFirstName(userData.fullname.firstname);
        setLastName(userData.fullname.lastname || '');
        setPhoneNumber(userData.phone);
        setLocation(userData.location || '');
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updateData = {
        fullname: { firstname: firstName, lastname: lastName },
        phone: phoneNumber,
        location: location
      };
      
      // API call to update profile
      const response = await api.put('/auth/update-profile', updateData);
      
      // Validate response data before updating
      if (response.data && response.data.user) {
        const updatedUser = response.data.user;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        throw new Error('Invalid response format from server');
      }
      
      toast.success('Profile updated successfully!', HandleMessageUISuccess());
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile.', HandleMessageUIError());
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] font-['Manrope']">
      <Navbar 
        userType="customer"
        navLinks={customerNavLinks}
        showProfile={true}
        showNotifications={true}
      />
      
      <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 pt-20 sm:pt-24">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F4C5C] mb-2">Profile Settings</h1>
          <p className="text-sm sm:text-base text-slate-600">Manage your personal information</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="p-4 sm:p-6 lg:p-8 border-b border-slate-200 bg-gradient-to-r from-[#F7FBFC] to-white">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#1F7F85] text-white flex items-center justify-center rounded-full text-2xl sm:text-3xl lg:text-4xl font-bold">
                {user ? user.fullname.firstname.charAt(0) : 'U'}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F4C5C]">
                  {user ? `${user.fullname.firstname} ${user.fullname.lastname}` : 'Loading...'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">{user?.email || 'Loading...'}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                  <span className="px-2 py-1 bg-[#1F7F85] text-white text-[10px] sm:text-xs font-bold rounded">
                    {user?.role || 'Customer'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F4C5C] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl sm:text-2xl">person</span>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">Email (Locked)</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your location"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200">
              <button 
                onClick={() => navigate('/customer/dashboard')}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-white text-slate-600 font-bold border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg sm:text-xl">close</span>
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-[#1F7F85] text-white font-bold rounded-lg hover:bg-[#0F4C5C] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg sm:text-xl">save</span>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;
