// ========================================================================================
// File: models/Restaurant.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Defines the Restaurant model using Sequelize. Restaurants are grouped by category
//    and may include an image, name, and description.
//
// Notes:
//    - Table name: restaurants
//    - Timestamps enabled (createdAt and updatedAt)
//    - Category field is optional and restricted to Pizza, Sushi, or Fast Food.
// ========================================================================================

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Restaurant = sequelize.define('Restaurant', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  category: {
    type: DataTypes.ENUM('Pizza', 'Sushi', 'Fast Food'),
    allowNull: true,
  },
  image: DataTypes.STRING,
}, {
  tableName: 'restaurants',
  timestamps: true,
});

export default Restaurant;