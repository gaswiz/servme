import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';  // Ensure correct import
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

// backend/controllers/authController.js
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Attempting to find user with email:", email);  // Log email being searched

    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

    console.log("Query result:", rows);  // Log the rows result from DB

    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If password is a plain text password
    if (password === user.password) {
      const token = generateToken(user);
      res.json({
        id: user.id,
        email: user.email,
        role: user.role,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
