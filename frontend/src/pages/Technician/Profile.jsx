import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../Landing/api';
import { HandleMessageUIError, HandleMessageUISuccess } from '../../utils/toastConfig';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchUserProfile();
    fetchMyServices();
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

  const fetchMyServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
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
      
      // Update backend first
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
      toast.error(error.response?.data?.message || 'Failed to update profile. Please try again.', HandleMessageUIError());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md border border-fixhub-borderSoft overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 md:p-10 border-b border-fixhub-borderSoft bg-gradient-to-r from-fixhub-bgLight to-white flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="relative group cursor-pointer shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-fixhub-primary flex items-center justify-center">
              <span className="text-white text-4xl font-bold">
                {user ? `${user.fullname.firstname.charAt(0)}${user.fullname.lastname?.charAt(0) || ''}` : 'T'}
              </span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-extrabold text-fixhub-textDark tracking-tight">
              {user ? `${user.fullname.firstname} ${user.fullname.lastname}` : 'Loading...'}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-fixhub-textMuted">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-fixhub-borderSoft shadow-sm rounded">
                <svg className="w-4 h-4 text-fixhub-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">{user?.email || 'Loading...'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-fixhub-borderSoft shadow-sm rounded">
                <svg className="w-4 h-4 text-fixhub-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-bold uppercase tracking-wider text-fixhub-primary">Technician</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-fixhub-borderSoft shadow-sm rounded">
                <svg className="w-4 h-4 text-fixhub-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z" />
                </svg>
                <span className="text-sm font-medium">
                  {services.length} Service{services.length !== 1 ? 's' : ''} Offered
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 md:p-10 space-y-10">
          {/* Personal Information */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-fixhub-primary/10 rounded-lg flex items-center justify-center text-fixhub-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-fixhub-textDark">Personal Information</h3>
                <p className="text-sm text-fixhub-textMuted">Update your personal details and contact information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-fixhub-textDark uppercase tracking-wider">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 bg-fixhub-bgLight border border-fixhub-borderSoft rounded-lg focus:ring-2 focus:ring-fixhub-primary/30 focus:border-fixhub-primary outline-none transition-all font-medium text-fixhub-textDark"
                />
              </div>
              
              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-fixhub-textDark uppercase tracking-wider">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 bg-fixhub-bgLight border border-fixhub-borderSoft rounded-lg focus:ring-2 focus:ring-fixhub-primary/30 focus:border-fixhub-primary outline-none transition-all font-medium text-fixhub-textDark"
                />
              </div>
              
              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-fixhub-textDark uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-fixhub-bgLight border border-fixhub-borderSoft rounded-lg focus:ring-2 focus:ring-fixhub-primary/30 focus:border-fixhub-primary outline-none transition-all font-medium text-fixhub-textDark"
                />
              </div>
              
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-fixhub-textDark uppercase tracking-wider flex items-center gap-2">
                  Email Address
                  <span className="text-[10px] text-red-500 bg-red-50 px-1.5 py-0.5 border border-red-100 rounded">Locked</span>
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  disabled
                  className="w-full px-4 py-3 bg-fixhub-bgLight/50 border border-fixhub-borderSoft rounded-lg font-medium text-fixhub-textMuted cursor-not-allowed"
                />
              </div>
            </div>
            
            {/* Location Field */}
            <div className="mt-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-fixhub-textDark uppercase tracking-wider">Service Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your service area"
                  className="w-full px-4 py-3 bg-fixhub-bgLight border border-fixhub-borderSoft rounded-lg focus:ring-2 focus:ring-fixhub-primary/30 focus:border-fixhub-primary outline-none transition-all font-medium text-fixhub-textDark"
                />
              </div>
            </div>
          </section>

          {/* My Services Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-fixhub-primary/10 rounded-lg flex items-center justify-center text-fixhub-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-fixhub-textDark">My Services</h3>
                  <p className="text-sm text-fixhub-textMuted">Services you offer to customers</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/technician/add-service')}
                className="bg-fixhub-primary hover:bg-fixhub-dark text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.length > 0 ? services.map((service) => (
                <div key={service._id} className="bg-fixhub-bgLight border border-fixhub-borderSoft rounded-lg p-4">
                  <h4 className="font-bold text-fixhub-textDark mb-2">{service.serviceName}</h4>
                  <p className="text-sm text-fixhub-textMuted mb-3">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-fixhub-primary">${service.serviceCharge}</span>
                    <span className="text-xs text-fixhub-textMuted">{service.experience} years exp.</span>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-8 text-fixhub-textMuted">
                  <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p>No services added yet</p>
                  <button
                    onClick={() => navigate('/technician/add-service')}
                    className="mt-2 text-fixhub-primary hover:underline font-medium"
                  >
                    Add your first service
                  </button>
                </div>
              )}
            </div>
          </section>

          <div className="h-px bg-fixhub-borderSoft"></div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2">
            <button 
              onClick={() => navigate('/technician/dashboard')}
              className="px-8 py-4 bg-white text-fixhub-textMuted font-bold border border-fixhub-borderSoft hover:bg-fixhub-bgLight hover:text-fixhub-textDark hover:border-fixhub-primary transition-all flex items-center justify-center gap-2 shadow-sm rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-8 py-4 bg-fixhub-primary text-white font-bold hover:bg-fixhub-dark transition-all shadow-lg flex items-center justify-center gap-2 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;