// services/taskService.js

const Task = require("../models/Task");
const redisClient = require("../config/redis");

// CREATE TASK
exports.createTaskService = async (data, userId) => {
  const task = await Task.create({
    ...data,
    user: userId,
  });

  // Clear cache
  if (redisClient) {
    await redisClient.del(`tasks:${userId}`);
  }

  return task;
};

// GET ALL TASKS (with caching)
exports.getTasksService = async (userId) => {
  const cacheKey = `tasks:${userId}`;

  if (redisClient) {
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }
  }

  const tasks = await Task.find({ user: userId });

  if (redisClient) {
    await redisClient.set(cacheKey, JSON.stringify(tasks), {
      EX: 60, // cache for 60 seconds
    });
  }

  return tasks;
};

// GET SINGLE TASK
exports.getTaskService = async (taskId, userId) => {
  const task = await Task.findOne({
    _id: taskId,
    user: userId,
  });

  return task;
};

// UPDATE TASK
exports.updateTaskService = async (taskId, data, userId) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    data,
    { returnDocument: "after" },
  );

  if (redisClient) {
    await redisClient.del(`tasks:${userId}`);
  }

  return task;
};

// DELETE TASK
exports.deleteTaskService = async (taskId, userId) => {
  await Task.findOneAndDelete({
    _id: taskId,
    user: userId,
  });

  if (redisClient) {
    await redisClient.del(`tasks:${userId}`);
  }
};
