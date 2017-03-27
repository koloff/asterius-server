module.exports = function(userData) {
  let bestPossibleDailyMRV = 27; // 9 exercises * 3 sets


  // if it is 4 it remains the same
  if (userData.experience === 0 || userData.experience ===1) {
    bestPossibleDailyMRV = bestPossibleDailyMRV - 6; // removes two sets
  }
  else if (userData.experience === 2 || userData.experience === 3) {
    bestPossibleDailyMRV = bestPossibleDailyMRV - 3; // removes one set
  }

  if (userData.sex === 'female') {
    bestPossibleDailyMRV = bestPossibleDailyMRV - 3;
  }

  if (userData.age > 40) {
    bestPossibleDailyMRV = bestPossibleDailyMRV - 3;
  }

  return bestPossibleDailyMRV;
  
};
