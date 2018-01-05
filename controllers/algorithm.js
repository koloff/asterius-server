let database = require('../database');
let generateSplit = require('../algorithm/generate-workouts');

exports.generateWorkouts = async function(req, res) {
  try {
    let userParameters = req.body.userParameters;
    let workouts = generateSplit(userParameters);
    console.log(workouts);

    // todo create workout names from db if auth
    let letters = ['A', 'B', 'C'];
    let workoutsWithNames = workouts.map((exercises, index) => {
      return {
        name: `Workout ${letters[index]}`,
        exercises: exercises
      }
    });
    res.status(200).send({ok: true, workouts: workoutsWithNames});
  } catch (err) {
    console.log(err);
    if (err.code === 'CANNOT_GENERATE_WORKOUTS') {
      res.status(400).send({ok: false, error: err.code});
    } else {
      res.status(400).send({ok: false, error: 'ERROR'});
    }
  }
};


exports.createEstimatedValues = async function(req, res, next) {
  let uid = req.uid;

  let workoutDate = req.params.workoutDate;
  let exerciseIndex = req.params.exerciseIndex;
  let setIndex = req.params.setIndex;

  try {
    // todo
    let estimatedValues = [{type: 2, weight: 10, reps: 10}, {type: 1, weight: 10, reps: 11}];
    await database.save(`/workouts/${uid}/${workoutDate}/exercises/${exerciseIndex}/sets/${setIndex}/estimatedValues`, estimatedValues);
    await database.save(`/workouts/${uid}/${workoutDate}/exercises/${exerciseIndex}/sets/${setIndex}/isEstimated`, true);
    res.status(200).send({ok: true});
  } catch (err) {
    res.status(400).send({ok: false});
    console.log(err);
  }
};



