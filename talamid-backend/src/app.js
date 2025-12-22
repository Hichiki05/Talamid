const express = require('express');
const cors = require('cors');
require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
const exerciseRoutes = require('./routes/exercise.routes');

app.use('/api/exercise', exerciseRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'TALAMID Backend API is running'
  });
});

module.exports = app;
