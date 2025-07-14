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
    <title>Omnostock: The AI-Powered Inventory System You've Always Needed - Blackroot Labs</title>
    <meta name="description" content="AI-powered inventory management for hybrid commerce. Real-time sync, offline management, smart reorder recommendations. Custom deployment by Blackroot Labs.">
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); }
        .hero-pattern { background-image: radial-gradient(circle at 25px 25px, rgba(255,255,255,0.05) 2px, transparent 0); background-size: 50px 50px; }
        .float-animation { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .success-animation { animation: successBounce 0.6s ease-out; }
        @keyframes successBounce { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); opacity: 1; } }
        .pulse-animation { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .slide-in { animation: slideIn 0.8s ease-out; }
        @keyframes slideIn { 0% { transform: translateY(30px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .blackroot-orange { background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); }
        .text-blackroot-orange { color: #ff6b35; }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
        <div class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 blackroot-orange rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                    </div>
                    <div>
                        <span class="text-xl font-bold text-gray-800">Omnostock</span>
                        <div class="text-xs text-gray-500">by Blackroot Labs</div>
                    </div>
                </div>
                <div class="hidden md:flex space-x-6">
                    <a href="#features" class="text-gray-600 hover:text-orange-600 transition-colors">Features</a>
                    <a href="#why-different" class="text-gray-600 hover:text-orange-600 transition-colors">Why Different</a>
                    <a href="#contact" class="text-gray-600 hover:text-orange-600 transition-colors">Contact</a>
                </div>
                <button onclick="scrollToForm()" class="blackroot-orange text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                    Get Custom Solution
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="gradient-bg hero-pattern pt-24 pb-16">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <div class="float-animation mb-8">
                    <div class="w-24 h-24 mx-auto blackroot-orange rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                    </div>
                </div>
                
                <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    <span class="text-orange-400">Omnostock</span><br>
                    The AI-Powered Inventory System You've Always Needed
                </h1>
                
                <p class="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                    Built from scratch for hybrid commerce realities. Where warehouses, storefronts, and social shops converge — and inventory mistakes are expensive.
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <button onclick="scrollToForm()" class="blackroot-orange text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity transform hover:scale-105">
                        🚀 Get Custom Solution
                    </button>
                    <button onclick="scrollToFeatures()" class="bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all border border-white/30">
                        📋 See Features
                    </button>
                </div>
                
                <!-- Key Stats -->
                <div class="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto text-white/90">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-orange-400 mb-2">7 Weeks</div>
                        <p class="text-sm">Intensive development & testing</p>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-orange-400 mb-2">Live Tested</div>
                        <p class="text-sm">In real retail environments</p>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-orange-400 mb-2">AI-Powered</div>
                        <p class="text-sm">Smart reorder recommendations</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Why We Built This -->
    <section id="why-different" class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    Why We Built Omnostock
                </h2>
                <p class="text-xl text-gray-600 leading-relaxed">
                    Most inventory systems treat your business like a spreadsheet with buttons. They lack intelligence, adaptability, and worst of all — they assume your entire operations happen online.
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div class="bg-red-50 border border-red-200 rounded-2xl p-8">
                    <h3 class="text-2xl font-bold text-red-800 mb-4">❌ Traditional Systems</h3>
                    <ul class="space-y-3 text-red-700">
                        <li class="flex items-start"><span class="text-red-500 mr-2">•</span>Online-only assumptions</li>
                        <li class="flex items-start"><span class="text-red-500 mr-2">•</span>No intelligence or adaptability</li>
                        <li class="flex items-start"><span class="text-red-500 mr-2">•</span>Expensive inventory mistakes</li>
                        <li class="flex items-start"><span class="text-red-500 mr-2">•</span>Disconnected from real operations</li>
                        <li class="flex items-start"><span class="text-red-500 mr-2">•</span>Manual processes everywhere</li>
                    </ul>
                </div>
                
                <div class="bg-green-50 border border-green-200 rounded-2xl p-8">
                    <h3 class="text-2xl font-bold text-green-800 mb-4">✅ Omnostock Difference</h3>
                    <ul class="space-y-3 text-green-700">
                        <li class="flex items-start"><span class="text-green-500 mr-2">•</span>Built for hybrid commerce realities</li>
                        <li class="flex items-start"><span class="text-green-500 mr-2">•</span>AI-powered intelligence throughout</li>
                        <li class="flex items-start"><span class="text-green-500 mr-2">•</span>Prevents costly inventory errors</li>
                        <li class="flex items-start"><span class="text-green-500 mr-2">•</span>Online + offline unified control</li>
                        <li class="flex items-start"><span class="text-green-500 mr-2">•</span>Smart automation everywhere</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Core Features -->
    <section id="features" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Core Features That Matter
                </h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    We didn't build buzzwords. We built for what real businesses actually struggle with.
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <div class="w-12 h-12 blackroot-orange rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Real-Time Inventory Sync</h3>
                    <p class="text-gray-600 text-sm">Live syncing with Shopify, WooCommerce, or custom builds. Inventory stays accurate and up to date, always.</p>
                </div>
                
                <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <div class="w-12 h-12 blackroot-orange rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Offline Inventory Management</h3>
                    <p class="text-gray-600 text-sm">Supports offline catalogs for pop-ups, warehouses, or retail outlets with the same accuracy and intelligence.</p>
                </div>
                
                <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <div class="w-12 h-12 blackroot-orange rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Stock Transfer Between Locations</h3>
                    <p class="text-gray-600 text-sm">Easily move inventory across warehouses or retail locations. Every transfer is logged, auditable, and tracked.</p>
                </div>
                
                <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <div class="w-12 h-12 blackroot-orange rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Record Offline Sales</h3>
                    <p class="text-gray-600 text-sm">Log sales from in-person events, WhatsApp, or walk-ins. Keep data complete across all touchpoints.</p>
                </div>
                
                <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <div class="w-12 h-12 blackroot-orange rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Advanced Location Reports</h3>
                    <p class="text-gray-600 text-sm">Get granular insights per outlet or warehouse. See what's selling in Lagos vs. London at a glance.</p>
                </div>
                
                <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <div class="w-12 h-12 blackroot-orange rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Smart Reorder Recommendations</h3>
                    <p class="text-gray-600 text-sm">AI analyzes sales history, seasonality, and supply timelines to recommend restocks before you need them.</p>
                </div>
                
                <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <div class="w-12 h-12 blackroot-orange rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Auto-Purchase Order Generator</h3>
                    <p class="text-gray-600 text-sm">Converts low-stock alerts into supplier-ready purchase orders. Send via WhatsApp, email, or export instantly.</p>
                </div>
                
                <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <div class="w-12 h-12 blackroot-orange rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Product Velocity Analytics</h3>
                    <p class="text-gray-600 text-sm">Discover fastest-moving SKUs, deadstock items, and hidden performers. Perfect for refining strategy.</p>
                </div>
                
                <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <div class="w-12 h-12 blackroot-orange rounded-lg flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Multi-User Access & Roles</h3>
                    <p class="text-gray-600 text-sm">From inventory managers to sales assistants, define exactly who can do what and prevent errors.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Game Changer Section -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                    Why It's a Game-Changer
                </h2>
                <p class="text-xl text-gray-600 leading-relaxed mb-12">
                    Omnostock gives growing commerce brands the kind of operational infrastructure only enterprise companies used to afford — but with the flexibility, intelligence, and affordability tailored for the modern market.
                </p>
                
                <div class="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
                    <h3 class="text-2xl font-bold text-orange-800 mb-4">
                        One System. All Your Commerce.
                    </h3>
                    <p class="text-orange-700 text-lg">
                        Whether you sell on your own website, through DMs, in a physical store, or across several warehouses — this is the one system that keeps your stock, team, and growth aligned.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Not SaaS Section -->
    <section class="py-20 bg-gray-800 text-white">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl md:text-5xl font-bold mb-8">
                    Available Now — But Not As SaaS
                </h2>
                <p class="text-xl text-gray-300 leading-relaxed mb-8">
                    Omnostock isn't available as a public SaaS — yet. We're deploying it as a customized implementation through Blackroot Labs. We adapt it to your stack, workflows, team, and market realities.
                </p>
                
                <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <h3 class="text-2xl font-bold mb-4 text-orange-400">Custom Implementation</h3>
                    <p class="text-gray-300">
                        We build a version of Omnostock tailored for your business — or even create a more powerful version from scratch. This isn't one-size-fits-all software.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Form Section -->
    <section id="contact" class="py-20 gradient-bg hero-pattern">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
                    Work With Us
                </h2>
                <p class="text-xl text-white/90 mb-8">
                    If this sounds like the backbone your business has been missing, let's talk.
                </p>
                
                <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 max-w-2xl mx-auto">
                    <div id="form-container">
                        <h3 class="text-2xl font-semibold text-white mb-6">Get Your Custom Solution</h3>
                        <form id="contact-form" class="space-y-4">
                            <div>
                                <input type="text" id="name" required placeholder="Your Full Name" class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all">
                            </div>
                            <div>
                                <input type="email" id="email" required placeholder="Email Address" class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all">
                            </div>
                            <div>
                                <input type="text" id="company" required placeholder="Company Name" class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all">
                            </div>
                            <div>
                                <input type="url" id="website" placeholder="Website URL (optional)" class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all">
                            </div>
                            <div>
                                <input type="tel" id="phone" required placeholder="Phone Number (WhatsApp)" class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all">
                            </div>
                            <button type="submit" id="submit-btn" class="w-full py-4 blackroot-orange text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                                <span id="btn-text">🚀 Get Custom Omnostock Solution</span>
                                <span id="btn-loading" class="hidden">Sending...</span>
                            </button>
                        </form>
                        <div id="error-message" class="hidden mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200"></div>
                    </div>
                    
                    <div id="success-container" class="hidden success-animation">
                        <div class="text-center">
                            <div class="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-semibold text-white mb-2">Thanks for Your Interest!</h3>
                            <p class="text-white/80 mb-6">We'll be in touch within 24 hours to discuss your custom Omnostock solution.</p>
                            <div class="bg-white/10 rounded-lg p-4 border border-white/20">
                                <p class="text-sm text-white/70">Blackroot Labs — where experimental AI becomes your unfair advantage.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <div class="flex items-center justify-center space-x-3 mb-6">
                    <div class="w-10 h-10 blackroot-orange rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                    </div>
                    <div>
                        <span class="text-2xl font-bold">Omnostock</span>
                        <div class="text-sm text-gray-400">by Blackroot Labs</div>
                    </div>
                </div>
                <p class="text-gray-400 mb-6">
                    AI-powered inventory management for the hybrid commerce era
                </p>
                <div class="border-t border-gray-700 pt-6">
                    <p class="text-gray-500 text-sm">
                        &copy; 2024 Blackroot Labs. All rights reserved.
                    </p>
                    <p class="text-gray-500 text-sm mt-2">
                        <strong>Blackroot Labs</strong> — where experimental AI becomes your unfair advantage.
                    </p>
                </div>
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
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }
            
            function scrollToFeatures() {
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
            }
            
            // Form submission
            document.getElementById('contact-form').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    company: document.getElementById('company').value.trim(),
                    website: document.getElementById('website').value.trim(),
                    phone: document.getElementById('phone').value.trim()
                };
                
                if (!formData.name || !formData.email || !formData.company || !formData.phone) {
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
                        .from('omnostock_leads')
                        .insert([{
                            name: formData.name,
                            email: formData.email,
                            company: formData.company,
                            website: formData.website || null,
                            phone: formData.phone
                        }]);

                    if (error) throw error;

                    formContainer.classList.add('hidden');
                    successContainer.classList.remove('hidden');
                    
                } catch (error) {
                    console.error('Contact form error:', error);
                    
                    let errorText = 'Something went wrong. Please try again.';
                    if (error.message && error.message.includes('duplicate')) {
                        errorText = 'This email is already in our system. We\'ll be in touch soon.';
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
  console.log('Omnostock sales page server running on port ' + PORT);
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