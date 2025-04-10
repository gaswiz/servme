// reservationController.js
import db from '../config/db.js';

// Dummy controller implementations to get server running

export const createReservation = async (req, res) => {
  res.status(201).json({ message: 'Reservation created successfully' });
};

export const getReservations = async (req, res) => {
  res.status(200).json({ message: 'All reservations fetched' });
};

export const getReservationById = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Reservation with ID ${id} fetched` });
};

export const updateReservation = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Reservation with ID ${id} updated` });
};

export const deleteReservation = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Reservation with ID ${id} deleted` });
};
