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
import db from '../config/db.js';

export const createReservation = async (req, res) => {
  console.log('[reservationController] createReservation called');
  console.log('Request body:', req.body);

  const { restaurant, people, date, time } = req.body;
  const userId = req.user?.id || req.body.userId;

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
      people,
      date,
      time,
    });

    console.log('[reservationController] Reservation created:', reservation.id);
    res.status(201).json(reservation);
  } catch (error) {
    console.error('[reservationController] Error creating reservation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllReservations = async (req, res) => {
  console.log('[reservationController] getAllReservations called');
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    console.error('[reservationController] getAllReservations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Reservation.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    console.error('[reservationController] Error deleting reservation:', err);
    res.status(500).json({ message: 'Error deleting reservation', error: err });
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