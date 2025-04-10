// backend/routes/authRoutes.js
import express from 'express';
import { loginUser } from '../controllers/authController.js';  // Import login function from controller

const router = express.Router();

// Define the login route
router.post('/login', loginUser);  // Ensure that /login route is defined

export default router;  // Export the routes for use in server.js
