// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import { Button, Container, Typography } from '@mui/material';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch tasks from the backend when the component loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks'); // Adjust the URL to your backend server
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  // Handle the addition of a new task
  const handleAdd = () => {
    setCurrentTask(null);
    setOpen(true);
  };

  // Handle the edit task operation
  const handleEdit = (task) => {
    setCurrentTask(task);
    setOpen(true);
  };

  // Handle the delete task operation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      fetchTasks();  // Refresh the list of tasks after deletion
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  // Handle the form submission for creating or updating tasks
  const handleSubmit = async (task) => {
    try {
      if (task.id) {
        // Update the task if it already has an ID
        await axios.put(`http://localhost:3000/tasks/${task.id}`, task);
      } else {
        // Create a new task if it doesn't have an ID
        await axios.post('http://localhost:3000/tasks', task);
      }
      fetchTasks();  // Refresh the list of tasks after submission
      setOpen(false);  // Close the modal
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Task Management Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAdd} style={{ marginBottom: '20px' }}>
        Add Task
      </Button>
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      <TaskModal open={open} onClose={() => setOpen(false)} task={currentTask} onSubmit={handleSubmit} />
    </Container>
  );
};

export default Dashboard;
