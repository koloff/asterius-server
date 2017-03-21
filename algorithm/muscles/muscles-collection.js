let _ = require('lodash');
let Muscle = require('./muscle');
let keys = require('./muscles-keys');

function get(key) {
  return _.find(function(muscle) {
    return muscle.key === key;
  });
}

let muscles = [
  new Muscle({
    key: keys.shoulders.anteriorHead,
    mrv: 8,
    info: {
      group: 'Shoulders',
      name: 'Deltoid Anterior Head',
      broName: 'Front Delts',
      color: "#ffae00"
    }
  }),
  new Muscle({
    key: keys.shoulders.lateralHead,

    mrv: 8,
    info: {
      group: 'Shoulders',
      name: 'Deltoid Lateral Head',
      broName: 'Side Delts',
      color: "#ffcf02"
    }
  }),
  new Muscle({
    key: keys.shoulders.posteriorHead,
    mrv: 6,
    info: {
      group: 'Shoulders',
      name: 'Deltoid Posterior Head',
      broName: 'Rear Delts',
      color: "#ff6c06"
    }
  }),
  new Muscle({
    key: keys.chest.clavicularHead,
    mrv: 10,
    info: {
      group: 'Chest',
      name: 'Pectoralis Major Clavicular Head',
      broName: 'Upper Chest',
      color: "#0095ff"
    }
  }),
  new Muscle({
    key: keys.chest.sternalHead,
    mrv: 12,
    info: {
      group: 'Chest',
      name: 'Pectoralis Major Sternal Head',
      broName: 'Lower Chest',
      color: "#0028ff"
    }
  }),
  new Muscle({
    key: keys.back.upperTrapezius,
    mrv: 6,
    info: {
      group: 'Back',
      name: 'Trapezius Superior Fibers',
      broName: 'Upper Traps',
      color: "#00ff46"
    }
  }),
  new Muscle({
    key: keys.back.middleBack,
    mrv: 10,

    info: {
      group: 'Back',
      name: 'Trapezius Inferior Fibers, Rhomboid',
      broName: 'Middle Back',
      color: "#37ff00"
    }
  }),
  new Muscle({
    key: keys.back.lats,
    mrv: 10,
    info: {
      group: 'Back',
      name: 'Latissimus Dorsi',
      broName: 'Lats',
      color: "#ffffff"
    }
  }),
  new Muscle({
    key: keys.back.rotatorCuff,
    mrv: 6,
    info: {
      group: 'Back',
      name: 'Teres Minor, Infraspinatus, Supraspinatus, Subscapularis',
      broName: 'Rotator Cuff',
      color: "#ffffff"
    }
  }),
  new Muscle({
    key: keys.core.abs,
    mrv: 8,
    info: {
      group: 'Core',
      name: 'Rectus Abdominis',
      broName: 'Abs',
      color: "#ffffff"
    }
  }),
  new Muscle({
    key: keys.core.obliques,
    mrv: 6,
    info: {
      group: 'Core',
      name: 'Abdominal Obliques',
      broName: 'Obliques',
      color: "#ffffff"
    }
  }),
  new Muscle({
    key: keys.biceps.longHead,
    mrv: 8,
    info: {
      group: 'Biceps',
      name: 'Biceps Brachii Long Head',
      broName: 'Biceps Outer Head',
      color: "#ffffff"
    }
  }),
  new Muscle({
    key: keys.biceps.shortHead,
    mrv: 8,
    info: {
      group: 'Biceps',
      name: 'Biceps Brachii Short Head',
      broName: 'Biceps Inner Head',
      color: "#ffffff"
    }
  }),
  new Muscle({
    key: keys.triceps.longHead,
    mrv: 8,
    info: {
      group: 'Triceps',
      name: 'Triceps Brachii Long Head',
      broName: 'Triceps Long Head',
      color: "#ff00c4"
    }
  }),
  new Muscle({
    key: keys.triceps.shortHead,
    mrv: 8,
    info: {
      group: 'Triceps',
      name: 'Triceps Brachii Lateral Head',
      broName: 'Triceps Outer Head',
      color: "#c100ff"
    }
  }),
  new Muscle({
    key: keys.forearms.brachioradialis,
    mrv: 6,
    info: {
      group: 'Forearms',
      name: 'Brachioradialis',
      broName: 'Brachioradialis',
      color: "#ffffff"
    }
  }),
  new Muscle({
    key: keys.forearms.flexors,
    mrv: 4,
    info: {
      group: 'Forearms',
      name: 'Flexors Group',
      broName: 'Flexors',
      color: "#ffffff"
    }
  }),
  new Muscle({
    key: keys.forearms.extensors,
    mrv: 4,
    info: {
      group: 'Forearms',
      name: 'Extensors Group',
      broName: 'Extensors',
      color: "#ffffff"
    }
  }),
  new Muscle({
    key: keys.legs.quadriceps,
    mrv: 12,
    info: {
      group: 'Legs',
      name: 'Quadriceps Group',
      broName: 'Quads',
      color: "#ffffff"
    }
  }),
  new Muscle({
    key: keys.legs.hamstrings,
    mrv: 10,
    info: {
      group: 'Legs',
      name: 'Hamstrings Group',
      broName: 'Hamstrings',
      color: "#ffffff"
    }
  }),
  new Muscle({
    key: keys.legs.glutes,
    mrv: 10,
    info: {
      group: 'Legs',
      name: 'Gluteus Group',
      broName: 'Glutes',
      color: "#ffffff"
    }
  }),
  new Muscle({
    key: keys.legs.calves,
    mrv: 8,
    info: {
      group: 'Legs',
      name: 'Soleus, Gastrocnemius',
      broName: 'Calves',
      color: "#ffffff"
    }
  }),

];

module.exports = {
  keys, muscles, get
};