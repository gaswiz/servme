// models/Reservation.js
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
  timestamps: false, // ✅ Prevent Sequelize from expecting createdAt/updatedAt
});

// Associations
User.hasMany(Reservation, { foreignKey: 'userId', onDelete: 'CASCADE' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

export default Reservation;
