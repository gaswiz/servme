// File: middleware/auth.js

/**
 *  JWT Authentication Middleware
 * 
 * protect(req, res, next)
 * -----------------------
 * - Extracts the JWT token from the Authorization header.
 * - Verifies the token using the JWT_SECRET from .env.
 * - If valid, looks up the user from the DB via the decoded token's ID.
 * - Attaches the user object to req.user so that routes can use it.
 * - If token is invalid or missing, responds with 401 Unauthorized.
 * 
 * adminOnly(req, res, next)
 * -------------------------
 * - Called after protect.
 * - Verifies if req.user.role is 'admin'.
 * - If not, responds with 403 Forbidden.
 */

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  // Extract token from Authorization header: Bearer <token>
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by decoded ID and select only necessary fields
    req.user = await User.findByPk(decoded.id, {
      attributes: ['id', 'name', 'email', 'role'],
    });

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Token is valid and user exists → proceed to next middleware/route
    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const adminOnly = (req, res, next) => {
  // Check if the user is an admin
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  // User is admin → proceed
  next();
};
