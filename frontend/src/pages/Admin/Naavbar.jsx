import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.png';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  
  const navLinks = [
  { path: '/admin', label: 'Dashboard' },
  { path: '/admin/customers', label: 'Customers' },
  { path: '/admin/technicians', label: 'Technicians' },
];

  return (
    <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
    `}</style>
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40 font-['Manrope']">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/admin')}>
            <div className="flex items-center gap-3">
              <img src={logo} alt="FixHub Logo" className="h-12 w-12" />
              <span className="text-2xl font-extrabold text-[#1F7F85] tracking-tight">FixHub</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path}
                to={link.path} 
                className={({ isActive }) => `text-sm font-bold transition-all duration-200 ${isActive ? "text-[#1F7F85]" : "text-slate-500 hover:text-[#1F7F85]"}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-[#1F7F85] hover:bg-slate-50 rounded-full transition-all relative">
              <span className="material-symbols-outlined text-2xl">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            {/* Avatar Dropdown */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1F7F85] to-[#0F4C5C] flex items-center justify-center text-white hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1F7F85]/30"
              >
                <span className="material-symbols-outlined text-xl">account_circle</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#1F7F85] transition-colors flex items-center gap-2"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <span className="material-symbols-outlined text-lg">person</span>
                    Profile Settings
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/');
                    }}
                  >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    Log Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-[#1F7F85] p-2 transition-colors"
              >
                <span className="material-symbols-outlined text-3xl">
                  {isMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 animate-fade-in-down">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `px-4 py-3 rounded-lg text-sm font-bold transition-colors flex items-center gap-3 ${isActive ? "bg-[#1F7F85]/10 text-[#1F7F85]" : "text-slate-600 hover:bg-slate-50 hover:text-[#1F7F85]"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="border-t border-slate-100 my-2"></div>
              <Link
                to="/admin/profile"
                className="px-4 py-3 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#1F7F85] transition-colors flex items-center gap-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-xl">person</span>
                Profile
              </Link>
              <button
                className="w-full text-left px-4 py-3 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-3"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/');
                }}
              >
                <span className="material-symbols-outlined text-xl">logout</span>
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