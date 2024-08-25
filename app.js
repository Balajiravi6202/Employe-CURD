import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongodb from './config/dbconnect.js';
import routes from './routes/route.js';
import errorHandler from './middleware/error.js';
import cookieParser from 'cookie-parser';

// Initialize express app
const app = express();

// Configure environment variables
dotenv.config();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Define routes
app.use('/', routes);

// Error handling middleware
app.use(errorHandler);

// Start the server and connect to the database
const PORT = process.env.PORT || 3000; // Use PORT from env or default to 5000

app.listen(PORT, async () => {
  try {
    console.log(`Server running on port ${PORT}`);
    const db = await mongodb // Connect to MongoDB
    console.log('Database connection established');
  } catch (error) {
    console.error('Error establishing database connection:', error);
  }
});
