import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = { id: decoded.id };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
