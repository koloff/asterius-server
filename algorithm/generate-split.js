let _ = require('lodash');
let ec = require('./exercises/exercises-collection');
let lpSolver = require('javascript-lp-solver');
let Model = lpSolver.Model;

let getSplitType = require('./get-split-type');

let mc = require('./muscles/muscles-collection');


function generateSplit() {

  // mock userData
  let userData = {
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


  // mock preferred muscles
  let preferredMuscles = [
    mc.keys.shoulders.posteriorHead
  ];

  let maxPreferredMuscles = [
    mc.keys.shoulders.lateralHead,
    mc.keys.chest.clavicularHead,
    mc.keys.chest.sternalHead,
  ];

  let minPreferredMuscles = [
    mc.keys.triceps.longHead
  ];

  let muscles = _.clone(mc.muscles);
  let exercises = _.clone(ec.exercises);


  // Model ILPP constraints
  let constraints = {};


  let isolationExercisesForPreferredMuscles = [];

  muscles.forEach((muscle) => {
    constraints[muscle.key] = {};
    constraints[muscle.key].max = (muscle.mrv * 100) / 2; // todo function

    if (preferredMuscles.indexOf(muscle.key) >= 0) {
      constraints[muscle.key].min = (muscle.mrv * 100) / 3;
    }
    if (maxPreferredMuscles.indexOf(muscle.key) >= 0) {
      isolationExercisesForPreferredMuscles.push(getIsolationExerciseKey(muscle.key));
    }
  });

  constraints.sets = {
    max: 26  // TODO make parameter
  };


  exercises.forEach((exercise) => {
    constraints[exercise.key] = {};

    if (isolationExercisesForPreferredMuscles.indexOf(exercise.key) >= 0) {
      constraints[exercise.key].min = 3;
    }

    constraints[exercise.key].max = 3; // TODO make max sets for particular exercise function (can add to collection)
  });


  // Model variables
  let variables = {};

  exercises.forEach((exercise) => {
    let exerciseVar = {};
    exerciseVar.sets = 1;
    exerciseVar[exercise.key] = 1;

    let maxPreferredMusclesVolume = 0;
    let minPreferredMusclesVolume = 0;
    _.forOwn(exercise.musclesUsed, (percentage, mKey) => {
      exerciseVar[mKey] = percentage;
      if (maxPreferredMuscles.indexOf(mKey) >= 0) {
        maxPreferredMusclesVolume += percentage;
      } else if (minPreferredMuscles.indexOf(mKey) >= 0) {
        minPreferredMusclesVolume += percentage;
      }
    });

    exerciseVar['maxPreferredMusclesVolume'] = maxPreferredMusclesVolume;
    exerciseVar['minPreferredMusclesVolume'] = minPreferredMusclesVolume;

    variables[exercise.key] = exerciseVar;
  });


  console.log(constraints);
  console.log(variables);
  console.log(isolationExercisesForPreferredMuscles);

  // let result = lpSolver.MultiObjective({
  //   optimize: {
  //     maxPreferredMusclesVolume: 'max',
  //     minPreferredMusclesVolume: 'min'
  //   },
  //   constraints: constraints,
  //   variables: variables,
  // });

  let result = lpSolver.Solve({
    optimize: 'maxPreferredMusclesVolume',
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