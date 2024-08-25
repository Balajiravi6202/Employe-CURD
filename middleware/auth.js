import { verifyToken } from "../service/jwt.js";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt || req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

export default authenticateToken;
