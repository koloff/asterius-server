let database = require('../database');
let generateSplit = require('../algorithm/generate-split');

exports.generateSplit = async function(req, res) {
  let uid = req.uid;

  try {
    let userParameters = await database.get(`/userParameters/${uid}`);
    let preferredMuscles = userParameters.preferredMuscles ? userParameters.preferredMuscles.filter(function(v) {
      // removes falsy values
      return !!v;
    }) : [];

    let split = generateSplit(userParameters, preferredMuscles);
    console.log(split);
    await database.save(`/split/${uid}`, split);
    res.status(200).send({ok: true});
  } catch (err) {
    console.log(err);
    if (err.code === 'CANNOT_GENERATE_SPLIT') {
      res.status(400).send({ok: false, error: err.code});
    } else {
      res.status(400).send({ok: false, error: 'FIREBASE_ERROR'});
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
    console.log(err);
  }
};



