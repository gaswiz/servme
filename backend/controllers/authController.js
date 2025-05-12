// ========================================================================================
// File: controllers/authController.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description: 
//    This controller handles user registration and login using bcrypt for password
//    hashing and JWT for token-based authentication. It provides endpoints for
//    securely signing up and logging in users.
//
// Usage:
//    Used by authRoutes.js for handling /api/auth/register and /api/auth/login
// ========================================================================================

import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  console.log('[authController] registerUser called');
  console.log('Request body:', req.body);

  const { name, surname, phone, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      console.log('[authController] Email already in use:', email);
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      surname,
      phone,
      email,
      password: hashedPassword,
      role: 'user',
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
    console.log('[authController] User created with ID:', newUser.id);

    res.status(201).json({
      token,
      id: newUser.id,
      role: newUser.role,
    });
  } catch (error) {
    console.error('[authController] Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const loginUser = async (req, res) => {
  console.log('[authController] loginUser called');
  console.log('Request body:', req.body);

  const { email, password } = req.body;

  try {
    const allUsers = await User.findAll();
    console.log('[authController] All users:', allUsers.map(u => u.email));

    const user = await User.findOne({ where: { email } });

    console.log('[authController] Found user:', user ? user.email : 'Not found');

    if (!user) {
      console.log('[authController] User not found for email:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('[authController] Incorrect password for user:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    console.log('[authController] Login successful for user ID:', user.id);

    res.status(200).json({
      token,
      id: user.id,
      role: user.role,
    });
  } catch (error) {
    console.error('[authController] Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
