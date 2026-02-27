const {
  createTaskService,
  getTasksService,
  getTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/taskService");

// CREATE TASK
exports.createTask = async (req, res, next) => {
  try {
    const task = await createTaskService(req.body, req.user.id);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// GET ALL TASKS
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await getTasksService(req.user.id);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// GET SINGLE TASK
exports.getTask = async (req, res, next) => {
  try {
    const task = await getTaskService(req.params.id, req.user.id);

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// UPDATE TASK
exports.updateTask = async (req, res, next) => {
  try {
    const task = await updateTaskService(
      req.params.id,
      req.body,
      req.user.id
    );

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// DELETE TASK
exports.deleteTask = async (req, res, next) => {
  try {
    await deleteTaskService(req.params.id, req.user.id);

    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};