// ========================================================================================
// File: routes/authRoutes.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Defines authentication-related API routes using Express Router.
//    Provides endpoints for user registration and login.
//
// Routes:
//    - POST /api/auth/register → registerUser (authController)
//    - POST /api/auth/login    → loginUser (authController)
// ========================================================================================

import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;