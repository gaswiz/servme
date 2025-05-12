// ========================================================================================
// File: config/db.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description: 
//    This file initializes and exports a Sequelize instance configured to connect
//    to a MariaDB database. The connection uses credentials defined in the .env file.
//    If not provided, fallback defaults are used.
//
// Usage:
//    This is the main database connection used across all backend models.
// ========================================================================================

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'servme',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mariadb',
    logging: false,
  }
);

export default sequelize;