import { z } from 'zod';

// Schema for validation
const insertOmnistockLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  website: z.string().optional().or(z.literal("")),
  phone: z.string().min(1, "Phone number is required"),
});

export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = insertOmnistockLeadSchema.parse(body);
    
    // Database connection (you'll need to set up D1 or external DB)
    // For now, this is a placeholder - you'll need to configure your database
    
    // Example with D1 (Cloudflare's SQL database):
    /*
    const result = await env.DB.prepare(`
      INSERT INTO omnostock_leads (name, email, company, website, phone, created_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      validatedData.name,
      validatedData.email,
      validatedData.company,
      validatedData.website || null,
      validatedData.phone
    ).run();
    
    const lead = await env.DB.prepare(`
      SELECT * FROM omnostock_leads WHERE id = ?
    `).bind(result.meta.last_row_id).first();
    */
    
    // For external PostgreSQL (like Neon):
    // You would use fetch to call your database API
    
    // Temporary response for migration
    const lead = {
      id: Date.now(),
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      createdAt: new Date().toISOString()
    };

    return new Response(JSON.stringify({
      success: true,
      message: "Lead submitted successfully!",
      lead: lead
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error('Omnostock lead submission error:', error);

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({
        success: false,
        message: "Invalid form data",
        errors: error.errors
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    return new Response(JSON.stringify({
      success: false,
      message: "Something went wrong. Please try again."
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Handle CORS preflight requests
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}