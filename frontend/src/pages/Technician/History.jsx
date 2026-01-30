import React, { useState, useEffect } from 'react';
import api from '../Landing/api';

const History = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  
  useEffect(() => {
    fetchCompletedBookings();
  }, []);

  const fetchCompletedBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/bookings/technician?status=completed');
      const bookingsData = response.data.bookings || [];
      setBookings(bookingsData);
      console.log('Completed bookings:', bookingsData);
    } catch (error) {
      console.error('Error fetching completed bookings:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const completedServices = bookings;
  
  // Calculate stats from real data
  const totalEarned = completedServices.reduce((sum, booking) => sum + (booking.service?.charge || 0), 0);
  const avgRating = 4.7; // This would come from reviews API in real implementation
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-fixhub-textDark mb-2">Service History</h1>
        <p className="text-fixhub-textMuted">View your completed service appointments and customer feedback.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-fixhub-borderSoft">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-fixhub-textDark">{completedServices.length}</p>
              <p className="text-fixhub-textMuted">Completed Jobs</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-fixhub-borderSoft">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-fixhub-textDark">{avgRating}</p>
              <p className="text-fixhub-textMuted">Avg Rating</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-fixhub-borderSoft">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-fixhub-mint rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-fixhub-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-fixhub-textDark">${totalEarned}</p>
              <p className="text-fixhub-textMuted">Total Earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* History List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fixhub-primary mx-auto mb-4"></div>
            <p className="text-fixhub-textMuted">Loading history...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {completedServices.length > 0 ? (
            completedServices.map((booking) => (
              <div key={booking.bookingId} className="bg-white rounded-lg shadow-md border border-fixhub-borderSoft p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-fixhub-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-lg">{booking.customer.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-fixhub-textDark text-lg">{booking.customer.name}</h3>
                      <p className="text-fixhub-primary font-medium">{booking.service.name}</p>
                      <p className="text-sm text-fixhub-textMuted">{formatDate(booking.serviceDate)} • {booking.timeSlot}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-semibold text-fixhub-primary text-lg">${booking.service.charge}</p>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-fixhub-textDark">{booking.issue}</p>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm text-fixhub-textMuted">
                  <span>📍 {booking.serviceLocation}</span>
                  <span>📞 {booking.customer.phone}</span>
                  <span>💰 Earned: ${booking.service.charge}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-fixhub-textDark mb-2">No Completed Services</h3>
              <p className="text-fixhub-textMuted">Your completed service history will appear here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default History;