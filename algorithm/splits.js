let mc = require('./muscles/muscles-collection');

module.exports = {
  fullBody: [
    mc.ids.chest.clavicularHead,
    mc.ids.chest.sternalHead,

    mc.ids.shoulders.lateralHead,
    mc.ids.shoulders.anteriorHead,
    mc.ids.shoulders.posteriorHead,

    mc.ids.back.lats,
    mc.ids.back.middleBack,

    mc.ids.triceps.longHead,
    mc.ids.triceps.shortHead,

    mc.ids.biceps.longHead,
    mc.ids.biceps.shortHead,

    mc.ids.legs.quadriceps,
    mc.ids.legs.hamstrings,
    mc.ids.legs.glutes
  ],

  upperBody: [
    mc.ids.chest.clavicularHead,
    mc.ids.chest.sternalHead,

    mc.ids.shoulders.lateralHead,
    mc.ids.shoulders.anteriorHead,
    mc.ids.shoulders.posteriorHead,

    mc.ids.back.lats,
    mc.ids.back.middleBack,
    mc.ids.back.rotatorCuff,

    mc.ids.biceps.longHead,
    mc.ids.biceps.shortHead,

    mc.ids.triceps.longHead,
    mc.ids.triceps.shortHead,
  ],

  lowerBody: [
    mc.ids.legs.quadriceps,
    mc.ids.legs.hamstrings,
    mc.ids.legs.glutes,
    mc.ids.legs.calves,

    mc.ids.core.abs,
    mc.ids.core.obliques,
  ],


  push: [
    mc.ids.chest.clavicularHead,
    mc.ids.chest.sternalHead,

    mc.ids.shoulders.lateralHead,
    mc.ids.shoulders.anteriorHead,
    mc.ids.shoulders.posteriorHead,

    mc.ids.triceps.longHead,
    mc.ids.triceps.shortHead,
  ],

  pull: [
    mc.ids.back.lats,
    mc.ids.back.middleBack,
    mc.ids.back.rotatorCuff,
    mc.ids.back.upperTrapezius,

    mc.ids.biceps.longHead,
    mc.ids.biceps.shortHead,
    // todo: add exercises and edit volume
    // mc.ids.forearms.brachioradialis,
    // mc.ids.forearms.extensors,
    // mc.ids.forearms.flexors
  ]


};