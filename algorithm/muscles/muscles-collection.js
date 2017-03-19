let Muscle = require('./muscle');
let keys = require('./muscles-keys');

function getMuscle(key) {
  return _.find(function(muscle) {
    return muscle.key == key;
  });
}

let muscles = [
  new Muscle({
    key: keys.shoulders.anteriorHead,
    mrv: 7,
    info: {name: 'Deltoid anterior head', broName: 'Front Delts', group: 'Shoulders'}
  })
];

module.exports = {
  muscles, getMuscle
};