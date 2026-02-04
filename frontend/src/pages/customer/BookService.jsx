import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Common/Navbar';

// Import category images
import smartphoneImg from '../../assets/categories/smartphone.jpg';
import laptopImg from '../../assets/categories/laptop.jpg';
import tvImg from '../../assets/categories/tv.jpg';
import acImg from '../../assets/categories/ac.jfif';
import fridgeImg from '../../assets/categories/fridge.jpg';
import washingMachineImg from '../../assets/categories/Washing-machine.jpg';
import microwaveImg from '../../assets/categories/microwave.jfif';
import homeAudioImg from '../../assets/categories/home audio.jpg';
import cameraImg from '../../assets/categories/camera.jpg';
import gamingImg from '../../assets/categories/gaming.jfif';

const BookService = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const customerNavLinks = [
    { label: 'Dashboard', path: '/customer/dashboard' },
    { label: 'Book Service', path: '/customer/book-service' },
    { label: 'My Bookings', path: '/customer/my-bookings' }
  ];

  const categories = [
    { id: 'smartphone', label: 'Smartphone', icon: 'smartphone', image: smartphoneImg },
    { id: 'laptop', label: 'Laptop', icon: 'laptop', image: laptopImg },
    { id: 'tv', label: 'TV', icon: 'tv', image: tvImg },
    { id: 'ac', label: 'AC', icon: 'ac_unit', image: acImg },
    { id: 'fridge', label: 'Fridge', icon: 'kitchen', image: fridgeImg },
    { id: 'washing-machine', label: 'Washing Machine', icon: 'local_laundry_service', image: washingMachineImg },
    { id: 'microwave', label: 'Microwave', icon: 'microwave', image: microwaveImg },
    { id: 'home-audio', label: 'Home Audio', icon: 'speaker', image: homeAudioImg },
    { id: 'camera', label: 'Camera', icon: 'photo_camera', image: cameraImg },
    { id: 'gaming', label: 'Gaming', icon: 'sports_esports', image: gamingImg }
  ];

  const filteredCategories = categories.filter(cat =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (categoryId) => {
    navigate(`/customer/services/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC]">
      <Navbar userType="customer" navLinks={customerNavLinks} showProfile showNotifications />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F4C5C] mb-2">Book a Service</h1>
          <p className="text-xs sm:text-sm text-slate-600">Select a category to find expert technicians</p>
        </div>

        {/* Search */}
        <div className="mb-6 sm:mb-8">
          <div className="relative max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#1F7F85]">search</span>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm border-2 border-[#DCEBEC] rounded-lg focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredCategories.map(category => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="bg-white rounded-xl border-2 border-[#DCEBEC] hover:border-[#1F7F85] shadow-sm hover:shadow-2xl hover:shadow-[#1F7F85]/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden group"
            >
              <div className="h-48 sm:h-52 overflow-hidden relative">
                <img
                  src={category.image}
                  alt={category.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C5C]/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-[#1F7F85]/95 backdrop-blur-sm p-3 rounded-lg text-white shadow-lg">
                  <span className="material-symbols-outlined text-2xl">{category.icon}</span>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-[#0F4C5C] group-hover:text-[#1F7F85] transition-colors">
                  {category.label}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-5xl text-slate-400 mb-4">search_off</span>
            <p className="text-slate-600">No categories found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookService;
