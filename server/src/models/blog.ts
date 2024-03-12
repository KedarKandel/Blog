import mongoose, { Schema, Document } from "mongoose";
import { BlogType, CommentType } from "../sharedTypes";
import { v4 as uuidv4 } from 'uuid';

interface ExtendedComment extends Document, Omit<CommentType, "_id"> {}

const commentSchema: Schema<ExtendedComment> = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  userId: { type: String },
  userName:{type: String},
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: String }],
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    comments: [commentSchema],
    likes: [String],
    genre: { type: String, required: true },
    createdBy: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model<BlogType>("Blog", blogSchema);
export default Blog;
