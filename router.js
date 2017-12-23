let router = require('express').Router();
let controllers = require('./controllers');

router.route('/muscles/collection')
  .get(controllers.muscles.getMusclesCollection);

router.route('/exercises/collection')
  .get(controllers.exercises.getExercisesCollection);


router.route('/algorithm/generate-workouts')
  .post(controllers.algorithm.generateSplit);

router.route('/algorithm/estimated-values/:workoutDate/:exerciseIndex/:setIndex')
  .get(controllers.auth.authenticate, controllers.algorithm.createEstimatedValues);

module.exports = router;