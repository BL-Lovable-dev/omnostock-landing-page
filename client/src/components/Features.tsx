
import { BarChart3, Globe, Shield, Zap, Users, TrendingUp } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Live inventory tracking with predictive insights and automated alerts."
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Multi-location inventory management across warehouses and regions."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with role-based access and audit trails."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second response times even with millions of SKUs."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Built for teams with workflows, approvals, and notifications."
    },
    {
      icon: TrendingUp,
      title: "Smart Forecasting",
      description: "AI-powered demand forecasting and automatic reorder points."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-indigo-50/30"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect text-slate-700 text-sm font-medium mb-6">
            <span className="gradient-text-accent font-semibold">Built for Scale</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Everything you need to
            <span className="gradient-text-accent block">manage inventory</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From startups to enterprise, OmnoStock scales with your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
