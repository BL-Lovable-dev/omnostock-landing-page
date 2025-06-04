
const Mission = () => {
  return (
    <section id="mission" className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Why We Exist
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-xl leading-relaxed text-slate-700">
                Built by operators who've lived the chaos of inventory at scale.
              </p>
              
              <p className="text-lg leading-relaxed text-slate-600">
                We've felt the pain of systems that break when you need them most. Of data that lies when decisions matter. Of complexity that grows faster than your team.
              </p>
              
              <p className="text-lg leading-relaxed text-slate-600">
                Modern brands deserve infrastructure that thinks like they do — global, intelligent, and obsessed with excellence.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-900">500M+</div>
                <div className="text-sm text-slate-600">SKUs Managed Collectively</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-slate-900">15+</div>
                <div className="text-sm text-slate-600">Years Combined Experience</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 p-8">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm animate-float"
                    style={{ 
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${4 + i * 0.5}s`
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
