import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';

const AboutPage = () => {
  const navigate = useNavigate();
  const landingNavLinks = [
    { path: '/', label: 'Home' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/about', label: 'About' },
  ];
  
  const stats = [
    { number: '2,500+', label: 'Satisfied Customers' },
    { number: '150+', label: 'Certified Technicians' },
    { number: '5,000+', label: 'Successful Repairs' },
    { number: '99.8%', label: 'Success Rate' }
  ];

  const values = [
    {
      icon: 'verified',
      title: 'Quality Assurance',
      description: 'Every repair comes with our comprehensive warranty and quality guarantee. We use only genuine parts and industry-standard procedures.'
    },
    {
      icon: 'schedule',
      title: 'Fast & Reliable',
      description: 'Quick turnaround times without compromising quality. Most repairs completed within 24-48 hours with real-time status updates.'
    },
    {
      icon: 'security',
      title: 'Data Security',
      description: 'Your privacy is our priority. We follow strict data protection protocols and ensure your personal information remains secure.'
    },
    {
      icon: 'support_agent',
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you at every step. Our team is always ready to help with your queries.'
    },
    {
      icon: 'eco',
      title: 'Eco-Friendly',
      description: 'Contributing to environmental sustainability by extending device lifecycles and reducing electronic waste through quality repairs.'
    },
    {
      icon: 'price_check',
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprise charges. Get upfront pricing with detailed breakdowns before any work begins on your device.'
    }
  ];

  const services = [
    {
      icon: 'smartphone',
      title: 'Mobile Devices',
      description: 'Expert repair services for smartphones, tablets, and wearable devices with genuine parts and warranty.'
    },
    {
      icon: 'laptop',
      title: 'Laptops & Computers',
      description: 'Professional laptop and desktop repair including hardware upgrades, software issues, and data recovery.'
    },
    {
      icon: 'headphones',
      title: 'Audio Devices',
      description: 'Specialized repair for headphones, speakers, earbuds, and other audio equipment from all major brands.'
    },
    {
      icon: 'tv',
      title: 'Home Appliances',
      description: 'Comprehensive repair services for TVs, gaming consoles, smart home devices, and kitchen appliances.'
    }
  ];

  return (
    <div className="min-h-screen bg-fixhub-bgWhite font-['Manrope']">
      <Navbar 
        userType="landing"
        navLinks={landingNavLinks}
        showProfile={false}
        showNotifications={false}
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-fixhub-bgDark to-fixhub-bgDarkAlt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-fixhub-textWhite mb-6 leading-tight">
              About <span className="text-fixhub-mint">FixHub</span>
            </h1>
            <p className="text-xl text-fixhub-light leading-relaxed">
              Transforming electronics repair with cutting-edge technology, expert craftsmanship, 
              and unwavering commitment to customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-fixhub-textDark mb-8">
                Redefining Electronics Repair
              </h2>
              <div className="space-y-6 text-fixhub-textMuted leading-relaxed">
                <p className="text-lg">
                  FixHub emerged from a simple yet powerful vision: to make professional electronics repair 
                  accessible, transparent, and convenient for everyone. We recognized that traditional repair 
                  services were often unreliable, overpriced, and inconvenient.
                </p>
                <p>
                  Our platform connects customers with certified technicians who bring professional-grade 
                  repair services directly to your location. From smartphones and tablets to laptops and 
                  home appliances, we've revolutionized how people approach electronics repair.
                </p>
                <p>
                  With advanced diagnostic tools, genuine replacement parts, and a commitment to excellence, 
                  we've successfully repaired thousands of devices while building lasting relationships with 
                  our customers.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-fixhub-primary to-fixhub-dark rounded-2xl p-8 text-fixhub-textWhite">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold mb-2">{stat.number}</div>
                      <div className="text-fixhub-mint text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-fixhub-textWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-fixhub-textDark mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-fixhub-textMuted max-w-3xl mx-auto">
              These principles guide everything we do and shape our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-fixhub-bgCard rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="bg-fixhub-primary text-fixhub-textWhite w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-fixhub-textDark mb-4">{value.title}</h3>
                <p className="text-fixhub-textMuted leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-fixhub-bgWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-fixhub-textDark mb-4">
              What We Repair
            </h2>
            <p className="text-xl text-fixhub-textMuted">
              Professional repair services for all your electronic devices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-fixhub-bgCard rounded-xl p-6 mb-4 group-hover:bg-fixhub-primary group-hover:text-fixhub-textWhite transition-colors">
                  <span className="material-symbols-outlined text-4xl text-fixhub-primary group-hover:text-fixhub-textWhite">{service.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-fixhub-textDark mb-3">{service.title}</h3>
                <p className="text-fixhub-textMuted text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-fixhub-primary to-fixhub-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-fixhub-textWhite mb-6">
            Ready to Experience the FixHub Difference?
          </h2>
          <p className="text-xl text-fixhub-mint mb-8">
            Join thousands of satisfied customers who trust FixHub for all their electronics repair needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="bg-fixhub-textWhite text-fixhub-primary px-8 py-4 rounded-lg font-semibold hover:bg-fixhub-bgCard transition-colors"
            >
              Get Started Today
            </button>
            <button
              onClick={() => navigate('/how-it-works')}
              className="border-2 border-fixhub-textWhite text-fixhub-textWhite px-8 py-4 rounded-lg font-semibold hover:bg-fixhub-textWhite hover:text-fixhub-primary transition-colors"
            >
              Learn How It Works
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;