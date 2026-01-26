import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/Hero-right-img.jpg";

const HeroSection = () => {
  return (
    <section
      className="h-screen w-full relative"
      style={{ backgroundColor: "#0d3d43", margin: 0, padding: 0 }}
    >
      {/* Hex Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hexPattern"
              x="0"
              y="0"
              width="60"
              height="52"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="30,2 52,15 52,37 30,50 8,37 8,15"
                fill="none"
                stroke="#6FC2C6"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>
      </div>

      <div className="relative z-10 h-full flex items-center px-0">
        <div className="w-full px-4 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full pt-24 sm:pt-28 lg:pt-32">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                FixHub – Your Trusted{" "}
                <span className="text-fixhub-mint">Repair Partner</span> for
                Everyday Electronics
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white opacity-90 leading-relaxed">
                From smartphones to home appliances, get fast, reliable, and
                certified repair services at your doorstep.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup?role=customer"
                  className="bg-fixhub-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-fixhub-dark transition-colors shadow-lg text-center"
                >
                  Book a Service
                </Link>
                {/* <Link
                  to="/signup"
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-fixhub-textDark transition-colors text-center"
                >
                  Sign Up
                </Link> */}
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center sm:justify-start space-x-6 sm:space-x-8 pt-6 sm:pt-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-fixhub-mint">
                    500+
                  </div>
                  <div className="text-xs sm:text-sm text-white opacity-75">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-fixhub-mint">
                    24/7
                  </div>
                  <div className="text-xs sm:text-sm text-white opacity-75">
                    Support
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-fixhub-mint">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm text-white opacity-75">
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center items-center">
              <div className="relative z-10 w-full max-w-md lg:max-w-lg">
                <img
                  src={heroImg}
                  alt="Electronics Repair Services"
                  className="w-full h-auto shadow-2xl object-contain opacity-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
