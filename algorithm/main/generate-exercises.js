let _ = require('lodash');
let getExercise = require('../exercise/exercise-get');
let getMuscle = require('../muscle/muscle-get');
let roundNumber = require('./round-number');
let calculateWeeklyMrv = require('./calculate-weekly-mrv');
let calculateDailyMrv = require('./calculate-daily-mrv');
let filterImportantExercises = require('./filter-important-exercises');

module.exports = function(userData, ec, mc) {
  let exercises = [];
  let importantExercises = [];
  let exerciseCollection = _.cloneDeep(ec);
  let muscleCollection = _.cloneDeep(mc);
  let dailyMrv;//maximum volume to achieve in a session; this has to be manipulated by age and training experience
  let totalVolumeDone = 0;
  let mrvWeek = {}; //has mrv per training session weekly and exercise repetition;


  dailyMrv = calculateDailyMrv(userData);

  mrvWeek = calculateWeeklyMrv(dailyMrv, userData.trainingDays.length);



  importantExercises = filterImportantExercises(muscleCollection, exerciseCollection, userData);



  importantExercises.forEach((importantExercise) => {
    let muscleUsedVolume = 0;
    let muscleUsedMRV = 0;
    let toAdd = false;
    let volumeToCheck = 0;
    let muscle = {};
    let number = 0;
    let sets = 0;
    for(let muscleUsed of importantExercise.musclesUsed){
      muscle = getMuscle(muscleUsed.key, muscleCollection);
      muscleUsedMRV = muscle.mrv;

      console.log(muscleUsed.name, totalVolumeDone + roundNumber(roundNumber(muscleUsed.percentage / 100 * 3) * mrvWeek.exerciseRepetition ));

      if (muscle.volume + roundNumber((muscleUsed.percentage / 100 * 3) * mrvWeek.exerciseRepetition) <= muscleUsedMRV
        && totalVolumeDone + roundNumber((muscleUsed.percentage / 100 * 3) * mrvWeek.exerciseRepetition <= mrvWeek.mrv)) {
        toAdd = true;
        sets = 3;
      }
      else if (muscle.volume + roundNumber(roundNumber(muscleUsed.percentage / 100 * 2) * mrvWeek.exerciseRepetition) <= muscleUsedMRV
        && totalVolumeDone + roundNumber((muscleUsed.percentage / 100 * 2) * mrvWeek.exerciseRepetition)) {
        toAdd = true;
        sets = 2;
      }
      else {
        toAdd = false;
        break;
      }
    }


    for(let exercise of exercises){
      console.log();
      console.log(exercise.key, importantExercise.key);
      if (exercise.key === importantExercise.key) {
        console.log('important exersize key doublation');
        console.log(exercise, importantExercise);

        toAdd = false;
      }
    }



    if (toAdd == true) {
      importantExercise.musclesUsed.forEach((muscleUsed) => {
        muscle = getMuscle(muscleUsed.key, muscleCollection);
        muscle.volume += roundNumber(roundNumber(muscleUsed.percentage / 100 * sets) * mrvWeek.exerciseRepetition);
        totalVolumeDone += muscle.volume;
      });
      exercises.push({
        key: importantExercise.key,
        sets: sets
      })
    }

  });





  exerciseCollection.forEach((exercise) => {
    let muscleUsedVolume = 0;
    let muscleUsedMRV = 0;
    let toAdd = false;
    let volumeToCheck = 0;
    let muscle = {};
    let number = 0;
    let sets = 0;
    for(let muscleUsed of exercise.musclesUsed){
      muscle = getMuscle(muscleUsed.key, muscleCollection);
      muscleUsedMRV = muscle.mrv;
      if (muscle.volume + roundNumber(roundNumber(muscleUsed.percentage / 100 * 3) * mrvWeek.exerciseRepetition
          && totalVolumeDone + roundNumber((muscleUsed.percentage / 100 * 3) * mrvWeek.exerciseRepetition)) <= muscleUsedMRV) {
        toAdd = true;
        sets = 3;
      }
      else if (muscle.volume + roundNumber(roundNumber(muscleUsed.percentage / 100 * 2) * mrvWeek.exerciseRepetition
          && totalVolumeDone + roundNumber((muscleUsed.percentage / 100 * 2) * mrvWeek.exerciseRepetition)) <= muscleUsedMRV) {
        toAdd = true;
        sets = 2;
      }
      else {
        toAdd = false;
        break;
      }
    }

    for(let exercise of exercises){
      if (exercise.key === exercise.key) {
        toAdd = false;
      }
    }

    if (toAdd == true) {
      exercise.musclesUsed.forEach((muscleUsed) => {
        console.log('added');
        muscle = getMuscle(muscleUsed.key, muscleCollection);
        muscle.volume += roundNumber(roundNumber(muscleUsed.percentage / 100 * sets) * mrvWeek.exerciseRepetition);
        totalVolumeDone += muscle.volume;
      });
      exercises.push({
        key: exercise.key,
        sets: sets
      })
    }

  });
  console.log(exercises);
  return exercises;
};
