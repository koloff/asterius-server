let path = require('path');
let env = process.env;

let nodeEnv = env.NODE_ENV || 'production';

let sensitive = require('./SENSITIVE.json') || {};
if (nodeEnv === 'development') {
  sensitive.port = 3377;
}

let config = {};
config.port = env.port || sensitive.port;
config.firebaseKey  = sensitive.firebaseKey;

module.exports = config;