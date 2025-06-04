
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'glass-effect-strong' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 animate-fade-in hover-glow">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">OmnoStock</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 animate-fade-in-delay">
            <button 
              onClick={() => scrollToSection('mission')}
              className="text-slate-600 hover:text-slate-900 transition-all duration-200 text-sm font-medium hover-lift"
            >
              Mission
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-slate-600 hover:text-slate-900 transition-all duration-200 text-sm font-medium hover-lift"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('waitlist')}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all duration-200 hover-lift hover-glow"
            >
              Early Access
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
