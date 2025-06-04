# Deploy to Namecheap Shared Hosting

## Option 1: Static Frontend + External Backend (Recommended)

Since Namecheap shared hosting doesn't support Node.js, deploy the frontend to Namecheap and backend elsewhere:

### Frontend (Namecheap)
1. Build the frontend: `npm run build`
2. Upload `dist/` folder contents to your `public_html` directory
3. Configure API endpoints to point to your backend service

### Backend Options
- **Render**: Free tier for backend API and database
- **Railway**: Alternative hosting platform
- **Vercel**: For serverless functions

## Option 2: PHP Backend Alternative

Convert the waitlist to PHP for shared hosting compatibility:

### Required Files for Namecheap:
- `index.html` (frontend)
- `subscribe.php` (handles form submission)
- Database: MySQL (included with shared hosting)

### Sample PHP Implementation:

**subscribe.php**
```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$email = filter_var($input['email'], FILTER_VALIDATE_EMAIL);

if (!$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

// Database connection (use your Namecheap MySQL credentials)
$host = 'localhost';
$dbname = 'your_database_name';
$username = 'your_username';
$password = 'your_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    // Check if email exists
    $stmt = $pdo->prepare("SELECT id FROM waitlist WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->fetch()) {
        echo json_encode(['message' => 'Already subscribed']);
        exit;
    }
    
    // Insert new subscriber
    $stmt = $pdo->prepare("INSERT INTO waitlist (email, created_at) VALUES (?, NOW())");
    $stmt->execute([$email]);
    
    // Send welcome email
    $subject = "Welcome to OmnoStock Waitlist";
    $message = "Thank you for joining our waitlist!";
    $headers = "From: noreply@yourdomain.com";
    
    mail($email, $subject, $message, $headers);
    
    echo json_encode(['success' => true, 'message' => 'Successfully joined waitlist']);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
?>
```

## Option 3: Hybrid Approach (Best for your case)

Keep your Node.js app on Render (free) and use Namecheap for:
- Custom domain pointing to Render app
- Static assets/CDN
- Additional PHP scripts if needed

### Steps:
1. Deploy Node.js app to Render
2. Point your Namecheap domain to Render
3. Configure DNS in Namecheap cPanel

## Recommended Solution

Given your current setup with database, email service, and autoresponder:

**Deploy to Render (free) + Use Namecheap domain**
- Your Node.js app works perfectly as-is
- No code changes needed
- Professional email autoresponder keeps working
- Point your domain from Namecheap to Render

Would you like me to help you with any of these deployment options?