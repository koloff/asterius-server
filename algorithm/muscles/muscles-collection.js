let _ = require('lodash');
let Muscle = require('./muscle');
let keys = require('./muscles-keys');

function get(key) {
  return _.find(function(muscle) {
    return muscle.key === key;
  });
}

let types = {
  upperBody: 'upperBody',
  lowerBody: 'lowerBody',
  push: 'push',
  pull: 'pull',
  other: 'other'
};

// mev - minimum effective volume for 1 session
// mrv - minimum recoverable volume for 1 session
let muscles = [
  new Muscle({
    key: keys.shoulders.anteriorHead,
    mev: 1,
    mrv: 5,
    types: [types.upperBody, types.push],
    info: {
      group: 'Shoulders',
      name: 'Deltoid Anterior Head',
      broName: 'Front Delts',
      color: '#ffae00'
    }
  }),
  new Muscle({
    key: keys.shoulders.lateralHead,
    mev: 1,
    mrv: 5,
    types: [types.upperBody, types.push],
    info: {
      group: 'Shoulders',
      name: 'Deltoid Lateral Head',
      broName: 'Side Delts',
      color: '#ffcf02'
    }
  }),
  new Muscle({
    key: keys.shoulders.posteriorHead,
    mev: 1,
    mrv: 5,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Shoulders',
      name: 'Deltoid Posterior Head',
      broName: 'Rear Delts',
      color: '#ff6c06'
    }
  }),
  new Muscle({
    key: keys.chest.clavicularHead,
    mev: 2,
    mrv: 6,
    types: [types.upperBody, types.push],
    info: {
      group: 'Chest',
      name: 'Pectoralis Major Clavicular Head',
      broName: 'Upper Chest',
      color: '#0095ff'
    }
  }),
  new Muscle({
    key: keys.chest.sternalHead,
    mev: 2,
    mrv: 6,
    types: [types.upperBody, types.push],
    info: {
      group: 'Chest',
      name: 'Pectoralis Major Sternal Head',
      broName: 'Lower Chest',
      color: '#0028ff'
    }
  }),
  new Muscle({
    key: keys.back.upperTrapezius,
    mev: 0.7,
    mrv: 4,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Back',
      name: 'Trapezius Superior Fibers',
      broName: 'Upper Traps',
      color: '#00ff46'
    }
  }),
  new Muscle({
    key: keys.back.middleBack,
    mev: 1.5,
    mrv: 6,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Back',
      name: 'Trapezius Inferior Fibers, Rhomboid',
      broName: 'Middle Back',
      color: '#37ff00'
    }
  }),
  new Muscle({
    key: keys.back.lats,
    mev: 1.5,
    mrv: 6,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Back',
      name: 'Latissimus Dorsi',
      broName: 'Lats',
      color: '#ffffff'
    }
  }),
  new Muscle({
    key: keys.back.rotatorCuff,
    mev: 0.7,
    mrv: 4,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Back',
      name: 'Teres Minor, Infraspinatus, Supraspinatus, Subscapularis',
      broName: 'Rotator Cuff',
      color: '#ffffff'
    }
  }),
  new Muscle({
    key: keys.core.abs,
    mev: 1.3,
    mrv: 4,
    types: [types.upperBody, types.other],
    info: {
      group: 'Core',
      name: 'Rectus Abdominis',
      broName: 'Abs',
      color: '#ffffff'
    }
  }),
  new Muscle({
    key: keys.core.obliques,
    mev: 0.7,
    mrv: 4,
    types: [types.upperBody, types.other],
    info: {
      group: 'Core',
      name: 'Abdominal Obliques',
      broName: 'Obliques',
      color: '#ffffff'
    }
  }),
  new Muscle({
    key: keys.biceps.longHead,
    mev: 1,
    mrv: 4,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Biceps',
      name: 'Biceps Brachii Long Head',
      broName: 'Biceps Outer Head',
      color: '#ffffff'
    }
  }),
  new Muscle({
    key: keys.biceps.shortHead,
    mev: 0.8,
    mrv: 4,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Biceps',
      name: 'Biceps Brachii Short Head',
      broName: 'Biceps Inner Head',
      color: '#ffffff'
    }
  }),
  new Muscle({
    key: keys.triceps.longHead,
    mev: 1,
    mrv: 6,
    types: [types.upperBody, types.push],
    info: {
      group: 'Triceps',
      name: 'Triceps Brachii Long Head',
      broName: 'Triceps Long Head',
      color: '#e500ff'
    }
  }),
  new Muscle({
    key: keys.triceps.shortHead,
    mev: 0.7,
    mrv: 5,
    types: [types.upperBody, types.push],
    info: {
      group: 'Triceps',
      name: 'Triceps Brachii Lateral Head',
      broName: 'Triceps Outer Head',
      color: '#c100ff'
    }
  }),
  new Muscle({
    key: keys.forearms.brachioradialis,
    mev: 0.7,
    mrv: 4,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Forearms',
      name: 'Brachioradialis',
      broName: 'Brachioradialis',
      color: '#ffffff'
    }
  }),
  new Muscle({
    key: keys.forearms.flexors,
    mev: 0.3,
    mrv: 3,
    types: [types.upperBody, types.other],
    info: {
      group: 'Forearms',
      name: 'Flexors Group',
      broName: 'Flexors',
      color: '#ffffff'
    }
  }),
  new Muscle({
    key: keys.forearms.extensors,
    mev: 0.3,
    mrv: 3,
    types: [types.upperBody, types.other],
    info: {
      group: 'Forearms',
      name: 'Extensors Group',
      broName: 'Extensors',
      color: '#ffffff'
    }
  }),
  new Muscle({
    key: keys.legs.quadriceps,
    mev: 1.5,
    mrv: 7,
    types: [types.lowerBody],
    info: {
      group: 'Legs',
      name: 'Quadriceps Group',
      broName: 'Quads',
      color: '#ffffff'
    }
  }),
  new Muscle({
    key: keys.legs.hamstrings,
    mev: 1.5,
    mrv: 7,
    types: [types.lowerBody],
    info: {
      group: 'Legs',
      name: 'Hamstrings Group',
      broName: 'Hamstrings',
      color: '#ffffff'
    }
  }),
  new Muscle({
    key: keys.legs.glutes,
    mev: 1,
    mrv: 7,
    types: [types.lowerBody],
    info: {
      group: 'Legs',
      name: 'Gluteus Group',
      broName: 'Glutes',
      color: '#ffffff'
    }
  }),
  new Muscle({
    key: keys.legs.calves,
    mev: 0.5,
    mrv: 5,
    types: [types.lowerBody, types.other],
    info: {
      group: 'Legs',
      name: 'Soleus, Gastrocnemius',
      broName: 'Calves',
      color: '#ffffff'
    }
  }),

];

let sum = 0;
muscles.forEach((muscle) => {
  sum+=muscle.mev
});


console.log(sum);
module.exports = {
  keys, muscles, get
};