
import { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "You're on the list! 🎉",
      description: "We'll notify you when OmnoStock launches.",
    });
    
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/40 to-purple-100/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-slate-100/60 to-gray-100/60 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-50/30 to-indigo-50/30 rounded-full blur-3xl animate-pulse-soft"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium mb-8 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
          Launching Soon
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in">
          <span className="gradient-text">Inventory</span>
          <br />
          <span className="text-slate-900">Reimagined</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-delay">
          The global inventory management platform built for modern operators who demand excellence at scale.
        </p>

        {/* Email Capture Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16 animate-fade-in-delay">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 text-base border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting || !email}
              className="h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white font-medium transition-all duration-200 hover-lift group"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Join Waitlist
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-slate-500 mt-3">
            Early access • No spam • Built by operators
          </p>
        </form>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-500 animate-fade-in-delay">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
            Stealth Mode
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
            Global Scale
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
            Operator Built
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-delay">
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
