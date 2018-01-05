let _ = require('lodash');
let mc = require('./muscles/muscles-collection');

let generateVolume = require('./generate-volume');
let calculateFitnessLevel = require('./calculate-fitness-level');
let splits = require('./splits');


function generateSingleWorkout(options) {
  let workout = generateVolume(options);
  if (!workout.length) {
    // if preferred muscles are too much, replace isolation exercises with compound lifts
    options.minIsolationSetsCount = 0;
    workout = generateVolume(options);
    // if still cannot generate volume -> remove preferred muscles
    if (!workout.length) {
      options.preferredMuscles = [];
      workout = generateVolume(options);
    }
  }
  return workout;
}

function generateWorkouts(userParameters) {
  console.log(userParameters);
  let preferredMuscles = userParameters.preferredMuscles ? userParameters.preferredMuscles.filter(function(v) {
    // removes falsy values
    return !!v;
  }) : [];

  let fitnessLevel = calculateFitnessLevel(userParameters);
  let sets = Math.round((userParameters.duration - 5) / 2.5);
  // At 1-2 training sessions per week generate FULL BODY split
  if (userParameters.days === 0) {
    let fullBodyOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mevMultiplier: 0.9,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 2,
      minExerciseSetsCount: 2,
      maxExerciseSetsCount: 5
    };

    // generate full body workout
    fullBodyOptions.trainedMuscles = _.clone(splits.fullBody);
    fullBodyOptions.preferredMuscles = _.clone(preferredMuscles);

    let fullBodyWorkout = generateSingleWorkout(fullBodyOptions);
    return [fullBodyWorkout];
  }

  // At 3-4 training sessions per week generate upper/lower split
  else if (userParameters.days === 1) {

    // Training upperBodyWorkout: UPPER BODY
    let upperOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mevMultiplier: 1.1,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 2,
      maxExerciseSetsCount: 4
    };

    upperOptions.trainedMuscles = _.clone(splits.upperBody);
    preferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('upperBody') >= 0) {
        upperOptions.preferredMuscles.push(muscle.id)
      }

    });

    let upperBodyWorkout = generateSingleWorkout(upperOptions);

    // Training loweBodyWorkout: LOWER BODY
    let lowerOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mevMultiplier: 1,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 2,
      maxExerciseSetsCount: 4
    };

    lowerOptions.trainedMuscles = _.clone(splits.lowerBody);
    preferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('lowerBody') >= 0 || muscle.info.group === 'Core') {
        lowerOptions.preferredMuscles.push(muscle.id)
      }
    });

    let loweBodyWorkout = generateSingleWorkout(lowerOptions);

    return [upperBodyWorkout, loweBodyWorkout];
  }



  // At 5-6 training sessions per week generate push/pull/legs split
  else {
    // training pushWorkout: PUSH
    let pushOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mevMultiplier: 1.2,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 4
    };

    pushOptions.trainedMuscles = _.clone(splits.push);
    preferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('push') >= 0) {
        pushOptions.preferredMuscles.push(muscle.id)
      }
    });

    let pushWorkout = generateSingleWorkout(pushOptions);

    // training pullWorkout: PULL
    let pullOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mevMultiplier: 1.2,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 2,
      maxExerciseSetsCount: 4
    };

    pullOptions.trainedMuscles = _.clone(splits.pull);
    preferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('pull') >= 0) {
        pullOptions.preferredMuscles.push(muscle.id)
      }
    });

    let pullWorkout = generateSingleWorkout(pullOptions);

    // training lowerBodyWorkout: LOWER BODY
    let lowerOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mevMultiplier: 1.2,
      mrvMultiplier: fitnessLevel * 1.1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 4
    };

    lowerOptions.trainedMuscles = _.clone(splits.lowerBody);
    preferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('lowerBody') >= 0 || muscle.info.group === 'Core') {
        lowerOptions.preferredMuscles.push(muscle.id)
      }
    });

    let lowerBodyWorkout = generateSingleWorkout(lowerOptions);

    return [pushWorkout, pullWorkout, lowerBodyWorkout];
  }
}

module.exports = generateWorkouts;