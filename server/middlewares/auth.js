const jwt = require("jsonwebtoken");
require("dotenv").config();

// ✅ Authentication middleware
const authuser = (req, res, next) => {
  console.log("🔐 Auth middleware triggered");

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified; // add user info to req
    next();
  } catch (error) {
    console.error("JWT verify error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Export correctly
module.exports = authuser;
