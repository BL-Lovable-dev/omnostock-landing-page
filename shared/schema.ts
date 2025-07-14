import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const waitlistSubscribers = pgTable("waitlist_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  mailchimpId: text("mailchimp_id"),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const omnistockLeads = pgTable("omnostock_leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  company: text("company").notNull(),
  website: text("website"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWaitlistSubscriberSchema = createInsertSchema(waitlistSubscribers).pick({
  email: true,
  mailchimpId: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
}).omit({
  mailchimpId: true,
});

export const insertOmnistockLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  website: z.string().optional().or(z.literal("")),
  phone: z.string().min(1, "Phone number is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWaitlistSubscriber = z.infer<typeof insertWaitlistSubscriberSchema>;
export type WaitlistSubscriber = typeof waitlistSubscribers.$inferSelect;
export type InsertOmnistockLead = z.infer<typeof insertOmnistockLeadSchema>;
export type OmnistockLead = typeof omnistockLeads.$inferSelect;
