import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import BookServiceForm from './Bookingform';

const ServicePro = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState('all');
  const [showForm, setShowForm] = useState(false);

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

  const professionals = [
    {
      id: 1,
      name: "Alex Chen",
      rating: 4.9,
      reviews: 245,
      specialty: "Mobile Phone Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      verified: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      rating: 5.0,
      reviews: 189,
      specialty: "Laptop Repair Expert",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      verified: true
    },
    {
      id: 3,
      name: "Marcus Rodriguez",
      rating: 4.8,
      reviews: 156,
      specialty: "TV & Display Technician",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: false
    },
    {
      id: 4,
      name: "Elena Kim",
      rating: 4.9,
      reviews: 134,
      specialty: "PC Building Specialist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      verified: true
    },
    {
      id: 5,
      name: "David Park",
      rating: 4.8,
      reviews: 98,
      specialty: "Gaming Console Expert",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      verified: true
    },
    {
      id: 6,
      name: "Lisa Wang",
      rating: 4.7,
      reviews: 76,
      specialty: "Camera Repair Specialist",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      verified: false
    },
    {
      id: 7,
      name: "James Mitchell",
      rating: 4.8,
      reviews: 112,
      specialty: "Audio Equipment Technician",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      verified: true
    },
    {
      id: 8,
      name: "Maria Garcia",
      rating: 4.9,
      reviews: 167,
      specialty: "Smart Device Expert",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      verified: false
    }
  ];

  const featuredServices = services.filter(service => service.featured);

  return (
    <div className="min-h-screen bg-[#F7FBFC] text-slate-800 font-display">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-10 pt-24">
        {/* Professionals Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Certified Electronics Technicians</h2>
              <p className="text-sm text-slate-500 mt-1">Our most trusted and highly-certified repair specialists</p>
            </div>
            <button className="flex items-center gap-2 text-[#1F7F85] text-sm font-bold hover:gap-3 transition-all">
              View All Experts
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-4 custom-scrollbar scroll-smooth">
            {professionals.map(pro => (
              <div key={pro.id} onClick={() => setShowForm(true)} className="w-[140px] flex-shrink-0 group cursor-pointer text-center">
                <div className="relative mx-auto mb-4 p-1 rounded-full border-2 border-transparent group-hover:border-[#1F7F85] transition-all">
                  <div className="size-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img alt={pro.name} className="w-full h-full object-cover" src={pro.image} />
                  </div>
                  {pro.verified && (
                    <div className="absolute bottom-0 right-1 bg-white p-1 rounded-full shadow-lg">
                      <span className="material-symbols-outlined text-[#1F7F85] text-lg">verified</span>
                    </div>
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{pro.name}</h4>
                <div className="flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-yellow-500 text-base">star</span>
                  <span className="text-xs font-extrabold text-[#1F7F85]">{pro.rating}</span>
                  <span className="text-[10px] text-slate-400">({pro.reviews})</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 font-medium uppercase tracking-tighter">{pro.specialty}</p>
              </div>
            ))}
          </div>
        </div>

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
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Starting from</p>
                        <p className="text-lg font-extrabold text-[#1F7F85]">${service.price}</p>
                      </div>
                      <button onClick={() => setShowForm(true)} className="px-5 py-2.5 bg-[#1F7F85] text-white text-sm font-bold rounded-lg hover:brightness-110 transition-all hover:shadow-lg hover:shadow-[#1F7F85]/30">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* CTA Section - FIXED COLOR ISSUE */}
        <div className="mt-20 bg-gradient-to-r from-[#1F7F85] to-teal-600 rounded-3xl overflow-hidden shadow-2xl shadow-[#1F7F85]/30 flex flex-col md:flex-row items-stretch">
          <div className="flex-1 p-8 lg:p-16 text-white flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">Certified Electronics Technicians</h2>
            <p className="text-white/80 text-lg mb-10 opacity-90">
              Professional repair specialists with years of experience. Our certified technicians use genuine parts and provide warranty on all repairs for your peace of mind.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setShowForm(true)} className="px-8 py-3.5 bg-white text-[#1F7F85] font-extrabold rounded-xl hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl">
                Book Repair Service
              </button>
              <button className="px-8 py-3.5 border-2 border-white/40 hover:bg-white/10 font-bold rounded-xl transition-all">
                View Certifications
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative min-h-[400px] bg-gradient-to-bl from-[#1F7F85]/90 to-teal-900/90">
            <div className="grid grid-cols-3 gap-4 p-6 h-full">
              {professionals.slice(0, 6).map((pro, index) => (
                <div key={pro.id} className={`relative overflow-hidden rounded-xl border-4 border-white/20 ${index === 1 || index === 4 ? 'mt-8' : ''}`}>
                  <img 
                    alt={pro.name} 
                    className="w-full h-32 object-cover hover:scale-110 transition-transform duration-300" 
                    src={pro.image}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-xs text-white font-bold truncate">{pro.name}</p>
                    <p className="text-[10px] text-white/80">{pro.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-8 right-8 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <span className="material-symbols-outlined text-green-600">verified</span>
              </div>
              <div>
                <p className="text-slate-900 font-bold text-sm">500+ Experts</p>
                <p className="text-slate-500 text-xs">Vetted & Verified</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-auto relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <BookServiceForm showNavbar={false} />
          </div>
        </div>
      )}

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