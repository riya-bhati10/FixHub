import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/Logo.png';

const TechnicianNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.includes(path);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-fixhub-borderSoft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="FixHub" className="w-12 h-12 rounded-lg mr-2" />
              <span className="text-xl font-bold text-fixhub-textDark">FixHub</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/technician/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-fixhub-primary bg-fixhub-mint/20'
                    : 'text-fixhub-textMuted hover:text-fixhub-primary hover:bg-fixhub-mint/10'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/technician/schedules"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/schedules')
                    ? 'text-fixhub-primary bg-fixhub-mint/20'
                    : 'text-fixhub-textMuted hover:text-fixhub-primary hover:bg-fixhub-mint/10'
                }`}
              >
                My Schedules
              </Link>
              <Link
                to="/technician/history"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/history')
                    ? 'text-fixhub-primary bg-fixhub-mint/20'
                    : 'text-fixhub-textMuted hover:text-fixhub-primary hover:bg-fixhub-mint/10'
                }`}
              >
                History
              </Link>
            </div>
          </div>

          {/* Right side - Notifications & Profile */}
          <div className="flex items-center space-x-4">
            {/* Bell Icon */}
            <button className="p-2 text-fixhub-textMuted hover:text-fixhub-primary transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-fixhub-mint/10 transition-colors"
              >
                <div className="w-8 h-8 bg-fixhub-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">T</span>
                </div>
                <svg className="w-4 h-4 text-fixhub-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-fixhub-borderSoft z-50">
                  <div className="py-1">
                    <Link
                      to="/technician/profile"
                      className="block px-4 py-2 text-sm text-fixhub-textDark hover:bg-fixhub-mint/10 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TechnicianNavbar;