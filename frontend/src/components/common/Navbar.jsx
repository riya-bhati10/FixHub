import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../public/logo.png';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');`}</style>
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="FixHub Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-[#1F7F85]">FixHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? "text-[#1F7F85] font-bold transition-colors" : "text-slate-600 hover:text-[#1F7F85] font-bold transition-colors"}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/book-service" 
              className={({ isActive }) => isActive ? "text-[#1F7F85] font-bold transition-colors" : "text-slate-600 hover:text-[#1F7F85] font-bold transition-colors"}
            >
              Book Service
            </NavLink>
            <NavLink 
              to="/my-booking" 
              className={({ isActive }) => isActive ? "text-[#1F7F85] font-bold transition-colors" : "text-slate-600 hover:text-[#1F7F85] font-bold transition-colors"}
            >
              My Bookings
            </NavLink>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1F7F85] hover:border-[#1F7F85] transition-all relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            {/* Avatar Dropdown */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full bg-[#1F7F85]/10 flex items-center justify-center text-[#1F7F85] hover:bg-[#1F7F85]/20 transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined">person</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1F7F85]"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1F7F85]"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-[#1F7F85] p-2"
            >
              <span className="material-symbols-outlined">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="flex flex-col space-y-4">
             
              <NavLink
                to="/dashboard"
                className="text-slate-600 hover:text-[#1F7F85] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/book-service"
                className="text-slate-600 hover:text-[#1F7F85] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Service
              </NavLink>
              <NavLink
                to="/my-booking"
                className="text-slate-600 hover:text-[#1F7F85] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                My Bookings
              </NavLink>
              <Link
                to="/profile"
                className="text-slate-600 hover:text-[#1F7F85] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                className="bg-[#1F7F85] text-white px-4 py-2 rounded-lg hover:bg-[#0F4C5C] transition-colors font-medium text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;