import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../Common/Navbar';
import Dashboard from './Dashboard';
import MySchedules from './MySchedules';
import MyServices from './MyServices';
import History from './History';
import Reviews from './Reviews';
import Notifications from './Notifications';
import Profile from './Profile';
import { TechnicianProvider } from './context/TechnicianContext';

const TechnicianDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await userService.getUserProfile();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const technicianNavLinks = [
    { path: '/technician/dashboard', label: 'Dashboard' },
    { path: '/technician/schedules', label: 'My Schedules' },
    { path: '/technician/history', label: 'History' },
  ];

  const getUserName = () => {
    if (userData?.fullname?.firstname) {
      return `${userData.fullname.firstname} ${userData.fullname.lastname || ''}`;
    }
    return 'Technician';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fixhub-bgWhite flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fixhub-primary"></div>
      </div>
    );
  }

  return (
    <TechnicianProvider>
      <div className="min-h-screen bg-fixhub-bgWhite">
        <Navbar 
          userType="technician"
          navLinks={technicianNavLinks}
          showProfile={true}
          showNotifications={true}
          userName={getUserName()}
          onLogout={handleLogout}
        />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedules" element={<MySchedules />} />
            <Route path="/my-services" element={<MyServices />} />
            <Route path="/history" element={<History />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </TechnicianProvider>
  );
};

export default TechnicianDashboard;