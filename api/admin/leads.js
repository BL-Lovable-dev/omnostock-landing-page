import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    // Fetch all leads from database
    const leads = await sql`
      SELECT id, name, email, company, website, phone, created_at 
      FROM omnostock_leads 
      ORDER BY created_at DESC
    `;

    // Transform the data to match the expected format
    const formattedLeads = leads.map(lead => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      website: lead.website,
      phone: lead.phone,
      created_at: lead.created_at
    }));

    res.status(200).json({
      success: true,
      leads: formattedLeads,
      total: formattedLeads.length
    });

  } catch (error) {
    console.error('Admin leads fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leads'
    });
  }
}