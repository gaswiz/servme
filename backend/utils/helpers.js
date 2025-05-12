// ========================================================================================
// File: backend/utils/helpers.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Provides reusable utility functions for the backend. Currently includes a
//    structured logging function for labeled console output.
//
// Exports:
//    - log(label, data): Nicely formats and logs labeled debug output to console.
// ========================================================================================

export const log = (label, data) => {
  console.log(`🔍 ${label}:`, JSON.stringify(data, null, 2));
};