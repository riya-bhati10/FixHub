import React from 'react';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';
import HeroSection from '../../Components/HeroSection';
import GadgetsCarousel from '../../Components/GadgetsCarousel';
import ServicesSection from '../../Components/ServicesSection';
import TestimonialsSection from '../../Components/TestimonialsSection';

const LandingPage = () => {
  const landingNavLinks = [
    { path: '/', label: 'Home' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/about', label: 'About' },
  ];

  return (
    <div className="w-full m-0 p-0">
      <Navbar 
        userType="landing"
        navLinks={landingNavLinks}
        showProfile={false}
        showNotifications={false}
      />
      <HeroSection />
      <GadgetsCarousel />
      <ServicesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;