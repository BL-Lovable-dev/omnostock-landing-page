
import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Using Gmail SMTP - you can replace with any email provider
    this.transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_APP_PASSWORD // Gmail App Password
      }
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"OmnoStock Team" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  async sendWelcomeEmail(email: string): Promise<boolean> {
    const welcomeEmailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to OmnoStock</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                background-color: #f8fafc;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
                padding: 40px 20px;
            }
            .logo {
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .content {
                padding: 40px 30px;
            }
            .welcome-message {
                font-size: 24px;
                font-weight: bold;
                color: #1e293b;
                margin-bottom: 20px;
                text-align: center;
            }
            .description {
                color: #64748b;
                font-size: 16px;
                margin-bottom: 30px;
                text-align: center;
            }
            .features {
                background-color: #f1f5f9;
                border-radius: 8px;
                padding: 30px;
                margin: 30px 0;
            }
            .feature-item {
                display: flex;
                align-items: center;
                margin-bottom: 15px;
                font-size: 14px;
                color: #475569;
            }
            .feature-icon {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                margin-right: 12px;
                font-weight: bold;
            }
            .timeline {
                background-color: #f8fafc;
                border-left: 4px solid #667eea;
                padding: 20px;
                margin: 30px 0;
            }
            .timeline-title {
                font-weight: bold;
                color: #1e293b;
                margin-bottom: 10px;
            }
            .cta-section {
                text-align: center;
                margin: 40px 0;
            }
            .cta-button {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                display: inline-block;
                margin: 10px;
            }
            .social-links {
                text-align: center;
                margin: 30px 0;
            }
            .social-link {
                color: #667eea;
                text-decoration: none;
                margin: 0 15px;
                font-size: 14px;
            }
            .footer {
                background-color: #1e293b;
                color: #94a3b8;
                text-align: center;
                padding: 30px;
                font-size: 14px;
            }
            .unsubscribe {
                color: #64748b;
                font-size: 12px;
                text-align: center;
                margin-top: 20px;
            }
            .unsubscribe a {
                color: #667eea;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">📦 OmnoStock</div>
                <p>Revolutionary Inventory Management</p>
            </div>
            
            <div class="content">
                <h1 class="welcome-message">Welcome to the Future! 🚀</h1>
                
                <p class="description">
                    Thank you for joining our exclusive waitlist! You're now part of a select group who will get early access to OmnoStock - the inventory management platform that's about to change everything.
                </p>
                
                <div class="features">
                    <h3 style="margin-top: 0; color: #1e293b;">What makes OmnoStock special?</h3>
                    
                    <div class="feature-item">
                        <span class="feature-icon">🎯</span>
                        <span><strong>Precision:</strong> 99.9% accurate inventory tracking with AI-powered predictions</span>
                    </div>
                    
                    <div class="feature-item">
                        <span class="feature-icon">⚡</span>
                        <span><strong>Speed:</strong> Real-time updates across all your locations instantly</span>
                    </div>
                    
                    <div class="feature-item">
                        <span class="feature-icon">🌍</span>
                        <span><strong>Global:</strong> Seamlessly manage inventory across multiple countries</span>
                    </div>
                    
                    <div class="feature-item">
                        <span class="feature-icon">🛡️</span>
                        <span><strong>Security:</strong> Enterprise-grade protection for your business data</span>
                    </div>
                </div>
                
                <div class="timeline">
                    <div class="timeline-title">🗓️ What happens next?</div>
                    <p style="margin: 0; color: #64748b;">
                        • <strong>Week 1-2:</strong> Exclusive behind-the-scenes updates<br>
                        • <strong>Week 3-4:</strong> Early access invitation (limited spots)<br>
                        • <strong>Launch Day:</strong> Special pricing for waitlist members
                    </p>
                </div>
                
                <div class="cta-section">
                    <p style="color: #64748b; margin-bottom: 20px;">Stay connected with us:</p>
                    <a href="https://omnostock.com" class="cta-button">Visit Our Website</a>
                </div>
                
                <div class="social-links">
                    <a href="#" class="social-link">LinkedIn</a>
                    <a href="#" class="social-link">Twitter</a>
                    <a href="#" class="social-link">Blog</a>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>OmnoStock</strong><br>
                Built by Blackroot Labs<br>
                Building the future of inventory management</p>
                
                <div class="unsubscribe">
                    Questions? Reply to this email - we read every message!<br>
                    <a href="#">Unsubscribe</a> | <a href="#">Update Preferences</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    const textVersion = `
    Welcome to OmnoStock!
    
    Thank you for joining our exclusive waitlist! You're now part of a select group who will get early access to OmnoStock - the revolutionary inventory management platform.
    
    What makes OmnoStock special?
    • Precision: 99.9% accurate inventory tracking with AI-powered predictions
    • Speed: Real-time updates across all your locations instantly  
    • Global: Seamlessly manage inventory across multiple countries
    • Security: Enterprise-grade protection for your business data
    
    What happens next?
    • Week 1-2: Exclusive behind-the-scenes updates
    • Week 3-4: Early access invitation (limited spots)
    • Launch Day: Special pricing for waitlist members
    
    Stay tuned for updates!
    
    Best regards,
    The OmnoStock Team
    Built by Blackroot Labs
    
    Questions? Reply to this email - we read every message!
    `;

    return this.sendEmail({
      to: email,
      subject: '🚀 Welcome to OmnoStock - You\'re on the list!',
      html: welcomeEmailHtml,
      text: textVersion
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
    this.transporter = nodemailer.createTransporter({
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
