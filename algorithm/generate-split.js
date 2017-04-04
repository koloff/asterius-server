let _ = require('lodash');
let lpSolver = require('javascript-lp-solver');
let ec = require('./exercises/exercises-collection');
let mc = require('./muscles/muscles-collection');
let getSplitType = require('./get-split-type');


function generateSplit(userParameters, userPreferredMuscles) {
  // mock user data
  userParameters = {
    hasParameters: false,

    gender: 'male',
    measuringUnit: 'metric',
    weight: null,
    height: null,
    experience: '',
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: true,
      saturday: false,
      sunday: false
    }
  };

  userPreferredMuscles = [
    mc.keys.shoulders.lateralHead,
    mc.keys.chest.clavicularHead,
    mc.keys.chest.sternalHead,
    mc.keys.legs.calves,
    mc.keys.legs.quadriceps
  ];

  let splitType = getSplitType(userParameters);
  console.log(splitType);


  let preferredMuscles = [
    mc.keys.shoulders.lateralHead,
    mc.keys.chest.clavicularHead,
    mc.keys.chest.sternalHead,
  ];
  let trainedMuscles = [
    mc.keys.shoulders.posteriorHead,
    mc.keys.shoulders.lateralHead,
    mc.keys.chest.clavicularHead,
    mc.keys.chest.sternalHead,
  ];
  let sets = 16;
  let minVolumeMultiplier = 0.33;
  let maxVolumeMultiplier = 2;
  let minIsolationSetsCount = 1;
  let maxExerciseSetsCount = 5;

  let workout = generateVolume({
    trainedMuscles,
    preferredMuscles,
    sets,
    minVolumeMultiplier,
    maxVolumeMultiplier,
    minIsolationSetsCount,
    maxExerciseSetsCount
  });

  console.log(workout);
}


// TODO (optional): add max sets for each exercise
// TODO (optional): add constraint for minimum compound lifts; add type parameter to exercise collection
/**
 * Get parameters object and returns workout array in the form: [{exerciseName: setsCount}]
 * @param parameters: <Array>trainedMuscles, <Array>preferredMuscles, <Int>sets, <Float>minVolumeMultiplier, <Float>maxVolumeMultiplier, <Int>minIsolationSetsCount, <Int>maxExerciseSetsCount
 */
function generateVolume(parameters) {
  let trainedMuscles = parameters.trainedMuscles;
  let preferredMuscles = parameters.preferredMuscles;
  let sets = parameters.sets;
  let minVolumeMultiplier = parameters.minVolumeMultiplier;
  let maxVolumeMultiplier = parameters.maxVolumeMultiplier;
  let minIsolationSetsCount = parameters.minIsolationSetsCount;
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
    constraints[muscle.key].max = (muscle.mrv * 100 /*in percentage*/) * maxVolumeMultiplier;

    // if muscle must be trained add MIN volume constraint
    if (trainedMuscles.indexOf(muscle.key) >= 0) {
      constraints[muscle.key].min = (muscle.mrv * 100 /*in percentage*/) * minVolumeMultiplier;
    }
    // if muscles is preferred, get its isolation exercise
    if (preferredMuscles.indexOf(muscle.key) >= 0) {
      isolationExercisesForPreferredMuscles.push(getIsolationExerciseKey(muscle.key));
    }
  });


  exercises.forEach((exercise) => {
    // create ILPP constraints depending on the exercise
    constraints[exercise.key] = {};
    // if the exercise isolates any of the maximum preferred muscles add it
    if (isolationExercisesForPreferredMuscles.indexOf(exercise.key) >= 0) {
      constraints[exercise.key].min = minIsolationSetsCount;
    }
    constraints[exercise.key].max = maxExerciseSetsCount;


    // create ILPP variable for each exercise
    let exerciseVar = {};
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
  });


  return lpSolver.Solve({
    optimize: 'trainedMusclesVolume',
    opType: 'max',
    constraints: constraints,
    variables: variables,
  });
}


function getIsolationExerciseKey(muscleKey) {
  let currentExerciseKey = '';
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