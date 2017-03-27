let roundNumber = require('./round-number');
let getMuscle = require('../muscle/muscle-get');

module.exports = function(exerciseCollection, muscleCollection) {
  let exercises = [];

  exerciseCollection.forEach((importantExercise) => {
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
      if (muscle.volume + roundNumber((muscleUsed.percentage / 100 * 3)) <= muscleUsedMRV) {
        toAdd = true;
        sets = 3;
      }
      else if (muscle.volume + roundNumber((muscleUsed.percentage / 100 * 2)) <= muscleUsedMRV) {
        toAdd = true;
        sets = 2;
      }
      else {
        toAdd = false;
        break;
      }
    }

    if (toAdd == true) {
      importantExercise.musclesUsed.forEach((muscleUsed) => {
        muscle = getMuscle(muscleUsed.key, muscleCollection);
        muscle.volume += roundNumber((muscleUsed.percentage / 100 * sets));
      });

      exercises.push({
        key: importantExercise.key,
        sets: sets
      })
    }

  });
};