// backend/routes/userRoutes.js
import express from 'express';
import { getUserById } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protected route to get user by ID
router.get('/:id', protect, getUserById);

export default router;
