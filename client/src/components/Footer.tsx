
import { Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">OmnoStock</span>
          </div>

          <div className="flex items-center space-x-8">
            <a 
              href="#" 
              className="text-slate-400 hover:text-white transition-all duration-200 hover-lift hover-glow"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-slate-400 hover:text-white transition-all duration-200 hover-lift hover-glow"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-slate-400 hover:text-white transition-all duration-200 hover-lift hover-glow"
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-slate-400">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div>© 2024 OmnoStock. Built by Blackroot Labs.</div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Building in stealth</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-white transition-colors duration-200 hover-lift">Privacy</a>
              <a href="#" className="hover:text-white transition-colors duration-200 hover-lift">Terms</a>
              <a href="#" className="hover:text-white transition-colors duration-200 hover-lift">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
