// reservationRoutes.js
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

router.post('/', protect, createReservation); // ✅ FIXED
router.get('/', getAllReservations);
router.get('/user/:userId', getUserReservations);
router.get('/check', checkCategoryAvailability);
router.delete('/:id', deleteReservation);

export default router;
