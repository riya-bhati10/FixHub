import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-fixhub-bgDark text-fixhub-textWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="FixHub" className="h-8 w-8" />
              <span className="text-xl font-bold">FixHub</span>
            </div>
            <p className="text-fixhub-light mb-4 max-w-md">
              Your trusted partner for professional electronics repair services. 
              Fast, reliable, and certified technicians at your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-fixhub-light hover:text-fixhub-mint transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-fixhub-light hover:text-fixhub-mint transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-fixhub-light hover:text-fixhub-mint transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/book-service" className="text-fixhub-light hover:text-fixhub-mint transition-colors">
                  Book a Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-fixhub-light">
              <li>+1 (555) 123-4567</li>
              <li>support@fixhub.com</li>
              <li>123 Tech Street, Digital City</li>
            </ul>
            
          </div>
        </div>

        <div className="border-t border-fixhub-bgDarkAlt mt-8 pt-8 text-center">
          <p className="text-fixhub-light">
            © 2024 FixHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
