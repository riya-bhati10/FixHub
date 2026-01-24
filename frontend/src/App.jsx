import React from "react";
import { Routes, Route } from "react-router-dom";

import FixHubDashboard from "./pages/customer/Mybooking";
import BookService from "./pages/customer/BookService"
import ProfileEdi from "./pages/customer/ProfileEdit"
import BookServiceForm from "./pages/customer/Bookingform";
import Dashabaord from "./pages/customer/Dashbaord";
import ReviewPage from "./pages/customer/ReviewPage";
import BookingSuccess from "./pages/customer/BookingSuccess";
import CancelBooking from "./pages/customer/CancelBooking";

const App = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashabaord />} />
      <Route path="/my-booking" element={<FixHubDashboard />} />
      <Route path="/book-service" element={<BookService />} />
      <Route path="/profile" element={<ProfileEdi />} />
      <Route path="/booking-from" element={<BookServiceForm showNavbar={false} />} />
       <Route path="/review" element={<ReviewPage/>} />
       <Route path="/booking-success" element={<BookingSuccess />} />
       <Route path="/cancel-booking" element={<CancelBooking />} />
    </Routes>
  );
};

export default App;
