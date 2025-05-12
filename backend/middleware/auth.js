// ========================================================================================
// File: middleware/auth.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    This file defines authentication middleware for securing API routes.
//    It includes two middlewares:
//
//    - protect(req, res, next):
//        * Validates JWT token from the Authorization header.
//        * Decodes and attaches the user to req.user.
//        * Denies access if token is missing or invalid.
//
//    - adminOnly(req, res, next):
//        * Ensures that the authenticated user is an admin.
//        * Used after protect to restrict access to admin-only routes.
// ========================================================================================

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findByPk(decoded.id, {
      attributes: ['id', 'name', 'email', 'role'],
    });

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  next();
};
