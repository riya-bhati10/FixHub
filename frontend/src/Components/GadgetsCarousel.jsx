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
    <section className="py-16 bg-fixhub-bgWhite overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-fixhub-textDark">
            We Repair All Your Gadgets
          </h2>
          <p className="mt-3 text-fixhub-textMuted">
            Professional repair services for all major electronic devices
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex gap-6 animate-fixhub-scroll hover:[animation-play-state:paused] w-max">

            {[...gadgets, ...gadgets].map((gadget, index) => (
              <div
                key={index}
                className="w-56 bg-fixhub-bgCard rounded-xl p-6 text-center shadow-sm"
              >
                {/* Image / Placeholder */}
                <div className="w-full h-32 flex items-center justify-center mb-4 bg-white rounded-lg border border-fixhub-borderSoft">
                  {gadget.image ? (
                    <img
                      src={gadget.image}
                      alt={gadget.name}
                      className="max-h-24 object-contain"
                    />
                  ) : (
                    <span className="text-sm text-fixhub-textMuted">
                      Image Here
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-fixhub-textDark">
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
