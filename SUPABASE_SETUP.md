# Supabase Setup Guide for Waitlist App

## 1. Database Table Creation

In your Supabase dashboard, go to SQL Editor and run this query:

```sql
-- Create waitlist_subscribers table
CREATE TABLE IF NOT EXISTS waitlist_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- Enable Row Level Security
ALTER TABLE waitlist_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for waitlist signup)
CREATE POLICY "Allow anonymous insert" ON waitlist_subscribers
    FOR INSERT TO anon
    WITH CHECK (true);

-- Create policy to allow authenticated reads (for admin)
CREATE POLICY "Allow authenticated read" ON waitlist_subscribers
    FOR SELECT TO authenticated
    USING (true);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS waitlist_subscribers_email_idx ON waitlist_subscribers(email);
CREATE INDEX IF NOT EXISTS waitlist_subscribers_active_idx ON waitlist_subscribers(is_active);
```

## 2. Edge Function for Email Sending

Create a new Edge Function in your Supabase dashboard:

1. Go to Edge Functions
2. Create new function named: `send-welcome-email`
3. Use this code:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()

    // Here you would integrate with your email service
    // For now, we'll just log and return success
    console.log(`Sending welcome email to: ${email}`)

    // You can integrate with services like:
    // - Resend
    // - SendGrid
    // - Postmark
    // - Or any email API

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
```

## 3. Environment Variables Setup

Make sure these are set in your Replit secrets:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

## 4. Netlify Deployment

Your React app is now ready for Netlify deployment:

1. Push your code to GitHub
2. Connect GitHub repo to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify dashboard

The app will work without the Edge Function - it will just skip email sending gracefully.