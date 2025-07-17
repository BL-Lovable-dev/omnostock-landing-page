# Vercel Deployment Guide

## What I've Created

### 1. Serverless API Functions
- `api/omnostock-leads.js` - Converts your Express route to Vercel serverless function
- `api/admin/leads.js` - Admin dashboard API for retrieving leads
- Handles form submissions with proper validation
- Includes connection pooling for PostgreSQL
- CORS enabled for frontend communication

### 2. Vercel Configuration
- `vercel.json` - Routes API calls and serves React frontend with SPA routing support
- `package-vercel.json` - Dependencies for Vercel deployment
- Frontend builds automatically from client folder
- Client-side routing configured for `/admin` page support

### 3. Database Setup
- Uses same PostgreSQL database as current setup
- Connection pooling optimized for serverless
- Handles duplicate email errors gracefully

## Ready to Deploy!

### Quick Deploy (Recommended)
```bash
# Run the automated deployment script
./deploy.sh
```

### Manual Deploy
```bash
# 1. Login to Vercel
npx vercel login

# 2. Deploy to production
npx vercel --prod

# 3. Set environment variable in Vercel dashboard
# Add: DATABASE_URL = your_postgresql_connection_string
```

### After Deployment
1. Visit your new Vercel URL
2. Test the form submission
3. Check database for new leads
4. Configure custom domain (optional)

## Database Migration (if needed)

If you want to use Vercel Postgres:
1. Create new Vercel Postgres database
2. Run this SQL to create table:
```sql
CREATE TABLE omnostock_leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT NOT NULL,
  website TEXT,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Testing
- Frontend: Deployed as static React app with SPA routing
- API: Available at `/api/omnostock-leads` and `/api/admin/leads`
- Database: Same PostgreSQL setup
- Form: Works exactly like current version
- Admin: Available at `/admin` with password protection

## Rollback Plan
- Keep current Render setup active
- Can switch back instantly if needed
- No data loss during migration

## Recent Updates (July 17, 2025)

### Admin Page Fix
- Fixed `/admin` route 404 errors with proper rewrite configuration
- Added `api/admin/leads.js` serverless function for admin dashboard
- Implemented client-side routing support for SPA
- Enhanced form separation with independent confirmation states
- Removed password display from admin login for security

### Vercel Configuration Updates
```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "functions": {
    "api/omnostock-leads.js": {
      "maxDuration": 10
    },
    "api/admin/leads.js": {
      "maxDuration": 10
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Benefits
- No sleep timeouts
- Professional performance
- Instant loading
- Global CDN
- Free tier generous enough for sales page

Your current form and database work exactly the same - just faster and more professional!