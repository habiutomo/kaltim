import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertNewsSchema, 
  insertOfficialSchema, 
  insertDepartmentSchema, 
  insertServiceSchema, 
  insertDocumentSchema, 
  insertDocumentCategorySchema, 
  contactMessageFormSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API prefix
  const apiPrefix = "/api";
  
  // Error handler helper function
  const handleZodError = (error: unknown) => {
    if (error instanceof ZodError) {
      return fromZodError(error).message;
    }
    return String(error);
  };

  // News routes
  app.get(`${apiPrefix}/news`, async (_req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch news: ${err}` });
    }
  });
  
  app.get(`${apiPrefix}/news/featured`, async (_req, res) => {
    try {
      const featuredNews = await storage.getFeaturedNews();
      res.json(featuredNews);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch featured news: ${err}` });
    }
  });
  
  app.get(`${apiPrefix}/news/latest/:limit`, async (req, res) => {
    try {
      const limit = parseInt(req.params.limit) || 5;
      const news = await storage.getLatestNews(limit);
      res.json(news);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch latest news: ${err}` });
    }
  });
  
  app.get(`${apiPrefix}/news/category/:category`, async (req, res) => {
    try {
      const news = await storage.getNewsByCategory(req.params.category);
      res.json(news);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch news by category: ${err}` });
    }
  });
  
  app.get(`${apiPrefix}/news/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      
      const news = await storage.getNewsById(id);
      if (!news) {
        return res.status(404).json({ error: "News not found" });
      }
      
      res.json(news);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch news: ${err}` });
    }
  });
  
  app.post(`${apiPrefix}/news`, async (req, res) => {
    try {
      const newsData = insertNewsSchema.parse(req.body);
      const news = await storage.createNews(newsData);
      res.status(201).json(news);
    } catch (err) {
      res.status(400).json({ error: handleZodError(err) });
    }
  });
  
  app.put(`${apiPrefix}/news/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      
      const newsData = insertNewsSchema.parse(req.body);
      const news = await storage.updateNews(id, newsData);
      
      if (!news) {
        return res.status(404).json({ error: "News not found" });
      }
      
      res.json(news);
    } catch (err) {
      res.status(400).json({ error: handleZodError(err) });
    }
  });
  
  app.delete(`${apiPrefix}/news/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      
      const success = await storage.deleteNews(id);
      if (!success) {
        return res.status(404).json({ error: "News not found" });
      }
      
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: `Failed to delete news: ${err}` });
    }
  });
  
  // Officials routes
  app.get(`${apiPrefix}/officials`, async (_req, res) => {
    try {
      const officials = await storage.getAllOfficials();
      res.json(officials);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch officials: ${err}` });
    }
  });
  
  app.get(`${apiPrefix}/officials/leadership`, async (_req, res) => {
    try {
      const officials = await storage.getLeadershipOfficials();
      res.json(officials);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch leadership officials: ${err}` });
    }
  });
  
  app.get(`${apiPrefix}/officials/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      
      const official = await storage.getOfficialById(id);
      if (!official) {
        return res.status(404).json({ error: "Official not found" });
      }
      
      res.json(official);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch official: ${err}` });
    }
  });
  
  app.post(`${apiPrefix}/officials`, async (req, res) => {
    try {
      const officialData = insertOfficialSchema.parse(req.body);
      const official = await storage.createOfficial(officialData);
      res.status(201).json(official);
    } catch (err) {
      res.status(400).json({ error: handleZodError(err) });
    }
  });
  
  // Departments routes
  app.get(`${apiPrefix}/departments`, async (_req, res) => {
    try {
      const departments = await storage.getAllDepartments();
      res.json(departments);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch departments: ${err}` });
    }
  });
  
  app.get(`${apiPrefix}/departments/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      
      const department = await storage.getDepartmentById(id);
      if (!department) {
        return res.status(404).json({ error: "Department not found" });
      }
      
      res.json(department);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch department: ${err}` });
    }
  });
  
  app.post(`${apiPrefix}/departments`, async (req, res) => {
    try {
      const departmentData = insertDepartmentSchema.parse(req.body);
      const department = await storage.createDepartment(departmentData);
      res.status(201).json(department);
    } catch (err) {
      res.status(400).json({ error: handleZodError(err) });
    }
  });
  
  // Services routes
  app.get(`${apiPrefix}/services`, async (_req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch services: ${err}` });
    }
  });
  
  app.get(`${apiPrefix}/services/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      
      const service = await storage.getServiceById(id);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      
      res.json(service);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch service: ${err}` });
    }
  });
  
  app.post(`${apiPrefix}/services`, async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.status(201).json(service);
    } catch (err) {
      res.status(400).json({ error: handleZodError(err) });
    }
  });
  
  // Document categories routes
  app.get(`${apiPrefix}/document-categories`, async (_req, res) => {
    try {
      const categories = await storage.getAllDocumentCategories();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch document categories: ${err}` });
    }
  });
  
  app.get(`${apiPrefix}/document-categories/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      
      const category = await storage.getDocumentCategoryById(id);
      if (!category) {
        return res.status(404).json({ error: "Document category not found" });
      }
      
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch document category: ${err}` });
    }
  });
  
  app.post(`${apiPrefix}/document-categories`, async (req, res) => {
    try {
      const categoryData = insertDocumentCategorySchema.parse(req.body);
      const category = await storage.createDocumentCategory(categoryData);
      res.status(201).json(category);
    } catch (err) {
      res.status(400).json({ error: handleZodError(err) });
    }
  });
  
  // Documents routes
  app.get(`${apiPrefix}/documents`, async (_req, res) => {
    try {
      const documents = await storage.getAllDocuments();
      res.json(documents);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch documents: ${err}` });
    }
  });
  
  app.get(`${apiPrefix}/documents/latest/:limit`, async (req, res) => {
    try {
      const limit = parseInt(req.params.limit) || 5;
      const documents = await storage.getLatestDocuments(limit);
      res.json(documents);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch latest documents: ${err}` });
    }
  });
  
  app.get(`${apiPrefix}/documents/category/:category`, async (req, res) => {
    try {
      const documents = await storage.getDocumentsByCategory(req.params.category);
      res.json(documents);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch documents by category: ${err}` });
    }
  });
  
  app.get(`${apiPrefix}/documents/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      
      const document = await storage.getDocumentById(id);
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }
      
      res.json(document);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch document: ${err}` });
    }
  });
  
  app.post(`${apiPrefix}/documents`, async (req, res) => {
    try {
      const documentData = insertDocumentSchema.parse(req.body);
      const document = await storage.createDocument(documentData);
      res.status(201).json(document);
    } catch (err) {
      res.status(400).json({ error: handleZodError(err) });
    }
  });
  
  // Contact messages routes
  app.post(`${apiPrefix}/contact`, async (req, res) => {
    try {
      const { consent, ...messageData } = contactMessageFormSchema.parse(req.body);
      const submittedAt = new Date();
      const message = await storage.createContactMessage({ 
        ...messageData, 
        submittedAt
      });
      res.status(201).json(message);
    } catch (err) {
      res.status(400).json({ error: handleZodError(err) });
    }
  });
  
  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
