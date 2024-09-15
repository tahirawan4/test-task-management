// server.js
const app = require('./app');
const sequelize = require('./models/index');

// Ensure the database is connected before starting the server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => console.error('Failed to connect to database:', err));
