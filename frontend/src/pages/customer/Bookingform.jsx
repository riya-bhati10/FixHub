import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Search, 
  Navigation,
  Smartphone,
  Laptop,
  Tv,
  Home,
  WashingMachine,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

const BookServiceForm = () => {
  const navigate = useNavigate();
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationResults, setLocationResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formStep, setFormStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchRef = useRef(null);

  const [formData, setFormData] = useState({
    serviceId: "",
    issue: "",
    serviceDate: "",
    timeSlot: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const services = [
    { 
      id: "phone", 
      name: "Smartphone Repair", 
      icon: Smartphone,
      description: "Screen, battery, water damage",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    { 
      id: "laptop", 
      name: "Laptop Repair", 
      icon: Laptop,
      description: "Hardware, software, upgrades",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    },
    { 
      id: "tv", 
      name: "TV Repair", 
      icon: Tv,
      description: "Screen, motherboard, connectivity",
      color: "bg-amber-500",
      hoverColor: "hover:bg-amber-600"
    },
    { 
      id: "fridge", 
      name: "Refrigerator", 
      icon: Home,
      description: "Cooling, compressor, electrical",
      color: "bg-emerald-500",
      hoverColor: "hover:bg-emerald-600"
    },
    { 
      id: "washing", 
      name: "Washing Machine", 
      icon: WashingMachine,
      description: "Drum, motor, drainage",
      color: "bg-cyan-500",
      hoverColor: "hover:bg-cyan-600"
    },
  ];

  const today = new Date().toISOString().split("T")[0];
  const currentHour = new Date().getHours();

  const timeSlots = [
    { label: "Morning", value: "9AM-12PM", start: 9, end: 12, price: "₹299" },
    { label: "Afternoon", value: "12PM-3PM", start: 12, end: 15, price: "₹299" },
    { label: "Evening", value: "3PM-6PM", start: 15, end: 18, price: "₹399" },
    { label: "Night", value: "6PM-9PM", start: 18, end: 21, price: "₹499" },
  ];

  const isToday = formData.serviceDate === today;

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setLocationResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Form validation
  const validateStep = useCallback((step) => {
    const errors = {};
    
    if (step === 2 && !formData.issue.trim()) {
      errors.issue = "Please describe the issue";
    }
    
    if (step === 3) {
      if (!formData.serviceDate) errors.serviceDate = "Please select a date";
      if (!formData.timeSlot) errors.timeSlot = "Please select a time slot";
    }
    
    if (step === 4 && !formData.address.trim()) {
      errors.address = "Please enter your address";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setFormData({ ...formData, serviceId: service.id });
    setTimeout(() => setFormStep(2), 300);
  };

  // Debounced location search
  const searchLocation = useCallback(async (value) => {
    setSearchQuery(value);
    setFormData({ ...formData, address: value });

    if (value.length < 3) {
      setLocationResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(value)}&addressdetails=1`
      );
      const data = await res.json();
      setLocationResults(data);
    } catch (error) {
      console.error("Location search failed");
    } finally {
      setIsSearching(false);
    }
  }, [formData]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setFormErrors({ address: "Geolocation is not supported by your browser" });
      return;
    }

    setLoadingLocation(true);
    setFormErrors({});

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
          .then(res => res.json())
          .then(data => {
            setFormData({
              ...formData,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              address: data.display_name || "Current Location",
            });
            setSearchQuery(data.display_name || "Current Location");
            setLocationResults([]);
            setLoadingLocation(false);
          })
          .catch(() => {
            setFormData({
              ...formData,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              address: "Current Location",
            });
            setSearchQuery("Current Location");
            setLocationResults([]);
            setLoadingLocation(false);
          });
      },
      () => {
        setFormErrors({ address: "Unable to fetch location. Please allow location access." });
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Booking Data:", formData);
      setIsSubmitting(false);
      navigate('/booking-success', { state: formData });
    }, 1500);
  };

  const handleNextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    if (formStep > 1) {
      setFormStep(prev => prev - 1);
      setFormErrors({});
    }
  };

  // Step indicators
  const steps = [
    { number: 1, title: "Service", icon: Smartphone },
    { number: 2, title: "Details", icon: AlertCircle },
    { number: 3, title: "Schedule", icon: Calendar },
    { number: 4, title: "Location", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900">Book a Service</h1>
              <p className="text-sm text-gray-500">Fast, reliable home service</p>
            </div>
            
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${formStep >= step.number 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-400'
                    }
                    ${formStep === step.number ? 'ring-4 ring-blue-100' : ''}
                  `}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`
                    mt-2 text-sm font-medium
                    ${formStep >= step.number ? 'text-blue-600' : 'text-gray-500'}
                  `}>
                    {step.title}
                  </span>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 transition-colors duration-300
                    ${formStep > step.number ? 'bg-blue-600' : 'bg-gray-200'}
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                {/* Step 1: Service Selection */}
                {formStep === 1 && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Service Type</h2>
                      <p className="text-gray-600">Choose the service you need</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {services.map((service) => {
                        const Icon = service.icon;
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceSelect(service)}
                            className={`
                              p-5 rounded-xl border-2 transition-all duration-200
                              ${selectedService?.id === service.id
                                ? 'border-blue-500 bg-blue-50 shadow-sm'
                                : 'border-gray-200 hover:border-blue-200 hover:shadow-sm'
                              }
                            `}
                          >
                            <div className="flex items-start space-x-4">
                              <div className={`
                                w-12 h-12 rounded-lg flex items-center justify-center
                                ${service.color} ${service.hoverColor}
                                transition-colors duration-200
                              `}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1 text-left">
                                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                                {selectedService?.id === service.id && (
                                  <div className="flex items-center mt-2 text-blue-600 text-sm">
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Selected
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    
                    {selectedService && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-blue-800 font-medium">Selected:</p>
                            <p className="text-gray-900 font-semibold">{selectedService.name}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleNextStep()}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Issue Details */}
                {formStep === 2 && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Describe the Issue</h2>
                      <p className="text-gray-600">Help our technician understand the problem</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What's wrong with your {selectedService?.name.toLowerCase()}?
                        </label>
                        <textarea
                          value={formData.issue}
                          onChange={(e) => {
                            setFormData({ ...formData, issue: e.target.value });
                            if (formErrors.issue) setFormErrors({ ...formErrors, issue: '' });
                          }}
                          rows={5}
                          className={`
                            w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
                            ${formErrors.issue ? 'border-red-300' : 'border-gray-300'}
                          `}
                          placeholder="Example: Screen cracked after dropping, display shows vertical lines..."
                        />
                        {formErrors.issue && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.issue}</p>
                        )}
                        <p className="mt-2 text-sm text-gray-500">
                          Be specific about symptoms, error messages, and when the problem started.
                        </p>
                      </div>
                      
                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          disabled={!formData.issue.trim()}
                          className={`
                            px-6 py-2.5 rounded-lg font-medium transition-colors
                            ${formData.issue.trim()
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }
                          `}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Schedule */}
                {formStep === 3 && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Date & Time</h2>
                      <p className="text-gray-600">Choose when you'd like the service</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="date"
                            min={today}
                            value={formData.serviceDate}
                            onChange={(e) => {
                              setFormData({ ...formData, serviceDate: e.target.value });
                              if (formErrors.serviceDate) setFormErrors({ ...formErrors, serviceDate: '' });
                            }}
                            className={`
                              w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
                              ${formErrors.serviceDate ? 'border-red-300' : 'border-gray-300'}
                            `}
                          />
                        </div>
                        {formErrors.serviceDate && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.serviceDate}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Available Time Slots
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {timeSlots.map((slot) => {
                            const isDisabled = isToday && currentHour >= slot.start;
                            const isSelected = formData.timeSlot === slot.value;
                            
                            return (
                              <button
                                key={slot.value}
                                type="button"
                                onClick={() => {
                                  if (!isDisabled) {
                                    setFormData({ ...formData, timeSlot: slot.value });
                                    if (formErrors.timeSlot) setFormErrors({ ...formErrors, timeSlot: '' });
                                  }
                                }}
                                disabled={isDisabled}
                                className={`
                                  p-4 rounded-xl border transition-all duration-200
                                  ${isSelected
                                    ? 'border-blue-500 bg-blue-50'
                                    : isDisabled
                                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                                    : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                                  }
                                `}
                              >
                                <div className="text-left">
                                  <div className="flex items-center justify-between mb-2">
                                    <Clock className={`
                                      w-5 h-5
                                      ${isSelected ? 'text-blue-500' : 'text-gray-400'}
                                    `} />
                                    {isSelected && (
                                      <CheckCircle className="w-5 h-5 text-blue-500" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{slot.label}</div>
                                    <div className="text-sm text-gray-500 mt-1">
                                      {slot.start}:00 - {slot.end}:00
                                    </div>
                                    <div className="text-sm font-medium text-blue-600 mt-2">
                                      {slot.price}
                                    </div>
                                  </div>
                                  {isDisabled && (
                                    <div className="text-xs text-red-500 font-medium mt-2">
                                      Unavailable
                                    </div>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        {formErrors.timeSlot && (
                          <p className="mt-2 text-sm text-red-600">{formErrors.timeSlot}</p>
                        )}
                      </div>
                      
                      <div className="flex justify-between pt-4">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          disabled={!formData.serviceDate || !formData.timeSlot}
                          className={`
                            px-6 py-2.5 rounded-lg font-medium transition-colors
                            ${formData.serviceDate && formData.timeSlot
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }
                          `}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Location */}
                {formStep === 4 && (
                  <div className="space-y-6" ref={searchRef}>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Address</h2>
                      <p className="text-gray-600">Where should our technician visit?</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Search Address
                        </label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => searchLocation(e.target.value)}
                            className={`
                              w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
                              ${formErrors.address ? 'border-red-300' : 'border-gray-300'}
                            `}
                            placeholder="Enter street address, landmark, or area"
                          />
                          {isSearching && (
                            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
                          )}
                        </div>
                        
                        {locationResults.length > 0 && (
                          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-auto">
                            {locationResults.map((item) => (
                              <button
                                key={item.place_id}
                                type="button"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    address: item.display_name,
                                    latitude: item.lat,
                                    longitude: item.lon,
                                  });
                                  setSearchQuery(item.display_name);
                                  setLocationResults([]);
                                }}
                                className="w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                              >
                                <div className="flex items-start">
                                  <MapPin className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 truncate">
                                      {item.name || item.display_name.split(",")[0]}
                                    </div>
                                    <div className="text-sm text-gray-500 truncate">
                                      {item.display_name}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                        
                        {formErrors.address && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                        )}
                      </div>
                      
                      <div>
                        <button
                          type="button"
                          onClick={getCurrentLocation}
                          disabled={loadingLocation}
                          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="flex items-center justify-center space-x-2">
                            {loadingLocation ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                                <span className="font-medium text-gray-700">Detecting location...</span>
                              </>
                            ) : (
                              <>
                                <Navigation className="w-5 h-5 text-blue-500" />
                                <span className="font-medium text-gray-700">Use My Current Location</span>
                              </>
                            )}
                          </div>
                        </button>
                      </div>
                      
                      {formData.address && (
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-green-800">Address Selected</p>
                              <p className="text-sm text-green-700 mt-1 truncate">{formData.address}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between pt-6">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={!formData.address.trim() || isSubmitting}
                          className={`
                            px-8 py-2.5 rounded-lg font-medium transition-colors flex items-center
                            ${!isSubmitting && formData.address.trim()
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }
                          `}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin mr-2" />
                              Processing...
                            </>
                          ) : (
                            'Book Service Now'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                
                <div className="space-y-4">
                  {selectedService && (
                    <div className="pb-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg ${selectedService.color} flex items-center justify-center`}>
                            <selectedService.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{selectedService.name}</p>
                            <p className="text-sm text-gray-500">Service Type</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {formData.serviceDate && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">Date</span>
                        <span className="font-medium text-gray-900">
                          {new Date(formData.serviceDate).toLocaleDateString('en-IN', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {formData.timeSlot && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">Time Slot</span>
                        <span className="font-medium text-gray-900">
                          {timeSlots.find(s => s.value === formData.timeSlot)?.label || ''}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {formData.address && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-600 mb-1">Address</p>
                          <p className="text-sm text-gray-900 truncate">{formData.address}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-medium text-gray-900">
                        {formData.timeSlot 
                          ? timeSlots.find(s => s.value === formData.timeSlot)?.price 
                          : '₹299'
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Diagnostic Fee</span>
                      <span className="font-medium text-gray-900">₹99</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-gray-900">
                        {formData.timeSlot 
                          ? `₹${parseInt(timeSlots.find(s => s.value === formData.timeSlot)?.price.replace('₹', '') || '299') + 99}`
                          : '₹398'
                        }
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      * Final charges may vary based on parts required
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Free cancellation until 2 hours before service
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Certified technicians
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    90-day service warranty
                  </div>
                </div>
              </div>
              
              {/* Help Section */}
              <div className="mt-4 bg-blue-50 rounded-2xl border border-blue-100 p-4">
                <h4 className="font-medium text-blue-900 mb-2">Need help?</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Call us at <span className="font-semibold">1800-123-4567</span> or chat with our support team
                </p>
                <button className="w-full px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Chat with Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookServiceForm;