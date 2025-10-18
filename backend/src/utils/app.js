import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from '../config/db.js';
import testRoutes from '../routes/test.routes.js';
import reportRoutes from '../routes/report.route.js';
import { errorHandler } from '../middlewares/error.middleware.js';
import { notFound } from '../middlewares/notFound.middleware.js';

const app = express();

// // Connect to database
// connectDB();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Email Spam Report API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/tests', testRoutes);
app.use('/api/reports', reportRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

 export default app;
