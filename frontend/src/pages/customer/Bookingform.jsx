import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';

const BookServiceForm = ({ showNavbar = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('General Maintenance');
  const [selectedDate, setSelectedDate] = useState('Oct 5, 2024');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:00 - 11:00 AM');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  
  const services = [
    { id: 1, name: 'General Maintenance', icon: 'settings_suggest', description: 'Routine checkup and cleaning for peak performance.', price: 85 },
    { id: 2, name: 'Emergency Repair', icon: 'home_repair_service', description: 'Urgent fixes for critical hardware issues.', price: 120 },
    { id: 3, name: 'System Installation', icon: 'add_to_photos', description: 'New equipment setup and configuration.', price: 150 },
    { id: 4, name: 'Diagnostic Check', icon: 'query_stats', description: 'Advanced troubleshooting and reporting.', price: 65 },
  ];
  
  const timeSlots = [
    '09:00 - 11:00 AM',
    '11:00 - 01:00 PM',
    '02:00 - 04:00 PM',
    '04:00 - 06:00 PM'
  ];
  
  const calendarDays = [
    { day: 28, disabled: true },
    { day: 29, disabled: true },
    { day: 30, disabled: true },
    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5, selected: true },
    { day: 6 },
  ];

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateTotal = () => {
    const service = services.find(s => s.name === selectedService);
    return service ? service.price + 12.50 : 97.50;
  };

  const handleBooking = () => {
    alert(`Booking Confirmed!\nService: ${selectedService}\nDate: ${selectedDate}\nTime: ${selectedTimeSlot}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-50 flex items-center justify-center p-4">
      {showNavbar && <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
      <div className="max-w-6xl w-full">
        {/* Progress Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 text-center">
            Book Your Service
          </h1>
          <p className="text-gray-600 text-lg text-center mb-8">
            Easy booking in just 3 simple steps
          </p>
          
          {/* Progress Steps */}
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                      currentStep >= step 
                        ? 'bg-teal-600 text-white shadow-lg shadow-teal-200' 
                        : 'bg-white text-gray-400 border-2 border-gray-200'
                    }`}>
                      {step}
                    </div>
                    <span className={`mt-2 text-sm font-medium ${
                      currentStep >= step ? 'text-teal-700' : 'text-gray-500'
                    }`}>
                      {step === 1 && 'Service'}
                      {step === 2 && 'Schedule'}
                      {step === 3 && 'Details'}
                    </span>
                  </div>
                  {step < 3 && (
                    <div className={`flex-1 h-1 mx-4 ${
                      currentStep > step ? 'bg-teal-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Panel - Form */}
            <div className="flex-1 p-6 md:p-8 lg:p-10">
              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <div className="animate-fadeIn">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Service</h2>
                    <p className="text-gray-600">Select the type of service you need</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.name)}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                          selectedService === service.name
                            ? 'border-teal-600 bg-teal-50 shadow-lg shadow-teal-100'
                            : 'border-gray-200 hover:border-teal-400'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl ${
                            selectedService === service.name ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            <span className="material-symbols-outlined text-2xl">
                              {service.icon}
                            </span>
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-gray-900">{service.name}</h3>
                              <span className="font-bold text-teal-600">${service.price}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Schedule & Time */}
              {currentStep === 2 && (
                <div className="animate-fadeIn">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Date & Time</h2>
                    <p className="text-gray-600">Choose when you'd like the service</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Calendar */}
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900">Select Date</h3>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">chevron_left</span>
                          </button>
                          <span className="font-bold text-gray-900 px-4">October 2024</span>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">chevron_right</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-2 mb-3">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                          <div key={i} className="text-center text-sm font-medium text-gray-500 py-2">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((dayInfo, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedDate(`Oct ${dayInfo.day}, 2024`)}
                            disabled={dayInfo.disabled}
                            className={`p-3 rounded-xl text-center transition-all ${
                              dayInfo.selected
                                ? 'bg-teal-600 text-white shadow-lg'
                                : dayInfo.disabled
                                ? 'text-gray-300'
                                : 'text-gray-700 hover:bg-teal-50 hover:text-teal-700'
                            }`}
                          >
                            {dayInfo.day}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4">Available Time Slots</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                              selectedTimeSlot === slot
                                ? 'border-teal-600 bg-teal-50 text-teal-700'
                                : 'border-gray-200 hover:border-teal-400'
                            }`}
                          >
                            <div className="font-bold">{slot.split(' - ')[0]}</div>
                            <div className="text-sm text-gray-600">{slot.split(' - ')[1]}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Location & Details */}
              {currentStep === 3 && (
                <div className="animate-fadeIn">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Final Details</h2>
                    <p className="text-gray-600">Tell us where and what you need</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Service Address
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          location_on
                        </span>
                        <input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                          placeholder="Enter your complete address"
                          type="text"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all resize-none"
                        placeholder="Access codes, specific concerns, pet information, etc."
                        rows="4"
                      />
                    </div>

                    <div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-6 rounded-2xl border border-cyan-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <span className="material-symbols-outlined text-teal-600">
                            info
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900">Service Coverage Available</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Our technicians are available in your area. Most services are completed within 2-4 hours of arrival.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 mt-8 border-t border-gray-100">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <span className="material-symbols-outlined align-middle mr-2">
                      arrow_back
                    </span>
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300 hover:scale-105 transition-all ml-auto"
                  >
                    Continue
                    <span className="material-symbols-outlined align-middle ml-2">
                      arrow_forward
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handleBooking}
                    className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300 hover:scale-105 transition-all ml-auto"
                  >
                    <span className="material-symbols-outlined align-middle mr-2">
                      check_circle
                    </span>
                    Confirm Booking
                  </button>
                )}
              </div>
            </div>

            {/* Right Panel - Summary */}
            <div className="lg:w-96 bg-gradient-to-b from-gray-50 to-white p-6 md:p-8 lg:p-10 border-l border-gray-100">
              <div className="sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>
                
                <div className="space-y-6">
                  {/* Service Card */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-teal-100 rounded-xl">
                        <span className="material-symbols-outlined text-teal-600">
                          settings_suggest
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Service</div>
                        <div className="font-bold text-gray-900">{selectedService}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <span className="material-symbols-outlined text-blue-600">
                          calendar_today
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Date & Time</div>
                        <div className="font-bold text-gray-900">{selectedDate}</div>
                        <div className="text-sm text-gray-600">{selectedTimeSlot}</div>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">Price Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Fee</span>
                        <span className="font-medium">$85.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Materials & Parts</span>
                        <span className="font-medium">$12.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Tax</span>
                        <span className="font-medium">$5.25</span>
                      </div>
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900">Total</span>
                          <span className="text-2xl font-black text-teal-600">
                            ${calculateTotal().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="material-symbols-outlined text-teal-600">
                        verified
                      </span>
                      <span>Background-checked technicians</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="material-symbols-outlined text-teal-600">
                        shield
                      </span>
                      <span>100% satisfaction guarantee</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="material-symbols-outlined text-teal-600">
                        schedule
                      </span>
                      <span>Same-day service available</span>
                    </div>
                  </div>

                  {/* Support */}
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-5 rounded-2xl border border-teal-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-white rounded-lg">
                        <span className="material-symbols-outlined text-teal-600">
                          support_agent
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Need Help?</div>
                        <div className="text-sm text-gray-600">Call 24/7 Support</div>
                      </div>
                    </div>
                    <div className="text-2xl font-black text-teal-700">1-800-SERVICE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            By booking, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BookServiceForm;