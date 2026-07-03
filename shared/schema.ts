import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  privacyAccepted: boolean("privacy_accepted").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

// Projects table (title/description/category = TR; *En alanları = EN, opsiyonel)
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleEn: text("title_en"),
  description: text("description").notNull(),
  descriptionEn: text("description_en"),
  link: text("link"),
  image: text("image"),
  category: varchar("category", { length: 100 }).notNull(),
  categoryEn: varchar("category_en", { length: 100 }),
  orderIndex: integer("order_index").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Videos table
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  videoUrl: text("video_url").notNull(),
  thumbnail: text("thumbnail"),
  orderIndex: integer("order_index").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// AI Models table
export const aiModels = pgTable("ai_models", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  features: jsonb("features").notNull().default([]),
  icon: varchar("icon", { length: 100 }),
  orderIndex: integer("order_index").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Create schemas
export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAiModelSchema = createInsertSchema(aiModels).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Video = typeof videos.$inferSelect;
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type AiModel = typeof aiModels.$inferSelect;
export type InsertAiModel = z.infer<typeof insertAiModelSchema>;

// WhatsApp Settings Table
export const whatsappSettings = pgTable("whatsapp_settings", {
  id: serial("id").primaryKey(),
  phoneNumber: text("phone_number").notNull(),
  welcomeMessage: text("welcome_message"),
  enabled: boolean("enabled").default(true),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertWhatsAppSettingsSchema = createInsertSchema(whatsappSettings).omit({ id: true, updatedAt: true });
export type InsertWhatsAppSettings = z.infer<typeof insertWhatsAppSettingsSchema>;
export type WhatsAppSettings = typeof whatsappSettings.$inferSelect;

// Blog Posts table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  titleTr: text("title_tr").notNull(),
  titleEn: text("title_en").notNull(),
  contentTr: text("content_tr").notNull(),
  contentEn: text("content_en").notNull(),
  excerptTr: text("excerpt_tr"),
  excerptEn: text("excerpt_en"),
  slug: text("slug").notNull().unique(),
  coverImage: text("cover_image"),
  category: varchar("category", { length: 100 }),
  tags: jsonb("tags").default([]),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  orderIndex: integer("order_index").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
