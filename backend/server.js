// server.js
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

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Change to 'http://localhost:8081' if you want to limit
}));
app.use(express.json());
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
