module.exports = function(dailyMrv, trainingDays) {

  if (trainingDays === 2 || trainingDays === 3) {
    return {
      mrv: dailyMrv,
      exerciseRepetition: trainingDays
    };
  }
  else if(trainingDays === 4 || trainingDays === 5 || trainingDays ===6) {
    return {
      mrv: dailyMrv * 3,
      exerciseRepetition: 2
    }
  }

};