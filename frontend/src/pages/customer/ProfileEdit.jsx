import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import api from '../Landing/api';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces");
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      const userData = response.data;
      setUser(userData);
      setFirstName(userData.fullname.firstname);
      setLastName(userData.fullname.lastname || '');
      setPhoneNumber(userData.phone);
      setLocation(userData.location || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Fallback to localStorage data
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updateData = {
        fullname: {
          firstname: firstName,
          lastname: lastName
        },
        phone: phoneNumber,
        location: location
      };
      
      // Note: This would require a PUT endpoint for updating profile
      // await api.put('/auth/profile', updateData);
      
      // Update localStorage
      const updatedUser = { ...user, ...updateData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      alert('Profile changes saved successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FBFC] via-white to-[#E8F3F4] text-[#1A2E35] font-['Manrope']">
      {/* Material Icons Link */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="bg-white border border-[#AEE3E6] shadow-xl shadow-[#1F7F85]/5 overflow-hidden">
          
          {/* Merged Header Section (Profile Card + Actions) */}
          <div className="p-6 md:p-10 border-b border-[#AEE3E6] bg-gradient-to-r from-[#F7FBFC] to-white flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative group cursor-pointer shrink-0">
              <div className="w-32 h-32 overflow-hidden border-4 border-white shadow-xl shadow-[#1F7F85]/20">
                <img 
                  src={imagePreview} 
                  alt="Profile" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <label className="absolute bottom-2 right-2 bg-[#1F7F85] text-white p-2.5 shadow-lg cursor-pointer hover:bg-[#0F4C5C] transition-colors border-2 border-white">
                <input
                  type="text"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
               
              </label>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <h1 className="text-3xl font-extrabold text-[#1A2E35] tracking-tight">
                {user ? `${user.fullname.firstname} ${user.fullname.lastname}` : 'Loading...'}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[#5F7D83]">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-[#DCEBEC] shadow-sm">
                  <span className="material-symbols-outlined text-[#1F7F85] text-sm">mail</span>
                  <span className="text-sm font-medium">{user?.email || 'Loading...'}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-[#DCEBEC] shadow-sm">
                  <span className="material-symbols-outlined text-[#1F7F85] text-sm">verified</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-[#1F7F85]">{user?.role || 'Customer'}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-[#DCEBEC] shadow-sm">
                  <span className="material-symbols-outlined text-[#1F7F85] text-sm">calendar_month</span>
                  <span className="text-sm font-medium">Member Since {user ? new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Loading...'}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Form Content */}
          <div className="p-6 md:p-10 space-y-10">
            {/* Personal Information */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#1F7F85]/10 flex items-center justify-center text-[#1F7F85]">
                  <span className="material-symbols-outlined text-2xl">person</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A2E35]">Personal Information</h3>
                  <p className="text-sm text-[#5F7D83]">Update your personal details and contact information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1A2E35] uppercase tracking-wider">First Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5F7D83]">badge</span>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#F7FBFC] border border-[#DCEBEC] focus:ring-2 focus:ring-[#1F7F85]/30 focus:border-[#1F7F85] outline-none transition-all font-medium text-[#1A2E35]"
                    />
                  </div>
                </div>
                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1A2E35] uppercase tracking-wider">Last Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5F7D83]">badge</span>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#F7FBFC] border border-[#DCEBEC] focus:ring-2 focus:ring-[#1F7F85]/30 focus:border-[#1F7F85] outline-none transition-all font-medium text-[#1A2E35]"
                    />
                  </div>
                </div>
                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1A2E35] uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5F7D83]">call</span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#F7FBFC] border border-[#DCEBEC] focus:ring-2 focus:ring-[#1F7F85]/30 focus:border-[#1F7F85] outline-none transition-all font-medium text-[#1A2E35]"
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1A2E35] uppercase tracking-wider flex items-center gap-2">
                    Email Address
                    <span className="text-[10px] text-red-500 bg-red-50 px-1.5 py-0.5 border border-red-100">Locked</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5F7D83]">mail</span>
                    <input
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      disabled
                      className="w-full pl-11 pr-4 py-3 bg-[#F7FBFC]/50 border border-[#DCEBEC] font-medium text-[#5F7D83] cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
              
              {/* Location Field */}
              <div className="mt-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1A2E35] uppercase tracking-wider">Location</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5F7D83]">location_on</span>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter your location"
                      className="w-full pl-11 pr-4 py-3 bg-[#F7FBFC] border border-[#DCEBEC] focus:ring-2 focus:ring-[#1F7F85]/30 focus:border-[#1F7F85] outline-none transition-all font-medium text-[#1A2E35]"
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="h-px bg-[#AEE3E6]"></div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2">
               <button 
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 bg-white text-[#5F7D83] font-bold border border-[#6FC2C6] hover:bg-[#F7FBFC] hover:text-[#1A2E35] hover:border-[#1F7F85] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined">close</span>
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-8 py-4 bg-[#1F7F85] text-white font-bold hover:bg-[#0F4C5C] transition-all shadow-lg shadow-[#1F7F85]/20 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">save</span>
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