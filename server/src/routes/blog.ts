import express, { Request, Response, Router } from "express";

import Blog from "../models/blog";
import verifyToken from "../middleware/auth";

const router = express.Router();

// Create a new blog
router.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const { title, description, genre, createdBy } = req.body;
    const newBlog = new Blog({ title, description, genre, createdBy });
    await newBlog.save();
    return res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  const { search, filter, page, limit } = req.query;
  const searchTerm: string = search as string;
  const filterOptions: string = filter as string;
  const pageNumber: number = parseInt(page as string) || 1;
  const pageSize: number = parseInt(limit as string) || 10;
  const query: any = {};
  try {
    if (searchTerm) query.searchTerm = searchTerm;
    if (filterOptions) query.filterOptions = filterOptions;

    const skip = (pageNumber - 1) * pageSize;
    const totalBlogs = await Blog.countDocuments(query);
    const totalPages = Math.ceil(totalBlogs / pageSize);
    const blogs = await Blog.find(query).skip(skip).limit(pageSize);

    res.json({ blogs, currentPage: pageNumber, totalPages, total: totalBlogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
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
