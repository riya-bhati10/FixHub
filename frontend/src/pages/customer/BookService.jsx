import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';

const BookService = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    issue: "",
    serviceDate: "",
    timeSlot: "",
    address: ""
  });

  const services = [
    {
      id: 1,
      title: "Smartphone Repair",
      description: "Expert screen replacement, battery swaps, and hardware fixes for all smartphone models.",
      price: 49,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff70?w=800&h=600&fit=crop",
      category: "phone",
      rating: 4.9,
      reviews: 328,
      icon: "smartphone"
    },
    {
      id: 2,
      title: "Laptop Repair",
      description: "Comprehensive diagnostics, component repair, and performance optimization for laptops.",
      price: 79,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop",
      category: "laptop",
      rating: 4.8,
      reviews: 215,
      icon: "laptop"
    },
    {
      id: 3,
      title: "TV Repair",
      description: "Professional repair services for LED, LCD, OLED, and Smart TVs of all sizes.",
      price: 89,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
      category: "tv",
      rating: 4.7,
      reviews: 156,
      icon: "tv"
    },
    {
      id: 4,
      title: "Refrigerator Repair",
      description: "Fast and reliable repair for cooling issues, compressors, and maintenance.",
      price: 99,
      image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&h=600&fit=crop",
      category: "fridge",
      rating: 4.8,
      reviews: 182,
      icon: "kitchen"
    },
    {
      id: 5,
      title: "Washing Machine Repair",
      description: "Full-service repair for washers including motor, drum, and electronic issues.",
      price: 85,
      image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&h=600&fit=crop",
      category: "washing_machine",
      rating: 4.9,
      reviews: 203,
      icon: "local_laundry_service"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'phone', label: 'Phones' },
    { id: 'laptop', label: 'Laptops' },
    { id: 'tv', label: 'TVs' },
    { id: 'fridge', label: 'Refrigerators' },
    { id: 'washing_machine', label: 'Washing Machines' }
  ];

  // Function to handle card click
  const handleCardClick = (service) => {
    setSelectedService(service);
    setIsFormOpen(true);
    // Reset form data
    setFormData({
      issue: "",
      serviceDate: "",
      timeSlot: "",
      address: ""
    });
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", {
      service: selectedService,
      formData: formData
    });
    alert(`Booking confirmed for ${selectedService.title}!`);
    setIsFormOpen(false);
    setSelectedService(null);
  };

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const featuredServices = services.filter(service => service.rating >= 4.8);

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-800 font-['Manrope'] relative">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      {/* Booking Form Modal */}
      {isFormOpen && selectedService && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Book Service</h2>
                  <p className="text-slate-500">Complete the form to schedule your repair</p>
                </div>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>

              {/* Service Summary */}
              <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img 
                      src={selectedService.image} 
                      alt={selectedService.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{selectedService.title}</h3>
                    <p className="text-slate-500 text-sm">{selectedService.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-lg font-bold text-[#0F4C5C]">${selectedService.price}</span>
                      <span className="flex items-center gap-1 text-sm text-slate-600">
                        <span className="material-symbols-outlined text-amber-400 text-sm fill-current">star</span>
                        {selectedService.rating} ({selectedService.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Describe the Issue
                  </label>
                  <textarea
                    name="issue"
                    value={formData.issue}
                    onChange={handleInputChange}
                    placeholder="Please describe what problem you're facing with your device..."
                    className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none transition-all h-32 resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Preferred Service Date
                    </label>
                    <input
                      type="date"
                      name="serviceDate"
                      value={formData.serviceDate}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Preferred Time Slot
                    </label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none transition-all"
                      required
                    >
                      <option value="">Select time slot</option>
                      <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                      <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                      <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                      <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Service Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address where the technician should visit..."
                    className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none transition-all h-32 resize-none"
                    required
                  />
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-slate-500">Service Charge</p>
                      <p className="text-2xl font-bold text-[#0F4C5C]">${selectedService.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Total Amount</p>
                      <p className="text-2xl font-bold text-[#0F4C5C]">${selectedService.price}</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#1F7F85] text-white text-lg font-bold rounded-2xl hover:bg-[#0F4C5C] transition-all shadow-lg shadow-[#1F7F85]/20 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">calendar_month</span>
                    Confirm Booking
                  </button>
                  
                  <p className="text-center text-sm text-slate-500 mt-4">
                    By booking, you agree to our Terms of Service
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-10 pt-24">

        {/* Featured Services */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
            Top Electronics Repair Services
          </h1>
          
          <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar scroll-smooth">
            {featuredServices.map(service => (
              <div 
                key={service.id} 
                className="w-[280px] h-[380px] flex-shrink-0 group relative overflow-hidden rounded-2xl cursor-pointer"
                onClick={() => handleCardClick(service)}
              >
                <img 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src={service.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-2 inline-block
                    ${service.category === 'pro' ? 'bg-blue-500/20 text-blue-300' :
                      service.category === 'popular' ? 'bg-purple-500/20 text-purple-300' :
                      service.category === 'essential' ? 'bg-green-500/20 text-green-300' :
                      service.category === 'trending' ? 'bg-pink-500/20 text-pink-300' :
                      'bg-yellow-500/20 text-yellow-300'}`}>
                    {service.category === 'pro' ? 'Pro Choice' :
                     service.category === 'popular' ? 'Popular' :
                     service.category === 'essential' ? 'Essential' :
                     service.category === 'trending' ? 'Trending' : 'Best Value'}
                  </span>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-sm opacity-80">Service Charge ${service.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Catalog */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Select a Service</h2>
              <p className="text-slate-500 mt-1">Choose the device you need help with</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all border ${
                      activeCategory === category.id
                        ? 'bg-[#1F7F85] text-white border-[#1F7F85] shadow-lg shadow-[#1F7F85]/20'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#1F7F85] hover:text-[#1F7F85]'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map(service => (
                <div 
                  key={service.id} 
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#1F7F85]/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleCardClick(service)}
                >
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      src={service.image}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-amber-400 text-sm fill-current">star</span>
                      <span className="text-xs font-bold text-slate-900">{service.rating}</span>
                      <span className="text-[10px] text-slate-500">({service.reviews})</span>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-[#1F7F85]/90 backdrop-blur-sm p-2 rounded-xl text-white shadow-sm">
                      <span className="material-symbols-outlined text-xl block">{service.icon}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#1F7F85] transition-colors">{service.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">Starts from</p>
                        <p className="text-2xl font-black text-[#0F4C5C]">${service.price}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(service);
                        }}
                        className="px-6 py-3 bg-[#1F7F85] text-white text-sm font-bold rounded-xl hover:bg-[#0F4C5C] transition-all shadow-lg shadow-[#1F7F85]/20 flex items-center gap-2"
                      >
                        Book Now
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-[#1F7F85] rounded-lg">
                  <span className="material-symbols-outlined text-white text-xl">build</span>
                </div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900">FixHub Electronics</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Professional electronics repair services for all your devices. From phones to gaming consoles, we fix it right the first time.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Services</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  {services.slice(0, 4).map(service => (
                    <li key={service.id}>
                      <button 
                        onClick={() => handleCardClick(service)}
                        className="hover:text-[#1F7F85] transition-colors hover:font-medium text-left"
                      >
                        {service.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Company</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li><a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">About Us</a></li>
                  <li><a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">Our Technicians</a></li>
                  <li><a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">Privacy Policy</a></li>
                  <li><a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">Terms</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Support</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li><a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">Help Center</a></li>
                  <li><a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">Contact Us</a></li>
                  <li><a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">Live Chat</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-400 font-medium">© 2024 FixHub Electronics. All rights reserved.</p>
            <div className="flex gap-4">
              <button className="size-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#1F7F85] transition-all border border-slate-100 hover:border-[#1F7F85]/30 hover:shadow-md">
                <span className="material-symbols-outlined text-xl">public</span>
              </button>
              <button className="size-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#1F7F85] transition-all border border-slate-100 hover:border-[#1F7F85]/30 hover:shadow-md">
                <span className="material-symbols-outlined text-xl">share</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookService;