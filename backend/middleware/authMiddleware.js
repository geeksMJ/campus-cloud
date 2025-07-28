import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({ error: "Token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "default_secret", (err, user) => {
    if (err) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
