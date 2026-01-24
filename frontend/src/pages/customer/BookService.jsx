import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

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

  const technicians = [
    { 
      id: 1, 
      name: "Robert Fox", 
      rating: 4.9, 
      reviews: 124, 
      specialty: "Senior Technician", 
      available: true, 
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
      clientReviews: [
         { id: 1, user: "Sarah M.", rating: 5, comment: "Fixed my phone in 30 mins! Highly recommended.", date: "2 days ago" },
         { id: 2, user: "John D.", rating: 5, comment: "Very professional and polite.", date: "1 week ago" }
      ]
    },
    { 
      id: 2, 
      name: "Sarah Connor", 
      rating: 4.8, 
      reviews: 98, 
      specialty: "Appliance Expert", 
      available: true, 
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
      clientReviews: [
         { id: 1, user: "Mike R.", rating: 5, comment: "Saved my refrigerator. Thank you!", date: "3 days ago" }
      ]
    },
    { 
      id: 3, 
      name: "Michael Chen", 
      rating: 4.7, 
      reviews: 85, 
      specialty: "Electronics Specialist", 
      available: false, 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
      clientReviews: []
    },
    { 
      id: 4, 
      name: "Emily Davis", 
      rating: 4.9, 
      reviews: 215, 
      specialty: "Master Repairman", 
      available: true, 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
      clientReviews: [
         { id: 1, user: "David K.", rating: 5, comment: "Best service ever.", date: "Yesterday" },
         { id: 2, user: "Lisa P.", rating: 4, comment: "Good work but arrived slightly late.", date: "2 weeks ago" }
      ]
    },
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", {
      service: selectedService,
      technician: selectedTechnician,
      formData: formData
    });
    navigate('/booking-success');
  };

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredServices = services.filter(service => service.rating >= 4.8);

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-800 font-['Manrope'] relative">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
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
                      <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                      <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                      <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                      <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
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
      <main className="max-w-[1440px] mx-auto px-6 py-10 pt-24">

        {/* Services Catalog */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Select a Service</h2>
              <p className="text-slate-500 mt-1">Choose the device you need help with</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                  type="text"
                  placeholder="Search for a service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-3 border border-slate-200 focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none transition-all"
                />
              </div>
              
              <button className="px-6 py-3 bg-[#1F7F85] text-white font-bold hover:bg-[#0F4C5C] transition-all shadow-lg shadow-[#1F7F85]/20 flex items-center gap-2">
                <span className="material-symbols-outlined">search</span>
                
              </button>
              
              <div className="relative">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full sm:w-48 pl-4 pr-10 py-3 border border-slate-200 focus:ring-2 focus:ring-[#1F7F85] focus:border-[#1F7F85] outline-none appearance-none bg-white cursor-pointer transition-all font-bold text-slate-600"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.label}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map(service => (
                <div 
                  key={service.id} 
                  className="group flex flex-col bg-white overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#1F7F85]/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleCardClick(service)}
                >
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      src={service.image}
                    />
                   
                    <div className="absolute bottom-4 left-4 bg-[#1F7F85]/90 backdrop-blur-sm p-2 text-white shadow-sm">
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
                     
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(service);
                        }}
                        className="px-6 py-3 bg-[#1F7F85] text-white text-sm font-bold hover:bg-[#0F4C5C] transition-all shadow-lg shadow-[#1F7F85]/20 flex items-center gap-2"
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

        {/* Featured Services */}
        {!searchTerm && (
        <div className="mt-16 mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
            Top Electronics Repair Services
          </h1>
          
          <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar scroll-smooth">
            {featuredServices.map(service => (
              <div 
                key={service.id} 
                className="w-[280px] h-[380px] flex-shrink-0 group relative overflow-hidden cursor-pointer"
                onClick={() => handleCardClick(service)}
              >
                <img 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src={service.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 mb-2 inline-block
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