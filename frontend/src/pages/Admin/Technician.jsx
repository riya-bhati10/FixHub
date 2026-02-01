import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Naavbar';

const TotalTechnicians = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const technicians = [
    { id: 1, name: 'Robert Fox', email: 'robert.fox@example.com', status: 'Active', specialization: 'Phone Repair', rating: 4.8, location: 'Miami, FL' },
    { id: 2, name: 'Cody Fisher', email: 'cody.fisher@example.com', status: 'Active', specialization: 'Laptop Repair', rating: 4.9, location: 'Seattle, WA' },
    { id: 3, name: 'Esther Howard', email: 'esther.howard@example.com', status: 'Blocked', specialization: 'Smartphone Repair', rating: 4.5, location: 'Denver, CO' },
    { id: 4, name: 'Jenny Wilson', email: 'jenny.wilson@example.com', status: 'Active', specialization: 'TV Repair', rating: 4.7, location: 'Boston, MA' },
    { id: 5, name: 'Guy Hawkins', email: 'guy.hawkins@example.com', status: 'Active', specialization: 'Washing Machine', rating: 4.9, location: 'Atlanta, GA' },
    { id: 6, name: 'Tom Anderson', email: 'tom.a@example.com', status: 'Active', specialization: 'AC Repair', rating: 4.6, location: 'Las Vegas, NV' },
    { id: 7, name: 'Maria Rodriguez', email: 'maria.r@example.com', status: 'Active', specialization: 'Refrigerator', rating: 4.8, location: 'Portland, OR' },
    { id: 8, name: 'James Lee', email: 'james.l@example.com', status: 'Blocked', specialization: 'Computer Repair', rating: 4.4, location: 'Nashville, TN' },
    { id: 9, name: 'Sophie Chen', email: 'sophie.c@example.com', status: 'Active', specialization: 'Tablet Repair', rating: 4.7, location: 'Salt Lake City, UT' },
    { id: 10, name: 'Alex Turner', email: 'alex.t@example.com', status: 'Active', specialization: 'Gaming Console', rating: 4.9, location: 'Minneapolis, MN' }
  ];

  const filteredTechnicians = technicians.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTechnicians.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTechnicians = filteredTechnicians.slice(startIndex, startIndex + itemsPerPage);

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
            <h1 className="text-3xl font-bold text-white mb-2">All Technicians</h1>
            <p className="text-slate-400">Manage and view all registered service providers</p>
          </div>
          <div className="relative w-full md:w-80">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search technicians..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedTechnicians.map((tech) => (
            <div key={tech.id} className="relative bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-all">
              {/* Rating - Top Right */}
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-slate-700 px-2 py-1 rounded-lg">
                <span className="text-yellow-400 text-sm font-semibold">{tech.rating}</span>
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>

              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4zM6.7 8.8c-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6.7-.7 1.9-.7 2.6 0 .7.7.7 1.9 0 2.6z"/>
                    </svg>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-800 ${tech.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
                
                {/* Name */}
                <h3 className="text-lg font-semibold text-white mb-1">{tech.name}</h3>
                
                {/* Service Type */}
                <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {tech.specialization}
                </div>
                
                {/* Location */}
                <div className="flex items-center gap-1 text-slate-400 text-sm mb-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {tech.location}
                </div>
                
                {/* Status */}
                <div className={`px-3 py-1 rounded-full text-sm font-medium mb-4 ${tech.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {tech.status}
                </div>
                
                {/* Action Button */}
                <button className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all ${tech.status === 'Blocked' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
                  {tech.status === 'Blocked' ? 'Unblock' : 'Block'}
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
        {filteredTechnicians.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No technicians found</h3>
            <p className="text-slate-400">Try adjusting your search term.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TotalTechnicians;