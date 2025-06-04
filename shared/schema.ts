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

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWaitlistSubscriberSchema = createInsertSchema(waitlistSubscribers).pick({
  email: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWaitlistSubscriber = z.infer<typeof insertWaitlistSubscriberSchema>;
export type WaitlistSubscriber = typeof waitlistSubscribers.$inferSelect;
