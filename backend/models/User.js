// ========================================================================================
// File: models/User.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Defines the User model for Sequelize, representing system users who can either
//    be normal users or admins. Each user can have multiple reservations.
//
// Notes:
//    - Table name: users
//    - Timestamps disabled (no createdAt or updatedAt fields)
//    - Role defaults to 'user' unless explicitly set (e.g., 'admin')
// ========================================================================================

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

export default User;