let _ = require('lodash');
let lpSolver = require('../lib/lp-solver/original/solver');

let mc = require('./muscles/muscles-collection');
let ec = require('./exercises/exercises-collection');

// TODO (optional): add constraint for minimum compound lifts; add type parameter to exercise collection
/**
 * Get parameters object and returns workout array in the form: [{exerciseKey: setsCount}]
 */
function generateVolume(parameters) {
  let trainedMuscles = parameters.trainedMuscles;
  let preferredMuscles = parameters.preferredMuscles;
  let sets = parameters.sets;
  let mevMultiplier = parameters.mevMultiplier;
  let mrvMultiplier = parameters.mrvMultiplier;
  let minIsolationSetsCount = parameters.minIsolationSetsCount;
  let minExerciseSetsCount = parameters.minExerciseSetsCount;
  let maxExerciseSetsCount = parameters.maxExerciseSetsCount;

  let muscles = mc.muscles;
  let exercises = ec.exercises;


  console.log('TRAINED MUSCLES');
  console.log(trainedMuscles);

  console.log('PREFERRED MUSCLES');
  console.log(preferredMuscles);


  // ILPP model constraints
  let constraints = {};
  // ILPP model variables
  let variables = {};

  constraints.sets = {
    max: sets
  };

  let isolationExercisesForPreferredMuscles = [];


  let allMuscles = [];
  // add the preferred muscles in the beginning for priority reasons
  preferredMuscles.forEach((id) => {
    allMuscles.push(id)
  });
  // then add all trained muscles
  trainedMuscles.forEach((id) => {
    if (allMuscles.indexOf(id) < 0) {
      allMuscles.push(id);
    }
  });

  allMuscles.forEach((id) => {
    constraints[id] = {};
    // do not overtrain muscles
    constraints[id].max = (mc.get(id).mrv * 100 /*in percentage*/) * mrvMultiplier;
    // do not undertrain muscles
    constraints[id].min = (mc.get(id).mev * 100 /*in percentage*/) * mevMultiplier;
    // if muscles is preferred, get its isolation exercise
    if (preferredMuscles.indexOf(id) >= 0) {
      isolationExercisesForPreferredMuscles.push(getIsolationExerciseId(id));
    }
  });

  // create int and binaries variables types
  let ints = {};
  let binaries = {};
  exercises.forEach((exercise) => {
    let exerciseVar = {};

    // calculate exercise volume for the muscles it trains and are chosen
    let trainedMusclesVolume = 0;
    _.forOwn(exercise.musclesUsed, (percentage, id) => {
      exerciseVar[id] = percentage;
      if (trainedMuscles.indexOf(id) >= 0) {
        trainedMusclesVolume += percentage;
      }
    });

    if (trainedMusclesVolume > 0 || isolationExercisesForPreferredMuscles.indexOf(exercise.id) >= 0) {
      // create ILPP constraints for each exercise
      constraints[exercise.id] = {};
      // create ILPP variable for each exercise

      // if the exercise isolates any of the maximum preferred muscles add it
      if (isolationExercisesForPreferredMuscles.indexOf(exercise.id) >= 0 && minIsolationSetsCount > 0) {
        constraints[exercise.id].min = minIsolationSetsCount;
      } else {
        // the exercise sets can be 0 or in the range [min, max]
        // there is no SEC type in jsLpSolver, so we create a fix by using a slack variable for each exercise
        constraints[exercise.id].min = minExerciseSetsCount;
        binaries[`${exercise.id}_slack`] = 1;
        constraints[`${exercise.id}_slack`] = {max: 1};
        variables[`${exercise.id}_slack`] = {[exercise.id]: maxExerciseSetsCount, [`${exercise.id}_slack`]: 1};
        exerciseVar[`${exercise.id}_slack`] = 1 / maxExerciseSetsCount;
      }

      constraints[exercise.id].max = maxExerciseSetsCount;
      exerciseVar.sets = 1;
      exerciseVar[exercise.id] = 1;
      exerciseVar['trainedMusclesVolume'] = trainedMusclesVolume;
      variables[exercise.id] = exerciseVar;
      ints[exercise.id] = 1;
    }
  });


  let result = lpSolver.Solve({
    optimize: 'trainedMusclesVolume',
    opType: 'max',
    constraints: constraints,
    variables: variables,
    ints,
    binaries
  });

  let workout = [];


  if (result.feasible) {
    _.forOwn(result, (item, id) => {
      if (id.indexOf('slack') < 0 && item > 0
        && !(id === 'feasible' || id === 'result' || id === 'bounded')) {
        workout.push({id: id, sets: item})
      }
    });
  }

  // console.log('---------------------------LOGS---------------------------');
  // console.log(constraints);
  // console.log(variables);
  // console.log(ints);
  // console.log(binaries);
  // console.log('__________________________________________');
  // console.log('SOLUTION');
  // console.log(workout);
  // trainedMuscles.forEach((mKey) => {
  //   console.log(mKey);
  //   let currentVolume = 0;
  //   workout.forEach((exShort) => {
  //     let exercise = ec.get(exShort.id);
  //     _.forOwn(exercise.musclesUsed, (percentage, id) => {
  //       if (mKey === id) {
  //         currentVolume += exShort.sets * (percentage / 100);
  //       }
  //     })
  //   });
  //   console.log((currentVolume / mc.get(mKey).mev) * 100);
  // });
  //
  // console.log('---------------------------END LOGS---------------------------');

  return workout;
}


function getIsolationExerciseId(muscleId) {
  let currentExerciseId = '';
  let currentMaxPercentage = 0;
  ec.exercises.forEach((exercise) => {
    _.forOwn(exercise.musclesUsed, (percentage, id) => {
      if (id === muscleId && percentage >= currentMaxPercentage) {
        currentExerciseId = exercise.id;
        currentMaxPercentage = percentage;
      }
    })
  });


  // console.log('__________________________');
  // console.log(currentExerciseKey, currentMaxPercentage);
  // console.log('________________________');

  return currentExerciseId;
}

module.exports = generateVolume;