import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      title: 'AC Repair',
      description: 'Professional air conditioning repair and maintenance services',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.59 3.41L5 5l5.5 5.5L16 5l-1.41-1.41L12 6.17 9.41 3.59zM12 8.83L6.5 14.33 5 12.83l5.5-5.5L12 8.83zm0 6.34L6.5 20.67 5 19.17l5.5-5.5L12 15.17z"/>
        </svg>
      )
    },
    {
      title: 'Fridge Repair',
      description: 'Expert refrigerator repair and cooling system maintenance',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 2H7v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-2V2h-2v2H9V2zm10 18H5V8h14v12z"/>
        </svg>
      )
    },
    {
      title: 'Mobile Repair',
      description: 'Screen replacement, battery fixes, and software troubleshooting',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"/>
        </svg>
      )
    },
    {
      title: 'Laptop Repair',
      description: 'Hardware upgrades, virus removal, and performance optimization',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
        </svg>
      )
    },
    {
      title: 'Washing Machine Repair',
      description: 'Complete washing machine servicing and parts replacement',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2.01L6 2c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V4c0-1.11-.89-1.99-2-1.99zM18 20H6V4h12v16zM12 19c3.87 0 7-3.13 7-7s-3.13-7-7-7-7 3.13-7 7 3.13 7 7 7zm0-12c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-fixhub-bgWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-fixhub-textDark mb-4">
            Our Services at Your Doorstep
          </h2>
          <p className="text-lg text-fixhub-textMuted max-w-2xl mx-auto">
            Professional repair services delivered right to your home with certified technicians and genuine parts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-fixhub-bgCard rounded-xl p-6 text-center shadow-sm border border-fixhub-borderSoft hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="text-fixhub-primary mb-4 group-hover:text-fixhub-dark transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-fixhub-textDark mb-3">
                {service.title}
              </h3>
              <p className="text-fixhub-textMuted text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-fixhub-primary text-fixhub-textWhite px-8 py-3 rounded-lg font-semibold hover:bg-fixhub-dark transition-colors">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;