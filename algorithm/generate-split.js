let _ = require('lodash');
let mc = require('./muscles/muscles-collection');

let generateVolume = require('./generate-volume');
let calculateFitnessLevel = require('./calculate-fitness-level');
let splits = require('./splits');

function generateSplit(userParameters, userPreferredMuscles) {

  // mock user data
  userParameters = {
    gender: 'male',
    measuringUnit: 'metric',
    weight: 80,
    height: 180,
    experience: 'beginner',
    days: '3-4'
  };

  userPreferredMuscles = [
    mc.keys.chest.clavicularHead,
    mc.keys.chest.sternalHead,
    mc.keys.triceps.longHead,
    mc.keys.shoulders.lateralHead,
    mc.keys.biceps.shortHead,
    mc.keys.core.abs
  ];

  let fitnessLevel = calculateFitnessLevel(userParameters);

  // At 1-2 training sessions per week generate full body split
  if (userParameters.days === '1-2') {
    let sets = 24;
    let mevMultiplier = 1.1;
    let mrvMultiplier = fitnessLevel * 1;
    let minIsolationSetsCount = 2;
    let minExerciseSetsCount = 2;
    let maxExerciseSetsCount = 5;

    // generate full body workout
    let trainedMuscles = _.clone(splits.fullBody);

    let preferredMuscles = _.clone(userPreferredMuscles);

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
  }

  // At 3-4 training sessions per week generate upper/lower split
  else if (userParameters.days === '3-4') {
    let sets = 22;
    let mevMultiplier = 1.1;
    let mrvMultiplier = fitnessLevel * 1;
    let minIsolationSetsCount = 3;
    let minExerciseSetsCount = 2;
    let maxExerciseSetsCount = 4;

    // generate upper body workout
    let upperTrainedMuscles = _.clone(splits.upperBody);

    let upperBodyPreferredMuscles = [];
    userPreferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('upperBody') >= 0) {
        upperBodyPreferredMuscles.push(muscle.key)
      }
    });

    let workoutA = generateVolume({
      trainedMuscles: upperTrainedMuscles,
      preferredMuscles: upperBodyPreferredMuscles,
      sets,
      mevMultiplier,
      mrvMultiplier,
      minIsolationSetsCount,
      minExerciseSetsCount,
      maxExerciseSetsCount
    });

    if (!workoutA) {
      workoutA = generateVolume({
        trainedMuscles: upperTrainedMuscles,
        preferredMuscles: upperBodyPreferredMuscles,
        sets,
        mevMultiplier,
        mrvMultiplier,
        minIsolationSetsCount: 0,
        minExerciseSetsCount,
        maxExerciseSetsCount
      });
    }


    // generate lower body workout
    let lowerTrainedMuscles = _.clone(splits.lowerBody);

    let lowerBodyPreferredMuscles = [];
    userPreferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('lowerBody') >= 0 || muscle.info.group === 'Core') {
        upperBodyPreferredMuscles.push(muscle.key)
      }
    });

    let workoutB = generateVolume({
      trainedMuscles: lowerTrainedMuscles,
      preferredMuscles: lowerBodyPreferredMuscles,
      sets,
      mevMultiplier,
      mrvMultiplier,
      minIsolationSetsCount,
      minExerciseSetsCount,
      maxExerciseSetsCount
    });

    if (!workoutB) {
      workoutB = generateVolume({
        trainedMuscles: lowerTrainedMuscles,
        preferredMuscles: lowerBodyPreferredMuscles,
        sets,
        mevMultiplier,
        mrvMultiplier,
        minIsolationSetsCount: 0,
        minExerciseSetsCount,
        maxExerciseSetsCount
      });
    }


    console.log(workoutB);

  }



  // At 5-6 training sessions per week generate push/pull/legs split
  else {

  }
}

generateSplit();