# Vercel Deployment Guide

## What I've Created

### 1. Serverless API Function
- `api/omnostock-leads.js` - Converts your Express route to Vercel serverless function
- Handles form submissions with proper validation
- Includes connection pooling for PostgreSQL
- CORS enabled for frontend communication

### 2. Vercel Configuration
- `vercel.json` - Routes API calls and serves React frontend
- `package-vercel.json` - Dependencies for Vercel deployment
- Frontend builds automatically from client folder

### 3. Database Setup
- Uses same PostgreSQL database as current setup
- Connection pooling optimized for serverless
- Handles duplicate email errors gracefully

## Deployment Steps

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Set Up Database
You can use:
- **Vercel Postgres** (recommended) - Built-in integration
- **Neon.tech** - Serverless PostgreSQL (free tier)
- **Current database** - Just add connection string

### Step 4: Configure Environment Variables
In Vercel dashboard or CLI:
```bash
vercel env add DATABASE_URL
# Enter your PostgreSQL connection string
```

### Step 5: Deploy
```bash
# From project root
vercel --prod
```

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
- Frontend: Deployed as static React app
- API: Available at `/api/omnostock-leads`
- Database: Same PostgreSQL setup
- Form: Works exactly like current version

## Rollback Plan
- Keep current Render setup active
- Can switch back instantly if needed
- No data loss during migration

## Benefits
- No sleep timeouts
- Professional performance
- Instant loading
- Global CDN
- Free tier generous enough for sales page

Your current form and database work exactly the same - just faster and more professional!