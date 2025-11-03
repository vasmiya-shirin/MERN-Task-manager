const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authuser = require("../middlewares/auth");

// ✅ All routes protected by authuser middleware
router.post("/tasks", authuser, taskController.createTask);
router.get("/tasks", authuser, taskController.getTasks);
router.put("/tasks/:id", authuser, taskController.updateTask);
router.delete("/tasks/:id", authuser, taskController.deleteTask);

// ✅ Optional test route
router.get("/tasks/test-auth", authuser, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

module.exports = router;
