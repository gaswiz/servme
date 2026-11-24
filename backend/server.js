// ========================================================================================
// File: server.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Entry point for the Express backend server. Initializes middleware, connects
//    to the MariaDB database using Sequelize, and mounts all application routes.
//
// Responsibilities:
//    - Loads environment config with dotenv
//    - Applies global middleware (CORS, morgan, express.json)
//    - Registers route handlers for auth, users, reservations, and restaurants
//    - Initializes database connection and starts the server on configured port
// ========================================================================================

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import sequelize from './config/db.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is not set. Copy backend/.env.example to backend/.env and set it.');
  process.exit(1);
}

const app = express();
app.disable('x-powered-by');

// Middleware
// Allowed browser origins come from CORS_ORIGIN (comma-separated). Native mobile
// clients do not send an Origin header and are unaffected.
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:8081')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '100kb' }));
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/restaurants', restaurantRoutes);

// Port
const PORT = process.env.PORT || 3001;

// Server Init
(async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ MariaDB Connected`);

    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to DB:', error);
  }
})();