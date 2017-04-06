let _ = require('lodash');
let mc = require('../muscles/muscles-collection');
let Exercise = require('./exercise');
let keys = require('./exercises-keys');


function getExercise(key) {
  return _.find(function(exercise) {
    return exercise.key === key;
  });
}

const types = {
  compound: 'compound',
  isolation: 'isolation'
};

//noinspection JSUnresolvedFunction
let exercises = [

  // Chest

  new Exercise({
    key: keys.chest.dumbbellBenchPress,
    type: types.compound,
    musclesUsed: {
      [mc.keys.chest.sternalHead]: 45,
      [mc.keys.chest.clavicularHead]: 15,
      [mc.keys.shoulders.anteriorHead]: 20,
      [mc.keys.triceps.longHead]: 10,
      [mc.keys.triceps.shortHead]: 10
    },
    info: {
      name: 'Dumbbell Bench Press',
      group: 'Chest'
    }
  }),

  new Exercise({
    key: keys.chest.dumbbellInclineBenchPress,
    type: types.compound,
    musclesUsed: {
      [mc.keys.chest.clavicularHead]: 40,
      [mc.keys.chest.sternalHead]: 20,
      [mc.keys.shoulders.anteriorHead]: 20,
      [mc.keys.triceps.longHead]: 10,
      [mc.keys.triceps.shortHead]: 10,
    },
    info: {
      name: 'Incline Dumbbell Bench Press',
      group: 'Chest'
    }
  }),

  new Exercise({
    key: keys.chest.lowCableCrossover,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.chest.sternalHead]: 70,
      [mc.keys.shoulders.anteriorHead]: 20,
      [mc.keys.chest.clavicularHead]: 10
    },
    info: {
      name: 'Low Cable Crossover',
      group: 'Chest'
    }
  }),

  new Exercise({
    key: keys.chest.highCableCrossover,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.chest.clavicularHead]: 65,
      [mc.keys.shoulders.anteriorHead]: 25,
      [mc.keys.chest.sternalHead]: 10
    },
    info: {
      name: 'High Cable Crossover',
      group: 'Chest'
    }
  }),


  // Shoulders

  new Exercise({
    key: keys.shoulders.lateralRaise,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.shoulders.lateralHead]: 60,
      [mc.keys.shoulders.anteriorHead]: 15,
      [mc.keys.shoulders.posteriorHead]: 15,
      [mc.keys.back.upperTrapezius]: 10
    },
    info: {
      name: 'Lateral Raise',
      group: 'Shoulders'
    }
  }),

  new Exercise({
    key: keys.shoulders.dumbbellShoulderPress,
    type: types.compound,
    musclesUsed: {
      [mc.keys.shoulders.anteriorHead]: 35,
      [mc.keys.shoulders.lateralHead]: 35,
      [mc.keys.shoulders.posteriorHead]: 10,
      [mc.keys.triceps.longHead]: 10,
      [mc.keys.triceps.shortHead]: 10,
    },
    info: {
      name: 'Dumbbell Shoulder Press',
      group: 'Shoulders'
    }
  }),

  new Exercise({
    key: keys.shoulders.reversePecDeck,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.shoulders.posteriorHead]: 60,
      [mc.keys.back.upperTrapezius]: 20,
      [mc.keys.back.middleBack]: 20
    },
    info: {
      name: 'Reverse Pec-Deck',
      group: 'Shoulders'
    }
  }),


  //Back

  new Exercise({
    key: keys.back.latPulldownWideGrip,
    type: types.compound,
    musclesUsed: {
      [mc.keys.back.lats]: 35,
      [mc.keys.back.middleBack]: 25,
      [mc.keys.back.rotatorCuff]: 15,
      [mc.keys.biceps.shortHead]: 12,
      [mc.keys.biceps.longHead]: 13,
    },
    info: {
      name: 'Wide Grip Lat Pulldown',
      group: 'Back'
    }
  }),

  new Exercise({
    key: keys.back.cableRow,
    type: types.compound,
    musclesUsed: {
      [mc.keys.back.middleBack]: 50,
      [mc.keys.back.lats]: 30,
      [mc.keys.shoulders.posteriorHead]: 5,
      [mc.keys.biceps.shortHead]: 5,
      [mc.keys.biceps.longHead]: 5,
      [mc.keys.forearms.brachioradialis]: 5,
      [mc.keys.forearms.flexors]: 5
    },
    info: {
      name: 'Cable Row',
      group: 'Back'
    }
  }),

  // new Exercise({
  //   key: keys.back.straightArmPulldown,
  //   type: types.isolation,
  //   musclesUsed: {
  //     [mc.keys.back.lats]: 60,
  //     [mc.keys.back.middleBack]: 20,
  //     [mc.keys.shoulders.posteriorHead]: 10,
  //     [mc.keys.triceps.longHead]: 10
  //   },
  //   info: {
  //     name: 'Straight Arm Pulldown',
  //     group: 'Back'
  //   }
  // }),

  new Exercise({
    key: keys.back.dumbbellShrug,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.back.upperTrapezius]: 80,
      [mc.keys.back.middleBack]: 10,
      [mc.keys.forearms.flexors]: 10
    },
    info: {
      name: 'Dumbbell Shrugs',
      group: 'Back'
    }
  }),

  new Exercise({
    key: keys.back.cableExternalRotation,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.back.rotatorCuff]: 70,
      [mc.keys.shoulders.posteriorHead]: 20,
      [mc.keys.forearms.extensors]: 10
    },
    info: {
      name: 'Cable External Rotation',
      group: 'Back'
    }
  }),


  //Biceps

  new Exercise({
    key: keys.biceps.inclineDumbbellCurl,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.biceps.longHead]: 50,
      [mc.keys.biceps.shortHead]: 40,
      [mc.keys.forearms.flexors]: 5,
      [mc.keys.forearms.brachioradialis]: 5
    },
    info: {
      name: 'Incline Dumbbell Curl',
      group: 'Biceps'
    }
  }),

  new Exercise({
    key: keys.biceps.barbellCurl,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.biceps.longHead]: 45,
      [mc.keys.biceps.shortHead]: 45,
      [mc.keys.forearms.flexors]: 5,
      [mc.keys.forearms.brachioradialis]: 5
    },
    info: {
      name: 'Barbell Curl',
      group: 'Biceps'
    }
  }),

  new Exercise({
    key: keys.biceps.overheadCableCurl,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.biceps.shortHead]: 50,
      [mc.keys.biceps.longHead]: 40,
      [mc.keys.forearms.flexors]: 5,
      [mc.keys.forearms.brachioradialis]: 5
    },
    info: {
      name: 'Overhead Cable Curl',
      group: 'Biceps'
    }
  }),


  //Triceps

  new Exercise({
    key: keys.triceps.seatedTricepsPress,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.triceps.longHead]: 60,
      [mc.keys.triceps.shortHead]: 40
    },
    info: {
      name: 'Seated Triceps Press',
      group: 'Triceps'
    }
  }),

  new Exercise({
    key: keys.triceps.ropePushdown,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.triceps.longHead]: 50,
      [mc.keys.triceps.shortHead]: 50
    },
    info: {
      name: 'Rope Pushdown',
      group: 'Triceps'
    }
  }),

  new Exercise({
    key: keys.triceps.skullCrushers,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.triceps.longHead]: 60,
      [mc.keys.triceps.shortHead]: 40
    },
    info: {
      name: 'Skull Crusher',
      group: 'Triceps'
    }
  }),


  //Abs

  new Exercise({
    key: keys.core.crunches,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.core.abs]: 70,
      [mc.keys.core.obliques]: 30
    },
    info: {
      name: 'Crunch',
      group: 'Core'
    }
  }),

  new Exercise({
    key: keys.core.twistedCrunch,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.core.abs]: 55,
      [mc.keys.core.obliques]: 45
    },
    info: {
      name: 'Twisted Crunch',
      group: 'Core'
    }
  }),


  //Legs

  new Exercise({
    key: keys.legs.barbellSquat,
    type: types.compound,
    musclesUsed: {
      [mc.keys.legs.quadriceps]: 35,
      [mc.keys.legs.hamstrings]: 15,
      [mc.keys.legs.glutes]: 30,
      [mc.keys.legs.calves]: 10,
      [mc.keys.legs.hamstrings]: 10
    },
    info: {
      name: 'Barbell Squat',
      group: 'Legs'
    }
  }),



  new Exercise({
    key: keys.legs.legExtension,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.legs.quadriceps]: 100
    },
    info: {
      name: 'Leg Extension',
      group: 'Legs'
    }
  }),

  new Exercise({
    key: keys.legs.legCurl,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.legs.hamstrings]: 75,
      [mc.keys.legs.glutes]: 25
    },
    info: {
      name: 'Leg Curl',
      group: 'Legs'
    }
  }),

  new Exercise({
    key: keys.legs.smithMachineCalfRaise,
    type: types.isolation,
    musclesUsed: {
      [mc.keys.legs.calves]: 100
    },
    info: {
      name: 'Smith Machine Calf Raise',
      group: 'Legs'
    }
  })


];

module.exports = {
  keys, getExercise, exercises
};