import React, { useState } from 'react';

const MySchedules = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const schedules = [
    {
      id: 1,
      time: '09:00 AM',
      customer: 'John Doe',
      service: 'AC Repair',
      address: '123 Main St, City',
      phone: '+1 234-567-8900',
      status: 'confirmed'
    },
    {
      id: 2,
      time: '11:30 AM',
      customer: 'Jane Smith',
      service: 'Plumbing Fix',
      address: '456 Oak Ave, City',
      phone: '+1 234-567-8901',
      status: 'pending'
    },
    {
      id: 3,
      time: '02:00 PM',
      customer: 'Mike Johnson',
      service: 'Electrical Work',
      address: '789 Pine Rd, City',
      phone: '+1 234-567-8902',
      status: 'confirmed'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-fixhub-textDark mb-2">My Schedules</h1>
        <p className="text-fixhub-textMuted">Manage your upcoming appointments and jobs.</p>
      </div>

      {/* Date Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-fixhub-textDark mb-2">
          Select Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border border-fixhub-borderSoft rounded-md focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
        />
      </div>

      {/* Schedules List */}
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="bg-white rounded-lg shadow-md border border-fixhub-borderSoft p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-fixhub-primary text-white px-3 py-1 rounded-md font-medium">
                    {schedule.time}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(schedule.status)}`}>
                    {schedule.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-fixhub-textDark mb-2">{schedule.service}</h3>
                
                <div className="space-y-2 text-sm text-fixhub-textMuted">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {schedule.customer}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {schedule.address}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {schedule.phone}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button className="bg-fixhub-primary hover:bg-fixhub-dark text-white px-4 py-2 rounded-md text-sm transition-colors">
                  Start Job
                </button>
                <button className="bg-fixhub-mint hover:bg-fixhub-primary hover:text-white text-fixhub-textDark px-4 py-2 rounded-md text-sm transition-colors">
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {schedules.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-lg font-medium text-fixhub-textDark mb-2">No schedules for this date</h3>
          <p className="text-fixhub-textMuted">Select a different date to view your appointments.</p>
        </div>
      )}
    </div>
  );
};

export default MySchedules;