import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  likeBlog,
  commentBlog,
  getPendingBlogs,
  moderateBlog,
} from "../controllers/blogController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import upload from "../utils/upload.js";

const router = express.Router();

// --- 1. PUBLIC ROUTES ---
// Get only approved blogs for the main feed
router.get("/", getBlogs); 

// --- 2. ADMIN ROUTES (MUST come before /:id) ---
// If this is below /:id, Express treats "pending" as an ID
router.get("/pending", protect, isAdmin, getPendingBlogs);
router.put("/moderate/:id", protect, isAdmin, moderateBlog);

// --- 3. DYNAMIC ROUTES ---
// This matches anything after the slash, so keep it below specific paths
router.get("/:id", getBlogById);

// --- 4. PROTECTED USER ROUTES ---
router.post("/", protect, upload.single("image"), createBlog);
router.post("/:id/like", protect, likeBlog);
router.post("/:id/comment", protect, commentBlog);

export default router;