// metro.config.cjs
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.blacklistRE = /.*pg-hstore.*/;
module.exports = config;
