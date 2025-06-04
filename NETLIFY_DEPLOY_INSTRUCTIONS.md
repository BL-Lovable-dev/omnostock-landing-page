# How to Deploy Your Waitlist to Netlify

Since you can only download individual files from Replit, here's the easiest way:

## Option 1: Single File Upload (Recommended)

1. **Download** the `netlify-deploy/index.html` file from Replit
2. **Go to** [netlify.com](https://netlify.com) 
3. **Drag the single `index.html` file** directly onto the Netlify homepage
4. Netlify will create a site from that single file
5. Your waitlist will be live immediately

## Option 2: GitHub Method

1. Create new repository on GitHub
2. Upload the `index.html` file (from netlify-deploy folder)
3. Connect the GitHub repo to Netlify
4. Automatic deployments on future updates

## What Happens After Deployment

- Your waitlist form will be live and collecting emails
- Emails save directly to your Supabase database
- View subscribers in your Supabase dashboard
- No server maintenance required

The single `index.html` file contains everything needed - styling, JavaScript, and database connection.