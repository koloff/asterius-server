let admin = require('firebase-admin');
let config = require('./config');

let serviceAccount = config.firebaseKey;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://asterius-a8808.firebaseio.com/"
});


let database = require('../database');
database.init();
