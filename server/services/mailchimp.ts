import crypto from 'crypto';

interface MailchimpMember {
  email_address: string;
  status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
  merge_fields?: Record<string, any>;
  tags?: string[];
}

interface MailchimpResponse {
  id: string;
  email_address: string;
  status: string;
  timestamp_signup?: string;
}

export class MailchimpService {
  private apiKey: string;
  private serverPrefix: string;
  private audienceId: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.MAILCHIMP_API_KEY!;
    this.serverPrefix = 'us15'; // Server prefix provided
    this.audienceId = '1b86154260'; // Audience ID provided
    this.baseUrl = `https://${this.serverPrefix}.api.mailchimp.com/3.0`;

    if (!this.apiKey) {
      throw new Error('MAILCHIMP_API_KEY environment variable is required');
    }
  }

  private getSubscriberHash(email: string): string {
    return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  }

  async makeRequest(endpoint: string, method: string = 'GET', data?: any): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Basic ${Buffer.from(`anystring:${this.apiKey}`).toString('base64')}`,
      'Content-Type': 'application/json',
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Mailchimp API error: ${response.status} - ${errorData.detail || response.statusText}`);
    }

    return response.json();
  }

  async addSubscriber(email: string, tags: string[] = [], enableAutoresponder: boolean = true): Promise<MailchimpResponse> {
    const subscriberHash = this.getSubscriberHash(email);
    
    // Always use PUT to handle both new and existing members
    const memberData: MailchimpMember = {
      email_address: email,
      status: 'subscribed'
    };

    try {
      const response = await this.makeRequest(
        `/lists/${this.audienceId}/members/${subscriberHash}`,
        'PUT',
        memberData
      );
      return response;
    } catch (error: any) {
      throw new Error(`Mailchimp subscription failed: ${error.message}`);
    }
  }

  async getSubscriber(email: string): Promise<MailchimpResponse | null> {
    try {
      const subscriberHash = this.getSubscriberHash(email);
      const response = await this.makeRequest(
        `/lists/${this.audienceId}/members/${subscriberHash}`
      );
      return response;
    } catch (error: any) {
      if (error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  async unsubscribe(email: string): Promise<MailchimpResponse> {
    const subscriberHash = this.getSubscriberHash(email);
    const updateData = {
      status: 'unsubscribed'
    };

    return this.makeRequest(
      `/lists/${this.audienceId}/members/${subscriberHash}`,
      'PATCH',
      updateData
    );
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('/ping');
      return true;
    } catch (error) {
      return false;
    }
  }
}