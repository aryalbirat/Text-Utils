const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Get token from header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret_key");
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

module.exports = authenticateToken;