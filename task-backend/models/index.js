// models/index.js
const { Sequelize } = require('sequelize');

// Set up the PostgreSQL connection
const sequelize = new Sequelize('tasks', 'test', '1234567a', {
  host: 'localhost',
  dialect: 'postgres',
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Unable to connect to PostgreSQL:', err));

module.exports = sequelize;
