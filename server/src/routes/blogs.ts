import express, { Request, Response } from "express";
import Blog from "../models/blog";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { page, searchQuery, filter } = req.query;
    const perPage = 8;
    let query: any = {};

    //search logic
    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { genre: { $regex: searchQuery, $options: "i" } },
        { createdBy: { $regex: searchQuery, $options: "i" } },
      ];
    }

    // filter logic
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
    const blogs = await Blog.find(query)
      .sort(sort)
      .skip((Number(page) - 1) * perPage)
      .limit(perPage);

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
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:blogId/like", verifyToken, async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const userId = req.userId;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Initialize the likes array if it's not already initialized
    if (!blog.likes) {
      blog.likes = [];
    }

    // Check if the user has already liked the blog
    if (blog.likes.includes(userId)) {
      return res.status(400).json({ message: "Blog already liked by user" });
    }

    // Add the user ID to the likes array
    blog.likes.push(userId);
    
    // Save the updated blog
    await blog.save();
console.log("updt", blog)
    return res.status(200).json({ blogId, userId, isLiked: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});


export default router;
