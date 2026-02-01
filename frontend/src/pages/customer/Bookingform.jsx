import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Common/Navbar";

const BookServiceForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceType: "",
    issue: "",
    serviceDate: "",
    timeSlot: "",
    address: "",
  });

  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionTimeoutRef = useRef(null);

  // Helper function to fetch address from coordinates
  const fetchAddressFromCoords = async (coords) => {
    const { latitude, longitude } = coords;
    
    try {
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
        setFormData(prev => ({ 
          ...prev, 
          address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` 
        }));
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      setFormData(prev => ({ 
        ...prev, 
        address: `https://www.google.com/maps?q=${latitude},${longitude}` 
      }));
    } finally {
      setIsLocating(false);
    }
  };

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

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await fetchAddressFromCoords(position.coords);
      },
      (error) => {
        handleGeolocationError(error);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
    );
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

  const handleChange = (e) => {
    if (e.target.name === 'address') {
      if (suggestionTimeoutRef.current) clearTimeout(suggestionTimeoutRef.current);
      suggestionTimeoutRef.current = setTimeout(() => fetchAddressSuggestions(e.target.value), 500);
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Booking Data:", formData);

    // yahan backend API call kar sakte ho
    // axios.post("/api/book-service", formData)

    navigate("/booking-success");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto bg-white p-6 mt-24 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">
          Book Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
        

          {/* Issue */}
          <div>
            <label className="block mb-1 font-medium">Issue</label>
            <textarea
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              required
              placeholder="Describe your issue"
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 font-medium">Service Date</label>
            <input
              type="date"
              name="serviceDate"
              value={formData.serviceDate}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Time Slot */}
          <div>
            <label className="block mb-1 font-medium">Time Slot</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select Time</option>
              <option value="9AM-12PM">9 AM - 12 PM</option>
              <option value="12PM-3PM">12 PM - 3 PM</option>
              <option value="3PM-6PM">3 PM - 6 PM</option>
              <option value="6PM-9PM">6 PM - 9 PM</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block font-medium">Service Address</label>
              <button
                type="button"
                onClick={getLocation}
                disabled={isLocating}
                className="text-teal-600 text-sm font-bold flex items-center gap-1 hover:bg-teal-50 px-2 py-1 rounded transition-colors"
              >
                {isLocating ? (
                  <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-base">my_location</span>
                )}
                {isLocating ? 'Locating...' : 'Get Location'}
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter your address"
                className="w-full border p-2 rounded"
                autoComplete="off"
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => formData.address.length >= 3 && setShowSuggestions(true)}
              />
              {showSuggestions && addressSuggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 shadow-lg max-h-60 overflow-y-auto mt-1 rounded-md">
                  {addressSuggestions.map((suggestion) => (
                    <div 
                      key={suggestion.place_id}
                      className="p-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 text-sm text-gray-700"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, address: suggestion.display_name }));
                        setAddressSuggestions([]);
                        setShowSuggestions(false);
                      }}
                    >
                      {suggestion.display_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {locationError && <p className="text-red-500 text-sm mt-1">{locationError}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
          >
            Book Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookServiceForm;