import React, { useState } from 'react';
import { useTechnician } from './context/TechnicianContext';

const MySchedules = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeFilter, setActiveFilter] = useState('all');
  const { schedules, updateScheduleStatus } = useTechnician();
  const filters = [
    { key: 'all', label: 'All', count: schedules.length },
    { key: 'pending', label: 'Pending', count: schedules.filter(s => s.status === 'pending').length },
    { key: 'accepted', label: 'Accepted', count: schedules.filter(s => s.status === 'accepted').length },
    { key: 'completed', label: 'Completed', count: schedules.filter(s => s.status === 'completed').length },
    { key: 'cancelled', label: 'Cancelled', count: schedules.filter(s => s.status === 'cancelled').length }
  ];

  const filteredSchedules = activeFilter === 'all' 
    ? schedules 
    : schedules.filter(schedule => schedule.status === activeFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleStatusChange = (scheduleId, newStatus) => {
    updateScheduleStatus(scheduleId, newStatus);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-fixhub-textDark mb-2">My Schedules</h1>
        <p className="text-fixhub-textMuted">Manage your service appointments and track job progress.</p>
      </div>

      {/* Filters and Date Selector */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === filter.key
                  ? 'bg-fixhub-primary text-white'
                  : 'bg-white text-fixhub-textDark border border-fixhub-borderSoft hover:bg-fixhub-mint/10'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Date Selector */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-fixhub-textDark">Filter by Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-fixhub-borderSoft rounded-md focus:outline-none focus:ring-2 focus:ring-fixhub-primary text-sm"
          />
        </div>
      </div>

      {/* Schedules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSchedules.map((schedule) => (
          <div key={schedule.id} className="bg-white rounded-lg shadow-md border border-fixhub-borderSoft p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-fixhub-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">{schedule.customer.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-fixhub-textDark">{schedule.customer}</h3>
                  <p className="text-fixhub-primary font-medium">{schedule.service}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(schedule.status)}`}>
                  {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                </span>
                <span className={`text-xs font-medium ${getPriorityColor(schedule.priority)}`}>
                  {schedule.priority.toUpperCase()} Priority
                </span>
              </div>
            </div>

            {/* Service Details */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-fixhub-textDark">{schedule.description}</p>
            </div>

            {/* Schedule Info */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-fixhub-textDark font-medium">{schedule.scheduledTime}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z" />
                </svg>
                <span className="text-fixhub-textDark">{schedule.date}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-fixhub-textDark text-xs">{schedule.address}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-fixhub-textDark">{schedule.phone}</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex justify-between items-center mb-4 p-3 bg-fixhub-bgCard rounded-lg">
              <div className="text-center">
                <p className="text-xs text-fixhub-textMuted">Duration</p>
                <p className="font-medium text-fixhub-textDark">{schedule.estimatedDuration}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-fixhub-textMuted">Service Charge</p>
                <p className="font-medium text-fixhub-primary">{schedule.serviceCharge}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {schedule.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleStatusChange(schedule.id, 'accepted')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(schedule.id, 'cancelled')}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                  >
                    Decline
                  </button>
                </>
              )}
              {schedule.status === 'accepted' && (
                <>
                  <button
                    onClick={() => handleStatusChange(schedule.id, 'completed')}
                    className="flex-1 bg-fixhub-primary hover:bg-fixhub-dark text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                  >
                    Mark Complete
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors">
                    Contact Customer
                  </button>
                </>
              )}
              {schedule.status === 'completed' && (
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors">
                  View Details
                </button>
              )}
              {schedule.status === 'cancelled' && (
                <button className="w-full bg-gray-400 text-white py-2 px-3 rounded text-sm font-medium cursor-not-allowed">
                  Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredSchedules.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-lg font-medium text-fixhub-textDark mb-2">No schedules found</h3>
          <p className="text-fixhub-textMuted">No appointments match the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default MySchedules;