import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Common/Navbar';
import api from '../Landing/api';

const BookService = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTechnicianViewOpen, setIsTechnicianViewOpen] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [viewingReviewsFor, setViewingReviewsFor] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCategoryView, setShowCategoryView] = useState(true);
  const [availableCategories, setAvailableCategories] = useState([]);
  const addressInputRef = useRef(null);
  const [isLocating, setIsLocating] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionTimeoutRef = useRef(null);
  
  // Form state
  const [formData, setFormData] = useState({
    issue: "",
    serviceDate: "",
    timeSlot: "",
    address: ""
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services/all');
      const servicesData = response.data.services || [];
      
      // Transform backend data to match frontend format
      const transformedServices = servicesData.map(service => ({
        id: service.id,
        title: service.title,
        description: service.description,
        price: service.price,
        image: service.image || 'https://images.unsplash.com/photo-1598327105666-5b89351aff70?w=800&h=600&fit=crop',
        category: getCategoryFromTitle(service.title),
        rating: 4.8, // Default rating
        reviews: service.technician?.completedJobs || 0,
        icon: getIconFromTitle(service.title),
        technician: service.technician
      }));
      
      setServices(transformedServices);
      
      // Get unique categories from services
      const uniqueCategories = [...new Set(transformedServices.map(service => service.category))];
      const categoryData = uniqueCategories.map(cat => {
        const categoryInfo = categories.find(c => c.id === cat);
        const serviceCount = transformedServices.filter(s => s.category === cat).length;
        return {
          ...categoryInfo,
          count: serviceCount,
          icon: getIconFromCategory(cat)
        };
      }).filter(cat => cat.id); // Remove undefined categories
      
      setAvailableCategories(categoryData);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryFromTitle = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('smartphone') || lowerTitle.includes('phone') || lowerTitle.includes('mobile')) return 'smartphone';
    if (lowerTitle.includes('laptop') || lowerTitle.includes('computer') || lowerTitle.includes('notebook')) return 'laptop';
    if (lowerTitle.includes('tv') || lowerTitle.includes('television')) return 'tv';
    if (lowerTitle.includes('ac') || lowerTitle.includes('air conditioner') || lowerTitle.includes('cooling')) return 'ac';
    if (lowerTitle.includes('refrigerator') || lowerTitle.includes('fridge')) return 'refrigerator';
    if (lowerTitle.includes('washing machine') || lowerTitle.includes('washer')) return 'washing_machine';
    if (lowerTitle.includes('microwave')) return 'microwave';
    if (lowerTitle.includes('audio') || lowerTitle.includes('speaker') || lowerTitle.includes('sound')) return 'audio';
    if (lowerTitle.includes('camera') || lowerTitle.includes('photography')) return 'camera';
    if (lowerTitle.includes('gaming') || lowerTitle.includes('console') || lowerTitle.includes('playstation') || lowerTitle.includes('xbox')) return 'gaming';
    return 'other';
  };

  const getIconFromTitle = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('smartphone') || lowerTitle.includes('phone') || lowerTitle.includes('mobile')) return 'smartphone';
    if (lowerTitle.includes('laptop') || lowerTitle.includes('computer') || lowerTitle.includes('notebook')) return 'laptop';
    if (lowerTitle.includes('tv') || lowerTitle.includes('television')) return 'tv';
    if (lowerTitle.includes('ac') || lowerTitle.includes('air conditioner') || lowerTitle.includes('cooling')) return 'ac_unit';
    if (lowerTitle.includes('refrigerator') || lowerTitle.includes('fridge')) return 'kitchen';
    if (lowerTitle.includes('washing machine') || lowerTitle.includes('washer')) return 'local_laundry_service';
    if (lowerTitle.includes('microwave')) return 'microwave';
    if (lowerTitle.includes('audio') || lowerTitle.includes('speaker') || lowerTitle.includes('sound')) return 'speaker';
    if (lowerTitle.includes('camera') || lowerTitle.includes('photography')) return 'photo_camera';
    if (lowerTitle.includes('gaming') || lowerTitle.includes('console') || lowerTitle.includes('playstation') || lowerTitle.includes('xbox')) return 'sports_esports';
    return 'build';
  };

  const getCategoryImage = (categoryId) => {
    // Map category IDs to actual image filenames in assets
    const imageMap = {
      'smartphone': 'smartphone.jpg',
      'laptop': 'laptop.jpg',
      'tv': 'tv.jpg',
      'ac': 'ac.jfif',
      'refrigerator': 'fridge.jpg',
      'washing_machine': 'Washing-machine.jpg',
      'microwave': 'microwave.jfif',
      'audio': 'home audio.jpg',
      'camera': 'camera.jpg',
      'gaming': 'gaming.jfif',
      'other': 'smartphone.jpg' // Default fallback
    };

    try {
      const imageName = imageMap[categoryId] || 'smartphone.jpg';
      return new URL(`../../assets/categories/${imageName}`, import.meta.url).href;
    } catch (error) {
      console.error('Error loading category image:', error);
      // Fallback to online image if local fails
      return 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop';
    }
  };

  const getIconFromCategory = (category) => {
    switch(category) {
      case 'smartphone': return 'smartphone';
      case 'laptop': return 'laptop';
      case 'tv': return 'tv';
      case 'ac': return 'ac_unit';
      case 'refrigerator': return 'kitchen';
      case 'washing_machine': return 'local_laundry_service';
      case 'microwave': return 'microwave';
      case 'audio': return 'speaker';
      case 'camera': return 'photo_camera';
      case 'gaming': return 'sports_esports';
      default: return 'build';
    }
  };

  const technicians = [
    { 
      id: selectedService?.technician?.id || 1, 
      name: selectedService?.technician?.name || "Available Technician", 
      rating: 4.9, 
      reviews: selectedService?.technician?.completedJobs || 0, 
      specialty: "Senior Technician", 
      available: true, 
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
      clientReviews: [
         { id: 1, user: "Sarah M.", rating: 5, comment: "Fixed my device quickly! Highly recommended.", date: "2 days ago" },
         { id: 2, user: "John D.", rating: 5, comment: "Very professional and polite.", date: "1 week ago" }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'smartphone', label: 'Smartphones' },
    { id: 'laptop', label: 'Laptops' },
    { id: 'tv', label: 'TVs' },
    { id: 'ac', label: 'AC Service' },
    { id: 'refrigerator', label: 'Refrigerators' },
    { id: 'washing_machine', label: 'Washing Machines' },
    { id: 'microwave', label: 'Microwaves' },
    { id: 'audio', label: 'Home Audio' },
    { id: 'camera', label: 'Cameras' },
    { id: 'gaming', label: 'Gaming Consoles' },
    { id: 'other', label: 'Other' }
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setShowCategoryView(false);
  };

  const handleBackToCategories = () => {
    setShowCategoryView(true);
    setActiveCategory('all');
    setSearchTerm('');
  };

  // Function to handle card click
  const handleCardClick = (service) => {
    setSelectedService(service);
    setIsTechnicianViewOpen(true);
    // Reset form data
    setFormData({
      issue: "",
      serviceDate: "",
      timeSlot: "",
      address: ""
    });
  };

  const handleTechnicianSelect = (tech) => {
    if (!tech.available) return;
    setSelectedTechnician(tech);
    setIsTechnicianViewOpen(false);
    setIsFormOpen(true);
  };

  const handleShowReviews = (tech) => {
    setViewingReviewsFor(tech);
    setIsReviewModalOpen(true);
  };

  const fetchAddressSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setAddressSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`
      );
      if (response.ok) {
        const data = await response.json();
        setAddressSuggestions(data);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'address') {
      setLocationError(null);
      if (suggestionTimeoutRef.current) clearTimeout(suggestionTimeoutRef.current);
      suggestionTimeoutRef.current = setTimeout(() => fetchAddressSuggestions(value), 500);
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [locationError, setLocationError] = useState(null);

  // Helper function to fetch address from coordinates
  const fetchAddressFromCoords = async (coords) => {
    const { latitude, longitude } = coords;
    
    try {
      // First try with more detailed Nominatim
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      if (data && data.display_name) {
        setFormData(prev => ({ 
          ...prev, 
          address: data.display_name 
        }));
      } else {
        // Fallback to coordinates
        setFormData(prev => ({ 
          ...prev, 
          address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` 
        }));
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      // Fallback to Google Maps format if Nominatim fails
      setFormData(prev => ({ 
        ...prev, 
        address: `https://www.google.com/maps?q=${latitude},${longitude}` 
      }));
    } finally {
      setIsLocating(false);
    }
  };

  // Error handler
  const handleGeolocationError = (error) => {
    setIsLocating(false);
    
    switch(error.code) {
      case error.PERMISSION_DENIED:
        setLocationError('Location access was denied. Please allow location access in browser settings.');
        break;
      case error.POSITION_UNAVAILABLE:
        setLocationError('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        setLocationError('The request to get your location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        setLocationError('An unknown error occurred while getting your location.');
        break;
      default:
        setLocationError('Unable to retrieve your location.');
    }
  };

  const getLocation = async () => {
    setIsLocating(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      setIsLocating(false);
      return;
    }

    // Permission check
    if (!navigator.permissions) {
      // For browsers that don't support permissions API
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await fetchAddressFromCoords(position.coords);
        },
        (error) => {
          handleGeolocationError(error);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
      );
    } else {
      // Check permission first
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              await fetchAddressFromCoords(position.coords);
            },
            (error) => {
              handleGeolocationError(error);
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
          );
        } else if (result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              await fetchAddressFromCoords(position.coords);
            },
            (error) => {
              handleGeolocationError(error);
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
          );
        } else if (result.state === 'denied') {
          setLocationError('Location permission denied. Please enable it in browser settings.');
          setIsLocating(false);
        }
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        serviceId: selectedService.id,
        technicianId: selectedService.technician.id,
        issue: formData.issue,
        serviceDate: formData.serviceDate,
        timeSlot: formData.timeSlot,
        serviceLocation: formData.address
      };
      
      console.log('Sending booking data:', bookingData);
      const response = await api.post('/bookings', bookingData);
      console.log('Booking response:', response.data);
      
      navigate('/booking-success');
    } catch (error) {
      console.error('Booking failed:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Booking failed. Please try again.';
      alert(errorMessage);
    }
  };

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredServices = services.filter(service => service.rating >= 4.8);

  const customerNavLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/book-service', label: 'Book Service' },
    { path: '/my-booking', label: 'My Bookings' },
  ];

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-800 font-['Manrope'] relative">
      <Navbar 
        userType="customer"
        navLinks={customerNavLinks}
        showProfile={true}
        showNotifications={true}
      />
      
      {/* Technician Selection Modal */}
      {isTechnicianViewOpen && selectedService && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Select a Technician</h2>
                  <p className="text-slate-500 mt-1">Choose an available technician for '{selectedService.title}'</p>
                </div>
                <button 
                  onClick={() => setIsTechnicianViewOpen(false)}
                  className="p-2 hover:bg-slate-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {technicians.map(tech => (
                  <div 
                    key={tech.id}
                    onClick={() => handleTechnicianSelect(tech)}
                    className={`p-6 border-2 transition-all duration-300 ${
                      tech.available 
                        ? 'cursor-pointer hover:border-[#1F7F85] hover:bg-[#F7FBFC] hover:shadow-lg hover:-translate-y-1' 
                        : 'bg-slate-50 opacity-60 cursor-not-allowed'
                    } ${
                      tech.available ? 'border-slate-200' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={tech.avatar} alt={tech.name} className="w-20 h-20 object-cover shadow-md" />
                        {tech.available && <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white"></div>}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800">{tech.name}</h3>
                        <p className="text-sm text-slate-500">{tech.specialty}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <span className="material-symbols-outlined text-amber-400 text-base fill-current">star</span>
                          <span className="font-bold text-slate-700">{tech.rating.toFixed(1)}</span>
                          <span className="text-xs text-slate-500">({tech.reviews} reviews)</span>
                        </div>
                        <p className="text-sm font-bold text-[#1F7F85] mt-1">
                          Service Charge: ${selectedService.price}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowReviews(tech);
                          }}
                          className="text-xs font-bold text-[#1F7F85] mt-2 hover:underline z-10 relative flex items-center gap-1"
                        >
                          See all reviews
                        </button>
                      </div>
                      {tech.available && (
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-[#1F7F85]">
                          arrow_forward_ios
                        </span>
                      )}
                    </div>
                    {!tech.available && (
                      <div className="text-center mt-3 text-xs font-bold text-red-500 bg-red-50 py-1">
                        Currently Unavailable
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Modal */}
      {isReviewModalOpen && viewingReviewsFor && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in-up">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-4">
                 <img src={viewingReviewsFor.avatar} alt={viewingReviewsFor.name} className="w-12 h-12 object-cover shadow-sm" />
                 <div>
                    <h3 className="text-xl font-bold text-slate-900">{viewingReviewsFor.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <span className="material-symbols-outlined text-amber-400 text-sm fill-current">star</span>
                      <span className="font-bold">{viewingReviewsFor.rating}</span>
                      <span>({viewingReviewsFor.reviews} reviews)</span>
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => setIsReviewModalOpen(false)}
                className="p-2 hover:bg-slate-200 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            {/* Reviews List */}
            <div className="overflow-y-auto p-6 space-y-4 bg-[#F7FBFC]">
               {viewingReviewsFor.clientReviews && viewingReviewsFor.clientReviews.length > 0 ? (
                 viewingReviewsFor.clientReviews.map((review) => (
                   <div key={review.id} className="bg-white p-5 border border-slate-100 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#1F7F85]/10 flex items-center justify-center text-[#1F7F85] font-bold text-xs">
                                {review.user.charAt(0)}
                            </div>
                            <span className="font-bold text-slate-900 text-sm">{review.user}</span>
                         </div>
                         <span className="text-xs text-slate-400 font-medium">{review.date}</span>
                      </div>
                      <div className="flex text-amber-400 text-sm mb-2 pl-11">
                         {[...Array(5)].map((_, i) => (
                            <span key={i} className="material-symbols-outlined text-[16px] fill-current">
                                {i < review.rating ? 'star' : 'star_border'}
                            </span>
                         ))}
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed pl-11">{review.comment}</p>
                   </div>
                 ))
               ) : (
                 <div className="text-center py-10 text-slate-500">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">reviews</span>
                    <p>No detailed reviews available for this technician yet.</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {isFormOpen && selectedService && selectedTechnician && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Book Service</h2>
                  <p className="text-slate-500">Complete the form to schedule your repair</p>
                </div>
                <button 
                  onClick={() => {
                    setIsFormOpen(false);
                    setSelectedService(null);
                    setSelectedTechnician(null);
                  }}
                  className="p-2 hover:bg-slate-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>

              {/* Service & Technician Summary */}
              <div className="bg-slate-50 p-6 mb-8 space-y-4">
                {/* Service */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 overflow-hidden">
                    <img 
                      src={selectedService.image} 
                      alt={selectedService.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Service</p>
                    <h3 className="text-xl font-bold text-slate-900">{selectedService.title}</h3>
                  </div>
                </div>
                <div className="border-t border-slate-200"></div>
                {/* Technician */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 overflow-hidden">
                    <img 
                      src={selectedTechnician.avatar} 
                      alt={selectedTechnician.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Technician</p>
                    <h3 className="text-xl font-bold text-slate-900">{selectedTechnician.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <span className="material-symbols-outlined text-amber-400 text-sm fill-current">star</span>
                      {selectedTechnician.rating} ({selectedTechnician.reviews} reviews)
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
                    className="w-full p-4 border border-slate-200 focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none transition-all h-32 resize-none"
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
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.serviceDate}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-slate-200 focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none transition-all"
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
                      className="w-full p-4 border border-slate-200 focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none transition-all"
                      required
                    >
                      <option value="">Select time slot</option>
                      <option value="9AM-12PM">9:00 AM - 12:00 PM</option>
                      <option value="12PM-3PM">12:00 PM - 3:00 PM</option>
                      <option value="3PM-6PM">3:00 PM - 6:00 PM</option>
                      <option value="6PM-9PM">6:00 PM - 9:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Service Address
                    </label>
                    <button 
                      type="button" 
                      onClick={getLocation}
                      disabled={isLocating}
                      className={`text-[#1F7F85] text-sm font-bold flex items-center gap-1 hover:bg-[#1F7F85]/10 px-2 py-1 transition-colors ${isLocating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isLocating ? (
                        <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                      ) : (
                        <span className="material-symbols-outlined text-base">my_location</span>
                      )}
                      {isLocating ? 'Locating...' : 'Get Current Location'}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      ref={addressInputRef}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Search for your address..."
                      className="w-full p-4 border border-slate-200 focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none transition-all"
                      required
                      autoComplete="off"
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      onFocus={() => formData.address.length >= 3 && setShowSuggestions(true)}
                    />
                    {showSuggestions && addressSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-slate-200 shadow-lg max-h-60 overflow-y-auto mt-1 rounded-md">
                        {addressSuggestions.map((suggestion) => (
                          <div 
                            key={suggestion.place_id}
                            className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0 text-sm text-slate-700 flex items-start gap-2"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, address: suggestion.display_name }));
                              setAddressSuggestions([]);
                              setShowSuggestions(false);
                            }}
                          >
                            <span className="material-symbols-outlined text-slate-400 text-lg mt-0.5">location_on</span>
                            <span>{suggestion.display_name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {locationError && <p className="text-red-500 text-sm mt-1">{locationError}</p>}
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
                    className="w-full py-4 bg-[#1F7F85] text-white text-lg font-bold hover:bg-[#0F4C5C] transition-all shadow-lg shadow-[#1F7F85]/20 flex items-center justify-center gap-2"
                  >
                   
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
      <main className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10 pt-20 sm:pt-24">

        {/* Category View */}
        {showCategoryView ? (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center px-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F4C5C] mb-3 sm:mb-4">Select a Service Category</h2>
              <p className="text-sm sm:text-base text-slate-600">Choose the type of device you need help with</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {availableCategories.map(category => (
                <div 
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="bg-white rounded-xl border-2 border-[#DCEBEC] hover:border-[#1F7F85] hover:shadow-2xl hover:shadow-[#1F7F85]/10 transition-all duration-300 cursor-pointer group hover:-translate-y-2 overflow-hidden"
                >
                  {/* Category Image */}
                  <div className="h-48 sm:h-56 lg:h-64 overflow-hidden relative">
                    <img 
                      src={getCategoryImage(category.id)} 
                      alt={category.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C5C]/80 via-[#0F4C5C]/20 to-transparent"></div>
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-xl sm:text-2xl text-[#1F7F85]">
                          {category.icon}
                        </span>
                      </div>
                      <div className="text-white">
                        <h3 className="text-lg sm:text-xl font-bold drop-shadow-lg">{category.label}</h3>
                        <p className="text-xs sm:text-sm opacity-90 drop-shadow">{category.count} service{category.count !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category Info */}
                  <div className="p-4 sm:p-6 bg-gradient-to-br from-[#F7FBFC] to-white text-center">
                    <div className="flex items-center justify-center text-[#1F7F85] font-bold text-sm group-hover:gap-2 transition-all">
                      <span>View Services</span>
                      <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Services List View */
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <button
                onClick={handleBackToCategories}
                className="flex items-center gap-2 text-[#1F7F85] hover:text-[#0F4C5C] font-bold transition-colors px-4 py-2 rounded-lg hover:bg-[#F7FBFC]"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                <span className="text-sm sm:text-base">Back to Categories</span>
              </button>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl border-2 border-[#DCEBEC]">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0F4C5C]">
                  {categories.find(cat => cat.id === activeCategory)?.label || 'Services'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Available services in this category</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#1F7F85]">search</span>
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-3 text-sm border-2 border-[#DCEBEC] rounded-lg focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {loading ? (
                <div className="col-span-full flex items-center justify-center py-16 sm:py-20">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-4xl sm:text-5xl text-[#1F7F85] animate-spin mb-4">progress_activity</span>
                    <p className="text-sm sm:text-base text-slate-600">Loading services...</p>
                  </div>
                </div>
              ) : filteredServices.length > 0 ? (
                filteredServices.map(service => (
                  <div 
                    key={service.id} 
                    className="bg-white rounded-xl border-2 border-[#DCEBEC] hover:border-[#1F7F85] shadow-sm hover:shadow-2xl hover:shadow-[#1F7F85]/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden group"
                    onClick={() => handleCardClick(service)}
                  >
                    <div className="h-44 sm:h-48 lg:h-52 overflow-hidden relative">
                      <img 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        src={service.image}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C5C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-[#1F7F85]/95 backdrop-blur-sm p-2 rounded-lg text-white shadow-lg">
                        <span className="material-symbols-outlined text-base sm:text-lg">{service.icon}</span>
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-[#0F4C5C] mb-2 group-hover:text-[#1F7F85] transition-colors line-clamp-1">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">
                        {service.description}
                      </p>
                      <p className="text-xs sm:text-sm text-[#1F7F85] font-bold mb-4">
                        By: {service.technician.name}
                      </p>
                      
                      <div className="flex items-center justify-between pt-3 border-t-2 border-[#DCEBEC]">
                        <div>
                          <p className="text-base sm:text-lg font-extrabold text-[#0F4C5C]">${service.price}</p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(service);
                          }}
                          className="px-3 sm:px-4 py-2 bg-[#1F7F85] text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-[#0F4C5C] transition-all flex items-center gap-1 sm:gap-2"
                        >
                          <span className="hidden sm:inline">Book Now</span>
                          <span className="sm:hidden">Book</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center py-16 sm:py-20">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-4xl sm:text-5xl text-slate-400 mb-4">search_off</span>
                    <p className="text-sm sm:text-base text-slate-600">No services found in this category</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Featured Services - Only show when not searching */}
        {!searchTerm && !showCategoryView && filteredServices.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 px-4 sm:px-0">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F4C5C]">Featured Services</h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">Highly rated services from our expert technicians</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredServices.slice(0, 4).map(service => (
                <div 
                  key={service.id} 
                  className="bg-white rounded-xl border-2 border-[#DCEBEC] hover:border-[#1F7F85] hover:shadow-2xl hover:shadow-[#1F7F85]/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden group"
                  onClick={() => handleCardClick(service)}
                >
                  <div className="h-44 sm:h-48 overflow-hidden relative">
                    <img 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      src={service.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C5C]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <div className="bg-amber-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <span className="material-symbols-outlined text-xs sm:text-sm fill-current">star</span>
                        <span>{service.rating}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-[#1F7F85]/95 backdrop-blur-sm p-2 rounded-lg text-white shadow-lg">
                      <span className="material-symbols-outlined text-base sm:text-lg">{service.icon}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-5">
                    <h3 className="text-sm sm:text-base font-bold text-[#0F4C5C] mb-2 line-clamp-1 group-hover:text-[#1F7F85] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t-2 border-[#DCEBEC]">
                      <span className="text-base sm:text-lg font-extrabold text-[#0F4C5C]">${service.price}</span>
                      <button className="text-[#1F7F85] text-xs sm:text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                        <span>Book</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      
    </div>
  );
};

export default BookService;