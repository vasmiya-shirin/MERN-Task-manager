const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use routes
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
