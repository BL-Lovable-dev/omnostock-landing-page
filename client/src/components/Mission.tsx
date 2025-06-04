import { useEffect, useRef } from 'react';

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

          {/* Enhanced Visual Element */}
          <div className="relative section-fade-in">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
              {/* Grid of floating elements */}
              <div className="grid grid-cols-4 gap-4 p-12">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-xl glass-effect shadow-sm floating-element"
                    style={{ 
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: `${6 + i * 0.2}s`
                    }}
                  />
                ))}
              </div>

              {/* Overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-3xl"></div>

              {/* Central glow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-indigo-300/30 to-purple-300/30 rounded-full blur-2xl animate-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;