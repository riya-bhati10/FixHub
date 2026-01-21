import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7FBFC]">
      {/* Tailwind Config and Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

          body {
            font-family: 'Manrope', sans-serif;
          }

          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }

          @keyframes wave {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          .animate-wave {
            animation: wave 0.5s ease-in-out;
          }
        `}
      </style>

      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-slate-900">Welcome to FixHub</h1>
        <p className="text-center text-slate-600 mt-4">Your one-stop solution for all repair services.</p>
      </main>
    </div>
  );
};

export default Home;