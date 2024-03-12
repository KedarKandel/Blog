import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Blog from "../models/blog";
import User from "../models/user";
import { check, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
// Create a new blog
router.post(
  "/",
  verifyToken,
  [
    check("title", "Title is required").isLength({ min: 3 }),
    check(
      "description",
      "Description is required and length should be atleast 100 characters"
    ).isLength({ min: 100 }),
    check("genre", "Genre is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const userId = req.userId;
    try {
      const { title, description, genre } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { firstName, lastName } = user;
      const createdByFullName = `${firstName} ${lastName}`;

      const newBlog = new Blog({
        title,
        description,
        genre,
        createdBy: createdByFullName,
        userId,
      });
      await newBlog.save();
      return res.status(201).json(newBlog);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// get all blogs by user

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// Update a blog by ID
router.put(
  "/:id",
  verifyToken,
  [
    check("title", "Title is required").isLength({ min: 3 }),
    check(
      "description",
      "Description is required and length should be atleast 100 characters"
    ).isLength({ min: 100 }),
    check("genre", "Genre is required"),
  ],
  async (req: Request, res: Response) => {
    // check for erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

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
  }
);

// Delete a blog by ID
router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  const blogId = req.params.id;
  const userId = req.userId;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Check if the authenticated user created the blog
    if (blog.userId !== userId) {
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
});

// POST /api/blogs/:blogId/comment
router.post(
  "/:blogId/comment",
  [
    check("blogId", "BlogId is required").isLength({ min: 3 }),
    check(
      "content",
      "content is required and length should be atleast 1 characters"
    ).isLength({ min: 1 }),
    check("userId", "UserId is required"),
  ],
  verifyToken,

  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      const { blogId } = req.params;
      const userId = req.userId;
      const { content } = req.body;

      const blog = await Blog.findById(blogId);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { firstName, lastName } = user;
      const newComment = {
        _id: uuidv4(),
        userName: `${firstName}${lastName}`,
        userId,
        content,
        createdAt: new Date(),
      };

      blog?.comments?.unshift(newComment);
      await blog.save();
      // Sort the comments array in descending order based on createdAt
      blog?.comments?.sort((a: any, b: any) => b.createdAt - a.createdAt);
      res.status(201).json(blog);
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// DELETE /api/blogs/:blogId/comment/:commentId
router.delete(
  "/:blogId/comment/:commentId",
  verifyToken,
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const { blogId, commentId } = req.params;

    try {
      // Find the blog by ID
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      // Find the index of the comment to delete
      const commentIndex = blog?.comments?.findIndex(
        (comment) => comment._id === commentId
      );
      if (commentIndex === -1) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Check if the user owns the comment
      if (
        blog?.comments &&
        typeof commentIndex === "number" &&
        blog.comments[commentIndex]?.userId !== userId
      ) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this comment" });
      }

      // Remove the comment from the comments array
      if (typeof commentIndex === "number") {
        blog?.comments?.splice(commentIndex, 1);
      }
      // Save the updated blog
      await blog.save();
      res.status(200).json(blog);
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
