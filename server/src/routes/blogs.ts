// Import required modules
import express, { Request, Response } from "express";
import Blog from "../models/blog";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { page, searchQuery, filter } = req.query;
    const perPage = 8;
    let query: any = {};

    // Search logic
    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { genre: { $regex: searchQuery, $options: "i" } },
        { createdBy: { $regex: searchQuery, $options: "i" } },
      ];
    }

    // Filter logic
    if (filter) {
      switch (filter) {
        case "latest":
          query.createdAt = { $lte: new Date() };
          break;
        case "oldest":
          query.createdAt = { $gte: new Date(0) };
          break;
        case "science":
        case "technology":
        case "history":
        case "love":
        case "nature":
        case "sports":
          query.genre = filter.toLowerCase();
          break;
        default:
          return res.status(400).json({ message: "Invalid filter" });
      }
    }

    const totalCount = await Blog.countDocuments(query);
    const totalPages = Math.ceil(totalCount / perPage);

    let sort: any = {};
    if (filter === "oldest") {
      // Sort by createdAt in ascending order (oldest first)
      sort = { createdAt: 1 };
    } else {
      // Sort by createdAt in descending order (latest first)
      sort = { createdAt: -1 };
    }

    // Retrieve blogs based on query, pagination, and sorting
    const blogs = await Blog.find(query)
      .sort(sort)
      .skip((Number(page) - 1) * perPage)
      .limit(perPage);

    // Send response with retrieved blogs, pagination details, and total count
    res.json({
      blogs,
      currentPage: page,
      total: totalCount,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// Read a single blog by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Like or unlike a blog
router.post(
  "/:blogId/like",
  verifyToken,
  async (req: Request, res: Response) => {
    const { blogId } = req.params;
    const userId = req.userId;
    try {
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      // Initialize the likes array if not present
      if (!blog.likes) {
        blog.likes = [];
      }

      // Toggle like status for the user
      const alreadyLikedIndex = blog.likes.indexOf(userId);
      if (alreadyLikedIndex !== -1) {
        // If user already liked the blog, remove their like
        blog.likes.splice(alreadyLikedIndex, 1);
      } else {
        // If user hasn't liked the blog, add their like
        blog.likes.push(userId);
      }

      // Save the updated blog document
      await blog.save();

      // Determine if the user has liked the blog after the operation
      const isLiked = blog.likes.includes(userId);

      // Send response with blog ID, user ID, and like status
      return res.status(200).json({ blogId, userId, isLiked });
    } catch (error) {
      console.error("Error toggling like for blog:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
);

export default router;
