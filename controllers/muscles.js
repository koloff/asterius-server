let mc = require('../algorithm/muscles/muscles-collection');

exports.getMusclesCollection = function(req, res) {
  res.status(200).send(mc);
};