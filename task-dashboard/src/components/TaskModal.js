// src/components/TaskModal.js
import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import TaskForm from './TaskForm';

const TaskModal = ({ open, onClose, task, onSubmit }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ maxWidth: 600, margin: 'auto', mt: 10, p: 2, backgroundColor: 'white' }}>
        <Typography variant="h6" gutterBottom>
          {task ? 'Edit Task' : 'Add Task'}
        </Typography>
        <TaskForm task={task} onSubmit={onSubmit} />
      </Box>
    </Modal>
  );
};

export default TaskModal;
