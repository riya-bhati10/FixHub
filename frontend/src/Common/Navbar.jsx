import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useUser } from '../context/UserContext';
import logo from '/logo.png';

const Navbar = ({ 
  userType = 'landing',
  navLinks = [],
  showProfile = false,
  showNotifications = false,
  onLogout = null
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { user, clearUser } = useUser();

  useEffect(() => {
    console.log('Navbar - Current user:', user);
    if (showNotifications && user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user, showNotifications]);

  useEffect(() => {
    if (userType === 'landing') {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [userType]);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch('http://localhost:5000/api/notifications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setNotifications(data.slice(0, 5));
      setUnreadCount(data.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/notifications/clear-all', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  const isLanding = userType === 'landing';
  const shouldShowTransparent = isLanding && !scrolled;
  const bgClass = shouldShowTransparent ? 'bg-transparent' : 'bg-white';
  const textClass = shouldShowTransparent ? 'text-white' : 'text-slate-600';
  const logoTextClass = shouldShowTransparent ? 'text-white' : 'text-[#1F7F85]';
  const shadowClass = shouldShowTransparent ? '' : 'shadow-sm border-b border-slate-200';

  const handleLogout = async () => {
    try {
      toast.success('Logging out...', {
        duration: 2000,
        style: { 
          backgroundColor: "#257c8a", 
          color: "#fff",
          border: "none"
        }
      });
      
      // Small delay to show toast before logout
      setTimeout(async () => {
        await clearUser();
        if (onLogout) {
          onLogout();
        } else {
          navigate('/login');
        }
      }, 1000);
      
    } catch (error) {
      toast.error('Logout failed', {
        duration: 4000,
        style: { 
          backgroundColor: "#dc2626", 
          color: "#fff",
          border: "none"
        }
      });
    } finally {
      setIsProfileOpen(false);
      setIsMenuOpen(false);
    }
  };

  const getUserInitial = () => {
    console.log('Getting user initial for:', user);
    if (user?.fullname?.firstname) {
      const initial = user.fullname.firstname.charAt(0).toUpperCase();
      console.log('User initial:', initial);
      return initial;
    }
    // Fallback to localStorage if user context not loaded yet
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.fullname?.firstname) {
          return parsedUser.fullname.firstname.charAt(0).toUpperCase();
        }
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }
    // Final fallback based on userType
    if (userType === 'technician') return 'T';
    if (userType === 'admin') return 'A';
    if (userType === 'customer') return 'C';
    return 'U';
  };

  const getUserName = () => {
    if (user?.fullname) {
      return `${user.fullname.firstname} ${user.fullname.lastname || ''}`;
    }
    // Fallback to localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.fullname) {
          return `${parsedUser.fullname.firstname} ${parsedUser.fullname.lastname || ''}`;
        }
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }
    return 'User';
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
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate(isLanding ? '/' : userType === 'customer' ? '/customer/dashboard' : '/technician/dashboard')}>
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
              <div className="relative">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className={`w-10 h-10 flex items-center justify-center ${textClass} hover:text-[#1F7F85] hover:bg-slate-50 rounded-full transition-all relative`}
                >
                  <span className="material-symbols-outlined text-2xl">notifications</span>
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-[#1f7f85]">
                    <h3 className="text-sm font-bold text-white ">Notifications</h3>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearAllNotifications}
                        className="text-xs text-red-500 hover:text-red-700 font-medium"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                    {notifications.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {notifications.map((notif) => (
                          <div
                            key={notif._id}
                            onClick={() => {
                              if (notif.type !== 'otp') {
                                markAsRead(notif._id);
                              }
                            }}
                            className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                              !notif.read ? 'bg-blue-50' : ''
                            } ${notif.type === 'otp' ? 'bg-purple-50 border-l-4 border-purple-500' : ''}`}
                          >
                            <div className="flex items-start gap-3">
                              <span className={`material-symbols-outlined text-xl mt-0.5 ${
                                notif.type === 'otp' ? 'text-purple-600' : 'text-[#1F7F85]'
                              }`}>
                                {notif.type === 'booking_request' ? 'event' : 
                                 notif.type === 'booking_accepted' ? 'check_circle' :
                                 notif.type === 'booking_completed' ? 'task_alt' :
                                 notif.type === 'booking_cancelled' ? 'cancel' :
                                 notif.type === 'otp' ? 'lock' :
                                 notif.type === 'review_received' ? 'star' : 'notifications'}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-bold ${
                                  notif.type === 'otp' ? 'text-purple-900' : 'text-slate-900'
                                }`}>{notif.title}</p>
                                <p className={`text-xs mt-1 ${
                                  notif.type === 'otp' ? 'text-purple-700 font-semibold' : 'text-slate-600'
                                }`}>{notif.message}</p>
                                {notif.type === 'otp' && notif.data?.otp && (
                                  <div className="mt-2 p-2 bg-white rounded border-2 border-purple-300">
                                    <p className="text-xs text-purple-600 font-bold mb-1">Your OTP:</p>
                                    <p className="text-2xl font-black text-purple-900 tracking-widest text-center">
                                      {notif.data.otp}
                                    </p>
                                  </div>
                                )}
                                <p className="text-xs text-slate-400 mt-1">
                                  {new Date(notif.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              {!notif.read && notif.type !== 'otp' && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <span className="material-symbols-outlined text-4xl text-slate-300">notifications_off</span>
                        <p className="text-sm text-slate-500 mt-2">No notifications</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
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