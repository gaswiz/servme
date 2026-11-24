// ========================================================================================
// File: controllers/reservationController.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description: 
//    This controller manages reservation logic, including creation, deletion,
//    fetching all or user-specific reservations, and checking restaurant availability.
//    It enforces a reservation limit of 10 per restaurant.
//
// Usage:
//    Used by reservationRoutes.js to handle endpoints:
//    - POST /api/reservations
//    - GET /api/reservations
//    - GET /api/reservations/:userId
//    - DELETE /api/reservations/:id
//    - GET /api/reservations/check
// ========================================================================================

import Reservation from '../models/Reservation.js';

export const createReservation = async (req, res) => {
  const { restaurant, people, date, time } = req.body || {};
  // Always bind the reservation to the authenticated user; never trust a client-supplied userId.
  const userId = req.user.id;
  const peopleCount = Number(people);

  if (typeof restaurant !== 'string' || !restaurant.trim() || typeof date !== 'string' || typeof time !== 'string') {
    return res.status(400).json({ message: 'restaurant, date and time are required' });
  }

  if (!Number.isInteger(peopleCount) || peopleCount < 1 || peopleCount > 50) {
    return res.status(400).json({ message: 'people must be a whole number between 1 and 50' });
  }

  try {
    const existing = await Reservation.count({
      where: { restaurant },
    });

    if (existing >= 10) {
      console.log('[reservationController] Fully booked:', restaurant);
      return res.status(400).json({ message: 'This restaurant is fully booked' });
    }

    const reservation = await Reservation.create({
      userId,
      restaurant,
      people: peopleCount,
      date,
      time,
    });

    console.log('[reservationController] Reservation created:', reservation.id);
    res.status(201).json(reservation);
  } catch (error) {
    console.error('[reservationController] Error creating reservation:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllReservations = async (req, res) => {
  console.log('[reservationController] getAllReservations called');
  try {
    // Admins see every reservation; regular users only their own.
    const where = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const reservations = await Reservation.findAll({ where });
    res.json(reservations);
  } catch (error) {
    console.error('[reservationController] getAllReservations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    if (req.user.role !== 'admin' && reservation.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await reservation.destroy();

    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    console.error('[reservationController] Error deleting reservation:', err);
    res.status(500).json({ message: 'Error deleting reservation' });
  }
};

export const getUserReservations = async (req, res) => {
  const { userId } = req.params;
  console.log('[reservationController] getUserReservations called with ID:', userId);

  try {
    const reservations = await Reservation.findAll({ where: { userId } });
    res.json(reservations);
  } catch (error) {
    console.error('[reservationController] getUserReservations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const checkCategoryAvailability = async (req, res) => {
  const { restaurant } = req.query;

  if (typeof restaurant !== 'string' || !restaurant.trim()) {
    return res.status(400).json({ message: 'restaurant query parameter is required' });
  }

  console.log('[reservationController] checkCategoryAvailability called:', restaurant);

  try {
    const count = await Reservation.count({ where: { restaurant } });
    const available = count < 10;
    res.json({ available, reserved: count });
  } catch (error) {
    console.error('[reservationController] checkCategoryAvailability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};