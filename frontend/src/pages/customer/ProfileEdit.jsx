import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Common/Navbar';
import { useUser } from '../../context/UserContext';
import axiosInstance from '../../Services/axiosInstance';
import Loader from '../../Common/Loader';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: ''
  });

  const customerNavLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/book-service', label: 'Book Service' },
    { path: '/my-booking', label: 'My Bookings' },
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.fullname?.firstname || '',
        lastname: user.fullname?.lastname || '',
        phone: user.phone || '',
        email: user.email || ''
      });
      setImagePreview(user.profileImage || null);
    }
  }, [user]);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.put('/auth/update-profile', {
        fullname: {
          firstname: formData.firstname,
          lastname: formData.lastname
        },
        phone: formData.phone
      });
      setUser(response.data.user);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <Loader />;

  const getUserInitial = () => {
    if (formData.firstname) return formData.firstname.charAt(0).toUpperCase();
    return 'U';
  };

  const getMemberSince = () => {
    if (user.createdAt) {
      return new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    return 'Recently';
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-800 font-['Manrope']">
      <Navbar 
        userType="customer"
        navLinks={customerNavLinks}
        showProfile={true}
        showNotifications={true}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] shadow-xl shadow-[#1F7F85]/20 p-8 md:p-10 mb-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 -mr-16 -mt-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 -ml-10 -mb-10 blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative group cursor-pointer shrink-0">
              <div className="w-32 h-32 overflow-hidden border-4 border-white shadow-xl shadow-[#1F7F85]/20">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Profile" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-[#DCEBEC] flex items-center justify-center text-[#1F7F85] text-5xl font-bold">
                    {getUserInitial()}
                  </div>
                )}
              </div>
              <label className="absolute bottom-2 right-2 bg-[#1F7F85] text-white p-2.5 shadow-lg cursor-pointer hover:bg-[#0F4C5C] transition-colors border-2 border-white">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <span className="material-symbols-outlined text-sm">photo_camera</span>
              </label>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                {formData.firstname} {formData.lastname}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-teal-100">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-sm">mail</span>
                  <span className="text-sm font-medium">{formData.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span className="text-sm font-bold uppercase tracking-wider">Customer</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  <span className="text-sm font-medium">Member Since {getMemberSince()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white shadow-sm border border-slate-200 p-6 md:p-10 space-y-10">
          {/* Personal Information */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#1F7F85]/10 flex items-center justify-center text-[#1F7F85]">
                <span className="material-symbols-outlined text-2xl">person</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Personal Information</h3>
                <p className="text-sm text-slate-500">Update your personal details and contact information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">First Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">badge</span>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#1F7F85]/30 focus:border-[#1F7F85] outline-none transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Last Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">badge</span>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#1F7F85]/30 focus:border-[#1F7F85] outline-none transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">call</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#1F7F85]/30 focus:border-[#1F7F85] outline-none transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  Email Address
                  <span className="text-[10px] text-red-500 bg-red-50 px-1.5 py-0.5 border border-red-100">Locked</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    disabled
                    className="w-full pl-11 pr-4 py-3 bg-slate-100 border border-slate-200 font-medium text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="h-px bg-slate-200"></div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-white text-slate-600 font-bold border-2 border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined">close</span>
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] text-white font-bold hover:shadow-xl hover:shadow-[#1F7F85]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Saving...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">save</span>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;
