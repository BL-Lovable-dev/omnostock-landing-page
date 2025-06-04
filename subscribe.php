<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$email = isset($input['email']) ? trim($input['email']) : '';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address']);
    exit;
}

// Database configuration - Update these with your Namecheap MySQL details
$host = 'localhost';
$dbname = 'your_database_name';  // Change this
$username = 'your_username';     // Change this
$password = 'your_password';     // Change this

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create table if it doesn't exist
    $createTable = "
        CREATE TABLE IF NOT EXISTS waitlist_subscribers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active BOOLEAN DEFAULT TRUE
        )
    ";
    $pdo->exec($createTable);
    
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id, is_active FROM waitlist_subscribers WHERE email = ?");
    $stmt->execute([$email]);
    $existing = $stmt->fetch();
    
    if ($existing) {
        if ($existing['is_active']) {
            echo json_encode(['success' => false, 'message' => "You're already on our waitlist!"]);
            exit;
        } else {
            // Reactivate existing subscriber
            $stmt = $pdo->prepare("UPDATE waitlist_subscribers SET is_active = TRUE, subscribed_at = NOW() WHERE email = ?");
            $stmt->execute([$email]);
        }
    } else {
        // Insert new subscriber
        $stmt = $pdo->prepare("INSERT INTO waitlist_subscribers (email) VALUES (?)");
        $stmt->execute([$email]);
    }
    
    // Send welcome email
    $to = $email;
    $subject = "Welcome to OmnoStock Waitlist!";
    $message = "
        <html>
        <head>
            <title>Welcome to OmnoStock</title>
        </head>
        <body>
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
                <h2 style='color: #667eea;'>Welcome to OmnoStock!</h2>
                <p>Thank you for joining our waitlist. You'll be among the first to know when we launch.</p>
                <p>We're building something amazing and can't wait to share it with you.</p>
                <p>Best regards,<br>The OmnoStock Team</p>
            </div>
        </body>
        </html>
    ";
    
    $headers = array(
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: OmnoStock Team <noreply@' . $_SERVER['HTTP_HOST'] . '>',
        'Reply-To: noreply@' . $_SERVER['HTTP_HOST'],
        'X-Mailer: PHP/' . phpversion()
    );
    
    // Send email (will use server's mail function)
    $emailSent = mail($to, $subject, $message, implode("\r\n", $headers));
    
    $response = [
        'success' => true,
        'message' => 'Successfully joined the waitlist! Check your email for confirmation.',
        'email_sent' => $emailSent
    ];
    
    echo json_encode($response);
    
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed. Please try again later.']);
} catch (Exception $e) {
    error_log("General error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred. Please try again later.']);
}
?>