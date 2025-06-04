# Deploy Your Waitlist App to Netlify

## Quick Setup Steps

### 1. Push to GitHub
1. Create new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Connect to Netlify
1. Go to [netlify.com](https://netlify.com) and login
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
   - Node version: 18

### 3. Add Environment Variables
In Netlify dashboard → Site settings → Environment variables, add:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

### 4. Deploy
Click "Deploy site" - Netlify will build and deploy automatically.

## Alternative: Manual Upload

If you prefer not to use GitHub:

1. Run `npm run build` locally
2. Upload the `dist/public` folder contents to Netlify manually
3. Add environment variables in Netlify dashboard

## What You Get

- Free hosting with custom domain support
- No sleep mode (always online)
- Automatic SSL certificates
- Global CDN for fast loading
- Automatic deployments from GitHub

Your waitlist app will be live and collecting emails via Supabase database!