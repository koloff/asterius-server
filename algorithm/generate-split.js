let _ = require('lodash');
let ec = require('./exercises/exercises-collection');

let getSplitType = require('./get-split-type');


function generateSplit(selectedExercises) {
}


function calculateSetsPerSession(splitType) {
  const setLength = 3; // average in minutes
  let sessionMinutes;

  if (splitType.length === 1 || splitType.length === 2) {
    sessionMinutes = 80;
  } else if (splitType.length === 2 || splitType.length === 3) {
    sessionMinutes = 70;
  } else {
    sessionMinutes = 60;
  }
}

function getMaximumWeeklySetsPerExercise(splitType, fitnessLevel) {
}

function getWeeklySets() {
}


/*
 if preferredMusclesCount * maximumWeeklySetsPerExercise <= weeklysets
    add the isolation exercises -> reduce target muscles mrv -> run simplex
 else
  run simplex on preferredMuscles -> run simplex on the other muscles
 */

let splitType = getSplitType({
  monday: true,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: true
});

let setsPerSession = calculateSetsPerSession(splitType);
console.log(setsPerSession);