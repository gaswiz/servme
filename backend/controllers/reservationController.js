// backend/controllers/reservationController.js
import Reservation from '../models/Reservation.js';

// Create a new reservation
export const createReservation = async (req, res) => {
  const { date, time, people, restaurant } = req.body;

  if (!date || !time || !people || !restaurant) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const newReservation = await Reservation.create({
      date,
      time,
      people,
      restaurant,
      userId: req.user.id,
    });

    res.status(201).json({
      message: 'Reservation confirmed!',
      reservation: newReservation,
    });
  } catch (error) {
    console.error('Create reservation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Check availability for a specific restaurant
export const checkAvailability = async (req, res) => {
  const restaurantName = decodeURIComponent(req.params.restaurantName).trim();

  try {
    const reservations = await Reservation.findAll({
      where: { restaurant: restaurantName },
    });

    const totalReserved = reservations.reduce((sum, r) => sum + r.people, 0);
    const maxCapacity = 10; // per restaurant
    const available = totalReserved < maxCapacity;

    res.json({
      available,
      count: maxCapacity - totalReserved,
    });
  } catch (error) {
    console.error('Availability check error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Optional: get all reservations
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    console.error('Get all reservations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// In reservationController.js
export const checkCategoryAvailability = async (req, res) => {
  const category = req.query.name;

  try {
    // 1. Get all restaurants in that category
    const restaurants = await Restaurant.findAll({ where: { category } });
    const ids = restaurants.map(r => r.name);

    // 2. Find how many reservations each restaurant has
    const reservations = await Reservation.findAll({
      where: { restaurant: ids },
    });

    // 3. Count per restaurant
    const counts = {};
    ids.forEach(name => { counts[name] = 0 });
    reservations.forEach(r => {
      counts[r.restaurant] += 1;
    });

    const isAvailable = Object.values(counts).some(c => c < 10);

    res.json({ available: isAvailable, counts });
  } catch (err) {
    console.error('Category check error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
