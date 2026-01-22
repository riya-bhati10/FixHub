import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

const ServicePro = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState('all');

  const services = [
    {
      id: 1,
      title: "Mobile Phone Repair",
      description: "Screen replacement, battery repair, charging port fixes, and software troubleshooting.",
      price: 60,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      category: "essential",
      rating: 4.9,
      reviews: 245,
      featured: true
    },
    {
      id: 2,
      title: "Laptop Repair",
      description: "Keyboard replacement, screen repair, data recovery, and hardware upgrades.",
      price: 85,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
      category: "pro",
      rating: 5.0,
      reviews: 189,
      featured: true
    },
    {
      id: 3,
      title: "TV Repair",
      description: "LED/LCD screen repair, motherboard replacement, and smart TV software fixes.",
      price: 120,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
      category: "popular",
      rating: 4.8,
      reviews: 156,
      featured: true
    },
    {
      id: 4,
      title: "Desktop PC Repair",
      description: "Component replacement, virus removal, system optimization, and custom builds.",
      price: 95,
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop",
      category: "essential",
      rating: 4.9,
      reviews: 134,
      featured: false
    },
    {
      id: 5,
      title: "Gaming Console Repair",
      description: "PlayStation, Xbox, and Nintendo console repairs, disc drive fixes, and controller repairs.",
      price: 75,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      category: "trending",
      rating: 4.7,
      reviews: 98,
      featured: true
    },
    {
      id: 6,
      title: "Camera Repair",
      description: "DSLR, mirrorless, and digital camera repairs, lens cleaning, and sensor fixes.",
      price: 110,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
      category: "value",
      rating: 4.8,
      reviews: 76,
      featured: false
    },
    {
      id: 7,
      title: "Audio Equipment Repair",
      description: "Speakers, headphones, amplifiers, and sound system repairs and maintenance.",
      price: 70,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      category: "value",
      rating: 4.7,
      reviews: 112,
      featured: true
    },
    {
      id: 8,
      title: "Smart Device Repair",
      description: "Tablets, smartwatches, e-readers, and IoT device repairs and software updates.",
      price: 55,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      category: "essential",
      rating: 5.0,
      reviews: 167,
      featured: false
    }
  ];


  const featuredServices = services.filter(service => service.featured);

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-800 font-display">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-10 pt-24">

        {/* Featured Services */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
            Top Electronics Repair Services
          </h1>
          
          <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar scroll-smooth">
            {featuredServices.map(service => (
              <div key={service.id} className="w-[280px] h-[380px] flex-shrink-0 group relative overflow-hidden rounded-2xl cursor-pointer">
                <img 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src={service.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-2 inline-block
                    ${service.category === 'pro' ? 'bg-blue-500/20 text-blue-300' :
                      service.category === 'popular' ? 'bg-purple-500/20 text-purple-300' :
                      service.category === 'essential' ? 'bg-green-500/20 text-green-300' :
                      service.category === 'trending' ? 'bg-pink-500/20 text-pink-300' :
                      'bg-yellow-500/20 text-yellow-300'}`}>
                    {service.category === 'pro' ? 'Pro Choice' :
                     service.category === 'popular' ? 'Popular' :
                     service.category === 'essential' ? 'Essential' :
                     service.category === 'trending' ? 'Trending' : 'Best Value'}
                  </span>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-sm opacity-80">Service Charge ${service.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Catalog */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Electronics Repair Services</h2>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {['all', 'essential', 'popular', 'trending', 'value'].map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveService(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      activeService === category
                        ? 'bg-[#1F7F85] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
              <span className="text-sm text-slate-500 font-medium bg-white px-3 py-1 rounded-full border border-slate-100">
                {services.length} Services Available
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services
              .filter(service => activeService === 'all' || service.category === activeService)
              .map(service => (
                <div key={service.id} className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 transition-all duration-300 hover:border-[#1F7F85] hover:shadow-xl hover:-translate-y-1">
                  <div className="h-44 overflow-hidden">
                    <img 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      src={service.image}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                        <span className="text-xs font-bold text-slate-600">{service.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 mb-6 flex-grow">
                      {service.description}
                    </p>
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Service Charge</p>
                        <p className="text-lg font-extrabold text-[#1F7F85]">${service.price}</p>
                      </div>
                      <button onClick={() => navigate('/booking-from')} className="px-5 py-2.5 bg-[#1F7F85] text-white text-sm font-bold rounded-lg hover:brightness-110 transition-all hover:shadow-lg hover:shadow-[#1F7F85]/30">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-16 mt-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-[#1F7F85] rounded-lg">
                  <span className="material-symbols-outlined text-white text-xl">build</span>
                </div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900">FixHub Electronics</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Professional electronics repair services for all your devices. From phones to gaming consoles, we fix it right the first time.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Services</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  {services.slice(0, 4).map(service => (
                    <li key={service.id}>
                      <a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">
                        {service.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Company</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li><a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">About Us</a></li>
                  <li><a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">Our Technicians</a></li>
                  <li><a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">Privacy Policy</a></li>
                  <li><a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">Terms</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Support</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li><a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">Help Center</a></li>
                  <li><a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">Contact Us</a></li>
                  <li><a className="hover:text-[#1F7F85] transition-colors hover:font-medium" href="#">Live Chat</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-400 font-medium">© 2024 FixHub Electronics. All rights reserved.</p>
            <div className="flex gap-4">
              <a className="size-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#1F7F85] transition-all border border-slate-100 hover:border-[#1F7F85]/30 hover:shadow-md" href="#">
                <span className="material-symbols-outlined text-xl">public</span>
              </a>
              <a className="size-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#1F7F85] transition-all border border-slate-100 hover:border-[#1F7F85]/30 hover:shadow-md" href="#">
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicePro;