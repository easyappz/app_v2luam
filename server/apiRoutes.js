const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define schema for calculator operation history
const OperationSchema = new mongoose.Schema({
  expression: { type: String, required: true },
  result: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create model for operations
const Operation = mongoose.model('Operation', OperationSchema);

// GET /api/hello - Simple greeting endpoint
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Calculator API!' });
});

// GET /api/status - Server status endpoint
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// POST /api/operations - Save a calculator operation
router.post('/operations', async (req, res) => {
  try {
    const { expression, result } = req.body;
    if (!expression || !result) {
      return res.status(400).json({ error: 'Expression and result are required' });
    }
    const newOperation = new Operation({ expression, result });
    await newOperation.save();
    res.status(201).json({ message: 'Operation saved successfully', operation: newOperation });
  } catch (error) {
    console.error('Error saving operation:', error);
    res.status(500).json({ error: 'Failed to save operation' });
  }
});

// GET /api/operations - Retrieve all operations
router.get('/operations', async (req, res) => {
  try {
    const operations = await Operation.find().sort({ createdAt: -1 });
    res.json({ operations });
  } catch (error) {
    console.error('Error fetching operations:', error);
    res.status(500).json({ error: 'Failed to fetch operations' });
  }
});

module.exports = router;
