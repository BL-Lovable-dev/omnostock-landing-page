import { useState, useEffect } from 'react';
import { ArrowRight, Mail, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useParallax } from '@/hooks/useParallax';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { toast } = useToast();

  const parallaxRef1 = useParallax(0.3);
  const parallaxRef2 = useParallax(-0.2);
  const parallaxRef3 = useParallax(0.5);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(email));
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !isValid) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "You're on the list! 🎉",
      description: "We'll notify you when OmnoStock launches with early access.",
    });

    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Enhanced ambient background elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary floating elements with parallax */}
        <div ref={parallaxRef1} className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/40 to-purple-100/40 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full blur-3xl animate-float"></div>
        <div ref={parallaxRef2} className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-slate-100/60 to-gray-100/60 dark:from-slate-700/40 dark:to-gray-700/40 rounded-full blur-3xl animate-float-delayed"></div>
        <div ref={parallaxRef3} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-full blur-3xl animate-pulse-soft"></div>

        {/* Floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Enhanced Status Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect text-slate-700 text-sm font-medium mb-8 animate-fade-in hover-glow">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
          <span className="gradient-text-accent font-semibold">Launching Soon</span>
          <Star className="w-3 h-3 ml-2 text-indigo-500" />
        </div>

        {/* Enhanced Main Headline */}
        <div className="stagger-children">
          <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tight">
            <span className="gradient-text block">Inventory</span>
            <span className="text-slate-900 block relative">
              Reimagined
              <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </span>
          </h1>

          {/* Enhanced Subheadline */}
          <p className="text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-4">
            The global inventory management platform built for modern operators who demand 
            <span className="gradient-text-accent font-semibold"> excellence at scale</span>.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12 text-sm">
            <div className="trust-indicator">Stealth Mode</div>
            <div className="trust-indicator">Global Scale</div>
            <div className="trust-indicator">Operator Built</div>
          </div>
        </div>

        {/* Enhanced Email Capture Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16 animate-fade-in-delay">
          <div className="space-y-4">
            <div className="input-floating-label">
              <div className="relative group">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 transition-colors duration-200 ${
                  email ? (isValid ? 'text-green-500' : 'text-red-400') : 'text-slate-400 group-focus-within:text-indigo-500'
                }`} />
                <Input
                  type="email"
                  placeholder="your@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 pr-10 h-12 text-base transition-all duration-200 glass-effect-strong ${
                    email ? (isValid ? 'border-green-500 focus:border-green-500 focus:ring-green-500' : 'border-red-400 focus:border-red-400 focus:ring-red-400') : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500'
                  }`}
                  required
                />
                {email && isValid && (
                  <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5 animate-in fade-in-0 zoom-in-95 duration-200" />
                )}
                {email && !isValid && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                )}
              </div>
              {email && !isValid && (
                <p className="text-xs text-red-500 mt-1 animate-in slide-in-from-top-1 duration-200">Please enter a valid email address</p>
              )}
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting || !isValid || !email}
              className="w-full h-12 px-6 btn-primary group"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Joining...</span>
                </div>
              ) : (
                <>
                  Join Waitlist
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 mt-4">
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-green-500" />
              Early access
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-green-500" />
              No spam
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-green-500" />
              Built by operators
            </span>
          </div>
        </form>

        {/* Simple CTA message */}
        <div className="max-w-2xl mx-auto animate-fade-in-delay">
          <div className="text-center text-sm text-slate-500">
            <span>Join the waitlist and be among the first to experience the future of inventory management</span>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-delay">
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center hover-glow cursor-pointer">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;