import { neon } from '@neondatabase/serverless';
import { z } from 'zod';

// Use Neon serverless for consistency
const sql = neon(process.env.DATABASE_URL);

// Schema for validation
const insertOmnistockLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  website: z.string().optional().or(z.literal("")),
  phone: z.string().min(1, "Phone number is required"),
  storeTypes: z.array(z.string()).default([]),
  source: z.string().nullable().optional(),
  utmSource: z.string().nullable().optional(),
  utmMedium: z.string().nullable().optional(),
  utmCampaign: z.string().nullable().optional(),
});

export default async function handler(req, res) {
  try {
    // Enable CORS and ensure JSON response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ 
        success: false, 
        message: 'Database configuration missing. Please add DATABASE_URL environment variable.' 
      });
    }

    try {
      // Log raw request body first
      console.log('Raw request body:', JSON.stringify(req.body, null, 2));
      
      // Validate request body
      const validatedData = insertOmnistockLeadSchema.parse(req.body);
      console.log('Validated data:', JSON.stringify(validatedData, null, 2));
      
      // Insert lead into database using Neon serverless
      // Use simple text storage for store types  
      const storeTypesArray = validatedData.storeTypes || [];
      const storeTypesText = storeTypesArray.length > 0 ? storeTypesArray.join(', ') : null;
      console.log('Store types array:', storeTypesArray);
      console.log('Store types text:', storeTypesText);
      
      const result = await sql`
        INSERT INTO omnostock_leads (name, email, company, website, phone, store_types, source, utm_source, utm_medium, utm_campaign, created_at)
        VALUES (${validatedData.name}, ${validatedData.email}, ${validatedData.company}, 
                ${validatedData.website || null}, ${validatedData.phone}, ${storeTypesText}, 
                ${validatedData.source || null}, ${validatedData.utmSource || null}, 
                ${validatedData.utmMedium || null}, ${validatedData.utmCampaign || null}, NOW())
        RETURNING id, name, email, company, store_types, source, utm_source, utm_medium, utm_campaign, created_at
      `;
      console.log('Database result:', result);

      const lead = result[0];

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
    }
  
  } catch (unexpectedError) {
    console.error('Unexpected API error:', unexpectedError);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again."
    });
  }
}