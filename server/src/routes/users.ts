import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import verifyToken from "../middleware/auth";
import Blog from "../models/blog";

const router = express.Router();

// get current user

router.get("/currentUser", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

// edit user information
router.post("/editProfile", [
  check("firstName", "First Name is required").isString(),
  check("lastName", "Last Name is required").isString(),
  check("email", "Email is required").isEmail(),
  check(
    "currentPassword",
    "Password with 6 or more characters required"
  ).isLength({
    min: 6,
  }),
  check("newPassword", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
  verifyToken,
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, currentPassword, newPassword } =
      req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatchPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isMatchPassword) {
        return res.status(400).json({ message: "Invalid current password" });
      }

      user.firstName = firstName;
      user.lastName = lastName;

      // If a new password is provided, update the password
      if (newPassword) {
        user.password = newPassword;
      }

      await user.save();

      // Update createdBy field in each blog created by the user
      await Blog.updateMany(
        { userId: user._id },
        { $set: { createdBy: `${firstName} ${lastName}` } }
      );

      // Update userName field in each comment created by the user
      await Blog.updateMany(
        { "comments.userId": user._id },
        { $set: { "comments.$.userName": `${firstName} ${lastName}` } }
      );
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
]);

// register an user
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).json({ message: "user registration successful" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
