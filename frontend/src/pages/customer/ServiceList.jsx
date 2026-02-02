import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Common/Navbar';
import api from '../Landing/api';

const ServiceList = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const customerNavLinks = [
    { label: 'Dashboard', path: '/customer/dashboard' },
    { label: 'Book Service', path: '/customer/book-service' },
    { label: 'My Bookings', path: '/customer/my-bookings' }
  ];

  useEffect(() => {
    fetchServices();
  }, [categoryId]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/services/category/${categoryId}`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(service =>
    service.technician?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`material-symbols-outlined text-base ${i < rating ? 'text-amber-400 fill-current' : 'text-slate-300'}`}>
        star
      </span>
    ));
  };

  const handleServiceClick = (service) => {
    navigate('/customer/booking-form', { state: { service } });
  };

  const getCategoryIcon = () => {
    const icons = {
      'smartphone': 'smartphone',
      'laptop': 'laptop',
      'tv': 'tv',
      'ac': 'ac_unit',
      'fridge': 'kitchen',
      'washing-machine': 'local_laundry_service',
      'microwave': 'microwave',
      'home-audio': 'speaker',
      'camera': 'photo_camera',
      'gaming': 'sports_esports'
    };
    return icons[categoryId] || 'build';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <Navbar userType="customer" navLinks={customerNavLinks} showProfile showNotifications />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#0F4C5C] via-[#1F7F85] to-[#0F4C5C] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTM2IDM0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          <button
            onClick={() => navigate('/customer/book-service')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 text-sm font-medium transition-all group"
          >
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to Categories
          </button>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="material-symbols-outlined text-4xl sm:text-5xl text-white">{getCategoryIcon()}</span>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white capitalize mb-2">
                  {categoryId.replace('-', ' ')} Services
                </h1>
                <p className="text-teal-100 text-sm sm:text-base">Find expert technicians • Compare prices • Book instantly</p>
              </div>
            </div>
            
            <div className="relative w-full md:w-80">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input
                type="text"
                placeholder="Search by name or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 text-sm bg-white/95 backdrop-blur-sm border-0 rounded-xl shadow-xl focus:ring-2 focus:ring-white/50 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#1F7F85] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600 font-medium">Finding the best technicians for you...</p>
            </div>
          </div>
        ) : filteredServices.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-600 text-sm">
                <span className="font-bold text-[#0F4C5C]">{filteredServices.length}</span> expert{filteredServices.length !== 1 ? 's' : ''} available
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <div
                  key={service._id}
                  onClick={() => handleServiceClick(service)}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden border border-slate-100"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Card Header with Gradient */}
                  <div className="relative bg-gradient-to-br from-[#1F7F85] to-[#0F4C5C] p-6 pb-16">
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                      <span className="material-symbols-outlined text-amber-300 fill-current text-lg">star</span>
                      <span className="text-white font-bold text-sm">{service.technician?.rating || 4.5}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-white font-bold text-xl shadow-xl">
                        {service.technician?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {service.technician?.name}
                        </h3>
                        <div className="flex gap-1 mt-1">
                          {getRatingStars(Math.round(service.technician?.rating || 4.5))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 -mt-8 relative">
                    <div className="bg-white rounded-xl shadow-md p-4 mb-4 border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-[#1F7F85] text-xl">build</span>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Service Type</p>
                      </div>
                      <p className="text-sm font-bold text-[#0F4C5C] capitalize">{service.serviceType}</p>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">description</span>
                          Description
                        </p>
                        <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">{service.description}</p>
                      </div>
                      
                      <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 rounded-lg p-2.5">
                        <span className="material-symbols-outlined text-base text-[#1F7F85] mt-0.5">location_on</span>
                        <span className="line-clamp-2">{service.technician?.location || 'Available in your area'}</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t-2 border-slate-100">
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-0.5">Starting from</p>
                        <p className="text-2xl font-extrabold text-[#0F4C5C]">
                          ${service.price || 50}
                        </p>
                      </div>
                      <button className="px-5 py-2.5 bg-gradient-to-r from-[#1F7F85] to-[#0F4C5C] text-white text-sm font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 group-hover:gap-3">
                        Book Now
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </button>
                    </div>
                  </div>

                  {/* Verified Badge */}
                  <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <span className="material-symbols-outlined text-xs fill-current">verified</span>
                    VERIFIED
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-5xl text-slate-400">search_off</span>
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No services found</h3>
            <p className="text-slate-500">Try adjusting your search or check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
