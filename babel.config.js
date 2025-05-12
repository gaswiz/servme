// ========================================================================================
// File: babel.config.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    This is the Babel configuration file for the ServMe app, specifying presets and plugins
//    for transpiling JavaScript and integrating environment variables from the .env file.
//    It ensures compatibility with React Native and Expo, while managing environment variables.
// ========================================================================================

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
      }],
    ],
  };
};