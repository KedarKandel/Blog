import mongoose from "mongoose";
import { BlogType } from "../sharedTypes";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    comments: [
      {
        userId: { type: String },
        content: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    likes: [String],
    genre: { type: String, required: true },
    createdBy: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model<BlogType>("Blog", blogSchema);
export default Blog;
