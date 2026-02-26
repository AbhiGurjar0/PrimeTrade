const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// GET ALL TASKS
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// GET SINGLE TASK
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({
        message: "Task not found",
      });

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// UPDATE TASK
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// DELETE TASK
exports.deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};
