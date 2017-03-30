let router = require('express').Router();
let controllers = require('./controllers');

router.route('/muscles/collection')
  .get(controllers.muscles.getMusclesCollection);

router.route('/exercises/collection')
  .get(controllers.exercises.getExercisesCollection);

router.route('/algorithm/generate-exercises')
  .get(controllers.auth.authenticate, controllers.algorithm.generateExercises);

module.exports = router;