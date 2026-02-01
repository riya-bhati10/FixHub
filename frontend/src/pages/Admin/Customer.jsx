import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Naavbar';

const TotalCustomers = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const customers = [
    { id: 1, name: 'Alex Rivera', email: 'alex.pro@example.com', status: 'Active', location: 'New York, NY' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'Active', location: 'Los Angeles, CA' },
    { id: 3, name: 'John Smith', email: 'john.smith@example.com', status: 'Blocked', location: 'Chicago, IL' },
    { id: 4, name: 'Emily White', email: 'emily.white@example.com', status: 'Active', location: 'Houston, TX' },
    { id: 5, name: 'Michael Brown', email: 'michael.brown@example.com', status: 'Active', location: 'Phoenix, AZ' },
    { id: 6, name: 'Sarah Johnson', email: 'sarah.j@example.com', status: 'Active', location: 'Philadelphia, PA' },
    { id: 7, name: 'David Wilson', email: 'david.w@example.com', status: 'Active', location: 'San Antonio, TX' },
    { id: 8, name: 'Lisa Garcia', email: 'lisa.g@example.com', status: 'Blocked', location: 'San Diego, CA' },
    { id: 9, name: 'Mark Davis', email: 'mark.d@example.com', status: 'Active', location: 'Dallas, TX' },
    { id: 10, name: 'Anna Miller', email: 'anna.m@example.com', status: 'Active', location: 'San Jose, CA' }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-['Inter']">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">All Customers</h1>
            <p className="text-slate-400">Manage and view all registered customers</p>
          </div>
          <div className="relative w-full md:w-80">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedCustomers.map((customer) => (
            <div key={customer.id} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-all">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-800 ${customer.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
                
                {/* Name */}
                <h3 className="text-lg font-semibold text-white mb-1">{customer.name}</h3>
                
                {/* Email */}
                <p className="text-slate-400 text-sm mb-3">{customer.email}</p>
                
                {/* Location */}
                <div className="flex items-center gap-1 text-slate-400 text-sm mb-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {customer.location}
                </div>
                
                {/* Status */}
                <div className={`px-3 py-1 rounded-full text-sm font-medium mb-4 ${customer.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {customer.status}
                </div>
                
                {/* Action Button */}
                <button className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all ${customer.status === 'Blocked' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                  {customer.status === 'Blocked' ? 'Unblock' : 'Block'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-lg font-medium ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No customers found</h3>
            <p className="text-slate-400">Try adjusting your search term.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TotalCustomers;