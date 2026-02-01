import React from "react";

import FixHubDashboard from "./pages/customer/Mybooking";
import BookService from "./pages/customer/BookServiceNew"
import ProfileEdi from "./pages/customer/ProfileEdit"
import BookServiceForm from "./pages/customer/BookingformNew";
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
import { TechnicianDashboard } from "./pages/Technician";
import ProtectedRoute from "./pages/Landing/ProtectedRoute";
import AdminDashbaord from "./pages/Admin/Dashbaord";
import Customer from "./pages/Admin/Customer";
import Technician from "./pages/Admin/Technician";
import AdminProfile from "./pages/Admin/Profile";
const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Customer Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-booking" element={<FixHubDashboard />} />
        <Route path="/book-service" element={<BookService />} />
        <Route path="/profile" element={<ProfileEdi />} />
        <Route path="/booking-form" element={<BookServiceForm />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/cancel-booking" element={<CancelBooking />} />
      </Route>

      {/* Technician Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['technician']} />}>
        <Route path="/technician/*" element={<TechnicianDashboard />} />
      </Route>
      <Route path="/admin/*" element={<AdminDashbaord />} />
      <Route path="/admin/customers" element={<Customer />} />
      <Route path="/admin/technicians" element={<Technician />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>

      </Route>
    </Routes>
  );
};

export default App;
