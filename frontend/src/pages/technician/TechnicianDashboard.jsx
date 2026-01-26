import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TechnicianNavbar from './components/TechnicianNavbar';
import Dashboard from './Dashboard';
import MySchedules from './MySchedules';
import History from './History';

const TechnicianDashboard = () => {
  return (
    <div className="min-h-screen bg-fixhub-bgWhite">
      <TechnicianNavbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedules" element={<MySchedules />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </div>
  );
};

export default TechnicianDashboard;