// ========================================================================================
// File: routes/restaurantRoutes.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Defines all API routes related to restaurant data management.
//    Routes support full CRUD operations: create, read, update, and delete.
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

const router = express.Router();

router.post('/', createRestaurant);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

export default router;