const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./apiRoutes');

// Initialize express app
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up API routes
app.use('/api', apiRoutes);

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/calculator-app';

const mongoDb = mongoose.createConnection(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoDb
  .asPromise()
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Make MongoDB connection available globally
global.mongoDb = mongoDb;

// Define a basic route for server health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is up and running' });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

// Define port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
