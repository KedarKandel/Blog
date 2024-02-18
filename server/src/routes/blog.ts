import express, { Request, Response, Router } from "express";

import Blog from "../models/blog";
import verifyToken from "../middleware/auth";

const router: Router = express.Router();

// Create a new blog
router.post('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const newBlog = new Blog({ title, description });
        await newBlog.save();
        return res.status(201).json(newBlog);
    } catch (error) {
        console.error(error);
       return res.status(500).json({ message: 'Internal server error' });
    }
});

// Read all blogs
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    return res.json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Read a single blog by ID
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update a blog by ID
router.put("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.json(updatedBlog);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a blog by ID
router.delete(
  "/blogs/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      return res.json(deletedBlog);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
