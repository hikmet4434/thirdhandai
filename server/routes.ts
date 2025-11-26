import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertUserSchema, insertProjectSchema, insertVideoSchema, insertAiModelSchema, insertBlogPostSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage_multer = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../client/public/uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage_multer,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Extend session to include user data
declare module "express-session" {
  interface SessionData {
    user?: {
      id: number;
      username: string;
    };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, message: "Mesajınız başarıyla gönderildi!" });
    } catch (error) {
      res.status(400).json({ success: false, message: "Geçersiz veri gönderildi." });
    }
  });

  // Get contact messages (admin only)
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Mesajlar alınamadı." });
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (user && user.password === password) {
        req.session.user = {
          id: user.id,
          username: user.username,
        };
        res.json({ success: true, message: "Giriş başarılı!" });
      } else {
        res.status(401).json({ success: false, message: "Kullanıcı adı veya şifre hatalı!" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Sunucu hatası." });
    }
  });

  // Get current user
  app.get("/api/user", (req, res) => {
    if (req.session.user) {
      res.json(req.session.user);
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  // File upload endpoint
  app.post("/api/admin/upload", (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    next();
  }, upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      // Return the URL path to access the uploaded file
      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({ url: fileUrl, filename: req.file.filename });
    } catch (error) {
      res.status(500).json({ message: "File upload failed" });
    }
  });

  // Logout
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Logout failed" });
      } else {
        res.json({ message: "Logged out successfully" });
      }
    });
  });

  // Admin routes - get contact messages
  app.get("/api/admin/messages", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Public API routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  app.get("/api/ai-models", async (req, res) => {
    try {
      const models = await storage.getAiModels();
      res.json(models);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AI models" });
    }
  });

  // Admin API routes - Projects
  app.post("/api/admin/projects", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.put("/api/admin/projects/:id", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const id = parseInt(req.params.id);
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, validatedData);
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.delete("/api/admin/projects/:id", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProject(id);
      if (deleted) {
        res.json({ message: "Project deleted" });
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Admin API routes - Videos
  app.post("/api/admin/videos", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const validatedData = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(validatedData);
      res.json(video);
    } catch (error) {
      res.status(400).json({ message: "Invalid video data" });
    }
  });

  app.put("/api/admin/videos/:id", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const id = parseInt(req.params.id);
      const validatedData = insertVideoSchema.partial().parse(req.body);
      const video = await storage.updateVideo(id, validatedData);
      if (video) {
        res.json(video);
      } else {
        res.status(404).json({ message: "Video not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid video data" });
    }
  });

  app.delete("/api/admin/videos/:id", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteVideo(id);
      if (deleted) {
        res.json({ message: "Video deleted" });
      } else {
        res.status(404).json({ message: "Video not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete video" });
    }
  });

  // Admin API routes - AI Models
  app.post("/api/admin/ai-models", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const validatedData = insertAiModelSchema.parse(req.body);
      const model = await storage.createAiModel(validatedData);
      res.json(model);
    } catch (error) {
      res.status(400).json({ message: "Invalid AI model data" });
    }
  });

  app.put("/api/admin/ai-models/:id", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const id = parseInt(req.params.id);
      const validatedData = insertAiModelSchema.partial().parse(req.body);
      const model = await storage.updateAiModel(id, validatedData);
      if (model) {
        res.json(model);
      } else {
        res.status(404).json({ message: "AI model not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid AI model data" });
    }
  });

  app.delete("/api/admin/ai-models/:id", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteAiModel(id);
      if (deleted) {
        res.json({ message: "AI model deleted" });
      } else {
        res.status(404).json({ message: "AI model not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete AI model" });
    }
  });

  // WhatsApp Settings API
  app.get("/api/whatsapp-settings", async (req, res) => {
    try {
      const settings = await storage.getWhatsAppSettings();
      if (!settings) {
        return res.json({ phoneNumber: '', welcomeMessage: '', enabled: false });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch WhatsApp settings" });
    }
  });

  app.post("/api/admin/whatsapp-settings", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const { phoneNumber, welcomeMessage, enabled } = req.body;
      
      if (!phoneNumber) {
        return res.status(400).json({ error: "Phone number is required" });
      }
      
      const settings = await storage.updateWhatsAppSettings({
        phoneNumber,
        welcomeMessage,
        enabled
      });
      
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to update WhatsApp settings" });
    }
  });

  // Blog Posts API - Public routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const published = req.query.published === "true";
      const posts = await storage.getBlogPosts(published);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: "Blog post not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Blog Posts API - Admin routes
  app.get("/api/admin/blog-posts", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/admin/blog-posts", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  app.put("/api/admin/blog-posts/:id", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const id = parseInt(req.params.id);
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(id, validatedData);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: "Blog post not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  app.delete("/api/admin/blog-posts/:id", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteBlogPost(id);
      if (deleted) {
        res.json({ message: "Blog post deleted" });
      } else {
        res.status(404).json({ message: "Blog post not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
