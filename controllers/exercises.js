let ec = require('../algorithm/exercises/exercises-collection');

exports.getExercisesCollection = function(req, res) {
  res.status(200).send(ec);
};