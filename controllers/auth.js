let admin = require('firebase-admin');

exports.authenticate = function(req, res, next) {
  admin.auth().verifyIdToken(req.header('X-Access-Token'))
    .then(function(decodedToken) {
      req.uid = decodedToken.uid;
      next()
    }).catch(function(error) {
      console.log(error);
      res.status(403).end();
  });
};