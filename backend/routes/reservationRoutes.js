// ========================================================================================
// File: routes/reservationRoutes.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Defines all API routes related to reservation management. Routes allow for
//    creating, viewing, checking availability, and deleting reservations.
//
// Routes:
//    - POST   /api/reservations         → createReservation (protected)
//    - GET    /api/reservations         → getAllReservations
//    - GET    /api/reservations/user/:userId → getUserReservations
//    - GET    /api/reservations/check   → checkCategoryAvailability
//    - DELETE /api/reservations/:id     → deleteReservation
// ========================================================================================

import express from 'express';
import {
  createReservation,
  getAllReservations,
  getUserReservations,
  checkCategoryAvailability,
  deleteReservation,
} from '../controllers/reservationController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createReservation);
router.get('/', getAllReservations);
router.get('/user/:userId', getUserReservations);
router.get('/check', checkCategoryAvailability);
router.delete('/:id', deleteReservation);

export default router;