import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

// routes
import usersRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myBlogRoutes from "./routes/my-blogs";
//import blogRoutes from "./routes/blogs";
import blogRoutes from "./routes/blogs";
import path from "path";

//database connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  express.static(path.join(__dirname, "../../client/dist"), { maxAge: "1d" })
);

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-blogs", myBlogRoutes);
app.use("/api/blogs", blogRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.listen(7000, () => {
  console.log("server is running on port 7000");
});
