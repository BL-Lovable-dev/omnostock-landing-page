# Deploy to Render - Step by Step Guide

## Method 1: Using Render.yaml (Recommended)

1. **Connect Repository to Render**
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository containing this code

2. **Environment Variables Setup**
   Set these environment variables in Render dashboard:
   
   **Required for Database:**
   - `DATABASE_URL` - (Auto-configured by Render PostgreSQL)
   
   **Required for Email Autoresponder:**
   - `GMAIL_USER` - Your Gmail address
   - `GMAIL_APP_PASSWORD` - Gmail App Password (not regular password)
   
   **Optional (for future Mailchimp integration):**
   - `MAILCHIMP_API_KEY` - Your Mailchimp API key

3. **Database Migration**
   After deployment, run database migration:
   - Go to your web service in Render dashboard
   - Open "Shell" tab
   - Run: `npm run db:push`

## Method 2: Manual Setup

1. **Create Web Service**
   - New + → Web Service
   - Connect repository
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: Node

2. **Create Database**
   - New + → PostgreSQL
   - Copy connection string to `DATABASE_URL` environment variable

3. **Add Environment Variables** (same as above)

## Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account settings → Security → App passwords
3. Generate app password for "Mail"
4. Use this password (not your regular Gmail password) for `GMAIL_APP_PASSWORD`

## Database Schema

The application will automatically create these tables:
- `users` - User authentication
- `waitlist_subscribers` - Email subscribers with autoresponder

## Post-Deployment

1. Test waitlist form: `https://your-app.onrender.com`
2. Verify emails are being sent
3. Check database status: `https://your-app.onrender.com/api/waitlist/status`

## Troubleshooting

- **Database Connection**: Ensure `DATABASE_URL` is set correctly
- **Email Issues**: Verify Gmail credentials and app password
- **Build Fails**: Check Node.js version compatibility (requires Node 18+)