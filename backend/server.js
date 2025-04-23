// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js'; // ✅ ADDED

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes); // ✅ ADDED

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ MariaDB Connected`);

    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to DB:', error);
  }
})();