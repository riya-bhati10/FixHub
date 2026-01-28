import React from "react";
import fanImg from "../assets/Fan.jpg";
import fridgeImg from "../assets/fridge.jpg";
import laptopImg from "../assets/Laptop.jpg";
import mixerImg from "../assets/Mixer.jpg";
import phoneImg from "../assets/Phone.jpg";
import smartwatchImg from "../assets/smart watches.jpg";
import televisionImg from "../assets/Television.jpg";
import washingMachineImg from "../assets/Washing-machine.jpg";

const GadgetsCarousel = () => {
  const gadgets = [
    { name: "Refrigerator", image: fridgeImg },
    { name: "Television", image: televisionImg },
    { name: "Smartphone", image: phoneImg },
    { name: "Smartwatch", image: smartwatchImg },
    { name: "Fan", image: fanImg },
    { name: "Mixer Grinder", image: mixerImg },
    { name: "Laptop", image: laptopImg },
    { name: "Washing Machine", image: washingMachineImg },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-fixhub-bgWhite overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-fixhub-textDark mb-3 sm:mb-4">
            We Repair All Your Gadgets
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-fixhub-textMuted max-w-2xl mx-auto">
            Professional repair services for all major electronic devices
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex gap-4 sm:gap-6 animate-fixhub-scroll hover:[animation-play-state:paused] w-max">
            {[...gadgets, ...gadgets].map((gadget, index) => (
              <div
                key={index}
                className="w-40 sm:w-48 md:w-56 lg:w-64 bg-fixhub-bgCard rounded-xl p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
              >
                {/* Image Container */}
                <div className="w-full h-24 sm:h-28 md:h-32 lg:h-36 flex items-center justify-center mb-3 sm:mb-4 bg-white rounded-lg border border-fixhub-borderSoft">
                  {gadget.image ? (
                    <img
                      src={gadget.image}
                      alt={gadget.name}
                      className="max-h-16 sm:max-h-20 md:max-h-24 lg:max-h-28 max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs sm:text-sm text-fixhub-textMuted">
                      Image Here
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-fixhub-textDark text-sm sm:text-base lg:text-lg">
                  {gadget.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GadgetsCarousel;