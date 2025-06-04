import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"OmnoStock Team" <${process.env.GMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  async sendWelcomeEmail(email: string): Promise<boolean> {
    const welcomeHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to OmnoStock</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
          }
          .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #6366f1;
            margin-bottom: 10px;
          }
          .welcome-text {
            font-size: 18px;
            color: #1e293b;
            margin-bottom: 20px;
          }
          .content {
            font-size: 16px;
            margin-bottom: 25px;
          }
          .features {
            background: #f1f5f9;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
          }
          .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }
          .feature-icon {
            color: #059669;
            margin-right: 10px;
            font-weight: bold;
          }
          .cta {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            display: inline-block;
            font-weight: 600;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🚀 OmnoStock</div>
            <h1 class="welcome-text">Welcome to the Future of Inventory!</h1>
          </div>

          <div class="content">
            <p>Hi there! 👋</p>

            <p>Thank you for joining the OmnoStock waitlist! We're thrilled to have you on board as we prepare to revolutionize inventory management for businesses everywhere.</p>

            <div class="features">
              <h3 style="margin-top: 0; color: #1e293b;">What to expect from OmnoStock:</h3>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span>Real-time inventory tracking across all locations</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span>Smart analytics and forecasting</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span>Seamless integrations with your existing tools</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span>
                <span>Mobile-first design for on-the-go management</span>
              </div>
            </div>

            <p><strong>What happens next?</strong></p>
            <ul>
              <li>You'll be among the first to know when we launch</li>
              <li>Early access to beta features and exclusive demos</li>
              <li>Special launch pricing just for waitlist members</li>
              <li>Direct input on features that matter most to your business</li>
            </ul>

            <p>We're working hard to bring you something amazing. Keep an eye on your inbox for updates, sneak peeks, and your exclusive early access invite!</p>
          </div>

          <div class="footer">
            <p>Questions? Just reply to this email - we'd love to hear from you!</p>
            <p style="margin-top: 15px;">
              Best regards,<br>
              <strong>The OmnoStock Team</strong>
            </p>
            <p style="margin-top: 20px; font-size: 12px;">
              You're receiving this because you signed up for the OmnoStock waitlist.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const welcomeText = `
Welcome to OmnoStock!

Thank you for joining our waitlist! We're excited to have you on board as we prepare to revolutionize inventory management.

What to expect:
• Real-time inventory tracking
• Smart analytics and forecasting  
• Seamless integrations
• Mobile-first design

You'll be the first to know when we launch, with early access and special pricing!

Questions? Just reply to this email.

Best regards,
The OmnoStock Team
    `;

    return this.sendEmail({
      to: email,
      subject: '🚀 Welcome to OmnoStock - You\'re on the list!',
      html: welcomeHTML,
      text: welcomeText,
    });
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}