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
//    - GET /api/users/:id → getUserById
//    - GET /api/users     → getAllUsers
// ========================================================================================

import express from 'express';
import { getUserById, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUserById);
router.get('/', getAllUsers);

export default router;