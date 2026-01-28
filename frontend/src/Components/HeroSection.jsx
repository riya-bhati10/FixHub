import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/Hero-right-img.jpg";

const HeroSection = () => {
  return (
    <section
      className="min-h-screen w-full relative flex items-center"
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

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-screen pt-24 sm:pt-28 lg:pt-32">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                FixHub – Your Trusted{" "}
                <span className="text-fixhub-mint">Repair Partner</span> for
                Everyday Electronics
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white opacity-90 leading-relaxed max-w-2xl mx-auto md:mx-0">
                From smartphones to home appliances, get fast, reliable, and
                certified repair services at your doorstep.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/book-service"
                  className="bg-fixhub-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base lg:text-lg hover:bg-fixhub-dark transition-colors shadow-lg text-center"
                >
                  Book a Service
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center md:justify-start space-x-4 sm:space-x-6 lg:space-x-8 pt-6 sm:pt-8">
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-fixhub-mint">
                    500+
                  </div>
                  <div className="text-xs sm:text-sm text-white opacity-75">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-fixhub-mint">
                    24/7
                  </div>
                  <div className="text-xs sm:text-sm text-white opacity-75">
                    Support
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-fixhub-mint">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm text-white opacity-75">
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image - Hidden on mobile, visible on tablet+ */}
            <div className="hidden md:flex relative justify-center items-center">
              <div className="relative z-10 w-full max-w-xs md:max-w-sm lg:max-w-lg xl:max-w-xl">
                <img
                  src={heroImg}
                  alt="Electronics Repair Services"
                  className="w-full h-auto shadow-2xl object-contain opacity-90 rounded-lg"
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