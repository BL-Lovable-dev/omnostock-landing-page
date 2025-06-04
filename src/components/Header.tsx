
import { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'glass-effect' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">OmnoStock</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 animate-fade-in-delay">
            <a href="#mission" className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm font-medium">
              Mission
            </a>
            <a href="#waitlist" className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm font-medium">
              Early Access
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
