import { Pool } from 'pg';

// Database connection pool for serverless
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 1, // Limit connections for serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default async function handler(req, res) {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method !== 'GET') {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ 
        success: false, 
        message: 'Database configuration missing. Please add DATABASE_URL environment variable.' 
      });
    }

    let client;
  
    try {
      // Get database client
      client = await pool.connect();
      
      // Fetch all leads from database
      const result = await client.query(
        `SELECT id, name, email, company, website, phone, created_at
         FROM omnostock_leads
         ORDER BY created_at DESC`
      );

      const leads = result.rows;

      res.status(200).json({
        success: true,
        leads: leads,
        total: leads.length
      });

    } catch (error) {
      console.error('Admin leads fetch error:', error);

      res.status(500).json({
        success: false,
        message: "Failed to fetch leads. Please try again."
      });
    } finally {
      if (client) {
        client.release();
      }
    }
  
  } catch (unexpectedError) {
    console.error('Unexpected admin API error:', unexpectedError);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again."
    });
  }
}