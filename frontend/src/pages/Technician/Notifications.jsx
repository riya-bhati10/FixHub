import React, { useState } from 'react';

const Notifications = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  
  const notifications = [
    {
      id: 1,
      type: 'request',
      title: 'New Service Request',
      message: 'John Doe has requested Smartphone Repair service for cracked iPhone screen',
      time: '5 minutes ago',
      read: false,
      details: 'Customer needs iPhone 12 screen replacement. Touch functionality is completely lost. Customer available between 10 AM - 12 PM today.'
    },
    {
      id: 2,
      type: 'review',
      title: 'New Review Received',
      message: 'Jane Smith left a 5-star review for your washing machine repair service',
      time: '1 hour ago',
      read: false,
      details: '"Excellent service! My washing machine is working perfectly now. The technician was very professional and fixed the issue quickly. Highly recommended!" - Jane Smith'
    },
    {
      id: 3,
      type: 'admin',
      title: 'System Update',
      message: 'New features have been added to your technician dashboard',
      time: '2 hours ago',
      read: true,
      details: 'We have added new features including: Real-time chat with customers, Enhanced job tracking, New payment methods, and Improved notification system.'
    },
    {
      id: 4,
      type: 'request',
      title: 'Service Request Accepted',
      message: 'Your acceptance for Mike Johnson\'s laptop repair has been confirmed',
      time: '3 hours ago',
      read: true,
      details: 'Customer Mike Johnson has confirmed your acceptance for laptop overheating and battery charging issue. Service scheduled for tomorrow 4-6 PM.'
    },
    {
      id: 5,
      type: 'admin',
      title: 'Payment Processed',
      message: 'Your payment of ₹2,500 for completed TV repair job has been processed',
      time: '1 day ago',
      read: true,
      details: 'Payment for Samsung 55" Smart TV repair has been successfully processed. Amount: ₹2,500. Transaction ID: TXN123456789. Amount will be credited to your account within 24 hours.'
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'request':
        return (
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        );
      case 'review':
        return (
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        );
      case 'admin':
        return (
          <div className="w-10 h-10 bg-fixhub-primary rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        );
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-fixhub-textDark mb-2">Notifications</h1>
        <p className="text-fixhub-textMuted">
          You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-md border p-6 transition-all hover:shadow-lg cursor-pointer ${
              !notification.read 
                ? 'border-fixhub-primary bg-fixhub-mint/5' 
                : 'border-fixhub-borderSoft'
            }`}
            onClick={() => setSelectedNotification(notification)}
          >
            <div className="flex items-start space-x-4">
              {getNotificationIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${
                      !notification.read ? 'text-fixhub-textDark' : 'text-fixhub-textMuted'
                    }`}>
                      {notification.title}
                      {!notification.read && (
                        <span className="ml-2 w-2 h-2 bg-fixhub-primary rounded-full inline-block"></span>
                      )}
                    </h3>
                    <p className="text-fixhub-textMuted mt-1">{notification.message}</p>
                  </div>
                  <span className="text-sm text-fixhub-textMuted whitespace-nowrap ml-4">
                    {notification.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notification Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getNotificationIcon(selectedNotification.type)}
                  <h2 className="text-xl font-semibold text-fixhub-textDark">
                    {selectedNotification.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-fixhub-textMuted mt-1">{selectedNotification.time}</p>
            </div>
            <div className="p-6">
              <p className="text-fixhub-textDark leading-relaxed">
                {selectedNotification.details}
              </p>
            </div>
          </div>
        </div>
      )}

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔔</div>
          <h3 className="text-lg font-medium text-fixhub-textDark mb-2">No notifications</h3>
          <p className="text-fixhub-textMuted">You're all caught up! New notifications will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;