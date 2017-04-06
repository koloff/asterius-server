let _ = require('lodash');
let lpSolver = require('../lib/lp-solver/solver');
let ec = require('./exercises/exercises-collection');
let mc = require('./muscles/muscles-collection');
let getSplitType = require('./get-split-type');
let calculateFitnessLevel = require('./calculate-fitness-level');


function generateSplit(userParameters, userPreferredMuscles) {

  // mock user data
  userParameters = {
    gender: 'male',
    measuringUnit: 'metric',
    weight: 80,
    height: 180,
    experience: 'beginner',
    days: '1-2'
  };

  userPreferredMuscles = [
    mc.keys.chest.clavicularHead
  ];

  let fitnessLevel = calculateFitnessLevel(userParameters);

  if (userParameters.days === '1-2') {
    let sets = 25;
    let workouts = {};

    // generate full body workout
    let trainedMuscles = [
      mc.keys.shoulders.anteriorHead,
      mc.keys.shoulders.posteriorHead,
      mc.keys.shoulders.lateralHead,

      mc.keys.chest.clavicularHead,
      mc.keys.chest.sternalHead,

      mc.keys.triceps.longHead,
      mc.keys.triceps.shortHead,

      mc.keys.legs.quadriceps,
      mc.keys.legs.hamstrings,
      mc.keys.legs.glutes
    ];


    let preferredMuscles = _.clone(userPreferredMuscles);
    let mevMultiplier = 1;
    let mrvMultiplier = fitnessLevel * 1;
    let minIsolationSetsCount = 2;
    let minExerciseSetsCount = 2;
    let maxExerciseSetsCount = 5;

    let workout = generateVolume({
      trainedMuscles,
      preferredMuscles,
      sets,
      mevMultiplier,
      mrvMultiplier,
      minIsolationSetsCount,
      minExerciseSetsCount,
      maxExerciseSetsCount
    });

    console.log(workout);
  } else if (userParameters === '3-4') {

  } else {

  }

}


// TODO (optional): add max sets for each exercise
// TODO (optional): add constraint for minimum compound lifts; add type parameter to exercise collection
/**
 * Get parameters object and returns workout array in the form: [{exerciseName: setsCount}]
 * @param parameters: <Array>trainedMuscles, <Array>preferredMuscles, <Int>sets, <Float>mevMultiplier, <Float>mrvMultiplier, <Int>minIsolationSetsCount, <Int>minExerciseSetsCount, <Int>maxExerciseSetsCount
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


  // ILPP model constraints
  let constraints = {};
  // ILPP model variables
  let variables = {};

  constraints.sets = {
    max: sets
  };

  let isolationExercisesForPreferredMuscles = [];

  muscles.forEach((muscle) => {
    constraints[muscle.key] = {};
    // do not overtrain muscles
    constraints[muscle.key].max = (muscle.mrv * 100 /*in percentage*/) * mrvMultiplier;

    // if muscle must be trained add MIN volume constraint
    if (trainedMuscles.indexOf(muscle.key) >= 0) {
      constraints[muscle.key].min = (muscle.mev * 100 /*in percentage*/) * mevMultiplier;
    }
    // if muscles is preferred, get its isolation exercise
    if (preferredMuscles.indexOf(muscle.key) >= 0) {
      isolationExercisesForPreferredMuscles.push(getIsolationExerciseKey(muscle.key));
    }
  });

  console.log(isolationExercisesForPreferredMuscles);

  // create int and binaries variables types
  let ints = {};
  let binaries = {};
  exercises.forEach((exercise) => {
    // create ILPP constraints for each exercise
    constraints[exercise.key] = {};
    // create ILPP variable for each exercise
    let exerciseVar = {};

    // if the exercise isolates any of the maximum preferred muscles add it
    if (isolationExercisesForPreferredMuscles.indexOf(exercise.key) >= 0) {
      constraints[exercise.key].min = minIsolationSetsCount;
    } else {
      // the exercise sets can be 0 or in the range [min, max]
      // there is no SEC type in jsLpSolver, so we create a fix by using a slack variable for each exercise
      constraints[exercise.key].min = minExerciseSetsCount;
      binaries[`${exercise.key}_slack`] = 1;
      constraints[`${exercise.key}_slack`] = {max: 1};
      variables[`${exercise.key}_slack`] = {[exercise.key]: maxExerciseSetsCount, [`${exercise.key}_slack`]: 1};
      exerciseVar[`${exercise.key}_slack`] = 1 / maxExerciseSetsCount;
    }
    constraints[exercise.key].max = maxExerciseSetsCount;

    exerciseVar.sets = 1;
    exerciseVar[exercise.key] = 1;

    // calculate exercise volume for the muscles it trains and are chosen
    let trainedMusclesVolume = 0;
    _.forOwn(exercise.musclesUsed, (percentage, mKey) => {
      exerciseVar[mKey] = percentage;
      if (trainedMuscles.indexOf(mKey) >= 0) {
        trainedMusclesVolume += percentage;
      }
    });


    exerciseVar['trainedMusclesVolume'] = trainedMusclesVolume;
    variables[exercise.key] = exerciseVar;
    ints[exercise.key] = 1;
  });


  console.log(constraints);
  console.log(variables);
  console.log(ints);
  console.log(binaries);
  console.log('__________________________________________');
  console.log('SOLUTION');

  let result = lpSolver.Solve({
    optimize: 'trainedMusclesVolume',
    opType: 'max',
    constraints: constraints,
    variables: variables,
    ints,
    binaries
  });
  console.log(result);

  let workout = [];
  _.forOwn(result, (item, key) => {
    console.log(item, key);
    if (key.indexOf('slack') < 0 && item > 0
      && !(key === 'feasible' || key === 'result' || key === 'bounded')) {
      workout.push({key: key, sets: item})
    }
  });
  return workout;
}


function getIsolationExerciseKey(muscleKey) {
  let currentExerciseKey = '';
  let currentMaxPercentage = 0;
  ec.exercises.forEach((exercise) => {
    _.forOwn(exercise.musclesUsed, (percentage, mKey) => {
      if (mKey === muscleKey && percentage >= currentMaxPercentage) {
        currentExerciseKey = exercise.key;
        currentMaxPercentage = percentage;
      }
    })
  });


  console.log('__________________________');
  console.log(currentExerciseKey, currentMaxPercentage);
  console.log('________________________');

  return currentExerciseKey;
}


generateSplit();