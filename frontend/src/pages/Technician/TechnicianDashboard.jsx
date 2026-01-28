import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../Common/Navbar';
import Dashboard from './Dashboard';
import MySchedules from './MySchedules';
import History from './History';
import Reviews from './Reviews';
import Notifications from './Notifications';
import { TechnicianProvider } from './context/TechnicianContext';

const TechnicianDashboard = () => {
  const technicianNavLinks = [
    { path: '/technician/dashboard', label: 'Dashboard' },
    { path: '/technician/schedules', label: 'My Schedules' },
    { path: '/technician/history', label: 'History' },
  ];

  return (
    <TechnicianProvider>
      <div className="min-h-screen bg-fixhub-bgWhite">
        <Navbar 
          userType="technician"
          navLinks={technicianNavLinks}
          showProfile={true}
          showNotifications={true}
          userName="Technician"
        />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedules" element={<MySchedules />} />
            <Route path="/history" element={<History />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </div>
    </TechnicianProvider>
  );
};

export default TechnicianDashboard;