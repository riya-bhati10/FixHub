import React, { useState } from 'react';

const History = () => {
  const [filter, setFilter] = useState('all');

  const historyData = [
    {
      id: 1,
      date: '2024-01-15',
      customer: 'John Doe',
      service: 'AC Repair',
      status: 'completed',
      rating: 5,
      earnings: '$120'
    },
    {
      id: 2,
      date: '2024-01-14',
      customer: 'Jane Smith',
      service: 'Plumbing Fix',
      status: 'completed',
      rating: 4,
      earnings: '$85'
    },
    {
      id: 3,
      date: '2024-01-13',
      customer: 'Mike Johnson',
      service: 'Electrical Work',
      status: 'cancelled',
      rating: null,
      earnings: '$0'
    },
    {
      id: 4,
      date: '2024-01-12',
      customer: 'Sarah Wilson',
      service: 'Appliance Repair',
      status: 'completed',
      rating: 5,
      earnings: '$95'
    }
  ];

  const filteredHistory = filter === 'all' 
    ? historyData 
    : historyData.filter(item => item.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating) => {
    if (!rating) return <span className="text-fixhub-textMuted">No rating</span>;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-fixhub-textMuted">({rating})</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-fixhub-textDark mb-2">Job History</h1>
        <p className="text-fixhub-textMuted">View your completed jobs and earnings history.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-fixhub-borderSoft">
          <h3 className="text-lg font-semibold text-fixhub-textDark mb-2">Total Jobs</h3>
          <p className="text-3xl font-bold text-fixhub-primary">{historyData.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-fixhub-borderSoft">
          <h3 className="text-lg font-semibold text-fixhub-textDark mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600">
            {historyData.filter(item => item.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-fixhub-borderSoft">
          <h3 className="text-lg font-semibold text-fixhub-textDark mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold text-fixhub-primary">
            ${historyData.reduce((sum, item) => sum + parseInt(item.earnings.replace('$', '')), 0)}
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-fixhub-primary text-white'
                : 'bg-fixhub-bgCard text-fixhub-textDark hover:bg-fixhub-mint'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-fixhub-primary text-white'
                : 'bg-fixhub-bgCard text-fixhub-textDark hover:bg-fixhub-mint'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'cancelled'
                ? 'bg-fixhub-primary text-white'
                : 'bg-fixhub-bgCard text-fixhub-textDark hover:bg-fixhub-mint'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white rounded-lg shadow-md border border-fixhub-borderSoft">
        <div className="px-6 py-4 border-b border-fixhub-borderSoft">
          <h2 className="text-xl font-semibold text-fixhub-textDark">Job History</h2>
        </div>
        <div className="divide-y divide-fixhub-borderSoft">
          {filteredHistory.map((item) => (
            <div key={item.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-lg font-medium text-fixhub-textDark">{item.service}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-fixhub-textMuted">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {item.customer}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z" />
                      </svg>
                      {item.date}
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    {renderStars(item.rating)}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-fixhub-primary">{item.earnings}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredHistory.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-fixhub-textDark mb-2">No jobs found</h3>
          <p className="text-fixhub-textMuted">No jobs match the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default History;