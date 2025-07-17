import { users, waitlistSubscribers, omnistockLeads, type User, type InsertUser, type WaitlistSubscriber, type InsertWaitlistSubscriber, type OmnistockLead, type InsertOmnistockLead } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Waitlist methods
  createWaitlistSubscriber(subscriber: InsertWaitlistSubscriber & { mailchimpId?: string }): Promise<WaitlistSubscriber>;
  getWaitlistSubscriberByEmail(email: string): Promise<WaitlistSubscriber | undefined>;
  updateWaitlistSubscriber(email: string, updates: Partial<WaitlistSubscriber>): Promise<WaitlistSubscriber>;
  getAllWaitlistSubscribers(): Promise<WaitlistSubscriber[]>;

  // Omnostock leads methods
  createOmnistockLead(lead: InsertOmnistockLead): Promise<OmnistockLead>;
  getAllOmnistockLeads(): Promise<OmnistockLead[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createWaitlistSubscriber(subscriber: InsertWaitlistSubscriber & { mailchimpId?: string }): Promise<WaitlistSubscriber> {
    const [waitlistSubscriber] = await db
      .insert(waitlistSubscribers)
      .values(subscriber)
      .returning();
    return waitlistSubscriber;
  }

  async getWaitlistSubscriberByEmail(email: string): Promise<WaitlistSubscriber | undefined> {
    const [subscriber] = await db
      .select()
      .from(waitlistSubscribers)
      .where(eq(waitlistSubscribers.email, email));
    return subscriber || undefined;
  }

  async updateWaitlistSubscriber(email: string, updates: Partial<WaitlistSubscriber>): Promise<WaitlistSubscriber> {
    const [subscriber] = await db
      .update(waitlistSubscribers)
      .set(updates)
      .where(eq(waitlistSubscribers.email, email))
      .returning();
    return subscriber;
  }

  async getAllWaitlistSubscribers(): Promise<WaitlistSubscriber[]> {
    return db.select().from(waitlistSubscribers).where(eq(waitlistSubscribers.isActive, true));
  }

  async createOmnistockLead(lead: InsertOmnistockLead): Promise<OmnistockLead> {
    const [omnistockLead] = await db
      .insert(omnistockLeads)
      .values(lead)
      .returning();
    return omnistockLead;
  }

  async getAllOmnistockLeads(): Promise<OmnistockLead[]> {
    return db.select().from(omnistockLeads).orderBy(desc(omnistockLeads.createdAt));
  }
}

export const storage = new DatabaseStorage();
