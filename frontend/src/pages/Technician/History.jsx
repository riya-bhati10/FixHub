import React, { useState } from 'react';
import { useTechnician } from './context/TechnicianContext';

const History = () => {
  const { schedules } = useTechnician();
  const [selectedReview, setSelectedReview] = useState(null);
  
  const completedServices = schedules.filter(schedule => schedule.status === 'completed');
  
  const mockReviews = {
    3: {
      rating: 5,
      comment: "Excellent service! Fixed my laptop quickly and professionally. Highly recommended!",
      date: "2024-01-21"
    },
    5: {
      rating: 4,
      comment: "Good work on the refrigerator repair. Technician was punctual and knowledgeable.",
      date: "2024-01-19"
    },
    6: {
      rating: 5,
      comment: "Amazing service! My washing machine works like new. Very satisfied with the repair.",
      date: "2024-01-18"
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

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
              <p className="text-2xl font-bold text-fixhub-textDark">4.7</p>
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
              <p className="text-2xl font-bold text-fixhub-textDark">₹15,800</p>
              <p className="text-fixhub-textMuted">Total Earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {completedServices.length > 0 ? (
          completedServices.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md border border-fixhub-borderSoft p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-fixhub-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-lg">{service.customer.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-fixhub-textDark text-lg">{service.customer}</h3>
                    <p className="text-fixhub-primary font-medium">{service.service}</p>
                    <p className="text-sm text-fixhub-textMuted">{formatDate(service.date)} • {service.scheduledTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-semibold text-fixhub-primary text-lg">{service.serviceCharge}</p>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </div>
                  
                  {mockReviews[service.id] && (
                    <button
                      onClick={() => setSelectedReview(mockReviews[service.id])}
                      className="bg-fixhub-primary hover:bg-fixhub-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Review
                    </button>
                  )}
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-fixhub-textDark">{service.description}</p>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm text-fixhub-textMuted">
                <span>📍 {service.address}</span>
                <span>⏱️ Duration: {service.estimatedDuration}</span>
                <span>📞 {service.phone}</span>
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

      {/* Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-fixhub-textDark">Customer Review</h3>
              <button
                onClick={() => setSelectedReview(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">{getRatingStars(selectedReview.rating)}</div>
                <span className="text-sm text-fixhub-textMuted">({selectedReview.rating}/5)</span>
              </div>
              <p className="text-fixhub-textDark">{selectedReview.comment}</p>
            </div>
            
            <div className="text-sm text-fixhub-textMuted">
              Reviewed on {formatDate(selectedReview.date)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;