const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('*', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Join Our Waitlist - Get Early Access</title>
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .hero-pattern { background-image: radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0); background-size: 50px 50px; }
        .float-animation { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .success-animation { animation: successBounce 0.6s ease-out; }
        @keyframes successBounce { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); opacity: 1; } }
    </style>
</head>
<body class="min-h-screen gradient-bg hero-pattern">
    <div class="container mx-auto px-4 py-16">
        <div class="max-w-2xl mx-auto text-center">
            <div class="mb-12">
                <div class="float-animation mb-8">
                    <div class="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                </div>
                <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Join the Future</h1>
                <p class="text-xl text-white/90 mb-8 leading-relaxed">Be among the first to experience groundbreaking innovation. Get exclusive early access and special benefits.</p>
            </div>
            
            <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                <div id="form-container">
                    <h2 class="text-2xl font-semibold text-white mb-6">Reserve Your Spot</h2>
                    <form id="waitlist-form" class="space-y-4">
                        <div>
                            <input type="email" id="email" required placeholder="Enter your email address" class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all">
                        </div>
                        <button type="submit" id="submit-btn" class="w-full py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                            <span id="btn-text">Join Waitlist</span>
                            <span id="btn-loading" class="hidden">Joining...</span>
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
                        <h3 class="text-2xl font-semibold text-white mb-2">You're In!</h3>
                        <p class="text-white/80 mb-6">Welcome to our exclusive waitlist. We'll notify you when early access becomes available.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const supabaseUrl = '${process.env.VITE_SUPABASE_URL}';
        const supabaseKey = '${process.env.VITE_SUPABASE_ANON_KEY}';
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

        document.getElementById('waitlist-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            if (!email) return;

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
                    .from('waitlist_subscribers')
                    .insert([{ email: email }]);

                if (error) throw error;

                formContainer.classList.add('hidden');
                successContainer.classList.remove('hidden');
                
            } catch (error) {
                console.error('Error:', error);
                
                let errorText = 'Something went wrong. Please try again.';
                if (error.message && error.message.includes('duplicate')) {
                    errorText = 'This email is already on our waitlist!';
                }
                
                errorMessage.textContent = errorText;
                errorMessage.classList.remove('hidden');
                
                submitBtn.disabled = false;
                btnText.classList.remove('hidden');
                btnLoading.classList.add('hidden');
            }
        });
    </script>
</body>
</html>`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Waitlist server running on port ' + PORT);
});