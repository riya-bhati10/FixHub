import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Landing/LoginPage";
import SignupPage from "./pages/Landing/SignupPage";
import HowItWorksPage from "./pages/Landing/HowItWorksPage";
import AboutPage from "./pages/Landing/AboutPage";
import { TechnicianDashboard } from "./pages/Technician";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/technician/*" element={<TechnicianDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
