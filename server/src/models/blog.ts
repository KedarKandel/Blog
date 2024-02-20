import mongoose from "mongoose";

export type BlogType = {
  _id: string;
  title: string;
  description: string;
  comments?: CommentType[];
  likes?: number[];
  genre: string
};

export type CommentType = {
  _id: string;
  userId: string;
  content: string;
  createdAt: Date;
};

const blogSchema = new mongoose.Schema({
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
  genre: String
});

const Blog = mongoose.model<BlogType>("Blog", blogSchema)
export default Blog