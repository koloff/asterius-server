let path = require('path');
let env = process.env.NODE_ENV || 'production';

let settings;
if (env === 'development') {
  settings ={
    "port": 3377,
    "secret": "johncena"
  }
} else {
  settings = require('./SETTINGS.json');
}

let config = {};

config.port = env.port || settings.port;
config.secret = env.secret || settings.secret;

module.exports = config;