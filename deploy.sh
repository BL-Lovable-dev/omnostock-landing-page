#!/bin/bash

echo "🚀 Deploying Omnostock to Vercel..."

# Build the React frontend
echo "📦 Building React frontend..."
cd client
npm install
npm run build
cd ..

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod

echo "✅ Deployment complete!"
echo "Don't forget to:"
echo "1. Set DATABASE_URL environment variable in Vercel dashboard"
echo "2. Test the form submission"
echo "3. Configure custom domain if needed"