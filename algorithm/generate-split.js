let _ = require('lodash');
let mc = require('./muscles/muscles-collection');

let generateVolume = require('./generate-volume');
let calculateFitnessLevel = require('./calculate-fitness-level');
let splits = require('./splits');

function generateSplit(userParameters, userPreferredMuscles) {

  let fitnessLevel = calculateFitnessLevel(userParameters);

  // At 1-2 training sessions per week generate FULL BODY split
  if (userParameters.days === '1-2') {
    let fullBodyOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: 26,
      mevMultiplier: 0.9,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 2,
      minExerciseSetsCount: 2,
      maxExerciseSetsCount: 5
    };

    // generate full body workout
    fullBodyOptions.trainedMuscles = _.clone(splits.fullBody);
    fullBodyOptions.preferredMuscles = _.clone(userPreferredMuscles);

    let A = generateVolume(fullBodyOptions);
    if (!A) {
      fullBodyOptions.minIsolationSetsCount = 0;
      A = generateSplit(fullBodyOptions);
      if (!A) {
        return null;
      }
    }

    return {A};
  }

  // At 3-4 training sessions per week generate upper/lower split
  else if (userParameters.days === '3-4') {

    // Training A: UPPER BODY
    let upperOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: 22,
      mevMultiplier: 1.1,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 2,
      maxExerciseSetsCount: 4
    };

    upperOptions.trainedMuscles = _.clone(splits.upperBody);
    userPreferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('upperBody') >= 0) {
        upperOptions.preferredMuscles.push(muscle.key)
      }

    });

    let A = generateVolume(upperOptions);

    if (!A.length) {
      console.log('NO A');
      upperOptions.minIsolationSetsCount = 0;
      A = generateVolume(upperOptions);
      if (!A.length) {
        return null;
      }
    }


    // Training B: LOWER BODY
    let lowerOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: 22,
      mevMultiplier: 1,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 2,
      maxExerciseSetsCount: 4
    };

    lowerOptions.trainedMuscles = _.clone(splits.lowerBody);
    userPreferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('lowerBody') >= 0 || muscle.info.group === 'Core') {
        lowerOptions.preferredMuscles.push(muscle.key)
      }
    });

    let B = generateVolume(lowerOptions);

    if (!B) {
      upperOptions.minIsolationSetsCount = 0;
      B = generateVolume(lowerOptions);
      if (!B) {
        return null;
      }
    }

    return {A, B};
  }



  // At 5-6 training sessions per week generate push/pull/legs split
  else {
    // training A: PUSH
    let pushOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: 18,
      mevMultiplier: 1.2,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 4
    };

    pushOptions.trainedMuscles = _.clone(splits.push);
    userPreferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('push') >= 0) {
        pushOptions.preferredMuscles.push(muscle.key)
      }
    });

    let A = generateVolume(pushOptions);
    if (!A) {
      pushOptions.minIsolationSetsCount = 0;
      A = generateVolume(pushOptions);
    }

    // training B: PULL
    let pullOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: 18,
      mevMultiplier: 1.2,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 2,
      maxExerciseSetsCount: 4
    };

    pullOptions.trainedMuscles = _.clone(splits.pull);
    userPreferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('pull') >= 0) {
        pullOptions.preferredMuscles.push(muscle.key)
      }
    });

    let B = generateVolume(pullOptions);
    if (!B) {
      pullOptions.minIsolationSetsCount = 0;
      B = generateVolume(pullOptions);
    }

    // training C: LOWER BODY
    let lowerOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: 18,
      mevMultiplier: 1.2,
      mrvMultiplier: fitnessLevel * 1.1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 4
    };

    lowerOptions.trainedMuscles = _.clone(splits.lowerBody);
    userPreferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('lowerBody') >= 0 || muscle.info.group === 'Core') {
        lowerOptions.preferredMuscles.push(muscle.key)
      }
    });

    let C = generateVolume(lowerOptions);
    if (!C) {
      lowerOptions.minIsolationSetsCount = 0;
      C = generateVolume(lowerOptions);
    }

    return {A, B, C};
  }
}

// console.log(generateSplit());

module.exports = generateSplit;