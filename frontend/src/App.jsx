import React from "react";
import { Routes, Route } from "react-router-dom";
import FixHubDashboard from "./pages/customer/UserDashaboard";

const App = () => {
  return (
    <Routes>
    
      <Route path="/" element={<FixHubDashboard />} />

    </Routes>
  );
};

export default App;
