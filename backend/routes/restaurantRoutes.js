// ========================================================================================
// File: routes/restaurantRoutes.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Defines all API routes related to restaurant data management.
//    Routes support full CRUD operations: create, read, update, and delete.
//    Write operations require an authenticated admin.
//
// Routes:
//    - POST   /api/restaurants     → createRestaurant
//    - GET    /api/restaurants     → getAllRestaurants
//    - GET    /api/restaurants/:id → getRestaurantById
//    - PUT    /api/restaurants/:id → updateRestaurant
//    - DELETE /api/restaurants/:id → deleteRestaurant
// ========================================================================================

import express from 'express';
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from '../controllers/restaurantController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, adminOnly, createRestaurant);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.put('/:id', protect, adminOnly, updateRestaurant);
router.delete('/:id', protect, adminOnly, deleteRestaurant);

export default router;