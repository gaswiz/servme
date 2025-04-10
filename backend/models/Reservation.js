const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Reservation = sequelize.define('Reservation', {
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
  }
});

User.hasMany(Reservation);
Reservation.belongsTo(User);

module.exports = Reservation;
