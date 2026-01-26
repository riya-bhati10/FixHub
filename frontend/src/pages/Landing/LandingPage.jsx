import React from 'react';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';
import HeroSection from '../../Components/HeroSection';
import GadgetsCarousel from '../../Components/GadgetsCarousel';
import ServicesSection from '../../Components/ServicesSection';
import TestimonialsSection from '../../Components/TestimonialsSection';

const LandingPage = () => {
  return (
    <div className="w-full m-0 p-0">
      <Navbar />
      <HeroSection />
      <GadgetsCarousel />
      <ServicesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;