import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoImg from "../assets/Logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-fixhub-bgWhite shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1">
            {/* Logo Image */}
            <img
              src={LogoImg}
              alt="FixHub Logo"
              className="h-20 w-20 object-contain"
            />

            {/* Logo Text */}
            <span
              className={`text-xl font-bold ${
                isScrolled ? "text-fixhub-textDark" : "text-fixhub-textWhite"
              }`}
            >
              FixHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors ${
                  isScrolled
                    ? "text-fixhub-textDark hover:text-fixhub-primary"
                    : "text-fixhub-textWhite hover:text-fixhub-mint"
                } ${
                  location.pathname === link.path ? "text-fixhub-primary" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className={`font-medium transition-colors ${
                isScrolled
                  ? "text-fixhub-textDark hover:text-fixhub-primary"
                  : "text-fixhub-textWhite hover:text-fixhub-mint"
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`border px-4 py-2 rounded-lg font-medium transition-colors ${
                isScrolled
                  ? "border-fixhub-borderSoft text-fixhub-textDark hover:bg-fixhub-bgCard"
                  : "border-fixhub-textWhite text-fixhub-textWhite hover:bg-fixhub-textWhite hover:text-fixhub-textDark"
              }`}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className={`w-6 h-6 ${
                isScrolled ? "text-fixhub-textDark" : "text-fixhub-textWhite"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-fixhub-bgWhite border-t border-fixhub-borderSoft">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2 text-fixhub-textDark hover:text-fixhub-primary font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/book-service"
                className="block px-3 py-2 bg-fixhub-primary text-fixhub-textWhite rounded-lg font-medium mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book a Service
              </Link>
              <div className="flex space-x-2 px-3 py-2">
                <Link
                  to="/login"
                  className="text-fixhub-textDark hover:text-fixhub-primary font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="border border-fixhub-borderSoft text-fixhub-textDark px-3 py-1 rounded-lg font-medium hover:bg-fixhub-bgCard"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
