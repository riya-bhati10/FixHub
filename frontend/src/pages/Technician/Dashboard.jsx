import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTechnician } from './context/TechnicianContext';
import AddService from './AddService';
import { serviceApi } from '../../Services/serviceApi';
import api from '../Landing/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    cancelled: 0
  });
  const { serviceRequests, acceptRequest, declineRequest } = useTechnician();
  const [showAddService, setShowAddService] = useState(false);
  const [myServices, setMyServices] = useState([]);
  const [showAllServices, setShowAllServices] = useState(false);
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    fetchBookings();
    fetchMyServices();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/technician');
      const bookingsData = response.data.bookings || [];
      setBookings(bookingsData);
      
      // Calculate stats
      const newStats = {
        total: bookingsData.length,
        completed: bookingsData.filter(b => b.status === 'completed').length,
        pending: bookingsData.filter(b => b.status === 'pending').length,
        cancelled: bookingsData.filter(b => b.status === 'cancelled').length
      };
      setStats(newStats);
      
      console.log('Technician bookings:', bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchMyServices = async () => {
    try {
      const response = await serviceApi.getMyServices();
      const servicesData = response.data.services || [];
      setMyServices(servicesData);
      console.log('My services:', servicesData);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };
  
  const statsData = [
    { 
      title: 'Total Jobs', 
      value: stats.total.toString(), 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), 
      color: 'bg-fixhub-primary' 
    },
    { 
      title: 'Completed', 
      value: stats.completed.toString(), 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      color: 'bg-green-500' 
    },
    { 
      title: 'Pending', 
      value: stats.pending.toString(), 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      color: 'bg-yellow-500' 
    },
    { 
      title: 'Cancelled', 
      value: stats.cancelled.toString(), 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      color: 'bg-red-500' 
    }
  ];

  const handleAccept = async (bookingId) => {
    try {
      await api.patch(`/bookings/${bookingId}/accept`);
      fetchBookings(); // Refresh bookings
      alert('Booking accepted successfully!');
    } catch (error) {
      console.error('Error accepting booking:', error);
      alert('Failed to accept booking');
    }
  };

  const handleDecline = async (bookingId) => {
    try {
      await api.patch(`/bookings/${bookingId}/cancel`);
      fetchBookings(); // Refresh bookings
      alert('Booking cancelled successfully!');
    } catch (error) {
      console.error('Error declining booking:', error);
      alert('Failed to cancel booking');
    }
  };

  const quickActions = [
    {
      title: 'Total Work Done',
      description: 'View completed jobs',
      link: '/technician/history',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      color: 'bg-fixhub-primary'
    },
    {
      title: 'My Schedules',
      description: 'View upcoming jobs',
      link: '/technician/schedules',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z" />
        </svg>
      ),
      color: 'bg-blue-500'
    },
    {
      title: 'Reviews & Ratings',
      description: 'View customer feedback',
      link: '/technician/reviews',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-fixhub-textDark mb-2">
            Welcome back, {user ? `${user.fullname.firstname} ${user.fullname.lastname}` : 'Technician'}!
          </h1>
          <p className="text-fixhub-textMuted">Here's what's happening with your jobs today.</p>
        </div>
        <button
          onClick={() => setShowAddService(true)}
          className="bg-fixhub-primary hover:bg-fixhub-dark text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-fixhub-borderSoft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-fixhub-textMuted text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-fixhub-textDark">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md border border-fixhub-borderSoft mb-8">
        <div className="px-6 py-4 border-b border-fixhub-borderSoft">
          <h2 className="text-xl font-semibold text-fixhub-textDark">Service Requests</h2>
          <p className="text-sm text-fixhub-textMuted mt-1">New booking requests waiting for your response</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bookings.filter(booking => booking.status === 'pending').length > 0 ? (
              bookings.filter(booking => booking.status === 'pending').map((booking) => (
                <div key={booking.bookingId} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-fixhub-primary transition-colors">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-10 h-10 bg-fixhub-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium">{booking.customer.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.customer.name}</h3>
                      <p className="text-fixhub-primary font-medium">{booking.service.name}</p>
                      <p className="text-gray-600 text-sm mt-1">{booking.issue}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {booking.customer.phone}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {booking.timeSlot}
                    </div>
                    <div className="flex items-center col-span-2">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z" />
                      </svg>
                      {new Date(booking.serviceDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAccept(booking.bookingId)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded text-sm font-medium transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(booking.bookingId)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded text-sm font-medium transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-fixhub-textMuted">
                <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p>No pending service requests</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Added Services Section --- */}
      <div className="bg-white rounded-lg shadow-md border border-fixhub-borderSoft mb-8">
        <div className="px-6 py-4 border-b border-fixhub-borderSoft flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-fixhub-textDark">My Services</h2>
            <p className="text-sm text-fixhub-textMuted mt-1">Latest services you are offering</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-fixhub-primary/10 text-fixhub-primary px-3 py-1 rounded-full text-xs font-bold">
              {myServices.length} Active
            </span>
            {myServices.length > 6 && (
              <button
                onClick={() => setShowAllServices(!showAllServices)}
                className="text-fixhub-primary hover:text-fixhub-dark text-sm font-medium"
              >
                {showAllServices ? 'Show Less' : 'View All'}
              </button>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAllServices ? myServices : myServices.slice(0, 6)).map((service) => (
              <div key={service._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-gray-50">
                <div className="h-32 bg-gray-200 flex items-center justify-center">
                   <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{service.serviceName}</h3>
                    <span className="text-fixhub-primary font-bold">₹{service.serviceCharge}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">{service.experience} Years</span>
                      <span>Experience</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-medium text-gray-700">{service.completedJobs}</span>
                      <span>Jobs Done</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {myServices.length === 0 && (
            <div className="text-center py-8 text-fixhub-textMuted">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p>No services created yet. Click "Add New Service" to get started.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className={`${action.color} hover:opacity-90 text-white p-6 rounded-lg transition-all hover:scale-105 block`}
          >
            <div className="text-center">
              <div className="flex justify-center mb-3">
                {action.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {showAddService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <AddService 
            onClose={() => setShowAddService(false)} 
            onServiceAdded={() => {
              fetchBookings();
              fetchMyServices(); // Refresh services after adding new one
              setShowAddService(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;