// models/Restaurant.js
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
  timestamps: true, // Enable createdAt and updatedAt
});

export default Restaurant;
