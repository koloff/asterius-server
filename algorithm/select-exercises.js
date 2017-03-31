let ec = require('./exercises/exercises-collection');

module.exports = function(userParameters, preferredMuscles) {

  console.log(arguments);

  return [
    {key: ec.keys.chest.dumbbellBenchPress, sets: 3},
    {key: ec.keys.shoulders.lateralRaise, sets: 5}
  ]

};