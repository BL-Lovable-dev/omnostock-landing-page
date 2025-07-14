
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Omnostock</span>
                <div className="text-xs text-gray-500">by Blackroot Labs</div>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
              <a href="#why-different" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Why Different</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Contact</a>
            </div>
            <Button onClick={scrollToContact} className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200">
              Get Custom Solution
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto bg-gray-900 rounded-2xl flex items-center justify-center mb-10 shadow-lg">
              <Package className="w-10 h-10 text-white" />
            </div>
            
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium mb-10">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-600"></span>
              </span>
              Limited Custom Implementations Available
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Stop Losing Money to<br />
              <span className="text-gray-700">Inventory Chaos</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              The first inventory system built for hybrid commerce realities. Prevent costly stockouts, reduce deadstock, and scale confidently across all channels.
            </p>
            
            <div className="flex items-center justify-center gap-8 mb-12 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <span>Save 30-40% on inventory costs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <span>Prevent 95% of stockouts</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-gray-900 hover:bg-gray-800 text-white text-lg px-10 py-6 rounded-lg transition-all duration-200 shadow-lg"
              >
                🚀 Get Custom Solution
              </Button>
              <Button 
                onClick={scrollToFeatures}
                variant="outline" 
                size="lg" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-10 py-6 rounded-lg transition-all duration-200"
              >
                📋 See Features
              </Button>
            </div>
            
            {/* Key Stats */}
            <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">$2.3M</div>
                <p className="text-sm text-gray-600">Inventory losses prevented in beta</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">47%</div>
                <p className="text-sm text-gray-600">Average cost reduction</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">99.7%</div>
                <p className="text-sm text-gray-600">Accuracy across 50+ SKUs</p>
              </div>
            </div>
            
            {/* Beta Client Testimonial */}
            <div className="max-w-2xl mx-auto bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <div className="text-gray-900 font-semibold">Marcus Chen</div>
                  <div className="text-gray-500 text-sm">COO, TechFashion Co.</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Within 3 weeks of implementation, we eliminated stockouts completely and reduced overstock by 40%. This isn't just software—it's a competitive advantage."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built This */}
      <section id="why-different" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why We Built Omnostock
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Most inventory systems treat your business like a spreadsheet with buttons. They lack intelligence, adaptability, and worst of all — they assume your entire operations happen online.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Traditional Systems - Problems */}
            <Card className="relative border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-gray-500"></div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-gray-800 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-sm">✕</span>
                  </div>
                  <span className="font-bold">Traditional Systems</span>
                </CardTitle>
                <p className="text-sm text-gray-600">What you're probably dealing with now</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { text: "Assumes your entire business is online", impact: "High" },
                  { text: "Zero intelligence or learning capability", impact: "High" },
                  { text: "Costly stockouts and overstock disasters", impact: "Critical" },
                  { text: "Completely disconnected from real operations", impact: "High" },
                  { text: "Manual processes everywhere you look", impact: "Medium" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-gray-200 hover:bg-white/80 transition-colors duration-200">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="text-gray-700 font-medium">{item.text}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">Impact:</span>
                        <Badge variant="outline" className={`text-xs ${
                          item.impact === 'Critical' ? 'border-red-300 text-red-600' : 
                          item.impact === 'High' ? 'border-orange-300 text-orange-600' : 
                          'border-yellow-300 text-yellow-600'
                        }`}>
                          {item.impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Omnostock - Solutions */}
            <Card className="relative border-gray-200 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
              <CardHeader className="pb-4 relative z-10">
                <CardTitle className="text-xl text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="font-bold">Omnostock Difference</span>
                </CardTitle>
                <p className="text-sm text-gray-300">Built for how modern commerce actually works</p>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                {[
                  { text: "Built for hybrid commerce realities", benefit: "Revenue" },
                  { text: "AI-powered intelligence throughout", benefit: "Efficiency" },
                  { text: "Prevents costly inventory errors", benefit: "Cost Savings" },
                  { text: "Online + offline unified control", benefit: "Control" },
                  { text: "Smart automation everywhere", benefit: "Time Savings" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-200">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="text-white font-medium">{item.text}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">Benefit:</span>
                        <Badge className={`text-xs ${
                          item.benefit === 'Revenue' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                          item.benefit === 'Cost Savings' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                          item.benefit === 'Efficiency' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                          item.benefit === 'Control' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                          'bg-gray-500/20 text-gray-300 border-gray-500/30'
                        }`}>
                          {item.benefit}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Core Features That Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We didn't build buzzwords. We built for what real businesses actually struggle with.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: <Globe className="w-5 h-5" />,
                title: "Real-Time Inventory Sync",
                description: "Live syncing with Shopify, WooCommerce, or custom builds. Inventory stays accurate and up to date, always."
              },
              {
                icon: <Package className="w-5 h-5" />,
                title: "Offline Inventory Management", 
                description: "Supports offline catalogs for pop-ups, warehouses, or retail outlets with the same accuracy and intelligence."
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                title: "Stock Transfer Between Locations",
                description: "Easily move inventory across warehouses or retail locations. Every transfer is logged, auditable, and tracked."
              },
              {
                icon: <Cpu className="w-5 h-5" />,
                title: "Record Offline Sales",
                description: "Log sales from in-person events, WhatsApp, or walk-ins. Keep data complete across all touchpoints."
              },
              {
                icon: <BarChart3 className="w-5 h-5" />,
                title: "Advanced Location Reports",
                description: "Get granular insights per outlet or warehouse. See what's selling in Lagos vs. London at a glance."
              },
              {
                icon: <Brain className="w-5 h-5" />,
                title: "Smart Reorder Recommendations",
                description: "AI analyzes sales history, seasonality, and supply timelines to recommend restocks before you need them."
              },
              {
                icon: <FileText className="w-5 h-5" />,
                title: "Auto-Purchase Order Generator",
                description: "Converts low-stock alerts into supplier-ready purchase orders. Send via WhatsApp, email, or export instantly."
              },
              {
                icon: <TrendingUp className="w-5 h-5" />,
                title: "Product Velocity Analytics",
                description: "Discover fastest-moving SKUs, deadstock items, and hidden performers. Perfect for refining strategy."
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: "Multi-User Access & Roles",
                description: "From inventory managers to sales assistants, define exactly who can do what and prevent errors."
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-sm transition-all duration-300 border-gray-100 hover:border-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gray-50 group-hover:bg-gray-100 rounded-xl flex items-center justify-center mb-4 text-gray-700 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Game Changer Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Why It's a Game-Changer
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Omnostock gives growing commerce brands the kind of operational infrastructure only enterprise companies used to afford — but with the flexibility, intelligence, and affordability tailored for the modern market.
            </p>
            
            <Card className="bg-gray-100 border-gray-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  One System. All Your Commerce.
                </h3>
                <p className="text-gray-700 text-lg">
                  Whether you sell on your own website, through DMs, in a physical store, or across several warehouses — this is the one system that keeps your stock, team, and growth aligned.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Not SaaS Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-gray-300 text-sm font-medium mb-8">
              <div className="relative flex h-2 w-2 mr-2">
                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></div>
                <div className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></div>
              </div>
              Only 3 slots available this quarter
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Available Now — But Not As SaaS
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Omnostock isn't available as a public SaaS — yet. We're deploying it as a customized implementation through Blackroot Labs. We adapt it to your stack, workflows, team, and market realities.
            </p>
            
            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">Custom Implementation</h3>
                <p className="text-gray-300">
                  We build a version of Omnostock tailored for your business — or even create a more powerful version from scratch. This isn't one-size-fits-all software.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Enhanced Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span>Available for 3 more custom implementations this quarter</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Ready to Transform<br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Your Inventory?
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join the select businesses getting custom Omnostock implementations. 
                This isn't software-as-a-service — it's a competitive advantage built just for you.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mb-12 text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">24-hour response</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Custom implementation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm">Enterprise-grade security</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Form Container */}
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
                {/* Card Background Effects */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                </div>

                <CardContent className="p-8 md:p-10 relative z-10">
                  {!isSubmitted ? (
                    <div className="space-y-8">
                      {/* Form Header */}
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                          <Package className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                          Get Your Custom Solution
                        </h3>
                        <p className="text-gray-300">
                          Tell us about your business and we'll craft the perfect Omnostock implementation
                        </p>
                      </div>

                      {/* Enhanced Form */}
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 block">Full Name *</label>
                            <Input
                              type="text"
                              name="name"
                              placeholder="John Smith"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-12 rounded-lg transition-all duration-200 hover:bg-white/15"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 block">Email Address *</label>
                            <Input
                              type="email"
                              name="email"
                              placeholder="john@company.com"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-12 rounded-lg transition-all duration-200 hover:bg-white/15"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300 block">Company Name *</label>
                          <Input
                            type="text"
                            name="company"
                            placeholder="Your Company Inc."
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-12 rounded-lg transition-all duration-200 hover:bg-white/15"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300 block">Website URL</label>
                          <Input
                            type="url"
                            name="website"
                            placeholder="https://yourcompany.com"
                            value={formData.website}
                            onChange={handleChange}
                            className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-12 rounded-lg transition-all duration-200 hover:bg-white/15"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300 block">WhatsApp Number *</label>
                          <Input
                            type="tel"
                            name="phone"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-12 rounded-lg transition-all duration-200 hover:bg-white/15"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white disabled:opacity-50 text-lg py-6 font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Sending your request...</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <span>🚀</span>
                              <span>Get Custom Omnostock Solution</span>
                            </div>
                          )}
                        </Button>
                      </form>

                      {/* Error Display */}
                      {error && (
                        <div className="p-4 bg-red-900/30 border border-red-700/50 rounded-lg text-red-200 backdrop-blur-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                            <span>{error}</span>
                          </div>
                        </div>
                      )}

                      {/* Security Note */}
                      <div className="text-center text-gray-400 text-sm">
                        <div className="flex items-center justify-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span>Your information is encrypted and secure</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white mb-4">
                        Request Received! 🎉
                      </h3>
                      
                      <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                        Thank you for your interest in Omnostock. Our team will review your requirements 
                        and get back to you within 24 hours with a custom solution proposal.
                      </p>

                      <div className="space-y-4">
                        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                          <CardContent className="p-6">
                            <h4 className="text-white font-semibold mb-2">What happens next?</h4>
                            <div className="space-y-2 text-gray-300 text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Technical consultation call (30 minutes)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span>Custom solution architecture review</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>Implementation timeline & pricing</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                          <CardContent className="p-4">
                            <p className="text-sm text-gray-400">
                              <strong className="text-white">Blackroot Labs</strong> — where experimental AI becomes your unfair advantage.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Social Proof Footer */}
            <div className="text-center mt-16">
              <p className="text-gray-400 text-sm mb-4">
                Trusted by forward-thinking businesses across 12+ countries
              </p>
              <div className="flex justify-center items-center gap-8 opacity-60">
                <div className="text-xs text-gray-500">Series A+ Operators</div>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <div className="text-xs text-gray-500">Global Scale Experience</div>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <div className="text-xs text-gray-500">Enterprise Security</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
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
            <div className="border-t border-gray-800 pt-6">
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
