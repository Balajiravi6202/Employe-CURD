// service/jwt.js
import jwt from "jsonwebtoken";

// Function to generate JWT token
const generateJwtToken = (user) => {
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

// Function to verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export { generateJwtToken, verifyToken };