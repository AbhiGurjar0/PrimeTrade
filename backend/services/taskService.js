// services/taskService.js

const Task = require("../models/Task");
const redis = require("../config/redis");

// CREATE TASK
exports.createTaskService = async (data, userId) => {

  const task = await Task.create({
    ...data,
    user: userId,
  });

  // Clear cache
  await redis.del(`tasks:${userId}`);

  return task;
};

// GET ALL TASKS (with caching)
exports.getTasksService = async (userId) => {

  const cacheKey = `tasks:${userId}`;

  // 1️⃣ Try Redis first
  const cachedTasks = await redis.get(cacheKey);

  if (cachedTasks) {
    console.log("Serving from Redis cache");
    return cachedTasks;
  }

  // 2️⃣ Fetch from DB
  const tasks = await Task.find({ user: userId });

  // 3️⃣ Store in Redis (60 sec)
  await redis.set(cacheKey, tasks, { ex: 60 });

  return tasks;
};

// GET SINGLE TASK
exports.getTaskService = async (taskId, userId) => {

  return await Task.findOne({
    _id: taskId,
    user: userId,
  });
};

// UPDATE TASK
exports.updateTaskService = async (taskId, data, userId) => {

  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    data,
    { returnDocument: "after" }
  );

  // Clear cache
  await redis.del(`tasks:${userId}`);

  return task;
};

// DELETE TASK
exports.deleteTaskService = async (taskId, userId) => {

  await Task.findOneAndDelete({
    _id: taskId,
    user: userId,
  });

  // Clear cache
  await redis.del(`tasks:${userId}`);
};