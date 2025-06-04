

import { BarChart3, Globe, Shield, Zap, Users, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Features = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.2 });

  const features = [
    {
      icon: BarChart3,
      title: "Powerful Analytics",
      description: "Get insights that help you make better business decisions.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Built to Scale",
      description: "Designed to grow with your business, from startup to enterprise.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security you can trust with your data.",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed and performance at any scale.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Team Ready",
      description: "Built for collaboration with teams of any size.",
      color: "from-rose-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Smart Technology",
      description: "Powered by intelligent algorithms and machine learning.",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-800/50 dark:to-slate-900"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div 
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect text-slate-700 dark:text-slate-300 text-sm font-medium mb-6">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse mr-2"></div>
            <span className="gradient-text-accent font-semibold">Why Choose OmnoStock</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">
            <span className="gradient-text">Features Built for</span>
            <br />
            <span className="text-slate-900 dark:text-white">Modern Operations</span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Every feature is designed with one goal: making inventory management 
            <span className="gradient-text-accent font-semibold"> effortless and powerful</span>.
          </p>
        </div>

        <div 
          ref={gridRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${
            gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group feature-card transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  gridVisible ? 'animate-stagger-in' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" 
                     style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
                
                {/* Icon with animated background */}
                <div className="relative mb-6 group">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                  <div className={`relative w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-300 ${
          gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 text-sm font-medium hover:scale-105 transition-transform duration-200 cursor-pointer">
            <span>More features coming soon</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
