import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/logo.png';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="FixHub Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-[#1F7F85]">FixHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-[#1F7F85] font-medium transition-colors">
              Home
            </Link>
            <Link to="/my-booking" className="text-slate-600 hover:text-[#1F7F85] font-medium transition-colors">
              My booking
            </Link>
            <Link to="/book-service" className="text-slate-600 hover:text-[#1F7F85] font-medium transition-colors">
              Book Service
            </Link>
            <Link to="/dashboard" className="text-slate-600 hover:text-[#1F7F85] font-medium transition-colors">
              Dashboard
            </Link>
            <Link to="/profile" className="text-slate-600 hover:text-[#1F7F85] font-medium transition-colors">
              Profile
            </Link>
            <button className="bg-[#1F7F85] text-white px-4 py-2 rounded-lg hover:bg-[#0F4C5C] transition-colors font-medium">
              Logout
            </button>
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-slate-600 hover:text-[#1F7F85] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-slate-600 hover:text-[#1F7F85] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/book-service"
                className="text-slate-600 hover:text-[#1F7F85] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Service
              </Link>
              <Link
                to="/dashboard"
                className="text-slate-600 hover:text-[#1F7F85] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
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
  );
};

export default Navbar;