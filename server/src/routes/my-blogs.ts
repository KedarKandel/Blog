import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
const router = express.Router();
import Blog from "../models/blog";
import User from "../models/user";

// Create a new blog
router.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const { title, description, genre } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { firstName, lastName } = user;
    const createdByFullName = `${firstName} ${lastName}`;

    const newBlog = new Blog({ title, description, genre, createdBy: createdByFullName });
    await newBlog.save();
    return res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update a blog by ID
router.put("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const { title, description, genre } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, description, genre },
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
      const blogId = req.params.id;
      const userId = req.userId; // Assuming you have the user ID in the request object after authentication

      // Fetch the blog by ID
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      // Check if the authenticated user created the blog
      if (blog.createdBy !== userId) {
        return res
          .status(403)
          .json({ error: "Unauthorized: You cannot delete this blog" });
      }

      // If the user created the blog, proceed with deletion
      const deletedBlog = await Blog.findByIdAndDelete(blogId);
      return res.json(deletedBlog);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// get all blogs by user

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({ userId: req.userId });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

export default router;