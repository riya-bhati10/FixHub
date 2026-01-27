import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTechnician } from './context/TechnicianContext';
import AddService from './AddService';
const Dashboard = () => {
  const technicianName = "John Smith";
  const { serviceRequests, acceptRequest, declineRequest } = useTechnician();
  const [showAddService, setShowAddService] = useState(false);
  
  const stats = [
    { 
      title: 'Total Jobs', 
      value: '24', 
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
      value: '18', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      color: 'bg-green-500' 
    },
    { 
      title: 'Pending', 
      value: '4', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      color: 'bg-yellow-500' 
    },
    { 
      title: 'Cancelled', 
      value: '2', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      color: 'bg-red-500' 
    }
  ];

  const handleAccept = (requestId) => {
    acceptRequest(requestId);
  };

  const handleDecline = (requestId) => {
    declineRequest(requestId);
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
          <h1 className="text-3xl font-bold text-fixhub-textDark mb-2">Welcome back, {technicianName}!</h1>
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
        {stats.map((stat, index) => (
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
            {serviceRequests.map((request) => (
              <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-fixhub-primary transition-colors">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-fixhub-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-medium">{request.customer.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.customer}</h3>
                    <p className="text-fixhub-primary font-medium">{request.service}</p>
                    <p className="text-gray-600 text-sm mt-1">{request.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {request.location}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {request.phone}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {request.preferredTime}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z" />
                    </svg>
                    {request.requestedDate}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded text-sm font-medium transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(request.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded text-sm font-medium transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
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
          <AddService onClose={() => setShowAddService(false)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;