import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';

const HowItWorksPage = () => {
  const navigate = useNavigate();
  const steps = [
    {
      step: '01',
      title: 'Book Your Service',
      description: 'Choose your device and describe the issue. Select a convenient time slot for our technician visit.',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      )
    },
    {
      step: '02',
      title: 'Expert Diagnosis',
      description: 'Our certified technician arrives at your doorstep, diagnoses the problem, and provides a transparent quote.',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      step: '03',
      title: 'Professional Repair',
      description: 'Using genuine parts and advanced tools, we fix your device with precision and care.',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      )
    },
    {
      step: '04',
      title: 'Quality Assurance',
      description: 'We test your device thoroughly and provide a warranty on our repair work for your peace of mind.',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-fixhub-bgWhite">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-fixhub-bgDark to-fixhub-bgDarkAlt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="mb-6 flex items-center text-fixhub-textWhite hover:text-fixhub-mint transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-fixhub-textWhite mb-6">
            How FixHub Works
          </h1>
          <p className="text-xl text-fixhub-light max-w-3xl mx-auto">
            Getting your electronics repaired has never been easier. Follow these simple steps to get your devices fixed by certified professionals.
          </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="bg-fixhub-primary text-fixhub-textWhite w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-fixhub-mint text-fixhub-textDark w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-fixhub-textDark mb-4">
                  {step.title}
                </h3>
                <p className="text-fixhub-textMuted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-fixhub-bgCard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-fixhub-textDark mb-4">
              Why Choose FixHub?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-fixhub-primary text-fixhub-textWhite w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fixhub-textDark mb-2">Certified Technicians</h3>
              <p className="text-fixhub-textMuted">All our technicians are certified and experienced professionals</p>
            </div>
            
            <div className="text-center">
              <div className="bg-fixhub-primary text-fixhub-textWhite w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fixhub-textDark mb-2">Genuine Parts</h3>
              <p className="text-fixhub-textMuted">We use only genuine and high-quality replacement parts</p>
            </div>
            
            <div className="text-center">
              <div className="bg-fixhub-primary text-fixhub-textWhite w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fixhub-textDark mb-2">Warranty Included</h3>
              <p className="text-fixhub-textMuted">All repairs come with a comprehensive warranty for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;