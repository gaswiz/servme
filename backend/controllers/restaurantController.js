// ========================================================================================
// File: controllers/restaurantController.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    This controller provides full CRUD functionality for managing restaurants.
//    It uses the Sequelize Restaurant model (parameterized queries) for all operations.
//
// Usage:
//    Used by restaurantRoutes.js for endpoints:
//    - POST /api/restaurants
//    - GET /api/restaurants
//    - GET /api/restaurants/:id
//    - PUT /api/restaurants/:id
//    - DELETE /api/restaurants/:id
// ========================================================================================

import Restaurant from '../models/Restaurant.js';

const pickFields = ({ name, description, image, category } = {}) => {
  const fields = {};
  if (name !== undefined) fields.name = name;
  if (description !== undefined) fields.description = description;
  if (image !== undefined) fields.image = image;
  if (category !== undefined) fields.category = category;
  return fields;
};

// CREATE restaurant
export const createRestaurant = async (req, res) => {
  const fields = pickFields(req.body);

  if (typeof fields.name !== 'string' || !fields.name.trim()) {
    return res.status(400).json({ message: 'name is required' });
  }

  try {
    const restaurant = await Restaurant.create(fields);
    res.status(201).json(restaurant);
  } catch (error) {
    console.error('[restaurantController] Error creating restaurant:', error.message);
    res.status(500).json({ message: 'Error creating restaurant' });
  }
};

// GET all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    console.error('[restaurantController] Error fetching restaurants:', error.message);
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
};

// GET restaurant by ID
export const getRestaurantById = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    console.error('[restaurantController] Error fetching restaurant:', error.message);
    res.status(500).json({ message: 'Error fetching restaurant' });
  }
};

// UPDATE restaurant
export const updateRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    await restaurant.update(pickFields(req.body));
    res.json({ message: 'Restaurant updated successfully' });
  } catch (error) {
    console.error('[restaurantController] Error updating restaurant:', error.message);
    res.status(500).json({ message: 'Error updating restaurant' });
  }
};

// DELETE restaurant
export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Restaurant.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('[restaurantController] Error deleting restaurant:', error.message);
    res.status(500).json({ message: 'Error deleting restaurant' });
  }
};
