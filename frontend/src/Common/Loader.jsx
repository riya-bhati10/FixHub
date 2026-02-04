import React from 'react';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7FBFC]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-[#DCEBEC] rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#1F7F85] rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-[#1F7F85] font-semibold text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
