import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TechnicianNavbar from './components/TechnicianNavbar';
import Dashboard from './Dashboard';
import MySchedules from './MySchedules';
import History from './History';
import Reviews from './Reviews';
import Notifications from './Notifications';
import Profile from './Profile';
import { TechnicianProvider } from './context/TechnicianContext';

const TechnicianDashboard = () => {
  return (
    <TechnicianProvider>
      <div className="min-h-screen bg-fixhub-bgWhite">
        <TechnicianNavbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedules" element={<MySchedules />} />
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