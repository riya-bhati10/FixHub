import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '/logo.png';

const Navbar = ({ 
  userType = 'landing', // 'landing', 'customer', 'technician', 'admin'
  navLinks = [],
  showProfile = false,
  showNotifications = false,
  userName = '',
  onLogout = null,
  isScrolled = false
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (userType === 'landing') {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [userType]);

  const isLanding = userType === 'landing';
  const shouldShowTransparent = isLanding && !scrolled;
  const bgClass = shouldShowTransparent ? 'bg-transparent' : 'bg-white';
  const textClass = shouldShowTransparent ? 'text-white' : 'text-slate-600';
  const logoTextClass = shouldShowTransparent ? 'text-white' : 'text-[#1F7F85]';
  const shadowClass = shouldShowTransparent ? '' : 'shadow-sm border-b border-slate-200';

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate('/login');
    }
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  const getUserInitial = () => {
    if (userName) return userName.charAt(0).toUpperCase();
    if (userType === 'technician') return 'T';
    if (userType === 'admin') return 'A';
    return 'U';
  };

  return (
    <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
    `}</style>
    <nav className={`${bgClass} ${shadowClass} ${isLanding ? 'fixed' : 'sticky'} top-0 left-0 right-0 w-full z-50 transition-all duration-300 font-['Manrope']`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate(isLanding ? '/' : '/dashboard')}>
            <div className="flex items-center gap-3">
              <img src={logo} alt="FixHub Logo" className="h-16 w-16 sm:h-20 sm:w-20" />
              <span className={`text-xl sm:text-2xl font-extrabold ${logoTextClass} tracking-tight transition-colors`}>FixHub</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path}
                to={link.path} 
                className={({ isActive }) => {
                  if (isLanding) {
                    return `text-base font-bold transition-all duration-200 ${
                      isActive 
                        ? 'text-cyan-500' 
                        : shouldShowTransparent 
                          ? 'text-white hover:text-cyan-400' 
                          : 'text-slate-600 hover:text-cyan-500'
                    }`;
                  }
                  return `text-base font-bold transition-all duration-200 ${
                    isActive ? 'text-cyan-500' : 'text-slate-500 hover:text-cyan-500'
                  }`;
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Landing Page Auth Buttons */}
            {isLanding && (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/login"
                  className={`font-medium transition-colors ${
                    shouldShowTransparent
                      ? 'text-white hover:text-[#1F7F85]'
                      : 'text-slate-600 hover:text-[#1F7F85]'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`border px-4 py-2 rounded-lg font-medium transition-colors ${
                    shouldShowTransparent
                      ? 'border-white text-white hover:bg-white hover:text-slate-900'
                      : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Notification Bell */}
            {showNotifications && (
              <button className={`w-10 h-10 flex items-center justify-center ${textClass} hover:text-[#1F7F85] hover:bg-slate-50 rounded-full transition-all relative`}>
                <span className="material-symbols-outlined text-2xl">notifications</span>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            )}

            {/* Avatar Dropdown */}
            {showProfile && (
              <div className="hidden md:block relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-[#1F7F85] flex items-center justify-center text-white hover:bg-[#1F7F85]/90 transition-colors focus:outline-none"
                >
                  <span className="text-sm font-bold">{getUserInitial()}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                    <Link
                      to={`/${userType}/profile`}
                      className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#1F7F85] transition-colors flex items-center gap-2"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <span className="material-symbols-outlined text-lg">person</span>
                      Profile Settings
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                      onClick={handleLogout}
                    >
                      <span className="material-symbols-outlined text-lg">logout</span>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${textClass} hover:text-[#1F7F85] p-2 transition-colors`}
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
          <div className="md:hidden bg-white border-t border-slate-100 py-4">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `px-4 py-3 rounded-lg text-sm font-bold transition-colors flex items-center gap-3 ${isActive ? "bg-cyan-50 text-cyan-600" : "text-slate-600 hover:bg-slate-50 hover:text-cyan-500"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              
              {/* Landing Page Mobile Auth */}
              {isLanding && (
                <>
                  <div className="border-t border-slate-100 my-2"></div>
                  <Link
                    to="/login"
                    className="px-4 py-3 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#1F7F85] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="mx-4 py-3 px-4 bg-[#1F7F85] text-white rounded-lg text-sm font-bold text-center transition-colors hover:bg-[#1F7F85]/90"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              
              {/* Authenticated User Mobile Menu */}
              {showProfile && (
                <>
                  <div className="border-t border-slate-100 my-2"></div>
                  <Link
                    to={`/${userType}/profile`}
                    className="px-4 py-3 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#1F7F85] transition-colors flex items-center gap-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="material-symbols-outlined text-xl">person</span>
                    Profile
                  </Link>
                  <button
                    className="w-full text-left px-4 py-3 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-3"
                    onClick={handleLogout}
                  >
                    <span className="material-symbols-outlined text-xl">logout</span>
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;