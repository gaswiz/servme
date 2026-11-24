// ========================================================================================
// File: routes/userRoutes.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Provides API routes for fetching user information.
//    Includes endpoints to retrieve a user by ID and list all users.
//
// Routes:
//    - GET /api/users/:id → getUserById (owner or admin)
//    - GET /api/users     → getAllUsers (admin only)
// ========================================================================================

import express from 'express';
import { getUserById, getAllUsers } from '../controllers/userController.js';
import { protect, adminOnly, selfOrAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', protect, selfOrAdmin('id'), getUserById);
router.get('/', protect, adminOnly, getAllUsers);

export default router;