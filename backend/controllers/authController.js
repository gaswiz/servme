// backend/controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';
import dotenv from 'dotenv';
import { log } from '../utils/helpers.js';

dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  log("Login payload", req.body);

  try {
    const rows = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!rows || rows.length === 0) {
      log("User lookup", "No user found.");
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    log("User found", user);

    const passwordsMatch = bcrypt.compareSync(password, user.password);

    if (passwordsMatch) {
      const token = generateToken(user);
      return res.json({
        id: user.id,
        email: user.email,
        role: user.role,
        token,
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
