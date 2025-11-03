const Task = require("../models/taskModel");

// 🟢 Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }

    const newTask = await Task.create({
      user: req.user.id,
      title,
      description,
      status: status || "Pending",
      dueDate: dueDate || new Date(),
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟡 Get Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔵 Update Task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔴 Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
