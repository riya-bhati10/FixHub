import React from "react";


import FixHubDashboard from "./pages/customer/Mybooking";
import BookService from "./pages/customer/BookService"
import ProfileEdi from "./pages/customer/ProfileEdit"
import BookServiceForm from "./pages/customer/Bookingform";
import Dashboard from "./pages/customer/Dashbaord";
import ReviewPage from "./pages/customer/ReviewPage";
import BookingSuccess from "./pages/customer/BookingSuccess";
import CancelBooking from "./pages/customer/CancelBooking";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Landing/LoginPage";
import SignupPage from "./pages/Landing/SignupPage";
import HowItWorksPage from "./pages/Landing/HowItWorksPage";
import AboutPage from "./pages/Landing/AboutPage";
import BookServicePage from "./pages/Landing/BookServicePage";

const App = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-booking" element={<FixHubDashboard />} />
      <Route path="/book-service" element={<BookService />} />
      <Route path="/profile" element={<ProfileEdi />} />
      <Route path="/booking-form" element={<BookServiceForm />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/booking-success" element={<BookingSuccess />} />
      <Route path="/cancel-booking" element={<CancelBooking />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>


  );
};

export default App;
