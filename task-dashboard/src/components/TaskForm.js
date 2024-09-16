// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

const TaskForm = ({ task, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    status: 'To Do',
    deadline: '',
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        select
        fullWidth
        required
        margin="normal"
      >
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </TextField>
      <TextField
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        select
        fullWidth
        required
        margin="normal"
      >
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </TextField>
      <TextField
        label="Deadline"
        name="deadline"
        type="date"
        value={formData.deadline}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default TaskForm;
