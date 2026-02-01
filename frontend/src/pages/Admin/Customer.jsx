import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Naavbar';

const TotalCustomers = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const customers = [
    { id: 1, name: 'Alex Rivera', email: 'alex.pro@example.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces', bookings: 12, status: 'Active', memberSince: 'Oct 2023', phone: '+1 (555) 123-4567' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces', bookings: 8, status: 'Active', memberSince: 'Nov 2023', phone: '+1 (555) 987-6543' },
    { id: 3, name: 'John Smith', email: 'john.smith@example.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces', bookings: 5, status: 'Blocked', memberSince: 'Sep 2023', phone: '+1 (555) 246-8109' },
    { id: 4, name: 'Emily White', email: 'emily.white@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces', bookings: 15, status: 'Active', memberSince: 'Jan 2023', phone: '+1 (555) 369-1234' },
    { id: 5, name: 'Michael Brown', email: 'michael.brown@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces', bookings: 2, status: 'Active', memberSince: 'Dec 2023', phone: '+1 (555) 741-8529' },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'Blocked':
        return 'bg-red-100 text-red-700 border border-red-200';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-800 font-['Manrope']">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0F4C5C]">All Customers</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and view all registered customers</p>
          </div>
          <div className="relative w-full md:w-80 group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1F7F85] transition-colors">
              search
            </span>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 focus:ring-2 focus:ring-[#1F7F85]/20 focus:border-[#1F7F85] outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Customers Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white shadow-sm border border-slate-200 rounded-lg hover:shadow-md transition-all p-3">
              {/* Profile & Basic Info */}
              <div className="flex flex-col items-center text-center mb-3">
                <div className="relative mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1F7F85] to-[#0F4C5C] flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-lg">person</span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${customer.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                </div>
                <h3 className="text-sm font-bold text-slate-900 truncate w-full">{customer.name}</h3>
                <p className="text-xs text-slate-500 truncate w-full">{customer.email}</p>
              </div>
              
              {/* Info Grid */}
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Bookings:</span>
                  <span className="text-xs font-semibold">{customer.bookings}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Status:</span>
                  <span className={`px-1.5 py-0.5 text-xs font-bold rounded ${getStatusStyles(customer.status)}`}>
                    {customer.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Phone:</span>
                  <span className="text-xs font-semibold truncate ml-1">{customer.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Member:</span>
                  <span className="text-xs font-semibold">{customer.memberSince}</span>
                </div>
              </div>
              
              {/* Action Button */}
              <button
                className={`w-full py-1.5 text-xs font-bold rounded flex items-center justify-center gap-1 transition-all ${
                  customer.status === 'Blocked' 
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                <span className="material-symbols-outlined text-xs">
                  {customer.status === 'Blocked' ? 'lock_open' : 'lock'}
                </span>
                {customer.status === 'Blocked' ? 'Unblock' : 'Block'}
              </button>
            </div>
          ))}
        </div>
        {/* No customers found */}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-bold text-slate-900">No customers found</h3>
            <p className="text-slate-400 mt-2">Try adjusting your search term.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TotalCustomers;