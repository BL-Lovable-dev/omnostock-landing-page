# Complete Render Deployment Guide

## SOLUTION 1: Simple Express Server (Recommended)

### Files Created:
- `app.js` - Clean Express server with embedded waitlist page
- `package-new.json` - Minimal dependencies (express + cors only)
- `render.yaml` - Updated configuration

### Deployment Steps:
1. Push all files to your GitHub repository
2. In Render dashboard, create new Web Service
3. Connect your GitHub repository
4. Render will automatically use `render.yaml` configuration
5. Set environment variables:
   - `VITE_SUPABASE_URL`: https://pnuolzmfajxwpofbbxbo.supabase.co
   - `VITE_SUPABASE_ANON_KEY`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudW9sem1mYWp4d3BvZmJieGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDM1ODUsImV4cCI6MjA2NDYxOTU4NX0.qa-noNI-MGjYdHNYD04orbUZygvpERaOsihp0P4D5ag

### Build Process:
- Removes complex package.json
- Copies clean package-new.json as package.json
- Installs only express and cors
- Starts with `node app.js`

## SOLUTION 2: Static HTML (Backup Option)

If Render continues having issues, use the standalone HTML file:

### File: `waitlist-page.html`
- Complete standalone waitlist page
- Works on any static hosting (Netlify, Vercel, GitHub Pages)
- No server required
- Same Supabase integration

### Deploy to Netlify:
1. Drag `waitlist-page.html` to Netlify deploy
2. Set environment variables in Netlify dashboard
3. Instant deployment

## SOLUTION 3: Manual Render Setup

If automated deployment fails:

1. Create new Web Service in Render
2. Manual configuration:
   - Build Command: `rm -f package.json && cp package-new.json package.json && npm install`
   - Start Command: `node app.js`
   - Environment Variables: (same as above)

## Testing Your Deployment

Once deployed, test:
1. Visit your Render URL
2. Enter test email
3. Check Supabase database for new entry
4. Verify form shows success message

## Troubleshooting

### If Deployment Fails:
- Check Render build logs
- Ensure all files are in repository root
- Verify environment variables are set

### If Database Connection Fails:
- Confirm Supabase credentials are correct
- Check network connectivity
- Verify table exists: `waitlist_subscribers`

## Success Indicators

✅ Server starts without errors
✅ Health check responds at `/health`
✅ Waitlist form loads properly
✅ Email submission works
✅ Success message displays
✅ Data appears in Supabase

Your waitlist is ready for production use!