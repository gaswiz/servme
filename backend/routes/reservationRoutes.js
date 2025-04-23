// backend/routes/reservationRoutes.js
import express from 'express';
import {
  createReservation,
  getAllReservations,
  checkAvailability,
  checkCategoryAvailability // ✅ Add this
} from '../controllers/reservationController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create a new reservation (protected)
router.post('/', protect, createReservation);

// ✅ New route to check availability by restaurant name
router.get('/availability/:restaurantName', checkAvailability);


router.get('/check/category', checkCategoryAvailability); // NEW


// Optional: get all reservations (for admin or debug)
router.get('/', getAllReservations);

export default router;
