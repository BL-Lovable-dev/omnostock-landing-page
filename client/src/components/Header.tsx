
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      {/* Scroll progress bar */}
      <div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
        style={{ width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%` }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2 animate-fade-in hover-glow">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">OmnoStock</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 animate-fade-in-delay">
            <button 
              onClick={() => scrollToSection('mission')}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all duration-200 text-sm font-medium hover-lift"
            >
              Mission
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all duration-200 text-sm font-medium hover-lift"
            >
              FAQ
            </button>
            <ThemeToggle />
            <button 
              onClick={() => scrollToSection('waitlist')}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-200 hover-lift hover-glow"
            >
              Early Access
            </button>
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-effect-strong border-t border-white/20 animate-in slide-in-from-top-2 duration-200">
            <nav className="px-6 py-4 space-y-4">
              <button 
                onClick={() => {
                  scrollToSection('mission');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white py-2 transition-colors duration-200"
              >
                Mission
              </button>
              <button 
                onClick={() => {
                  scrollToSection('faq');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white py-2 transition-colors duration-200"
              >
                FAQ
              </button>
              <div className="flex justify-center py-2">
                <ThemeToggle />
              </div>
              <button 
                onClick={() => {
                  scrollToSection('waitlist');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-200 text-center"
              >
                Early Access
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
