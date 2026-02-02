import React from "react";

import FixHubDashboard from "./pages/customer/Mybooking";
import BookService from "./pages/customer/BookService";
import ServiceList from "./pages/customer/ServiceList";
import BookingForm from "./pages/customer/BookingForm";
import ProfileEdi from "./pages/customer/ProfileEdit";
import Dashboard from "./pages/customer/Dashbaord";
import ReviewPage from "./pages/customer/ReviewPage";
import BookingSuccess from "./pages/customer/BookingSuccess";
import CancelBooking from "./pages/customer/CancelBooking";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Landing/LoginPage";
import SignupPage from "./pages/Landing/SignupPage";
import HowItWorksPage from "./pages/Landing/HowItWorksPage";
import AboutPage from "./pages/Landing/AboutPage";
import { TechnicianDashboard } from "./pages/Technician";
import ProtectedRoute from "./pages/Landing/ProtectedRoute";
import AdminLayout from "./layouts/Admin/AdminLayout";
import { AdminDashboard, Technicians, Customers, Earnings } from "./pages/Admin";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Legacy Route Redirects */}
      <Route path="/dashboard" element={<Navigate to="/customer/dashboard" replace />} />
      <Route path="/book-service" element={<Navigate to="/customer/book-service" replace />} />
      <Route path="/my-booking" element={<Navigate to="/customer/my-bookings" replace />} />
      <Route path="/profile" element={<Navigate to="/customer/profile" replace />} />
      <Route path="/booking-form" element={<Navigate to="/customer/booking-form" replace />} />
      <Route path="/review" element={<Navigate to="/customer/review" replace />} />
      <Route path="/booking-success" element={<Navigate to="/customer/booking-success" replace />} />
      <Route path="/cancel-booking" element={<Navigate to="/customer/cancel-booking" replace />} />

      {/* Customer Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
        <Route path="/customer/dashboard" element={<Dashboard />} />
        <Route path="/customer/my-bookings" element={<FixHubDashboard />} />
        <Route path="/customer/book-service" element={<BookService />} />
        <Route path="/customer/services/:categoryId" element={<ServiceList />} />
        <Route path="/customer/booking-form" element={<BookingForm />} />
        <Route path="/customer/profile" element={<ProfileEdi />} />
        <Route path="/customer/review" element={<ReviewPage />} />
        <Route path="/customer/booking-success" element={<BookingSuccess />} />
        <Route path="/customer/cancel-booking" element={<CancelBooking />} />
      </Route>

      {/* Technician Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['technician']} />}>
        <Route path="/technician/*" element={<TechnicianDashboard />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="technicians" element={<Technicians />} />
          <Route path="customers" element={<Customers />} />
          <Route path="earnings" element={<Earnings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
