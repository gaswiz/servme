// ========================================================================================
// File: controllers/authController.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description: 
//    This controller handles user registration and login using bcryptjs for password
//    hashing and JWT for token-based authentication. It provides endpoints for
//    securely signing up and logging in users.
//
// Usage:
//    Used by authRoutes.js for handling /api/auth/register and /api/auth/login
// ========================================================================================

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 12;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;

export const registerUser = async (req, res) => {
  const { name, surname, phone, email, password } = req.body || {};

  if (![name, surname, phone, email, password].every(isNonEmptyString)) {
    return res.status(400).json({ message: 'name, surname, phone, email and password are required' });
  }

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  if (password.length < 6 || password.length > 72) {
    return res.status(400).json({ message: 'Password must be between 6 and 72 characters' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      name,
      surname,
      phone,
      email,
      password: hashedPassword,
      role: 'user',
    });

    const token = signToken(newUser.id);
    console.log('[authController] User created with ID:', newUser.id);

    res.status(201).json({
      token,
      id: newUser.id,
      role: newUser.role,
    });
  } catch (error) {
    console.error('[authController] Registration error:', error.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body || {};

  if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user.id);
    console.log('[authController] Login successful for user ID:', user.id);

    res.status(200).json({
      token,
      id: user.id,
      role: user.role,
    });
  } catch (error) {
    console.error('[authController] Login error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};
