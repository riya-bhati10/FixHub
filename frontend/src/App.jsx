import React from "react";
import { Routes, Route } from "react-router-dom";

import FixHubDashboard from "./pages/customer/Mybooking";

const App = () => {
  return (
    <Routes>

      <Route path="/my-booking" element={<FixHubDashboard />} />
      

    </Routes>
  );
};

export default App;

