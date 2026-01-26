import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import bgImage from '../../assets/repair-bg.png';

const SignupPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    phone: '', 
    location: ''
  });

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
    console.log('Signup attempt:', { ...formData });
    
    // Navigate based on role
    if (formData.role === 'technician') {
      navigate('/technician/dashboard');
    } else {
      navigate('/customer/dashboard');
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
