#!/usr/bin/env node

const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing required environment variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transform Your Business with AI-Powered Solutions - Limited Time Offer</title>
    <meta name="description" content="Join 10,000+ businesses already using our AI platform. 67% faster results, 45% cost savings. Start your free trial today.">
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .hero-pattern { background-image: radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0); background-size: 50px 50px; }
        .float-animation { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .success-animation { animation: successBounce 0.6s ease-out; }
        @keyframes successBounce { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); opacity: 1; } }
        .pulse-animation { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .slide-in { animation: slideIn 0.8s ease-out; }
        @keyframes slideIn { 0% { transform: translateY(30px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
        <div class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <span class="text-xl font-bold text-gray-800">AI Pro</span>
                </div>
                <div class="hidden md:flex space-x-6">
                    <a href="#features" class="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
                    <a href="#pricing" class="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>
                    <a href="#testimonials" class="text-gray-600 hover:text-purple-600 transition-colors">Reviews</a>
                </div>
                <button onclick="scrollToForm()" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Get Started Free
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="gradient-bg hero-pattern pt-24 pb-16">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <div class="float-animation mb-8">
                    <div class="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                </div>
                
                <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    Transform Your Business with 
                    <span class="text-yellow-300">AI Power</span>
                </h1>
                
                <p class="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                    Join 10,000+ businesses already using our AI platform to achieve 67% faster results and 45% cost savings. 
                    Start your transformation today.
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <button onclick="scrollToForm()" class="bg-yellow-400 text-purple-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105">
                        🚀 Start Free Trial Now
                    </button>
                    <button onclick="scrollToDemo()" class="bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all border border-white/30">
                        📹 Watch Demo
                    </button>
                </div>
                
                <!-- Social Proof -->
                <div class="flex flex-wrap justify-center items-center gap-8 text-white/80">
                    <div class="flex items-center space-x-2">
                        <div class="flex -space-x-2">
                            <div class="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                            <div class="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                            <div class="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                        </div>
                        <span class="text-sm">10,000+ active users</span>
                    </div>
                    <div class="flex items-center space-x-1">
                        <div class="flex text-yellow-400">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        </div>
                        <span class="text-sm ml-2">4.9/5 rating</span>
                    </div>
                    <div class="text-sm">
                        <span class="pulse-animation">🔥</span> 2,847 businesses joined this month
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Why 10,000+ Businesses Choose AI Pro
                </h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Our AI platform delivers measurable results that transform how you work
                </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center slide-in">
                    <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-purple-800 mb-4">67% Faster Results</h3>
                    <p class="text-gray-700 mb-4">Our AI automation cuts your workflow time by more than half, letting you focus on what matters most.</p>
                    <div class="text-3xl font-bold text-purple-600">67%</div>
                </div>
                
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center slide-in">
                    <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-blue-800 mb-4">45% Cost Savings</h3>
                    <p class="text-gray-700 mb-4">Reduce operational costs significantly while improving quality and consistency across all processes.</p>
                    <div class="text-3xl font-bold text-blue-600">45%</div>
                </div>
                
                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center slide-in">
                    <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-green-800 mb-4">99.9% Uptime</h3>
                    <p class="text-gray-700 mb-4">Enterprise-grade reliability ensures your business never stops. Trusted by Fortune 500 companies.</p>
                    <div class="text-3xl font-bold text-green-600">99.9%</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    What Our Customers Say
                </h2>
                <p class="text-xl text-gray-600">Real results from real businesses</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div class="bg-white rounded-2xl p-8 shadow-lg">
                    <div class="flex text-yellow-400 mb-4">
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                    </div>
                    <p class="text-gray-700 mb-6">"AI Pro transformed our operations completely. We're processing 3x more orders with the same team size."</p>
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            SM
                        </div>
                        <div class="ml-4">
                            <p class="font-semibold text-gray-800">Sarah Miller</p>
                            <p class="text-gray-600 text-sm">CEO, TechStart Inc.</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-2xl p-8 shadow-lg">
                    <div class="flex text-yellow-400 mb-4">
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                    </div>
                    <p class="text-gray-700 mb-6">"The ROI was incredible - we saved $50,000 in the first month alone. Best investment we've made."</p>
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            MJ
                        </div>
                        <div class="ml-4">
                            <p class="font-semibold text-gray-800">Michael Johnson</p>
                            <p class="text-gray-600 text-sm">Operations Director, Scale Co.</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-2xl p-8 shadow-lg">
                    <div class="flex text-yellow-400 mb-4">
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                    </div>
                    <p class="text-gray-700 mb-6">"Setup was incredibly easy. We were up and running in under 24 hours with amazing results."</p>
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                            EC
                        </div>
                        <div class="ml-4">
                            <p class="font-semibold text-gray-800">Emily Chen</p>
                            <p class="text-gray-600 text-sm">CTO, Innovation Labs</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Simple, Transparent Pricing
                </h2>
                <p class="text-xl text-gray-600">Choose the plan that fits your business needs</p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <!-- Starter Plan -->
                <div class="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
                    <div class="text-center mb-8">
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">Starter</h3>
                        <p class="text-gray-600 mb-4">Perfect for small businesses</p>
                        <div class="text-4xl font-bold text-gray-800">$29<span class="text-lg text-gray-600">/month</span></div>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Up to 1,000 AI operations/month</li>
                        <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Basic automation tools</li>
                        <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Email support</li>
                        <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Basic analytics</li>
                    </ul>
                    <button onclick="selectPlan('starter')" class="w-full bg-gray-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors">
                        Start Free Trial
                    </button>
                </div>
                
                <!-- Professional Plan (Popular) -->
                <div class="bg-white rounded-2xl p-8 shadow-2xl border-2 border-purple-600 relative">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                    </div>
                    <div class="text-center mb-8">
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">Professional</h3>
                        <p class="text-gray-600 mb-4">For growing businesses</p>
                        <div class="text-4xl font-bold text-purple-600">$99<span class="text-lg text-gray-600">/month</span></div>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Up to 10,000 AI operations/month</li>
                        <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Advanced automation suite</li>
                        <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Priority support</li>
                        <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Advanced analytics & reporting</li>
                        <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Custom integrations</li>
                    </ul>
                    <button onclick="selectPlan('professional')" class="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                        Start Free Trial
                    </button>
                </div>
                
                <!-- Enterprise Plan -->
                <div class="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
                    <div class="text-center mb-8">
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">Enterprise</h3>
                        <p class="text-gray-600 mb-4">For large organizations</p>
                        <div class="text-4xl font-bold text-gray-800">$299<span class="text-lg text-gray-600">/month</span></div>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Unlimited AI operations</li>
                        <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Enterprise automation platform</li>
                        <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>24/7 dedicated support</li>
                        <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Custom development</li>
                        <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>White-label solutions</li>
                    </ul>
                    <button onclick="selectPlan('enterprise')" class="w-full bg-gray-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors">
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section id="cta" class="py-20 gradient-bg hero-pattern">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to Transform Your Business?
                </h2>
                <p class="text-xl text-white/90 mb-8">
                    Join thousands of businesses already using AI Pro to achieve remarkable results
                </p>
                
                <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 max-w-2xl mx-auto">
                    <div id="form-container">
                        <h3 class="text-2xl font-semibold text-white mb-6">Start Your Free Trial Now</h3>
                        <form id="signup-form" class="space-y-4">
                            <div class="grid md:grid-cols-2 gap-4">
                                <input type="text" id="firstName" required placeholder="First Name" class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all">
                                <input type="text" id="lastName" required placeholder="Last Name" class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all">
                            </div>
                            <input type="email" id="email" required placeholder="Business Email Address" class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all">
                            <input type="text" id="company" required placeholder="Company Name" class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all">
                            <select id="plan" class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all">
                                <option value="starter">Starter Plan - $29/month</option>
                                <option value="professional" selected>Professional Plan - $99/month</option>
                                <option value="enterprise">Enterprise Plan - $299/month</option>
                            </select>
                            <button type="submit" id="submit-btn" class="w-full py-4 bg-yellow-400 text-purple-900 font-semibold rounded-xl hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                                <span id="btn-text">🚀 Start Free Trial Now</span>
                                <span id="btn-loading" class="hidden">Processing...</span>
                            </button>
                        </form>
                        <div id="error-message" class="hidden mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200"></div>
                        <p class="text-white/70 text-sm mt-4">
                            ✅ 14-day free trial • ✅ No credit card required • ✅ Cancel anytime
                        </p>
                    </div>
                    
                    <div id="success-container" class="hidden success-animation">
                        <div class="text-center">
                            <div class="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-semibold text-white mb-2">Welcome to AI Pro!</h3>
                            <p class="text-white/80 mb-6">Your free trial is ready. Check your email for setup instructions and exclusive bonuses.</p>
                            <div class="bg-white/10 rounded-lg p-4 border border-white/20">
                                <p class="text-sm text-white/70">Our team will contact you within 24 hours to ensure you get the most out of your trial.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <div class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <span class="text-xl font-bold">AI Pro</span>
                    </div>
                    <p class="text-gray-400">Transforming businesses with AI-powered solutions.</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Product</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#features" class="hover:text-white transition-colors">Features</a></li>
                        <li><a href="#pricing" class="hover:text-white transition-colors">Pricing</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">API</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Support</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Contact Us</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Status</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Company</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white transition-colors">About</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Privacy</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 AI Pro. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        const supabaseUrl = '${SUPABASE_URL}';
        const supabaseKey = '${SUPABASE_KEY}';
        
        if (!supabaseUrl || !supabaseKey) {
            console.error('Supabase configuration missing');
            document.getElementById('submit-btn').disabled = true;
            document.getElementById('btn-text').textContent = 'Configuration Error';
        } else {
            const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
            
            // Smooth scrolling functions
            function scrollToForm() {
                document.getElementById('cta').scrollIntoView({ behavior: 'smooth' });
            }
            
            function scrollToDemo() {
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
            }
            
            function selectPlan(plan) {
                document.getElementById('plan').value = plan;
                scrollToForm();
            }
            
            // Form submission
            document.getElementById('signup-form').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = {
                    firstName: document.getElementById('firstName').value.trim(),
                    lastName: document.getElementById('lastName').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    company: document.getElementById('company').value.trim(),
                    plan: document.getElementById('plan').value
                };
                
                if (!formData.firstName || !formData.lastName || !formData.email || !formData.company) {
                    return;
                }

                const submitBtn = document.getElementById('submit-btn');
                const btnText = document.getElementById('btn-text');
                const btnLoading = document.getElementById('btn-loading');
                const formContainer = document.getElementById('form-container');
                const successContainer = document.getElementById('success-container');
                const errorMessage = document.getElementById('error-message');

                submitBtn.disabled = true;
                btnText.classList.add('hidden');
                btnLoading.classList.remove('hidden');
                errorMessage.classList.add('hidden');

                try {
                    const { data, error } = await supabase
                        .from('sales_leads')
                        .insert([{
                            first_name: formData.firstName,
                            last_name: formData.lastName,
                            email: formData.email,
                            company: formData.company,
                            plan: formData.plan
                        }]);

                    if (error) throw error;

                    formContainer.classList.add('hidden');
                    successContainer.classList.remove('hidden');
                    
                } catch (error) {
                    console.error('Signup error:', error);
                    
                    let errorText = 'Something went wrong. Please try again.';
                    if (error.message && error.message.includes('duplicate')) {
                        errorText = 'This email is already registered. Please use a different email.';
                    }
                    
                    errorMessage.textContent = errorText;
                    errorMessage.classList.remove('hidden');
                    
                    submitBtn.disabled = false;
                    btnText.classList.remove('hidden');
                    btnLoading.classList.add('hidden');
                }
            });
        }
    </script>
</body>
</html>`);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Sales page server running on port ' + PORT);
  console.log('Health check available at /health');
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});