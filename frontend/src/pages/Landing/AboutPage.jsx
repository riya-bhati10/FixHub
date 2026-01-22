import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';

const AboutPage = () => {
  const navigate = useNavigate();
  const stats = [
    { number: '500+', label: 'Happy Customers' },
    { number: '50+', label: 'Expert Technicians' },
    { number: '1000+', label: 'Devices Repaired' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Lead Technician',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
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
            About FixHub
          </h1>
          <p className="text-xl text-fixhub-light max-w-3xl mx-auto">
            We're on a mission to make electronics repair accessible, reliable, and convenient for everyone.
          </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-fixhub-textDark mb-6">
                Our Story
              </h2>
              <p className="text-fixhub-textMuted mb-4 leading-relaxed">
                Founded in 2020, FixHub started with a simple idea: electronics repair shouldn't be complicated, expensive, or time-consuming. We noticed that people were throwing away perfectly repairable devices simply because finding reliable repair services was too difficult.
              </p>
              <p className="text-fixhub-textMuted mb-4 leading-relaxed">
                Today, we've built a network of certified technicians who bring professional repair services directly to your doorstep. From smartphones to home appliances, we've helped thousands of customers save money and reduce electronic waste.
              </p>
              <p className="text-fixhub-textMuted leading-relaxed">
                Our commitment to quality, transparency, and customer satisfaction has made us the trusted choice for electronics repair in the digital age.
              </p>
            </div>
            <div>
              <img
                src="/src/assets/repair-bg.png"
                alt="FixHub Team"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-fixhub-bgCard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-fixhub-textDark mb-4">
              FixHub by the Numbers
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-fixhub-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-fixhub-textMuted font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-fixhub-textDark mb-4">
              Our Mission & Values
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-fixhub-primary text-fixhub-textWhite w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fixhub-textDark mb-3">Quality First</h3>
              <p className="text-fixhub-textMuted">We never compromise on the quality of our repairs or customer service.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-fixhub-primary text-fixhub-textWhite w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fixhub-textDark mb-3">Transparency</h3>
              <p className="text-fixhub-textMuted">Clear pricing, honest diagnostics, and no hidden fees - ever.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-fixhub-primary text-fixhub-textWhite w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-fixhub-textDark mb-3">Innovation</h3>
              <p className="text-fixhub-textMuted">We continuously improve our processes and adopt the latest repair technologies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-fixhub-bgCard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-fixhub-textDark mb-4">
              Meet Our Team
            </h2>
            <p className="text-fixhub-textMuted">
              The passionate people behind FixHub's success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-fixhub-textDark mb-2">
                  {member.name}
                </h3>
                <p className="text-fixhub-textMuted">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;