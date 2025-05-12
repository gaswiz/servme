// ========================================================================================
// File: models/Reservation.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Defines the Reservation model using Sequelize. A reservation is linked to a user,
//    and includes metadata such as date, time, restaurant name, and number of people.
//
// Notes:
//    - Table name: reservations
//    - Timestamps are disabled.
//    - Associates with User: User hasMany Reservations / Reservation belongsTo User.
// ========================================================================================

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  people: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  restaurant: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'reservations',
  timestamps: false,
});

User.hasMany(Reservation, { foreignKey: 'userId', onDelete: 'CASCADE' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

export default Reservation;