let mc = require('./muscles/muscles-collection');

module.exports = {
  fullBody: [
    mc.keys.shoulders.anteriorHead,
    mc.keys.shoulders.posteriorHead,
    mc.keys.shoulders.lateralHead,

    mc.keys.chest.clavicularHead,
    mc.keys.chest.sternalHead,

    mc.keys.back.lats,
    mc.keys.back.middleBack,

    mc.keys.triceps.longHead,
    mc.keys.triceps.shortHead,

    mc.keys.biceps.longHead,
    mc.keys.biceps.shortHead,

    mc.keys.legs.quadriceps,
    mc.keys.legs.hamstrings,
    mc.keys.legs.glutes
  ],

  upperBody: [
    mc.keys.chest.clavicularHead,
    mc.keys.chest.sternalHead,

    mc.keys.shoulders.anteriorHead,
    mc.keys.shoulders.posteriorHead,
    mc.keys.shoulders.lateralHead,

    mc.keys.back.lats,
    mc.keys.back.middleBack,

    mc.keys.triceps.longHead,
    mc.keys.triceps.shortHead,

    mc.keys.biceps.longHead,
    mc.keys.biceps.shortHead,
  ],

  lowerBody: [
    mc.keys.legs.quadriceps,
    mc.keys.legs.hamstrings,
    mc.keys.legs.glutes,
    mc.keys.legs.calves,

    mc.keys.core.abs,
    mc.keys.core.obliques,
  ]


};