// ========================================================================================
// File: routes/index.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Defines the base route for the API. Serves as a health-check or welcome endpoint.
//
// Route:
//    - GET / → returns simple confirmation message ('API is running...')
// ========================================================================================

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = router;