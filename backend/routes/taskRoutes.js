const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { createTaskValidator } = require("../validators/taskValidator");

router.post("/", protect, createTaskValidator, createTask);

router.get("/", protect, getTasks);

router.get("/:id", protect, getTask);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

module.exports = router;
