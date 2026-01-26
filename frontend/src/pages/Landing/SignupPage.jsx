import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgImage from '../../assets/repair-bg.png';

const SignupPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '', 
    location: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            location: `${latitude}, ${longitude}`
          });
        },
        (error) => {
          alert('Unable to retrieve location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Signup attempt:', { ...formData, userType });
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-no-repeat bg-cover bg-center overflow-hidden py-8 relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <button
        onClick={() => userType ? setUserType(null) : navigate('/')}
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
          {!userType ? 'Choose Account Type' : `Sign Up as ${userType === 'customer' ? 'Customer' : 'Technician'}`}
        </h2>

        {!userType ? (
          <div className="space-y-4">
            <button
              onClick={() => setUserType('customer')}
              className="w-full bg-fixhub-primary hover:bg-fixhub-dark text-white py-3 rounded-md font-semibold transition"
            >
              Sign Up as Customer
            </button>
            <button
              onClick={() => setUserType('technician')}
              className="w-full bg-fixhub-mint hover:bg-fixhub-primary hover:text-white text-fixhub-textDark py-3 rounded-md font-semibold transition"
            >
              Sign Up as Technician
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="flex gap-2">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location (Lat, Long)"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                required
              />
              <button
                type="button"
                onClick={handleGetLocation}
                className="px-3 py-2 bg-fixhub-mint hover:bg-fixhub-primary hover:text-white text-fixhub-textDark rounded-md font-medium transition text-sm whitespace-nowrap"
              >
                Get Location
              </button>
            </div>

        
            <button
              type="submit"
              className="w-full bg-fixhub-primary hover:bg-fixhub-dark text-white py-2 rounded-md font-semibold transition"
            >
              Sign Up
            </button>
          </form>
        )}

        <p className="text-center text-sm text-fixhub-textMuted mt-6">
          {!userType ? 'Already have an account?' : 'Already have an account?'}
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
