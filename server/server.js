const express = require('express');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');
const cors = require('cors');
// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors({
      origin: 'http://localhost:5173', // Or the actual frontend's origin
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'], // Add any required headers
      credentials: true,
    }));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Load routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/images', require('./src/routes/images'));

//posts
app.use('/api/posts', require('./src/routes/postRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
