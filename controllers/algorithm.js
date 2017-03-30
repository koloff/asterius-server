let ec = require('../algorithm/exercises/exercises-collection');

exports.generateExercises = function(req, res) {
  console.log(req.header('X-Access-Token'));
  res.status(200).send({exercises: [
    {key: ec.keys.dumbbellBenchPress, sets: 3},
    {key: ec.keys.lateralRaise, sets: 5}
  ]});
};