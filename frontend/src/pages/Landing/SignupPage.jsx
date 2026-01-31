import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import bgImage from '../../assets/repair-bg.png';
import authService from './auth.service';

const SignupPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    phone: '', 
    location: ''
  });
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam) {
      setFormData(prev => ({ ...prev, role: roleParam }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLocationChange = async (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      location: value
    });

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setFormData({
      ...formData,
      location: suggestion.display_name
    });
    setSuggestions([]);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setFormData((prev) => ({ ...prev, location: data.display_name }));
          } catch (error) {
            console.error('Error fetching address:', error);
            setFormData((prev) => ({ ...prev, location: `${latitude}, ${longitude}` }));
          }
          setSuggestions([]);
        },
        (error) => {
          alert('Unable to retrieve location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        fullname: {
          firstname: formData.firstName,
          lastname: formData.lastName
        },
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        location: formData.location
      };

<<<<<<< HEAD
      const response = await authService.register(userData);
      
      // Store token and user data for automatic login
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Redirect based on role
        if (response.role === 'technician') {
          navigate('/technician/dashboard');
        } else {
          navigate('/dashboard');
        }
=======
      const data = await authService.register(userData);
      setUser(data.user);
      alert('Registration successful!');
      if (data.role === 'technician') {
        navigate('/technician/dashboard');
      } else {
        navigate('/dashboard');
>>>>>>> fixhub-check
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-no-repeat bg-cover bg-center overflow-hidden py-8 relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 text-white px-4 py-2 rounded-lg flex items-center hover:opacity-90 transition-opacity"
        style={{ backgroundColor: '#0d3d43' }}
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      <div className="w-full max-w-md rounded-xl shadow-lg bg-fixhub-bgWhite/80 backdrop-blur-md border border-white/30 p-10 font-poppins">
        <h2 className="text-2xl font-bold text-center mb-6 text-fixhub-textDark">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
            required
          >
            <option value="">Select Role</option>
            <option value="customer">Customer</option>
            <option value="technician">Technician</option>
          </select>
          
          <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
              required
            />
            
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
              required
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
              required
            />

            <div className="relative">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleLocationChange}
                  placeholder="Location or Address"
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                  required
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="px-3 py-2 bg-fixhub-mint hover:bg-fixhub-primary hover:text-white text-fixhub-textDark rounded-md font-medium transition text-sm whitespace-nowrap"
                >
                  Get Location
                </button>
              </div>
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.place_id}
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                    >
                      {suggestion.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

        
            <button
              type="submit"
              className="w-full bg-fixhub-primary hover:bg-fixhub-dark text-white py-2 rounded-md font-semibold transition"
            >
              Sign Up
            </button>
          </form>

        <p className="text-center text-sm text-fixhub-textMuted mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-fixhub-primary font-semibold ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
