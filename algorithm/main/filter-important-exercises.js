module.exports = function(muscleCollection, exerciseCollection, userData) {
  let importantExercises = [];

  muscleCollection.forEach((muscle) => {
    muscle.volume = 0;
  });
  exerciseCollection.forEach(function(exercise) {
    let mostUsedMuscle = {};
    let mostUsedMusclePercentage = 0;
    exercise.musclesUsed.forEach(function(muscleUsed) {
      if (muscleUsed.percentage > mostUsedMusclePercentage) {
        mostUsedMuscle = muscleUsed;
        mostUsedMusclePercentage = muscleUsed.percentage;
      }
    });
    userData.priorityMuscles.forEach((priorityMuscle) => {
      if (priorityMuscle == mostUsedMuscle.key) {
        importantExercises.push(exercise);
      }
    })
  });

  return importantExercises;

};