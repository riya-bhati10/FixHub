import React from 'react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Jobs', value: '24', icon: '🔧', color: 'bg-fixhub-primary' },
    { title: 'Completed', value: '18', icon: '✅', color: 'bg-green-500' },
    { title: 'Pending', value: '4', icon: '⏳', color: 'bg-yellow-500' },
    { title: 'Cancelled', value: '2', icon: '❌', color: 'bg-red-500' }
  ];

  const recentJobs = [
    { id: 1, customer: 'John Doe', service: 'AC Repair', time: '10:00 AM', status: 'In Progress' },
    { id: 2, customer: 'Jane Smith', service: 'Plumbing', time: '2:00 PM', status: 'Scheduled' },
    { id: 3, customer: 'Mike Johnson', service: 'Electrical', time: '4:00 PM', status: 'Scheduled' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-fixhub-textDark mb-2">Welcome back, Technician!</h1>
        <p className="text-fixhub-textMuted">Here's what's happening with your jobs today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-fixhub-borderSoft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-fixhub-textMuted text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-fixhub-textDark">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Jobs */}
      <div className="bg-white rounded-lg shadow-md border border-fixhub-borderSoft">
        <div className="px-6 py-4 border-b border-fixhub-borderSoft">
          <h2 className="text-xl font-semibold text-fixhub-textDark">Today's Schedule</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 bg-fixhub-bgCard rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-fixhub-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">{job.customer.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-fixhub-textDark">{job.customer}</h3>
                    <p className="text-sm text-fixhub-textMuted">{job.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-fixhub-textDark">{job.time}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    job.status === 'In Progress' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-fixhub-primary hover:bg-fixhub-dark text-white p-6 rounded-lg transition-colors">
          <div className="text-center">
            <div className="text-2xl mb-2">📋</div>
            <h3 className="font-semibold">View All Jobs</h3>
          </div>
        </button>
        <button className="bg-fixhub-mint hover:bg-fixhub-primary hover:text-white text-fixhub-textDark p-6 rounded-lg transition-colors">
          <div className="text-center">
            <div className="text-2xl mb-2">📅</div>
            <h3 className="font-semibold">My Schedule</h3>
          </div>
        </button>
        <button className="bg-fixhub-bgCard hover:bg-fixhub-mint text-fixhub-textDark p-6 rounded-lg transition-colors">
          <div className="text-center">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold">Reports</h3>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;