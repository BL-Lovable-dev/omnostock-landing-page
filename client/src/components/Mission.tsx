import { useEffect, useRef } from 'react';
import { Target, Zap, Globe, Shield } from 'lucide-react';

const Mission = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.section-fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="mission" className="py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 section-fade-in">
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Why We <span className="gradient-text-accent">Exist</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-8"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Built by operators who've lived the chaos of inventory at scale.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 section-fade-in">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  Born from Real Pain
                </h3>
                <p className="text-xl leading-relaxed text-slate-700">
                  We've felt the pain of systems that break when you need them most. Of data that lies when decisions matter. Of complexity that grows faster than your team.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  Built for Excellence
                </h3>
                <p className="text-lg leading-relaxed text-slate-600">
                  Modern brands deserve infrastructure that thinks like they do — global, intelligent, and obsessed with excellence. No compromises, no technical debt, no legacy constraints.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  Operator-First Design
                </h3>
                <p className="text-lg leading-relaxed text-slate-600">
                  Every feature is born from real operator needs. Every interface designed for rapid decision-making. Every integration built for the way modern brands actually work.
                </p>
              </div>
            </div>

            {/* Enhanced Stats */}


            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-3 pt-8">
              <div className="trust-indicator">Series A+ Operators</div>
              <div className="trust-indicator">Global Scale Experience</div>
              <div className="trust-indicator">No VC Pressure</div>
            </div>
          </div>

          {/* Core Values Visual */}
          <div className="relative section-fade-in">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden p-8">
              {/* Core Values Grid */}
              <div className="grid grid-cols-2 gap-8 w-full h-full">
                {/* Precision */}
                <div className="flex flex-col items-center justify-center text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 transform group-hover:scale-110 transition-all duration-300 shadow-lg floating-element" style={{ animationDelay: '0s' }}>
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Precision</h4>
                  <p className="text-xs text-slate-600 leading-tight">Accurate inventory tracking</p>
                </div>

                {/* Speed */}
                <div className="flex flex-col items-center justify-center text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-3 transform group-hover:scale-110 transition-all duration-300 shadow-lg floating-element" style={{ animationDelay: '0.5s' }}>
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Speed</h4>
                  <p className="text-xs text-slate-600 leading-tight">Real-time updates</p>
                </div>

                {/* Global */}
                <div className="flex flex-col items-center justify-center text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-3 transform group-hover:scale-110 transition-all duration-300 shadow-lg floating-element" style={{ animationDelay: '1s' }}>
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Global</h4>
                  <p className="text-xs text-slate-600 leading-tight">Worldwide operations</p>
                </div>

                {/* Security */}
                <div className="flex flex-col items-center justify-center text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-3 transform group-hover:scale-110 transition-all duration-300 shadow-lg floating-element" style={{ animationDelay: '1.5s' }}>
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Security</h4>
                  <p className="text-xs text-slate-600 leading-tight">Enterprise-grade protection</p>
                </div>
              </div>

              {/* Overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-3xl pointer-events-none"></div>

              {/* Subtle central glow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-full blur-xl animate-glow pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;