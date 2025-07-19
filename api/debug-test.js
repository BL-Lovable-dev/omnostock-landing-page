import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const testData = req.body;
        console.log('Raw request body:', JSON.stringify(testData, null, 2));
        
        const storeTypes = testData.storeTypes || [];
        const storeTypesText = storeTypes.join(', ');
        
        console.log('Store types array:', storeTypes);
        console.log('Store types text:', storeTypesText);
        
        // Direct INSERT with hardcoded values to test
        const result = await sql`
            INSERT INTO omnostock_leads (name, email, company, website, phone, store_types, created_at)
            VALUES ('Debug Test', 'debug@test.com', 'Debug Co', 'debug.com', '+1234567890', 'Shopify, Instagram', NOW())
            RETURNING id, name, store_types
        `;
        
        console.log('Direct insert result:', result);
        
        return res.json({
            success: true,
            receivedData: testData,
            storeTypes: storeTypes,
            storeTypesText: storeTypesText,
            result: result[0]
        });
        
    } catch (error) {
        console.error('Debug test error:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message,
            stack: error.stack
        });
    }
}