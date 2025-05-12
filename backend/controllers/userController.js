// userController.js
import User from '../models/User.js';

export const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log('[userController] getUserById called with ID:', id);

  try {
    const user = await User.findByPk(id);

    if (!user) {
      console.log('[userController] User not found:', id);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('[userController] User found:', user.email);
    res.json(user);
  } catch (error) {
    console.error('[userController] getUserById error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllUsers = async (req, res) => {
  console.log('[userController] getAllUsers called');

  try {
    const users = await User.findAll();
    console.log('[userController] Total users fetched:', users.length);
    res.json(users);
  } catch (error) {
    console.error('[userController] getAllUsers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
