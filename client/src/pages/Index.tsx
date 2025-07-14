
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Package, BarChart3, Users, MapPin, Zap, FileText, TrendingUp, Shield, Brain, Cpu, Globe } from 'lucide-react';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error } = await supabase
        .from('omnostock_leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company,
          website: formData.website || null,
          phone: formData.phone
        }]);

      if (error) throw error;

      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Form submission error:', error);
      if (error.message && error.message.includes('duplicate')) {
        setError('This email is already in our system. We\'ll be in touch soon.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-800">Omnostock</span>
                <div className="text-xs text-gray-500">by Blackroot Labs</div>
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-600 hover:text-orange-600 transition-colors">Features</a>
              <a href="#why-different" className="text-gray-600 hover:text-orange-600 transition-colors">Why Different</a>
              <a href="#contact" className="text-gray-600 hover:text-orange-600 transition-colors">Contact</a>
            </div>
            <Button onClick={scrollToContact} className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              Get Custom Solution
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25px_25px,rgba(255,255,255,0.05)_2px,transparent_0)] bg-[length:50px_50px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-8 animate-bounce">
              <Package className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="text-orange-400">Omnostock</span><br />
              The AI-Powered Inventory System You've Always Needed
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Built from scratch for hybrid commerce realities. Where warehouses, storefronts, and social shops converge — and inventory mistakes are expensive.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg px-8 py-6"
              >
                🚀 Get Custom Solution
              </Button>
              <Button 
                onClick={scrollToFeatures}
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6"
              >
                📋 See Features
              </Button>
            </div>
            
            {/* Key Stats */}
            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto text-white/90">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">7 Weeks</div>
                <p className="text-sm">Intensive development & testing</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">Live Tested</div>
                <p className="text-sm">In real retail environments</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">AI-Powered</div>
                <p className="text-sm">Smart reorder recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built This */}
      <section id="why-different" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why We Built Omnostock
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Most inventory systems treat your business like a spreadsheet with buttons. They lack intelligence, adaptability, and worst of all — they assume your entire operations happen online.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-2xl text-red-800 flex items-center gap-2">
                  ❌ Traditional Systems
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-red-700">
                <div className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Online-only assumptions</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>No intelligence or adaptability</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Expensive inventory mistakes</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Disconnected from real operations</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Manual processes everywhere</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-2xl text-green-800 flex items-center gap-2">
                  ✅ Omnostock Difference
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-green-700">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Built for hybrid commerce realities</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>AI-powered intelligence throughout</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Prevents costly inventory errors</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Online + offline unified control</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Smart automation everywhere</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Core Features That Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We didn't build buzzwords. We built for what real businesses actually struggle with.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Real-Time Inventory Sync",
                description: "Live syncing with Shopify, WooCommerce, or custom builds. Inventory stays accurate and up to date, always."
              },
              {
                icon: <Package className="w-6 h-6" />,
                title: "Offline Inventory Management",
                description: "Supports offline catalogs for pop-ups, warehouses, or retail outlets with the same accuracy and intelligence."
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Stock Transfer Between Locations",
                description: "Easily move inventory across warehouses or retail locations. Every transfer is logged, auditable, and tracked."
              },
              {
                icon: <Cpu className="w-6 h-6" />,
                title: "Record Offline Sales",
                description: "Log sales from in-person events, WhatsApp, or walk-ins. Keep data complete across all touchpoints."
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Advanced Location Reports",
                description: "Get granular insights per outlet or warehouse. See what's selling in Lagos vs. London at a glance."
              },
              {
                icon: <Brain className="w-6 h-6" />,
                title: "Smart Reorder Recommendations",
                description: "AI analyzes sales history, seasonality, and supply timelines to recommend restocks before you need them."
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Auto-Purchase Order Generator",
                description: "Converts low-stock alerts into supplier-ready purchase orders. Send via WhatsApp, email, or export instantly."
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Product Velocity Analytics",
                description: "Discover fastest-moving SKUs, deadstock items, and hidden performers. Perfect for refining strategy."
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Multi-User Access & Roles",
                description: "From inventory managers to sales assistants, define exactly who can do what and prevent errors."
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Game Changer Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Why It's a Game-Changer
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Omnostock gives growing commerce brands the kind of operational infrastructure only enterprise companies used to afford — but with the flexibility, intelligence, and affordability tailored for the modern market.
            </p>
            
            <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-orange-800 mb-4">
                  One System. All Your Commerce.
                </h3>
                <p className="text-orange-700 text-lg">
                  Whether you sell on your own website, through DMs, in a physical store, or across several warehouses — this is the one system that keeps your stock, team, and growth aligned.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Not SaaS Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Available Now — But Not As SaaS
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Omnostock isn't available as a public SaaS — yet. We're deploying it as a customized implementation through Blackroot Labs. We adapt it to your stack, workflows, team, and market realities.
            </p>
            
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-orange-400">Custom Implementation</h3>
                <p className="text-gray-300">
                  We build a version of Omnostock tailored for your business — or even create a more powerful version from scratch. This isn't one-size-fits-all software.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25px_25px,rgba(255,255,255,0.05)_2px,transparent_0)] bg-[length:50px_50px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Work With Us
            </h2>
            <p className="text-xl text-white/90 mb-8">
              If this sounds like the backbone your business has been missing, let's talk.
            </p>
            
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                {!isSubmitted ? (
                  <div>
                    <CardHeader className="pb-6">
                      <CardTitle className="text-2xl text-white">Get Your Custom Solution</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-orange-400 focus:border-orange-400"
                      />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-orange-400 focus:border-orange-400"
                      />
                      <Input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-orange-400 focus:border-orange-400"
                      />
                      <Input
                        type="url"
                        name="website"
                        placeholder="Website URL (optional)"
                        value={formData.website}
                        onChange={handleChange}
                        className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-orange-400 focus:border-orange-400"
                      />
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number (WhatsApp)"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-orange-400 focus:border-orange-400"
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 text-lg py-6"
                      >
                        {isSubmitting ? 'Sending...' : '🚀 Get Custom Omnostock Solution'}
                      </Button>
                    </form>
                    {error && (
                      <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200">
                        {error}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">Thanks for Your Interest!</h3>
                    <p className="text-white/80 mb-6">We'll be in touch within 24 hours to discuss your custom Omnostock solution.</p>
                    <Card className="bg-white/10 border-white/20">
                      <CardContent className="p-4">
                        <p className="text-sm text-white/70">Blackroot Labs — where experimental AI becomes your unfair advantage.</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">Omnostock</span>
                <div className="text-sm text-gray-400">by Blackroot Labs</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              AI-powered inventory management for the hybrid commerce era
            </p>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-500 text-sm">
                &copy; 2024 Blackroot Labs. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                <strong>Blackroot Labs</strong> — where experimental AI becomes your unfair advantage.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
