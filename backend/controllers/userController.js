// ========================================================================================
// File: controllers/userController.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    This controller provides user management functionality for the ServMe app.
//    It includes functions to fetch all users and retrieve a specific user by ID.
//
// Usage:
//    Used by userRoutes.js for endpoints:
//    - GET /api/users
//    - GET /api/users/:id
// ========================================================================================

import User from '../models/User.js';

// Never return password hashes to clients.
const SAFE_ATTRIBUTES = { exclude: ['password'] };

export const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log('[userController] getUserById called with ID:', id);

  try {
    const user = await User.findByPk(id, { attributes: SAFE_ATTRIBUTES });

    if (!user) {
      console.log('[userController] User not found:', id);
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('[userController] getUserById error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllUsers = async (req, res) => {
  console.log('[userController] getAllUsers called');

  try {
    const users = await User.findAll({ attributes: SAFE_ATTRIBUTES });
    console.log('[userController] Total users fetched:', users.length);
    res.json(users);
  } catch (error) {
    console.error('[userController] getAllUsers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};