import React from "react";
import logo from '../../../public/logo.png';

function Naavbar({ navItems, isMenuOpen, setIsMenuOpen }){
    return(
        <>
        <header className="bg-[#0F4C5C] text-white sticky top-0 z-40">
          <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between h-20">
            <div className="flex items-center gap-4 md:gap-12 h-full">
              {/* Logo */}
              <div className="flex items-center gap-3 shrink-0">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div className="hidden sm:block">
                  <h1 className="text-white text-lg font-bold leading-tight">ServicePortal</h1>
                  <p className="text-teal-400 text-[10px] font-bold uppercase tracking-wider">Management</p>
                </div>
              </div>

              {/* Navigation - Desktop */}
              <nav className="hidden md:flex items-center h-full">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href="#"
                    className={`h-full flex items-center px-6 text-sm font-bold transition-colors ${
                      item.active
                        ? 'text-white bg-[#1F7F85]'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Hamburger Menu - Mobile */}
              <button
                className="md:hidden p-2 rounded-xl bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="material-symbols-outlined">
                  {isMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-6">
              <button className="p-2 rounded-xl bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div className="h-8 w-px bg-white/10 mx-1"></div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white">Admin User</p>
                  <p className="text-[10px] text-teal-400 uppercase font-bold tracking-tighter">Super Admin</p>
                </div>
                <div
                  className="w-10 h-10 rounded-full border-2 border-[#1F7F85] bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVU61pd2PLFFUiDd8A6mwxmjpMUqfzBZAE7sXNUHe5Wbx0ZYXHS2DF-07sbDv-9lxjFtibF2TFzkrm5W7AZDe5QjmFl4UreJ2QeaP4bhnt9WDF-jdNVcA8fRUK79lzHRxZKfVzqugs6_xlVRAE8SreDlv8XeK9Jl1PSbF78RSAM5-2w_k0-Sp69fhfRrEkVSQniHtHKhABjkfo23lmB3lGlHYumF_af5g8BdDAqZ3020cUuarkP8s4m0fyY5j3sDMi6j7kKtibUmc')`
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-[#0F4C5C] border-t border-white/10">
              <div className="max-w-[1400px] mx-auto px-8 py-4">
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href="#"
                      className={`py-3 px-4 text-sm font-bold transition-colors rounded-lg ${
                        item.active
                          ? 'text-white bg-[#1F7F85]'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </header>
        </>
    );
}

export default Naavbar;