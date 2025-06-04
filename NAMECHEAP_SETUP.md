# Deploy to Namecheap Shared Hosting - Complete Setup

## Files to Upload

Upload these files to your Namecheap `public_html` directory:

1. `waitlist-page.html` - Your main waitlist page
2. `subscribe.php` - Backend script that handles form submissions
3. Your favicon file

## Database Setup

1. **Create MySQL Database in cPanel:**
   - Login to your Namecheap cPanel
   - Go to "MySQL Databases"
   - Create new database: `your_account_waitlist`
   - Create database user with full permissions
   - Note down: database name, username, password

2. **Update subscribe.php:**
   ```php
   $host = 'localhost';
   $dbname = 'your_account_waitlist';  // Your actual database name
   $username = 'your_db_username';     // Your database username
   $password = 'your_db_password';     // Your database password
   ```

## Email Configuration

The PHP script uses your server's built-in mail function. For better email delivery:

1. **Setup SPF Record** (in Namecheap DNS):
   - Add TXT record: `v=spf1 include:namecheap.com ~all`

2. **Optional: Use SMTP** (modify subscribe.php):
   ```php
   // Replace mail() function with PHPMailer for Gmail SMTP
   // This requires uploading PHPMailer library
   ```

## Testing Your Setup

1. Visit: `yourdomain.com/waitlist-page.html`
2. Test email submission
3. Check if emails are being sent
4. Verify database entries in cPanel phpMyAdmin

## Database Table Structure

The script automatically creates this table:
```sql
CREATE TABLE waitlist_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

## Features Included

- Email validation and duplicate checking
- Automatic welcome email with HTML formatting
- Database storage with timestamp
- Error handling and user feedback
- Mobile-responsive design
- Professional styling with glass effect

## Admin Features (Optional)

Create `admin.php` to view subscribers:
```php
// Password-protected page to view subscriber list
// Export to CSV functionality
// Basic statistics
```

This solution gives you the same functionality as the Node.js version but runs perfectly on Namecheap shared hosting.