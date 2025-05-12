// ========================================================================================
// File: metro.config.cjs
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    This file is used to configure Metro, the JavaScript bundler for React Native.
//    It customizes the bundling process and resolves issues related to libraries.
//    Specifically, it blacklists the `pg-hstore` package to prevent bundling issues.
// ========================================================================================

const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.blacklistRE = /.*pg-hstore.*/;  // Prevents bundling of `pg-hstore`
module.exports = config;
