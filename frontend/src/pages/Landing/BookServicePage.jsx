import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';

const BookServicePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    device: '',
    issue: '',
    address: '',
    preferredDate: '',
    preferredTime: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Service booking:', formData);
    alert('Service booked successfully! We will contact you soon.');
  };

  const devices = [
    'Smartphone', 'Laptop', 'Desktop', 'Tablet', 'Television', 
    'Refrigerator', 'Washing Machine', 'Air Conditioner', 'Microwave', 'Other'
  ];

  const timeSlots = [
    '9:00 AM - 11:00 AM', '11:00 AM - 1:00 PM', '1:00 PM - 3:00 PM', 
    '3:00 PM - 5:00 PM', '5:00 PM - 7:00 PM', '7:00 PM - 9:00 PM'
  ];

  return (
    <div className="min-h-screen bg-fixhub-bgWhite">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-4 flex items-center text-fixhub-textDark hover:text-fixhub-primary transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-fixhub-textDark mb-4">
              Book Your Repair Service
            </h1>
            <p className="text-lg text-fixhub-textMuted">
              Fill out the form below and our expert technician will visit you at your convenience
            </p>
          </div>

          <div className="bg-fixhub-bgCard rounded-xl p-8 shadow-lg border border-fixhub-borderSoft">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-fixhub-textDark font-medium mb-2">
                    Full Name *
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
                    Email Address *
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-fixhub-textDark font-medium mb-2">
                    Phone Number *
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
                    Device Type *
                  </label>
                  <select
                    name="device"
                    value={formData.device}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-fixhub-borderSoft rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                    required
                  >
                    <option value="">Select Device</option>
                    {devices.map((device) => (
                      <option key={device} value={device}>{device}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-fixhub-textDark font-medium mb-2">
                  Describe the Issue *
                </label>
                <textarea
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-fixhub-borderSoft rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                  placeholder="Please describe the problem with your device..."
                  required
                />
              </div>

              <div>
                <label className="block text-fixhub-textDark font-medium mb-2">
                  Service Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-fixhub-borderSoft rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                  placeholder="Enter your complete address..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-fixhub-textDark font-medium mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-fixhub-borderSoft rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-fixhub-textDark font-medium mb-2">
                    Preferred Time *
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-fixhub-borderSoft rounded-lg focus:outline-none focus:ring-2 focus:ring-fixhub-primary"
                    required
                  >
                    <option value="">Select Time Slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-fixhub-primary text-fixhub-textWhite py-4 rounded-lg font-semibold text-lg hover:bg-fixhub-dark transition-colors"
              >
                Book Service Now
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookServicePage;