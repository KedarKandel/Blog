import express, { Request, Response } from "express";
import Blog from "../models/blog";




const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
  try {
    // Pagination settings
    const perPage = 4; // Number of blogs per page
    const page = parseInt(req.query.page as string) || 1; 

    // Fetch blogs with pagination
    const totalCount = await Blog.countDocuments(); 
    const totalPages = Math.ceil(totalCount / perPage); 
    const blogs = await Blog.find()
      .sort("-lastUpdated")
      .skip((page - 1) * perPage) 
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






export default router;
