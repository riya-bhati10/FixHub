import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Naavbar';

const TotalTechnicians = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Dummy data for technicians
  const technicians = [
    { id: 1, name: 'Robert Fox', email: 'robert.fox@example.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces', jobs: 45, status: 'Active', specialization: 'Phone Repair', rating: 4.8, phone: '+1 (555) 234-5678', joinDate: 'Jan 2023' },
    { id: 2, name: 'Cody Fisher', email: 'cody.fisher@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces', jobs: 32, status: 'Active', specialization: 'Laptop Repair', rating: 4.9, phone: '+1 (555) 345-6789', joinDate: 'Feb 2023' },
    { id: 3, name: 'Esther Howard', email: 'esther.howard@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces', jobs: 12, status: 'Blocked', specialization: 'Smartphone Repair', rating: 4.5, phone: '+1 (555) 456-7890', joinDate: 'Mar 2023' },
    { id: 4, name: 'Jenny Wilson', email: 'jenny.wilson@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces', jobs: 28, status: 'Active', specialization: 'TV Repair', rating: 4.7, phone: '+1 (555) 567-8901', joinDate: 'Apr 2023' },
    { id: 5, name: 'Guy Hawkins', email: 'guy.hawkins@example.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces', jobs: 56, status: 'Active', specialization: 'Washing Machine', rating: 4.9, phone: '+1 (555) 678-9012', joinDate: 'May 2023' },
  ];

  const filteredTechnicians = technicians.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewTechnician = (tech) => {
    setSelectedTechnician(tech);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTechnician(null);
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
            <h1 className="text-2xl font-bold text-[#0F4C5C]">All Technicians</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and view all registered service providers</p>
          </div>
          <div className="relative w-full md:w-80 group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1F7F85] transition-colors">
              search
            </span>
            <input
              type="text"
              placeholder="Search name, email, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 focus:ring-2 focus:ring-[#1F7F85]/20 focus:border-[#1F7F85] outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Technicians Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredTechnicians.map((tech) => (
            <div key={tech.id} className="bg-white shadow-sm border border-slate-200 rounded-lg hover:shadow-md transition-all p-3">
              {/* Profile & Basic Info */}
              <div className="flex flex-col items-center text-center mb-3">
                <div className="relative mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-lg">engineering</span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${tech.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                </div>
                <h3 className="text-sm font-bold text-slate-900 truncate w-full">{tech.name}</h3>
                <p className="text-xs text-slate-500 truncate w-full">{tech.email}</p>
                <span className="inline-block px-1.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 rounded mt-1 truncate w-full">
                  {tech.specialization}
                </span>
              </div>
              
              {/* Info Grid */}
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Jobs:</span>
                  <span className="text-xs font-semibold">{tech.jobs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Status:</span>
                  <span className={`px-1.5 py-0.5 text-xs font-bold rounded ${getStatusStyles(tech.status)}`}>
                    {tech.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Rating:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold">{tech.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${i < Math.floor(tech.rating) ? 'text-amber-400' : 'text-slate-300'}`}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Joined:</span>
                  <span className="text-xs font-semibold">{tech.joinDate}</span>
                </div>
              </div>
              
              {/* Action Button */}
              <button
                className={`w-full py-1.5 text-xs font-bold rounded flex items-center justify-center gap-1 transition-all ${
                  tech.status === 'Blocked' 
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                <span className="material-symbols-outlined text-xs">
                  {tech.status === 'Blocked' ? 'lock_open' : 'lock'}
                </span>
                {tech.status === 'Blocked' ? 'Unblock' : 'Block'}
              </button>
            </div>
          ))}
        </div>

        {/* No technicians found */}
        {filteredTechnicians.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-bold text-slate-900">No technicians found</h3>
            <p className="text-slate-400 mt-2">Try adjusting your search term.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TotalTechnicians;