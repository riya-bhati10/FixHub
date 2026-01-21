import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/landing/Home";
import FixHubDashboard from "./pages/customer/Mybooking";

const App = () => {
  return (
    <Routes>

      <Route path="/my-booking" element={<FixHubDashboard />} />
      <Route path="/home" element={<Home />} />

    </Routes>
  );
};

export default App;

