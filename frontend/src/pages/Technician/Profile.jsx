import React, { useState, useEffect } from 'react';
import userService from '../../Services/userService';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const data = await userService.getUserProfile();
      setUserData(data);
      setFormData({
        firstname: data.fullname?.firstname || '',
        lastname: data.fullname?.lastname || '',
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const updateData = {
        fullname: {
          firstname: formData.firstname,
          lastname: formData.lastname
        },
        email: formData.email,
        phone: formData.phone,
        location: formData.location
      };
      
      await userService.updateUserProfile(updateData);
      await fetchUserProfile();
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fixhub-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md border border-fixhub-borderSoft">
        <div className="px-6 py-4 border-b border-fixhub-borderSoft flex justify-between items-center">
          <h1 className="text-2xl font-bold text-fixhub-textDark">Profile Settings</h1>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-fixhub-primary hover:bg-fixhub-dark text-white px-4 py-2 rounded-lg transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    firstname: userData.fullname?.firstname || '',
                    lastname: userData.fullname?.lastname || '',
                    email: userData.email || '',
                    phone: userData.phone || '',
                    location: userData.location || ''
                  });
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 bg-fixhub-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
              {userData?.fullname?.firstname?.charAt(0) || 'T'}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-fixhub-textDark">
                {userData?.fullname?.firstname} {userData?.fullname?.lastname}
              </h2>
              <p className="text-fixhub-textMuted capitalize">{userData?.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-fixhub-textDark mb-2">
                First Name
              </label>
              {editing ? (
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                />
              ) : (
                <p className="text-fixhub-textMuted">{userData?.fullname?.firstname}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-fixhub-textDark mb-2">
                Last Name
              </label>
              {editing ? (
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                />
              ) : (
                <p className="text-fixhub-textMuted">{userData?.fullname?.lastname}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-fixhub-textDark mb-2">
                Email
              </label>
              {editing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                />
              ) : (
                <p className="text-fixhub-textMuted">{userData?.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-fixhub-textDark mb-2">
                Phone
              </label>
              {editing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                />
              ) : (
                <p className="text-fixhub-textMuted">{userData?.phone}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-fixhub-textDark mb-2">
                Location
              </label>
              {editing ? (
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                />
              ) : (
                <p className="text-fixhub-textMuted">{userData?.location}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-fixhub-textDark mb-2">
                Role
              </label>
              <p className="text-fixhub-textMuted capitalize">{userData?.role}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-fixhub-textDark mb-2">
                Member Since
              </label>
              <p className="text-fixhub-textMuted">
                {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;