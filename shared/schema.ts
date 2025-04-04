import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Original users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// News/Announcements
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  publishDate: timestamp("publish_date").notNull(),
  featured: boolean("featured").default(false)
});

export const insertNewsSchema = createInsertSchema(news).omit({
  id: true
});

export type News = typeof news.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;

// Government Officials
export const officials = pgTable("officials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  socialMedia: text("social_media").notNull()
});

export const insertOfficialSchema = createInsertSchema(officials).omit({
  id: true
});

export type Official = typeof officials.$inferSelect;
export type InsertOfficial = z.infer<typeof insertOfficialSchema>;

// Government Departments
export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull()
});

export const insertDepartmentSchema = createInsertSchema(departments).omit({
  id: true
});

export type Department = typeof departments.$inferSelect;
export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;

// Public Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  link: text("link").notNull()
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true
});

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

// Documents
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  publishDate: timestamp("publish_date").notNull(),
  size: text("size").notNull(),
  fileUrl: text("file_url").notNull()
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;

// Document Categories
export const documentCategories = pgTable("document_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  documentsCount: integer("documents_count").default(0)
});

export const insertDocumentCategorySchema = createInsertSchema(documentCategories).omit({
  id: true
});

export type DocumentCategory = typeof documentCategories.$inferSelect;
export type InsertDocumentCategory = z.infer<typeof insertDocumentCategorySchema>;

// Contact form messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").notNull(),
  isRead: boolean("is_read").default(false)
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  submittedAt: true,
  isRead: true
});

export const contactMessageFormSchema = insertContactMessageSchema.extend({
  consent: z.boolean().refine(val => val === true, {
    message: "Anda harus menyetujui kebijakan privasi"
  })
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
