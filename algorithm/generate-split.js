let _ = require('lodash');
let ec = require('./exercises/exercises-collection');
let lpSolver = require('javascript-lp-solver');
let Model = lpSolver.Model;

let getSplitType = require('./get-split-type');

let mc = require('./muscles/muscles-collection');


function generateSplit(userData, preferredMuscles) {

  // mock
  userData = {
    hasParameters: false,

    measuringUnit: 'metric',
    weight: null,
    height: null,
    experience: '',
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    }
  };

  preferredMuscles = [
    mc.keys.chest.clavicularHead,
    mc.keys.legs.calves,
    mc.keys.legs.quadriceps,
    mc.keys.legs.hamstrings
  ];


  let muscles = _.clone(mc.muscles);
  let exercises = _.clone(ec.exercises);



  // Model ILPP constraints
  let constraints = {};


  let isolationExercisesForPreferredMuscles = [];

  muscles.forEach((muscle) => {
    constraints[muscle.key] = {
      max: (muscle.mrv * 100) / 2,
    };

    if (preferredMuscles.indexOf(muscle.key) >= 0) {
      isolationExercisesForPreferredMuscles.push(getIsolationExerciseKey(muscle.key));
    }
  });

  constraints.sets = {
    max: 20  // TODO make parameter
  };


  exercises.forEach((exercise) => {
    constraints[exercise.key] = {};

    if (isolationExercisesForPreferredMuscles.indexOf(exercise.key) >= 0) {
      constraints[exercise.key].min = 3;
    }

    constraints[exercise.key].max = 5; // TODO make max sets for particular exercise function (can add to collection)
  });


  // Model variables
  let variables = {};

  exercises.forEach((exercise) => {
    let exerciseVar = {};
    exerciseVar.sets = 1;
    exerciseVar[exercise.key] = 1;

    let targetMusclesVolume = 0;
    _.forOwn(exercise.musclesUsed, (percentage, mKey) => {
      exerciseVar[mKey] = percentage;
      if (preferredMuscles.indexOf(mKey) >= 0) {
        targetMusclesVolume += percentage;
      }
    });

    exerciseVar['targetMusclesVolume'] = targetMusclesVolume;
    variables[exercise.key] = exerciseVar;
  });


  console.log(constraints);
  console.log(variables);

  console.log(mc.keys.triceps.longHead);

  let result = lpSolver.Solve({
    optimize: 'targetMusclesVolume',
    opType: 'max',
    constraints: constraints,
    variables: variables,
  });

  console.log('SOLUTION');
  console.log('______________________________');


  console.log(result);
}


function getIsolationExerciseKey(muscleKey) {
  let currentExerciseKey;
  let currentMaxPercentage = 0;
  ec.exercises.forEach((exercise) => {
    _.forOwn(exercise.musclesUsed, (percentage, mKey) => {
      if (mKey === muscleKey && percentage > currentMaxPercentage) {
        currentExerciseKey = exercise.key;
        currentMaxPercentage = percentage;
      }
    })
  });

  return currentExerciseKey;
}

generateSplit();