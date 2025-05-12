// controllers/restaurantController.js
import db from '../config/db.js';
import Restaurant from '../models/Restaurant.js'; // Sequelize model


// CREATE restaurant
export const createRestaurant = async (req, res) => {
  const { name, description, image } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO restaurants (name, description, image) VALUES (?, ?, ?)',
      [name, description, image]
    );

    res.status(201).json({ id: result.insertId, name, description, image });
  } catch (error) {
    res.status(500).json({ message: 'Error creating restaurant', error });
  }
};


// GET all restaurants (with Sequelize)
export const getAllRestaurants = async (req, res) => {
  console.log('[restaurantController] getAllRestaurants called');
  try {
    const restaurants = await Restaurant.findAll();
    console.log('[restaurantController] Found restaurants:', restaurants);
    res.json(restaurants);
  } catch (error) {
    console.error('[restaurantController] Error fetching restaurants:', error);
    res.status(500).json({ message: 'Error fetching restaurants', error });
  }
};



// GET restaurant by ID
export const getRestaurantById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('SELECT * FROM restaurants WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant', error });
  }
};

// UPDATE restaurant
export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, description, image } = req.body;

  try {
    await db.execute(
      'UPDATE restaurants SET name = ?, description = ?, image = ? WHERE id = ?',
      [name, description, image, id]
    );

    res.json({ message: 'Restaurant updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating restaurant', error });
  }
};

// DELETE restaurant
export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute('DELETE FROM restaurants WHERE id = ?', [id]);
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting restaurant', error });
  }
};
