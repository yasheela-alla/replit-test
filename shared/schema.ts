import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().$type<'manager' | 'creative_team' | 'digital_marketer'>(),
  name: text("name").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  role: true,
  name: true,
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// Task Management Schema
export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  requirement: text("requirement").notNull(),
  contentType: text("content_type").notNull().$type<'image' | 'video' | 'carousel' | 'text'>(),
  platform: text("platform").$type<'instagram' | 'facebook' | 'youtube' | 'twitter' | 'linkedin' | 'tiktok'>(),
  campaign: text("campaign"),
  dueDate: text("due_date"),
  priority: text("priority").notNull().$type<'low' | 'medium' | 'high' | 'urgent'>().default('medium'),
  status: text("status").notNull().$type<'draft' | 'in_review' | 'approved' | 'rejected' | 'completed'>().default('draft'),
  assigneeId: text("assignee_id").references(() => users.id),
  createdById: text("created_by_id").notNull().references(() => users.id),
  branchSpecific: text("branch_specific"),
  format: text("format"),
  eventBased: text("event_based"),
  reference: text("reference"),
  thumbnailUrl: text("thumbnail_url"),
  tags: text("tags").array(),
  createdAt: text("created_at").default(sql`now()`),
  updatedAt: text("updated_at").default(sql`now()`),
});

export const taskComments = pgTable("task_comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  taskId: text("task_id").notNull().references(() => tasks.id),
  userId: text("user_id").notNull().references(() => users.id),
  comment: text("comment").notNull(),
  createdAt: text("created_at").default(sql`now()`),
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  title: true,
  requirement: true,
  contentType: true,
  platform: true,
  campaign: true,
  dueDate: true,
  priority: true,
  assigneeId: true,
  branchSpecific: true,
  format: true,
  eventBased: true,
  reference: true,
  tags: true,
});

export const insertTaskCommentSchema = createInsertSchema(taskComments).pick({
  taskId: true,
  comment: true,
});

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;
export type TaskComment = typeof taskComments.$inferSelect;
export type InsertTaskComment = z.infer<typeof insertTaskCommentSchema>;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Campaign Schema for social media management
export const campaigns = pgTable("campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  platform: text("platform").notNull().$type<'instagram' | 'facebook' | 'youtube' | 'twitter' | 'linkedin' | 'tiktok'>(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  budget: text("budget"),
  spent: text("spent"),
  status: text("status").notNull().$type<'active' | 'scheduled' | 'completed' | 'paused'>().default('active'),
  reach: text("reach"),
  impressions: text("impressions"),
  engagement: text("engagement"),
  conversions: text("conversions"),
  createdById: text("created_by_id").notNull().references(() => users.id),
  createdAt: text("created_at").default(sql`now()`),
  updatedAt: text("updated_at").default(sql`now()`),
});

export const insertCampaignSchema = createInsertSchema(campaigns).pick({
  name: true,
  platform: true,
  startDate: true,
  endDate: true,
  budget: true,
  spent: true,
  status: true,
  reach: true,
  impressions: true,
  engagement: true,
  conversions: true,
});

export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;
