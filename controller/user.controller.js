import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import { generateJwtToken, verifyToken } from "../service/jwt.js";

const userController = {
  UserHand: async (req, res) => {
    try {
      const { username, password, confirmpassword } = req.body;

      if (!username || !password || !confirmpassword) {
        return res
          .status(400)
          .json({
            error: "Username, password, and confirmation password are required",
          });
      }
      if (password !== confirmpassword) {
        return res.status(403).json({ error: "Passwords do not match" });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({
        username,
        password: hashedPassword,
      })
      await newUser.save();

      // Generate JWT token
      const token = generateJwtToken(newUser);
      res.cookie("jwt", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      // Send success response
      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password are required" });
      }

  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Generate JWT token
      const token = generateJwtToken(user);
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000, 
      });

      // Send success response
      return res.status(200).json({
        message: "Login successful",
        token: token,
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default userController;
