let _ = require('lodash');
let mc = require('../muscles/muscles-collection');
let Exercise = require('./exercise');
let keys = require('./exercises-keys');


function getExercise(key) {
  return _.find(function(exercise) {
    return exercise.key === key;
  });
}

const types = {
  compound: 'compound',
  isolation: 'isolation'
};

//noinspection JSUnresolvedFunction
let exercises = [

  // Chest

  new Exercise({
    key: keys.chest.dumbbellBenchPress,
    type: types.compound,
    musclesUsed: {
      [mc.keys.chest.sternalHead]: 45,
      [mc.keys.chest.clavicularHead]: 15,
      [mc.keys.shoulders.anteriorHead]: 20,
      [mc.keys.triceps.longHead]: 10,
      [mc.keys.triceps.shortHead]: 10
    },
    info: {
      name: 'Dumbbell Bench Press',
      group: 'Chest'
    }
  }),

  // Shoulders

  new Exercise({
    key: keys.shoulders.lateralRaise,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.shoulders.lateralHead]: 70,
      [mc.keys.shoulders.anteriorHead]: 15,
      [mc.keys.shoulders.posteriorHead]: 15,
    },
    info: {
      name: 'Lateral Raise',
      group: 'Shoulders'
    }
  }),

  new Exercise({
    key: keys.shoulders.dumbbellShoulderPress,
    type: types.compound,
    musclesUsed: {
      [mc.keys.shoulders.anteriorHead]: 35,
      [mc.keys.shoulders.lateralHead]: 35,
      [mc.keys.shoulders.posteriorHead]: 10,
      [mc.keys.triceps.longHead]: 10,
      [mc.keys.triceps.shortHead]: 10,
    },
    info: {
      name: 'Dumbbell Shoulder Press',
      group: 'Shoulders'
    }
  })

];

module.exports = {
  keys, getExercise, exercises
};