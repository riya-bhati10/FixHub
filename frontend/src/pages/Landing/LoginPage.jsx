import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgImage from '../../assets/repair-bg.png';
import authService from './auth.service';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(formData.email, formData.password);
      
      // Store user data
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      if (data.role === 'technician') {
        navigate('/technician/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-no-repeat bg-cover bg-center overflow-hidden relative"
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
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
            required
          />

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-fixhub-primary hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-fixhub-primary hover:bg-fixhub-dark text-white py-2 rounded-md font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-fixhub-textMuted mt-6">
          Do not have an account?
          <Link
            to="/signup"
            className="text-fixhub-primary font-semibold ml-1 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
