// models/Task.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

// Define the Task model
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'To Do',
  },
  deadline: {
    type: DataTypes.DATE,
  },
}, {
  // Other model options go here
});

// Sync the model with the database
Task.sync()
  .then(() => console.log('Task table created'))
  .catch((err) => console.error('Unable to create Task table:', err));

module.exports = Task;
