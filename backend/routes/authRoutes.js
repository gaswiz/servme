// backend/routes/authRoutes.js
import express from 'express';
import { loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);  // Route for logging in

export default router;
