let router = require('express').Router();
let c = require('./controllers');


router.route('/muscles/collection')
  .get(c.muscles.getMusclesCollection);

router.route('/algorithm/generate-exercises')
  .get(c.algorithm.generateExercises);

module.exports = router;