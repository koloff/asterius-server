let admin = require('firebase-admin');

exports.authenticate = function(req, res, next) {
  console.log('auth');
  try {
    admin.auth().verifyIdToken(req.header('X-Access-Token'))
      .then(function(decodedToken) {
        req.uid = decodedToken.uid;
        next()
      }).catch(function(error) {
      console.log(error);
      res.status(403).end();
    });
  } catch(err) {
    console.log(err);
    res.status(403).end();
  }

};