import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Signup attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-fixhub-bgWhite">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-fixhub-bgCard rounded-xl p-8 shadow-lg border border-fixhub-borderSoft">
            <h1 className="text-3xl font-bold text-fixhub-textDark text-center mb-8">
              Create Account
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-fixhub-textDark font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-fixhub-borderSoft rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-fixhub-textDark font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-fixhub-borderSoft rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-fixhub-textDark font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-fixhub-borderSoft rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-fixhub-textDark font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-fixhub-borderSoft rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-fixhub-textDark font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-fixhub-borderSoft rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-fixhub-primary text-fixhub-textWhite py-3 rounded-lg font-semibold hover:bg-fixhub-dark transition-colors"
              >
                Create Account
              </button>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-fixhub-textMuted">
                Already have an account?{' '}
                <Link to="/login" className="text-fixhub-primary hover:text-fixhub-dark font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;