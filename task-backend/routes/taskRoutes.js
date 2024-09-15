const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const { createClient } = require('redis');  // Import the Redis client

// 1. Initialize Redis client (this should go here)
const redisClient = createClient({
  url: 'redis://localhost:6379'  // Default Redis URL for local Redis server
});

// 2. Handle Redis errors
redisClient.on('error', (err) => console.log('Redis Client Error', err));

// 3. Connect Redis (you should do this after initializing the client)
(async () => {
  await redisClient.connect();  // Connect to the Redis server
})();

// Middleware to check the cache for tasks
const checkCache = async (req, res, next) => {
  try {
    const data = await redisClient.get('tasks');
    if (data !== null) {
      res.send(JSON.parse(data));  // Return the cached data if available
    } else {
      next();  // Proceed to fetch data from the database if no cache
    }
  } catch (err) {
    console.error('Error while accessing Redis cache:', err);
    next();
  }
};

// GET /tasks - Retrieve all tasks with Redis caching
router.get('/', checkCache, async (req, res) => {
  try {
    const tasks = await Task.findAll();
    await redisClient.setEx('tasks', 3600, JSON.stringify(tasks));  // Cache tasks for 1 hour
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// POST /tasks - Add a new task and invalidate cache
router.post('/', async (req, res) => {
  const { title, description, priority, status, deadline } = req.body;
  try {
    const newTask = await Task.create({ title, description, priority, status, deadline });
    await redisClient.del('tasks');  // Invalidate the cache when a task is added
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /tasks/:id - Update an existing task and invalidate cache
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status, deadline } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      task.title = title;
      task.description = description;
      task.priority = priority;
      task.status = status;
      task.deadline = deadline;
      await task.save();
      await redisClient.del('tasks');  // Invalidate the cache when a task is updated
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /tasks/:id - Delete a task and invalidate cache
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();
      await redisClient.del('tasks');  // Invalidate the cache when a task is deleted
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
