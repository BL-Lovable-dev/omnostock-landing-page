import { Pool } from 'pg';
import { z } from 'zod';

// Database connection pool for serverless
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 1, // Limit connections for serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Schema for validation
const insertOmnistockLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  website: z.string().optional().or(z.literal("")),
  phone: z.string().min(1, "Phone number is required"),
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  let client;
  
  try {
    // Validate request body
    const validatedData = insertOmnistockLeadSchema.parse(req.body);
    
    // Get database client
    client = await pool.connect();
    
    // Insert lead into database
    const result = await client.query(
      `INSERT INTO omnostock_leads (name, email, company, website, phone, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id, name, email, company, created_at`,
      [
        validatedData.name,
        validatedData.email,
        validatedData.company,
        validatedData.website || null,
        validatedData.phone
      ]
    );

    const lead = result.rows[0];

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully!",
      lead: {
        id: lead.id,
        name: lead.name,
        email: lead.email,
        company: lead.company,
        createdAt: lead.created_at
      }
    });

  } catch (error) {
    console.error('Omnostock lead submission error:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid form data",
        errors: error.errors
      });
    }

    // Handle duplicate email error
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: "This email is already in our system. We'll be in touch soon."
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again."
    });
  } finally {
    if (client) {
      client.release();
    }
  }
}